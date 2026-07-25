import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND_API_URL = "https://api.resend.com/emails";
const CONTACT_TO_EMAIL = "contact@kyute.jp";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  company: string;
  name: string;
  email: string;
  issue: string;
  website: string;
};

function readPayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== "object") return null;

  const body = value as Record<string, unknown>;
  const payload = {
    company: typeof body.company === "string" ? body.company.trim() : "",
    name: typeof body.name === "string" ? body.name.trim() : "",
    email: typeof body.email === "string" ? body.email.trim() : "",
    issue: typeof body.issue === "string" ? body.issue.trim() : "",
    website: typeof body.website === "string" ? body.website.trim() : "",
  };

  if (
    !payload.company ||
    !payload.name ||
    !payload.email ||
    !payload.issue ||
    !EMAIL_PATTERN.test(payload.email) ||
    payload.company.length > 120 ||
    payload.name.length > 80 ||
    payload.email.length > 254 ||
    payload.issue.length > 4000
  ) {
    return null;
  }

  return payload;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "入力内容を確認してください。" },
      { status: 400 },
    );
  }

  const payload = readPayload(body);

  if (!payload) {
    return NextResponse.json(
      { message: "必須項目とメールアドレスを確認してください。" },
      { status: 400 },
    );
  }

  // Botが埋める隠し項目。画面上は成功扱いにして再試行を抑える。
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error("Contact form email settings are not configured.");
    return NextResponse.json(
      { message: "現在送信機能を利用できません。時間をおいて再度お試しください。" },
      { status: 503 },
    );
  }

  const message = [
    "KYUTE公式サイトからお問い合わせがありました。",
    "",
    `会社名: ${payload.company}`,
    `担当者名: ${payload.name}`,
    `メール: ${payload.email}`,
    "",
    "いまの採用課題:",
    payload.issue,
  ].join("\n");

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [CONTACT_TO_EMAIL],
        reply_to: payload.email,
        subject: `【KYUTE公式サイト】${payload.company} ${payload.name}様よりお問い合わせ`,
        text: message,
      }),
    });

    if (!response.ok) {
      const providerError = await response.text();
      console.error("Contact email provider error:", providerError);
      return NextResponse.json(
        { message: "送信できませんでした。時間をおいて再度お試しください。" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email request failed:", error);
    return NextResponse.json(
      { message: "送信できませんでした。時間をおいて再度お試しください。" },
      { status: 502 },
    );
  }
}
