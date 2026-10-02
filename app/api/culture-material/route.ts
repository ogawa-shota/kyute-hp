import { NextResponse } from "next/server";
import { CONTACT_EMAIL, SITE_URL, createApprovalToken, escapeHtml, postSlackApproval, sendResendEmail } from "../material-request/lib";

export const runtime = "nodejs";
export const maxDuration = 60;

const PDF_URL = `${SITE_URL}/culture-assets/kyute-culture-guide.pdf`;

const MAX_BYTES = 4096;
const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const CONTROL = /[\u0000-\u001f\u007f]/;

function reply(status: number, message: string) {
  return NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

async function readBoundedJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) { await reader.cancel(); throw new Error("too-large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") {
    return reply(403, "このページから、もう一度お試しください。");
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply(415, "入力内容を確認してください。");
  }
  const statedLength = Number(request.headers.get("content-length") || 0);
  if (!Number.isFinite(statedLength) || statedLength < 0 || statedLength > MAX_BYTES) return reply(413, "入力内容が長すぎます。");
  let body: unknown;
  try { body = await readBoundedJson(request); }
  catch (error) { return reply(error instanceof Error && error.message === "too-large" ? 413 : 400, "入力内容を確認してください。"); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply(400, "入力内容を確認してください。");
  const value = body as Record<string, unknown>;
  const company = typeof value.company === "string" ? value.company.trim() : "";
  const name = typeof value.name === "string" ? value.name.trim() : "";
  const email = typeof value.email === "string" ? value.email.trim().toLowerCase() : "";
  const requestId = typeof value.requestId === "string" ? value.requestId : "";
  if (!company || company.length > 120 || !name || name.length > 80 || email.length > 254 ||
      !EMAIL.test(email) || [company, name, email].some(text => CONTROL.test(text)) ||
      value.consent !== true || value.website !== "" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestId)) {
    return reply(400, "会社名・お名前・メールアドレスと同意を確認してください。");
  }
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!process.env.RESEND_API_KEY || !from || !process.env.MATERIAL_SLACK_BOT_TOKEN || !process.env.MATERIAL_SLACK_CHANNEL_ID) {
    return reply(503, "現在、資料送付の準備中です。contact@kyute.jp へお問い合わせください。");
  }
  const lead = { company, name, email, requestId, service: "culture" as const };
  const paragraphs = [
    `${company}\n${name} 様`,
    "このたびは「採用YouTube運用代行サービス」の資料をご請求いただき、誠にありがとうございます。\nKYUTE合同会社です。",
    "私たちは、単発の会社紹介ではなく、人・仕事・会社の空気が伝わる動画を継続して届けることで、候補者が応募の前に会社への理解を深め、納得して選べる採用体験をつくりたいと考えています。求人票だけでは届きにくい会社らしさを、誇張せず、そこで働く方々の言葉と姿から伝えることを大切にしています。",
    "本メールに採用YouTube運用代行サービスの資料PDFを添付しました。\n資料では、サービスの考え方、企画・制作・運用の進め方、採用活動での活用方法をご紹介しています。社内でのご検討の一助になれば幸いです。",
    "ご不明な点や「自社ではどんな発信ができるだろう」といったご相談がありましたら、本メールにそのままご返信ください。ご検討の初期段階でも、どうぞお気軽にお声がけください。",
    `資料PDF：${PDF_URL}`,
    `KYUTE合同会社\n採用YouTube運用代行サービス\n${CONTACT_EMAIL}`,
  ];
  const mailHtml = paragraphs.map(paragraph => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")
    .replace(PDF_URL, `<a href="${PDF_URL}">${PDF_URL}</a>`)}</p>`).join("");
  let token: string;
  try {
    token = createApprovalToken(lead);
    await sendResendEmail({
      from,
      to: [email],
      reply_to: CONTACT_EMAIL,
      subject: "採用YouTube運用代行サービス｜資料のご案内",
      text: paragraphs.join("\n\n"),
      html: `<div style="max-width:640px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Yu Gothic',sans-serif;line-height:1.9;color:#24332d">${mailHtml}</div>`,
      attachments: [{ path: PDF_URL, filename: "採用YouTube運用代行サービス_ご案内.pdf" }],
      tags: [{ name: "type", value: "culture_material_delivery" }],
    }, `culture-material-${requestId}`);
  } catch (error) {
    console.error("culture-material delivery failed", error instanceof Error ? error.message : "unknown_error");
    return reply(502, "送信できませんでした。時間をおいて再度お試しください。");
  }

  // Notifications are independent: a Slack failure must not prevent the internal
  // email or ask the visitor to resend an already delivered PDF. The stable
  // notification payload also keeps Resend retries idempotent.
  const notifications = await Promise.allSettled([
    sendResendEmail({
      from,
      to: [CONTACT_EMAIL],
      reply_to: email,
      subject: `【採用YouTube 資料請求】${company} ${name} 様`,
      text: `採用YouTube LPから資料請求があり、資料PDFを自動送信しました。\n\n会社名：${company}\nお名前：${name}\nメール：${email}\n\n日程調整メールは未送信です。Slackの資料請求通知から、内容を確認して送信を承認できます。`,
      html: `<p>採用YouTube LPから資料請求があり、資料PDFを自動送信しました。</p><dl><dt>会社名</dt><dd>${escapeHtml(company)}</dd><dt>お名前</dt><dd>${escapeHtml(name)}</dd><dt>メール</dt><dd>${escapeHtml(email)}</dd></dl><p><strong>日程調整メールは未送信です。</strong><br>Slackの資料請求通知から、内容を確認して送信を承認できます。</p>`,
      tags: [{ name: "type", value: "culture_material_notification" }],
    }, `culture-material-notify-${requestId}`),
    postSlackApproval(token, lead),
  ]);
  notifications.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`culture-material ${index === 0 ? "internal email" : "Slack"} notification failed`, result.reason instanceof Error ? result.reason.message : "unknown_error");
    }
  });
  return NextResponse.json({ ok: true, slackNotified: notifications[1].status === "fulfilled" }, {
    headers: { "Cache-Control": "no-store" },
  });
}
