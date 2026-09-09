"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export default function MaterialRequestForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");
  const locked = useRef(false);
  const request = useRef<AbortController | null>(null);
  const requestId = useRef("");
  const result = useRef<HTMLDivElement>(null);

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (sentTo || error) result.current?.focus();
  }, [sentTo, error]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const payload = {
      company: String(values.get("company") || "").trim(),
      name: String(values.get("name") || "").trim(),
      email: String(values.get("email") || "").trim(),
      consent: values.get("consent") === "on",
      website: String(values.get("website") || ""),
      requestId: requestId.current || crypto.randomUUID(),
    };
    requestId.current = payload.requestId;
    locked.current = true;
    setPending(true);
    setError("");
    const controller = new AbortController();
    request.current = controller;
    try {
      const response = await fetch("/api/material-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data: { ok?: boolean; message?: string } = await response.json();
      if (!response.ok || data.ok !== true) {
        setError(data.message || "送信できませんでした。時間をおいて再度お試しください。");
        return;
      }
      setSentTo(payload.email);
      document.dispatchEvent(new CustomEvent("kyute-lp-event", {
        detail: { name: "material_request_success", variant: "proof" },
      }));
    } catch {
      if (!controller.signal.aborted) setError("通信を確認して、もう一度お試しください。");
    } finally {
      locked.current = false;
      if (!controller.signal.aborted) setPending(false);
    }
  }

  if (sentTo) {
    return (
      <div className="form-success" role="status" ref={result} tabIndex={-1}>
        <h3>メールを送信しました。</h3>
        <p>{sentTo} に、資料PDFをお送りしました。</p>
        <p className="form-note">届かない場合は迷惑メールフォルダをご確認ください。見当たらない場合は <a href="mailto:contact@kyute.jp">contact@kyute.jp</a> までご連絡ください。</p>
      </div>
    );
  }

  return (
    <form className="material-form" onSubmit={submit} aria-labelledby="material-form-title" aria-busy={pending}>
      <div>
        <h3 id="material-form-title">資料をメールで受け取る</h3>
        <p className="form-note">会社名・お名前・メールアドレスをご入力ください。資料PDFを自動送信します。</p>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="material-company">会社名 <span>必須</span></label>
          <input id="material-company" name="company" autoComplete="organization" maxLength={120} placeholder="株式会社〇〇" required disabled={pending} />
        </div>
        <div className="form-field">
          <label htmlFor="material-name">お名前 <span>必須</span></label>
          <input id="material-name" name="name" autoComplete="name" maxLength={80} placeholder="山田 太郎" required disabled={pending} />
        </div>
        <div className="form-field">
          <label htmlFor="material-email">メールアドレス <span>必須</span></label>
          <input id="material-email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} placeholder="name@company.co.jp" required disabled={pending} />
        </div>
      </div>
      <div className="honey-field" aria-hidden="true">
        <label htmlFor="material-website">この項目は入力しないでください</label>
        <input id="material-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="form-consent">
        <input type="checkbox" name="consent" required disabled={pending} />
        <span>資料の送付・ご相談対応のための個人情報の利用に同意する</span>
      </label>
      {error && <div className="form-error" role="alert" ref={result} tabIndex={-1}>{error}</div>}
      <button className="cta" type="submit" disabled={pending}>
        {pending ? "送信しています…" : "資料をメールで受け取る"}<span aria-hidden="true">→</span>
      </button>
      <noscript><p className="form-note">資料請求にはJavaScriptを有効にするか、<a href="mailto:contact@kyute.jp?subject=%E6%8E%A1%E7%94%A8%E5%AF%86%E7%9D%80%E5%8B%95%E7%94%BB%E3%81%AE%E8%B3%87%E6%96%99%E8%AB%8B%E6%B1%82">メールで会社名・お名前をお知らせください。</a></p></noscript>
    </form>
  );
}
