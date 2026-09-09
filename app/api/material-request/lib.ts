import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const CONTACT_EMAIL = "contact@kyute.jp";
export const PDF_URL = "https://www.kyute.jp/lp-assets/service-guide-v10.pdf";
export const SITE_URL = "https://www.kyute.jp";
export const DEFAULT_SCHEDULING_URL = "https://app.spirinc.com/t/aQgqEaymTxNbIEg8ib3aT/as/8AZA8_46GMqfMYnw9BuVG/confirm";

export type ApprovalData = {
  company: string;
  name: string;
  email: string;
  requestId: string;
  expiresAt: number;
};

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character] || character);
}

function escapeSlack(value: string) {
  return value.replace(/[&<>]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[character] || character);
}

function approvalKey() {
  const secret = process.env.MATERIAL_APPROVAL_SECRET || process.env.RESEND_API_KEY;
  if (!secret || secret.length < 32) throw new Error("MATERIAL_APPROVAL_SECRET is not configured");
  return createHash("sha256").update(secret).digest();
}

export function createApprovalToken(data: Omit<ApprovalData, "expiresAt">) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", approvalKey(), iv);
  const plaintext = JSON.stringify({ ...data, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  return [iv, encrypted, cipher.getAuthTag()].map((part) => part.toString("base64url")).join(".");
}

export function readApprovalToken(token: string): ApprovalData {
  const [ivValue, encryptedValue, tagValue] = token.split(".");
  if (!ivValue || !encryptedValue || !tagValue) throw new Error("Invalid token");
  const decipher = createDecipheriv("aes-256-gcm", approvalKey(), Buffer.from(ivValue, "base64url"));
  decipher.setAuthTag(Buffer.from(tagValue, "base64url"));
  const plaintext = Buffer.concat([decipher.update(Buffer.from(encryptedValue, "base64url")), decipher.final()]).toString("utf8");
  const data = JSON.parse(plaintext) as ApprovalData;
  if (!data.email || !data.name || !data.company || !data.requestId || data.expiresAt < Date.now()) throw new Error("Expired token");
  return data;
}

export async function sendResendEmail(payload: Record<string, unknown>, idempotencyKey: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Resend failed: ${response.status}`);
  } finally {
    clearTimeout(timeout);
  }
}

export function buildScheduleEmail(data: ApprovalData) {
  const schedulingUrl = process.env.MATERIAL_SCHEDULING_URL || DEFAULT_SCHEDULING_URL;
  if (!schedulingUrl) throw new Error("Scheduling URL is not configured");
  const schedule = new URL(schedulingUrl);
  if (schedule.protocol !== "https:") throw new Error("Invalid scheduling URL");
  return {
    subject: "【KYUTE】採用密着動画のご相談｜日程調整のお願い",
    text: `${data.company}\n${data.name} 様\n\nこのたびは「採用密着動画制作サービス」の資料をご覧いただき、誠にありがとうございます。\n\n貴社の採用課題や、候補者へ伝えたい「人・カルチャー」の魅力について、ぜひ一度お話を伺えればと存じます。\n\nお打ち合わせでは、現在の採用活動や採用したい人物像を伺ったうえで、密着動画の活用方法、制作の進め方、費用の目安を具体的にご案内いたします。まだ実施を決めていない段階でも、どうぞお気軽にご相談ください。\n\n以下のページから、ご都合のよい日時をお選びいただけます。\n${schedule.toString()}\n\nご都合の合う日時がない場合や、ご不明点がございましたら、本メールにそのままご返信ください。\n\nお話しできることを、心より楽しみにしております。\n\nKYUTE合同会社\n採用密着動画制作サービス\n${CONTACT_EMAIL}`,
    html: `<div style="margin:0 auto;max-width:640px;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue','Yu Gothic',YuGothic,Arial,sans-serif;color:#17201d;line-height:1.8"><p>${escapeHtml(data.company)}<br>${escapeHtml(data.name)} 様</p><p>このたびは「採用密着動画制作サービス」の資料をご覧いただき、誠にありがとうございます。</p><p>貴社の採用課題や、候補者へ伝えたい<strong>「人・カルチャー」の魅力</strong>について、ぜひ一度お話を伺えればと存じます。</p><p>お打ち合わせでは、現在の採用活動や採用したい人物像を伺ったうえで、密着動画の活用方法、制作の進め方、費用の目安を具体的にご案内いたします。<br>まだ実施を決めていない段階でも、どうぞお気軽にご相談ください。</p><p>以下のボタンから、ご都合のよい日時をお選びいただけます。</p><p style="margin:28px 0"><a href="${escapeHtml(schedule.toString())}" style="display:inline-block;padding:14px 28px;border-radius:8px;background:#0a4a37;color:#ffffff;text-decoration:none;font-weight:700">相談日時を選ぶ</a></p><p>ご都合の合う日時がない場合や、ご不明点がございましたら、本メールにそのままご返信ください。</p><p>お話しできることを、心より楽しみにしております。</p><p style="margin-top:32px">KYUTE合同会社<br>採用密着動画制作サービス<br><a href="mailto:${CONTACT_EMAIL}" style="color:#0a4a37">${CONTACT_EMAIL}</a></p></div>`,
  };
}

export async function sendScheduleEmail(data: ApprovalData) {
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!from) throw new Error("Mail settings are not configured");
  const template = buildScheduleEmail(data);
  await sendResendEmail({
    from,
    to: [data.email],
    reply_to: CONTACT_EMAIL,
    ...template,
    tags: [{ name: "type", value: "schedule_followup" }],
  }, `schedule-${data.requestId}`);
}

export function verifySlackSignature(rawBody: string, timestamp: string, signature: string) {
  const secret = process.env.MATERIAL_SLACK_SIGNING_SECRET;
  if (!secret || !timestamp || !signature || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const expected = `v0=${createHmac("sha256", secret).update(`v0:${timestamp}:${rawBody}`).digest("hex")}`;
  const left = Buffer.from(expected);
  const right = Buffer.from(signature);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function postSlackApproval(token: string, data: Omit<ApprovalData, "expiresAt">) {
  const botToken = process.env.MATERIAL_SLACK_BOT_TOKEN;
  const channel = process.env.MATERIAL_SLACK_CHANNEL_ID;
  if (!botToken || !channel) throw new Error("Slack configuration is incomplete");
  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: { Authorization: `Bearer ${botToken}`, "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      channel,
      text: `採用密着動画LPから新しい資料請求がありました。${data.company} ${data.name}様（${data.email}）へ資料PDFは自動送信済みです。`,
      blocks: [
        { type: "header", text: { type: "plain_text", text: "採用密着動画LP｜新しい資料請求", emoji: true } },
        { type: "section", fields: [
          { type: "mrkdwn", text: `*会社名*\n${escapeSlack(data.company)}` },
          { type: "mrkdwn", text: `*担当者名*\n${escapeSlack(data.name)}` },
          { type: "mrkdwn", text: `*メールアドレス*\n${escapeSlack(data.email)}` },
          { type: "mrkdwn", text: "*資料送付*\n送信済み" },
        ] },
        { type: "section", text: { type: "mrkdwn", text: "日程調整メールは未送信です。内容を確認し、送信する場合は下のボタンから承認してください。" } },
        { type: "actions", elements: [
          { type: "button", action_id: "send_schedule_followup", text: { type: "plain_text", text: "日程調整メールを送る", emoji: true }, style: "primary", value: token, confirm: { title: { type: "plain_text", text: "送信しますか？" }, text: { type: "mrkdwn", text: `${escapeSlack(data.company)} ${escapeSlack(data.name)}様へ、日程調整メールを送信します。` }, confirm: { type: "plain_text", text: "送信する" }, deny: { type: "plain_text", text: "キャンセル" } } },
          { type: "button", text: { type: "plain_text", text: "ブラウザで確認", emoji: true }, url: `${SITE_URL}/api/material-request/approve?token=${encodeURIComponent(token)}` },
        ] },
      ],
    }),
  });
  if (!response.ok) throw new Error(`Slack HTTP ${response.status}`);
  const result = await response.json() as { ok?: boolean; error?: string };
  if (result.ok !== true) throw new Error(`Slack API ${result.error || "unknown_error"}`);
  return true;
}
