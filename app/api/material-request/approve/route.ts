import { NextResponse } from "next/server";
import { buildScheduleEmail, escapeHtml, readApprovalToken, sendScheduleEmail } from "../lib";

export const runtime = "nodejs";

function page(title: string, body: string, status = 200) {
  return new NextResponse(`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><style>body{margin:0;background:#f4f7f2;color:#08382a;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif}main{max-width:640px;margin:8vh auto;padding:40px;background:#fff;border:1px solid #d7e1d3;border-radius:16px;box-shadow:0 16px 50px #16352412}h1{font-size:28px}dl{display:grid;grid-template-columns:100px 1fr;gap:12px;margin:28px 0;padding:20px;background:#f7f9f5;border-radius:10px}dt{font-weight:700}dd{margin:0;overflow-wrap:anywhere}.mail{padding:20px;border:1px solid #d7e1d3;border-radius:10px;line-height:1.8}button{width:100%;margin-top:24px;padding:16px;border:0;border-radius:8px;background:#d84c35;color:#fff;font-size:16px;font-weight:700;cursor:pointer}small{display:block;margin-top:16px;color:#637069}</style></head><body><main>${body}</main></body></html>`, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'" },
  });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  try {
    const data = readApprovalToken(token);
    const template = buildScheduleEmail(data);
    const preview = escapeHtml(template.text).replace(/\n/g, "<br>");
    return page("日程調整メールの送信確認", `<h1>日程調整メールを送信しますか？</h1><p>まだ送信されていません。宛先とテンプレートを確認してください。</p><dl><dt>会社名</dt><dd>${escapeHtml(data.company)}</dd><dt>担当者名</dt><dd>${escapeHtml(data.name)}</dd><dt>宛先</dt><dd>${escapeHtml(data.email)}</dd></dl><div class="mail"><strong>件名</strong><br>${escapeHtml(template.subject)}<hr><strong>本文</strong><br>${preview}</div><form method="post"><input type="hidden" name="token" value="${escapeHtml(token)}"><button type="submit">承認してメールを送信する</button></form><small>承認リンクの有効期限は資料請求から7日間です。</small>`);
  } catch {
    return page("承認リンクが無効です", "<h1>承認リンクが無効です</h1><p>有効期限が切れているか、URLが正しくありません。</p>", 400);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const approval = readApprovalToken(String(data.get("token") || ""));
    await sendScheduleEmail(approval);
    return page("日程調整メールを送信しました", `<h1>送信しました</h1><p>${escapeHtml(approval.company)} ${escapeHtml(approval.name)} 様へ、日程調整メールを送信しました。</p>`);
  } catch {
    return page("メールを送信できませんでした", "<h1>送信できませんでした</h1><p>リンクの有効期限またはメール設定をご確認ください。</p>", 400);
  }
}
