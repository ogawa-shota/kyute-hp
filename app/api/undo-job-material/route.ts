import { NextResponse } from "next/server";
import { CONTACT_EMAIL, SITE_URL, createApprovalToken, escapeHtml, postSlackApproval, sendResendEmail } from "../material-request/lib";

export const runtime = "nodejs";
export const maxDuration = 60;

const PDF_URL = `${SITE_URL}/undo-job-assets/undo-job-service-slides-v12.pdf`;

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

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || request.headers.get("sec-fetch-site") === "cross-site") return false;
  const target = new URL(request.url);
  if (origin === target.origin) return true;
  try {
    const source = new URL(origin);
    const loopback = new Set(["localhost", "127.0.0.1"]);
    // Next may normalize its local request URL to localhost despite a 127.0.0.1
    // listener. Only these HTTP loopback aliases on the same port are equivalent.
    return origin === source.origin && source.protocol === "http:" && target.protocol === "http:" &&
      loopback.has(source.hostname) && loopback.has(target.hostname) && source.port === target.port;
  } catch { return false; }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
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
  const lead = { company, name, email, requestId, service: "undo-job" as const };
  const paragraphs = [
    `${company}\n${name} 様`,
    "このたびは「運動部のシゴト。」の資料をご請求いただき、誠にありがとうございます。\nKYUTE合同会社「運動部のシゴト。」担当です。",
    "私たちは、社員一人ひとりの働く姿や仕事への想いを通じて、候補者が「この人たちと働きたい」と感じられる出会いをつくりたいと考えています。会社の魅力が候補者に届ききっていないと感じる企業の力になれれば、という想いで取り組んでいます。",
    "本メールにサービス紹介資料のPDFを添付しました。\n資料では、サービスの考え方、密着動画で伝える内容、採用での活用方法をご紹介しています。社内でのご検討の一助になれば幸いです。",
    "ご不明な点や「自社なら誰に密着できるだろう」といったご相談がありましたら、本メールにそのままご返信ください。ご検討の初期段階でも、どうぞお気軽にお声がけください。",
    `資料PDF：${PDF_URL}`,
    `KYUTE合同会社\n運動部のシゴト。\n${CONTACT_EMAIL}`,
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
      subject: "【運動部のシゴト。】資料のご請求ありがとうございます",
      text: paragraphs.join("\n\n"),
      html: `<div style="max-width:640px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Yu Gothic',sans-serif;line-height:1.9;color:#24332d">${mailHtml}</div>`,
      attachments: [{ path: PDF_URL, filename: "運動部のシゴト_サービス紹介資料.pdf" }],
      tags: [{ name: "type", value: "undo_job_material_delivery" }],
    }, `undo-job-material-${requestId}`);
  } catch (error) {
    console.error("undo-job-material delivery failed", error instanceof Error ? error.message : "unknown_error");
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
      subject: `【運動部のシゴト。 資料請求】${company} ${name} 様`,
      text: `運動部のシゴト。 LPから資料請求があり、資料PDFを自動送信しました。\n\n会社名：${company}\nお名前：${name}\nメール：${email}\n\n日程調整メールは未送信です。Slackの資料請求通知から、内容を確認して送信を承認できます。`,
      html: `<p>運動部のシゴト。 LPから資料請求があり、資料PDFを自動送信しました。</p><dl><dt>会社名</dt><dd>${escapeHtml(company)}</dd><dt>お名前</dt><dd>${escapeHtml(name)}</dd><dt>メール</dt><dd>${escapeHtml(email)}</dd></dl><p><strong>日程調整メールは未送信です。</strong><br>Slackの資料請求通知から、内容を確認して送信を承認できます。</p>`,
      tags: [{ name: "type", value: "undo_job_material_notification" }],
    }, `undo-job-material-notify-${requestId}`),
    postSlackApproval(token, lead),
  ]);
  notifications.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`undo-job-material ${index === 0 ? "internal email" : "Slack"} notification failed`, result.reason instanceof Error ? result.reason.message : "unknown_error");
    }
  });
  return NextResponse.json({ ok: true, slackNotified: notifications[1].status === "fulfilled" }, {
    headers: { "Cache-Control": "no-store" },
  });
}
