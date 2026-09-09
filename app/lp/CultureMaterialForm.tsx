"use client";

import { useRef, useState, type FormEvent } from "react";

export default function CultureMaterialForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const pending = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
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
    const fingerprint = JSON.stringify(fields);
    if (!attempt.current || attempt.current.fingerprint !== fingerprint) {
      attempt.current = { fingerprint, id: crypto.randomUUID() };
    }
    pending.current = true;
    setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/culture-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, requestId: attempt.current.id }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setError(typeof result.message === "string" ? result.message : "送信できませんでした。時間をおいて再度お試しください。");
        setStatus("idle"); return;
      }
      form.reset(); setStatus("success");
    } catch {
      setError("送信を確認できませんでした。入力内容を変えずに、時間をおいて再度お試しください。");
      setStatus("idle");
    } finally { pending.current = false; }
  }

  return <div className="c-form-panel">
    <h3>資料で、もっと詳しく。</h3>
    <p className="c-form-intro">会社名・お名前・メールアドレスをご入力ください。資料を閲覧できるリンクをお送りします。</p>
    {status === "success" ? <div className="c-form-success" role="status" aria-live="polite">
      <p><strong>資料メールの送信を受け付けました。</strong></p>
      <p>届かない場合は、迷惑メールフォルダもご確認ください。</p>
    </div> : <form onSubmit={submit} aria-busy={status === "sending"}>
      <label htmlFor="culture-company">会社名 <span>必須</span><input id="culture-company" name="company" autoComplete="organization" required maxLength={120} placeholder="例：KYUTE合同会社" disabled={status === "sending"} /></label>
      <label htmlFor="culture-name">お名前 <span>必須</span><input id="culture-name" name="name" autoComplete="name" required maxLength={80} placeholder="例：山田 太郎" disabled={status === "sending"} /></label>
      <label htmlFor="culture-email">メールアドレス <span>必須</span><input id="culture-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="例：name@example.jp" disabled={status === "sending"} /></label>
      <div className="c-material-honeypot" aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}><label htmlFor="culture-website">ウェブサイト<input id="culture-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="c-material-consent" htmlFor="culture-consent"><input id="culture-consent" name="consent" type="checkbox" required disabled={status === "sending"} /><span>入力情報を資料送付に利用することに同意します。</span></label>
      {error && <p className="c-form-error" role="alert">{error}</p>}
      <button className="c-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "送信しています…" : "資料をメールで受け取る"}<span aria-hidden="true">→</span></button>
    </form>}
    <a className="c-text-link" href="/contact">導入について相談する <span aria-hidden="true">↗</span></a>
  </div>;
}
