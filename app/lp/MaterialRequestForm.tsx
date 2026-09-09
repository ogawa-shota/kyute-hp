"use client";

import { useState, type FormEvent } from "react";

export default function MaterialRequestForm() {
  const [draftUrl, setDraftUrl] = useState("");
  const pending = false;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    if (values.get("website")) return;
    const body = [
      "採用密着動画制作サービスの資料を希望します。",
      "",
      `会社名：${String(values.get("company") || "").trim()}`,
      `お名前：${String(values.get("name") || "").trim()}`,
      `返信先：${String(values.get("email") || "").trim()}`,
      "",
      "制作内容・料金の資料をご案内ください。",
    ].join("\n");
    const url = `mailto:contact@kyute.jp?subject=${encodeURIComponent("採用密着動画制作サービスの資料請求")}&body=${encodeURIComponent(body)}`;
    setDraftUrl(url);
    window.location.href = url;
  }

  return (
    <form className="material-form" onSubmit={submit} aria-labelledby="material-form-title" aria-busy={pending}>
      <div>
        <h3 id="material-form-title">資料をメールで受け取る</h3>
        <p className="form-note">ご入力内容を記載したメールを作成します。送信後、担当者から制作内容・料金の資料をご案内します。</p>
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
      <p className="form-note">ボタンを押すとメールアプリが開きます。内容をご確認のうえ、送信してください。</p>
      {draftUrl && <div className="form-note" role="status">まだ資料請求は完了していません。メールアプリから送信してください。開かない場合は <a href={draftUrl}>もう一度メールを開く</a>、または contact@kyute.jp へご連絡ください。</div>}
      <button className="cta" type="submit" disabled={pending}>
        資料請求メールを作成する<span aria-hidden="true">→</span>
      </button>
      <noscript><p className="form-note">資料請求にはJavaScriptを有効にするか、<a href="mailto:contact@kyute.jp?subject=%E6%8E%A1%E7%94%A8%E5%AF%86%E7%9D%80%E5%8B%95%E7%94%BB%E3%81%AE%E8%B3%87%E6%96%99%E8%AB%8B%E6%B1%82">メールで会社名・お名前をお知らせください。</a></p></noscript>
    </form>
  );
}
