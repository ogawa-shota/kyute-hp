"use client";

import { useState, type FormEvent } from "react";

/**
 * 問い合わせフォーム。入力は4項目のみ（会社名・担当者名・メール・採用課題）。
 * 送信処理は差し替え前提（送信先APIは未接続）。
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 差し替え: 実際の送信処理（API/フォームサービス）に接続してください。
    setSent(true);
  };

  const fieldClass =
    "w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-[15px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-mute)] focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]";

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-soft)] p-8 text-center">
        <p className="text-lg font-bold text-[var(--text-primary)]">
          お問い合わせありがとうございます。
        </p>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          担当者より折り返しご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-cta="contact-form"
      className="space-y-5"
    >
      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
          会社名
        </label>
        <input id="company" name="company" type="text" required className={fieldClass} placeholder="株式会社〇〇" />
      </div>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
          担当者名
        </label>
        <input id="name" name="name" type="text" required className={fieldClass} placeholder="山田 太郎" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
          メール
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="issue" className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
          いまの採用課題（自由記述）
        </label>
        <textarea
          id="issue"
          name="issue"
          rows={4}
          className={fieldClass}
          placeholder="例：応募は集まるが、内定承諾率が上がらない"
        />
      </div>

      <button
        type="submit"
        data-cta="contact-submit"
        className="w-full rounded-full bg-[var(--brand)] px-8 py-4 text-[15px] font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--brand-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
      >
        無料で相談する
      </button>
    </form>
  );
}
