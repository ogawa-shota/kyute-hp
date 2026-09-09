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

export async function sendScheduleEmail(data: ApprovalData) {
  const from = process.env.CONTACT_FROM_EMAIL;
  const schedulingUrl = process.env.MATERIAL_SCHEDULING_URL || DEFAULT_SCHEDULING_URL;
  if (!from || !schedulingUrl) throw new Error("Mail settings are not configured");
  const schedule = new URL(schedulingUrl);
  if (schedule.protocol !== "https:") throw new Error("Invalid scheduling URL");
  await sendResendEmail({
    from,
    to: [data.email],
    reply_to: CONTACT_EMAIL,
    subject: "採用密着動画について、ご相談の日程調整",
    text: `${data.company}\n${data.name} 様\n\n資料をご覧いただき、ありがとうございます。\n採用密着動画についてご相談をご希望でしたら、以下からご都合のよい日時をお選びください。\n\n${schedule.toString()}\n\nKYUTE合同会社\n${CONTACT_EMAIL}`,
    html: `<p>${escapeHtml(data.company)}<br>${escapeHtml(data.name)} 様</p><p>資料をご覧いただき、ありがとうございます。</p><p>採用密着動画についてご相談をご希望でしたら、以下からご都合のよい日時をお選びください。</p><p><a href="${escapeHtml(schedule.toString())}">相談日時を選ぶ</a></p><p>KYUTE合同会社<br><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>`,
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

export async function postSlackApproval(token: string) {
  const botToken = process.env.MATERIAL_SLACK_BOT_TOKEN;
  const channel = process.env.MATERIAL_SLACK_CHANNEL_ID;
  if (!botToken || !channel) return false;
  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: { Authorization: `Bearer ${botToken}`, "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      channel,
      text: "採用密着動画LPから新しい資料請求がありました。資料PDFは自動送信済みです。",
      blocks: [
        { type: "header", text: { type: "plain_text", text: "採用密着動画LP｜新しい資料請求", emoji: true } },
        { type: "section", text: { type: "mrkdwn", text: "資料PDFは自動送信済みです。詳細は `contact@kyute.jp` の通知メールをご確認ください。" } },
        { type: "actions", elements: [
          { type: "button", action_id: "send_schedule_followup", text: { type: "plain_text", text: "日程調整メールを送る", emoji: true }, style: "primary", value: token, confirm: { title: { type: "plain_text", text: "送信しますか？" }, text: { type: "mrkdwn", text: "この資料請求者へ日程調整メールを送信します。" }, confirm: { type: "plain_text", text: "送信する" }, deny: { type: "plain_text", text: "キャンセル" } } },
          { type: "button", text: { type: "plain_text", text: "ブラウザで確認", emoji: true }, url: `${SITE_URL}/api/material-request/approve?token=${encodeURIComponent(token)}` },
        ] },
      ],
    }),
  });
  if (!response.ok) return false;
  const result = await response.json() as { ok?: boolean };
  return result.ok === true;
}
