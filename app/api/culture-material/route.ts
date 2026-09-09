import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
  const email = typeof value.email === "string" ? value.email.trim() : "";
  if (!company || company.length > 120 || !name || name.length > 80 || email.length > 254 ||
      !EMAIL.test(email) || [company, name, email].some(text => CONTROL.test(text)) ||
      value.consent !== true || value.website !== "") {
    return reply(400, "会社名・お名前・メールアドレスと同意を確認してください。");
  }
  // Delivery remains disabled until the mail processor is approved and configured.
  // Do not persist, log, forward, or report success for these submitted details.
  return reply(503, "現在、資料メールを送信できません。時間をおいて再度お試しください。");
}
