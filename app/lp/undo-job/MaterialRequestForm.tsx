"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export default function MaterialRequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);
  const activeRequest = useRef<AbortController | null>(null);

  useEffect(() => () => activeRequest.current?.abort(), []);
  useEffect(() => {
    if (status === "success" || error) resultRef.current?.focus();
  }, [status, error]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || status === "success") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = {
      company: String(data.get("company") || "").trim(),
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim().toLowerCase(),
      website: String(data.get("website") || ""),
      consent: data.get("consent") === "on",
    };
    const fingerprint = JSON.stringify(fields);
    if (!attempt.current || attempt.current.fingerprint !== fingerprint) {
      attempt.current = { fingerprint, id: crypto.randomUUID() };
    }
    pending.current = true;
    setStatus("sending");
    setError("");
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = setTimeout(() => controller.abort("timeout"), 60_000);
    try {
      const response = await fetch("/api/undo-job-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, requestId: attempt.current.id }),
        signal: controller.signal,
      });
      const result: { ok?: boolean; message?: string } = await response.json();
      if (controller.signal.aborted) throw new Error("request-aborted");
      if (!response.ok || result.ok !== true) {
        setError(typeof result.message === "string" ? result.message : "送信できませんでした。時間をおいて再度お試しください。");
        setStatus("idle");
        return;
      }
      setSentTo(fields.email);
      form.reset();
      setStatus("success");
    } catch {
      if (!controller.signal.aborted || controller.signal.reason === "timeout") {
        setError("送信を確認できませんでした。入力内容を変えずに、時間をおいて再度お試しください。");
        setStatus("idle");
      }
    } finally {
      clearTimeout(timeout);
      pending.current = false;
      if (activeRequest.current === controller) activeRequest.current = null;
    }
  }

  return <div className="uj-material-form">
    <h3 id="uj-material-title">サービス資料をメールで受け取る</h3>
    <p className="uj-form-intro">会社名・お名前・メールアドレスをご入力ください。<br />「運動部のシゴト。」の資料PDFをメールでお送りします。</p>
    {status === "success" ? <div className="uj-form-success" role="status" aria-live="polite" ref={resultRef} tabIndex={-1}>
      <p><strong>メールを送信しました。</strong></p>
      <p>{sentTo} に、資料PDFをお送りしました。</p>
      <p>届かない場合は迷惑メールフォルダをご確認ください。見当たらない場合は <a href="mailto:contact@kyute.jp">contact@kyute.jp</a> までご連絡ください。</p>
    </div> : <form onSubmit={submit} aria-labelledby="uj-material-title" aria-busy={status === "sending"}>
      <div className="uj-form-grid">
        <div className="uj-form-field"><label htmlFor="uj-material-company">会社名 <span>必須</span></label><input id="uj-material-company" name="company" autoComplete="organization" required maxLength={120} placeholder="例：株式会社〇〇" disabled={status === "sending"} /></div>
        <div className="uj-form-field"><label htmlFor="uj-material-name">お名前 <span>必須</span></label><input id="uj-material-name" name="name" autoComplete="name" required maxLength={80} placeholder="例：山田 太郎" disabled={status === "sending"} /></div>
        <div className="uj-form-field"><label htmlFor="uj-material-email">メールアドレス <span>必須</span></label><input id="uj-material-email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} placeholder="例：name@company.co.jp" disabled={status === "sending"} /></div>
      </div>
      <div className="uj-form-honeypot" aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}><label htmlFor="uj-material-website">ウェブサイト<input id="uj-material-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="uj-form-consent" htmlFor="uj-material-consent"><input id="uj-material-consent" name="consent" type="checkbox" required disabled={status === "sending"} /><span>資料の送付・ご相談対応のための個人情報の利用に同意する</span></label>
      {error && <div className="uj-form-error" role="alert" ref={resultRef} tabIndex={-1}>{error}</div>}
      <button className="uj-btn uj-btn-gold" type="submit" disabled={status === "sending"}>{status === "sending" ? "送信しています…" : "資料をメールで受け取る"}<span aria-hidden="true">→</span></button>
      <noscript><p className="uj-form-note">資料請求にはJavaScriptを有効にするか、<a href="mailto:contact@kyute.jp?subject=%E9%81%8B%E5%8B%95%E9%83%A8%E3%81%AE%E3%82%B7%E3%82%B4%E3%83%88%E3%80%82%E8%B3%87%E6%96%99%E8%AB%8B%E6%B1%82">メールで会社名・お名前をお知らせください。</a></p></noscript>
    </form>}
  </div>;
}
