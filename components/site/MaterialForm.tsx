"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

/**
 * Material request form. Posts to the existing delivery endpoints, which take
 * the same payload: /api/material-request (採用動画) and /api/culture-material
 * (採用YouTube).
 */
export function MaterialForm({
  endpoint,
  service,
  onDark = false,
}: {
  endpoint: "/api/material-request" | "/api/culture-material";
  service: string;
  onDark?: boolean;
}) {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "done" || error) resultRef.current?.focus();
  }, [status, error]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = {
      company: String(data.get("company") || "").trim(),
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      website: String(data.get("website") || ""),
      consent: data.get("consent") === "on",
    };
    // Same input → same requestId, so a retry is not delivered twice.
    const fingerprint = JSON.stringify(fields);
    if (!attempt.current || attempt.current.fingerprint !== fingerprint) {
      attempt.current = { fingerprint, id: crypto.randomUUID() };
    }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, requestId: attempt.current.id }),
        signal: AbortSignal.timeout(60000),
      });
      const result: { ok?: boolean; message?: string } = await response.json();
      if (!response.ok || result.ok !== true) {
        setError(result.message || "送信できませんでした。時間をおいて再度お試しください。");
        setStatus("idle");
        return;
      }
      setSentTo(fields.email);
      setStatus("done");
    } catch {
      setError("送信を確認できませんでした。入力内容を変えずに、時間をおいて再度お試しください。");
      setStatus("idle");
    }
  }

  const panel = `rounded-3xl p-6 md:p-9 ${onDark ? "bg-white text-[var(--ink-strong)]" : "border border-[var(--line)] bg-white"}`;
  const input = "mt-2 block h-[52px] w-full rounded-xl border border-[var(--line)] bg-white px-4 text-base text-[var(--ink-strong)] placeholder:text-[#9a9a94] focus:border-[var(--ink-strong)] focus:outline-none";

  if (status === "done") {
    return (
      <div className={panel} role="status" aria-live="polite" ref={resultRef} tabIndex={-1}>
        <p className="text-xl font-extrabold">メールを送信しました。</p>
        <p className="mt-3 leading-[1.9]">{sentTo} に、{service}の資料をお送りしました。</p>
        <p className="mt-3 text-[15px] leading-[1.9] text-[var(--ink-soft)]">
          届かない場合は迷惑メールフォルダをご確認ください。見当たらない場合は
          <a className="underline" href="mailto:contact@kyute.jp">contact@kyute.jp</a> までご連絡ください。
        </p>
      </div>
    );
  }

  const sending = status === "sending";
  return (
    <form onSubmit={submit} aria-busy={sending} className={panel} noValidate={false}>
      <p className="text-sm font-bold text-[var(--ink-mute)]">{service}の資料</p>
      <div className="mt-4 flex flex-col gap-4">
        <label className="block text-[15px] font-bold" htmlFor={`${uid}-company`}>
          会社名 <span className="text-xs text-[var(--brand-ink)]">必須</span>
          <input id={`${uid}-company`} name="company" autoComplete="organization" required maxLength={120} placeholder="例：株式会社〇〇" disabled={sending} className={input} />
        </label>
        <label className="block text-[15px] font-bold" htmlFor={`${uid}-name`}>
          お名前 <span className="text-xs text-[var(--brand-ink)]">必須</span>
          <input id={`${uid}-name`} name="name" autoComplete="name" required maxLength={80} placeholder="例：山田 太郎" disabled={sending} className={input} />
        </label>
        <label className="block text-[15px] font-bold" htmlFor={`${uid}-email`}>
          メールアドレス <span className="text-xs text-[var(--brand-ink)]">必須</span>
          <input id={`${uid}-email`} name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} placeholder="例：name@company.co.jp" disabled={sending} className={input} />
        </label>
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor={`${uid}-website`}>ウェブサイト<input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        <label className="flex items-start gap-3 text-[15px] leading-[1.7]" htmlFor={`${uid}-consent`}>
          <input id={`${uid}-consent`} name="consent" type="checkbox" required disabled={sending} className="mt-1 h-5 w-5 flex-none accent-[var(--ink-strong)]" />
          <span>資料の送付・ご相談対応のための個人情報の利用に同意する</span>
        </label>
        {error && (
          <div role="alert" ref={resultRef} tabIndex={-1} className="rounded-xl bg-[#fdecea] px-4 py-3 text-[15px] text-[#8a1f12]">
            {error}
          </div>
        )}
        <button type="submit" disabled={sending} className="mt-2 inline-flex h-14 items-center justify-center rounded-full bg-[var(--brand)] px-8 text-base font-bold text-[var(--ink-strong)] transition hover:bg-[var(--brand-deep)] disabled:opacity-60">
          {sending ? "送信しています…" : "資料をメールで受け取る →"}
        </button>
      </div>
    </form>
  );
}
