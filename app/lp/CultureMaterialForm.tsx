"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export default function CultureMaterialForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" || error) resultRef.current?.focus();
  }, [status, error]);
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
        signal: AbortSignal.timeout(60000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setError(typeof result.message === "string" ? result.message : "送信できませんでした。時間をおいて再度お試しください。");
        setStatus("idle"); return;
      }
      setSentTo(fields.email); form.reset(); setStatus("success");
    } catch {
      setError("送信を確認できませんでした。入力内容を変えずに、時間をおいて再度お試しください。");
      setStatus("idle");
    } finally { pending.current = false; }
  }

  return <div className="c-form-panel">
    <h3>資料で、もっと詳しく。</h3>
    <p className="c-form-intro">会社名・お名前・メールアドレスをご入力ください。資料PDFはメールでお送りします。</p>
    {status === "success" ? <div className="c-form-success" role="status" aria-live="polite" ref={resultRef} tabIndex={-1}>
      <p><strong>メールを送信しました。</strong></p>
      <p>{sentTo} に、資料PDFをお送りしました。</p>
      <p>届かない場合は迷惑メールフォルダをご確認ください。見当たらない場合は <a href="mailto:contact@kyute.jp">contact@kyute.jp</a> までご連絡ください。</p>
    </div> : <form onSubmit={submit} aria-busy={status === "sending"}>
      <label htmlFor="culture-company">会社名 <span>必須</span><input id="culture-company" name="company" autoComplete="organization" required maxLength={120} placeholder="例：KYUTE合同会社" disabled={status === "sending"} /></label>
      <label htmlFor="culture-name">お名前 <span>必須</span><input id="culture-name" name="name" autoComplete="name" required maxLength={80} placeholder="例：山田 太郎" disabled={status === "sending"} /></label>
      <label htmlFor="culture-email">メールアドレス <span>必須</span><input id="culture-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="例：name@example.jp" disabled={status === "sending"} /></label>
      <div className="c-material-honeypot" aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}><label htmlFor="culture-website">ウェブサイト<input id="culture-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="c-material-consent" htmlFor="culture-consent"><input id="culture-consent" name="consent" type="checkbox" required disabled={status === "sending"} /><span>資料の送付・ご相談対応のための個人情報の利用に同意する</span></label>
      {error && <div className="c-form-error" role="alert" ref={resultRef} tabIndex={-1}>{error}</div>}
      <button className="c-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "送信しています…" : "資料をメールで受け取る"}<span aria-hidden="true">→</span></button>
    </form>}
    <a className="c-text-link" href="/contact">導入について相談する <span aria-hidden="true">↗</span></a>
  </div>;
}
