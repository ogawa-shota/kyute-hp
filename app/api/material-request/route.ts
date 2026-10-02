import { NextResponse } from "next/server";
import { CONTACT_EMAIL, PDF_URL, SITE_URL, createApprovalToken, escapeHtml, postSlackApproval, sendResendEmail } from "./lib";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 8_192;
type MaterialRequest = { company?: unknown; name?: unknown; email?: unknown; consent?: unknown; website?: unknown; requestId?: unknown };

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validOrigin(value: string | null) {
  if (!value) return true;
  try {
    const origin = new URL(value);
    return origin.protocol === "https:" && ["kyute.jp", "www.kyute.jp"].includes(origin.hostname)
      || origin.protocol === "http:" && ["localhost", "127.0.0.1"].includes(origin.hostname);
  } catch { return false; }
}

export async function POST(request: Request) {
  if (!validOrigin(request.headers.get("origin"))) return NextResponse.json({ ok: false, message: "送信元を確認できませんでした。" }, { status: 403 });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "入力内容が長すぎます。" }, { status: 413 });

  let raw: MaterialRequest;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) throw new Error("too large");
    raw = JSON.parse(body) as MaterialRequest;
  } catch {
    return NextResponse.json({ ok: false, message: "入力内容を確認してください。" }, { status: 400 });
  }

  const company = clean(raw.company, 120);
  const name = clean(raw.name, 80);
  const email = clean(raw.email, 254).toLowerCase();
  const requestId = clean(raw.requestId, 36);
  if (clean(raw.website, 200)) return NextResponse.json({ ok: true });
  if (!company || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || raw.consent !== true || !/^[0-9a-f-]{36}$/i.test(requestId)) {
    return NextResponse.json({ ok: false, message: "必須項目を確認してください。" }, { status: 400 });
  }

  const from = process.env.CONTACT_FROM_EMAIL;
  if (!process.env.RESEND_API_KEY || !from) {
    return NextResponse.json({ ok: false, message: "現在、資料送付の準備中です。contact@kyute.jp へお問い合わせください。" }, { status: 503 });
  }

  const token = createApprovalToken({ company, name, email, requestId });
  const approvalUrl = `${SITE_URL}/api/material-request/approve?token=${encodeURIComponent(token)}`;
  const paragraphs = [
    `${company}\n${name} 様`,
    "このたびは「採用密着動画制作サービス」の資料をご請求いただき、誠にありがとうございます。\nKYUTE合同会社です。",
    "私たちは、求人票だけでは伝わりにくい社員の働く姿や仕事への想い、職場の空気まで映像で届けることで、候補者が応募の前に「ここで働く自分」を想像できる出会いをつくりたいと考えています。会社の魅力が候補者に届ききっていないと感じる企業の力になれれば、という想いでこのサービスに取り組んでいます。",
    "本メールにサービス資料のPDFを添付しました。\n資料では、サービスの考え方、密着動画で伝える内容、採用での活用方法、制作の進め方・費用の目安をご紹介しています。社内でのご検討の一助になれば幸いです。",
    "ご不明な点や「自社なら誰に密着できるだろう」といったご相談がありましたら、本メールにそのままご返信ください。ご検討の初期段階でも、どうぞお気軽にお声がけください。",
    `資料PDF：${PDF_URL}`,
    `KYUTE合同会社\n採用密着動画制作サービス\n${CONTACT_EMAIL}`,
  ];
  const mailHtml = paragraphs.map(paragraph => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")
    .replace(PDF_URL, `<a href="${PDF_URL}">${PDF_URL}</a>`)}</p>`).join("");
  try {
    await sendResendEmail({
      from,
      to: [email],
      reply_to: CONTACT_EMAIL,
      subject: "採用密着動画制作サービス｜資料のご案内",
      text: paragraphs.join("\n\n"),
      html: `<div style="max-width:640px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Yu Gothic',sans-serif;line-height:1.9;color:#24332d">${mailHtml}</div>`,
      attachments: [{ path: PDF_URL, filename: "採用密着動画制作サービス_ご案内.pdf" }],
      tags: [{ name: "type", value: "material_delivery" }],
    }, `material-${requestId}`);

    await sendResendEmail({
      from,
      to: [CONTACT_EMAIL],
      reply_to: email,
      subject: `【資料請求】${company} ${name} 様`,
      text: `採用密着動画LPから資料請求があり、資料PDFを自動送信しました。\n\n会社名：${company}\nお名前：${name}\nメール：${email}\n\n日程調整メールは未送信です。内容を確認し、送信する場合はこちら：\n${approvalUrl}`,
      html: `<p>採用密着動画LPから資料請求があり、資料PDFを自動送信しました。</p><dl><dt>会社名</dt><dd>${escapeHtml(company)}</dd><dt>お名前</dt><dd>${escapeHtml(name)}</dd><dt>メール</dt><dd>${escapeHtml(email)}</dd></dl><p><strong>日程調整メールは未送信です。</strong></p><p><a href="${escapeHtml(approvalUrl)}">内容を確認して送信を承認する</a></p>`,
      tags: [{ name: "type", value: "material_notification" }],
    }, `material-notify-${requestId}`);

    let slackNotified = false;
    try {
      slackNotified = await postSlackApproval(token, { company, name, email, requestId });
    } catch (error) {
      console.error("material-request Slack notification failed", error instanceof Error ? error.message : "unknown_error");
    }
    return NextResponse.json({ ok: true, slackNotified });
  } catch (error) {
    console.error("material-request email delivery failed", error instanceof Error ? error.message : "unknown_error");
    return NextResponse.json({ ok: false, message: "送信できませんでした。時間をおいて再度お試しください。" }, { status: 502 });
  }
}
