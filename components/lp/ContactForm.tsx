"use client";

import { useState, type FormEvent } from "react";

/**
 * 問い合わせフォーム。入力は4項目のみ（会社名・担当者名・メール・採用課題）。
 * 入力内容をサーバー側APIへ送り、contact@kyute.jpへ通知する。
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "送信できませんでした。");
      }

      form.reset();
      setStatus("sent");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "送信できませんでした。時間をおいて再度お試しください。",
      );
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3.5 text-base text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-mute)] focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]";

  if (status === "sent") {
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
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">ウェブサイト</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
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
          required
          className={fieldClass}
          placeholder="例：応募は集まるが、内定承諾率が上がらない"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        data-cta="contact-submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[var(--brand)] px-8 py-4 text-base font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--brand-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "送信中..." : "無料で相談する"}
      </button>
    </form>
  );
}
