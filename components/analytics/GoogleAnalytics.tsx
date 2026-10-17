"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type AnalyticsConsent, googleAnalyticsAvailable, initializeGoogleAnalytics,
  readAnalyticsConsent, setAnalyticsConsent, stopGoogleAnalytics, subscribeAnalyticsConsent,
} from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const serverConsent = () => null;
const serverAvailable = () => false;
const getAvailable = () => googleAnalyticsAvailable(measurementId);

function useAnalyticsChoice() {
  const choice = useSyncExternalStore(subscribeAnalyticsConsent, readAnalyticsConsent, serverConsent);
  const available = useSyncExternalStore(subscribeAnalyticsConsent, getAvailable, serverAvailable);
  return { choice, available };
}

function ChoiceButtons({ onChoose }: { onChoose: (choice: Exclude<AnalyticsConsent, null>) => void }) {
  const style = "min-h-12 flex-1 rounded-full border-2 border-[#1d1f24] bg-white px-5 py-2 text-[17px] font-bold text-[#1d1f24] transition-colors hover:bg-[#f4f3ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d1f24]";
  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" className={style} onClick={() => onChoose("granted")}>許可する</button>
      <button type="button" className={style} onClick={() => onChoose("denied")}>許可しない</button>
    </div>
  );
}

const STORAGE_ERROR = "設定を保存できませんでした。このタブではGoogle Analyticsを停止しています。ブラウザーの保存設定をご確認ください。";

/** One shared owner for tag lifecycle; the panel never blocks browsing. */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const { choice, available } = useAnalyticsChoice();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!googleAnalyticsAvailable(measurementId)) return;
    // Hydration initially uses the server's null snapshot. Read actual storage
    // here so a returning visitor's existing GA cookies are not deleted first.
    if (readAnalyticsConsent() === "granted") initializeGoogleAnalytics(measurementId, pathname);
    else stopGoogleAnalytics(measurementId);
  }, [pathname, choice]);

  if (!available || choice !== null || pathname === "/analytics") return null;
  return (
    <aside
      aria-labelledby="analytics-choice-title"
      className={`fixed inset-x-3 z-[45] mx-auto max-h-[60dvh] max-w-[640px] overflow-y-auto rounded-2xl border border-[#d6d5d0] bg-white p-5 font-[family-name:var(--font-kyute)] text-[17px] leading-[1.7] text-[#1d1f24] shadow-lg md:left-auto md:right-5 md:mx-0 md:p-6 xl:bottom-5 ${pathname.startsWith("/lp") ? "bottom-24" : "bottom-20"}`}
    >
      <h2 id="analytics-choice-title" className="text-[19px] font-extrabold">アクセス解析の設定</h2>
      <p className="mt-2">サイト改善のため、Google Analyticsで閲覧や資料請求の利用状況を集計します。許可しなくてもサイトをご利用いただけます。</p>
      <Link href="/analytics" className="my-3 inline-block underline underline-offset-4">解析の詳細・設定変更</Link>
      <ChoiceButtons onChoose={(next) => setError(!setAnalyticsConsent(next))} />
      {error && <p role="alert" className="mt-3">{STORAGE_ERROR}</p>}
    </aside>
  );
}

/** The footer page lets a visitor grant or withdraw the same browser preference. */
export function AnalyticsSettings() {
  const { choice, available } = useAnalyticsChoice();
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false);
  if (!available) return <p className="text-[17px] leading-[1.9]">この環境ではGoogle Analyticsの計測は有効になっていません。</p>;

  const choose = (next: Exclude<AnalyticsConsent, null>) => {
    const success = setAnalyticsConsent(next);
    setError(!success);
    setSaved(success);
  };
  return (
    <div>
      <p className="mb-5 text-[17px] leading-[1.9]" aria-live="polite">
        現在の設定：<strong>{choice === "granted" ? "許可する" : choice === "denied" ? "許可しない" : "未選択（計測は停止中）"}</strong>
      </p>
      <div className="max-w-md"><ChoiceButtons onChoose={choose} /></div>
      {error && <p role="alert" className="mt-4 text-[17px]">{STORAGE_ERROR}</p>}
      {saved && !error && <p role="status" className="mt-4 text-[17px]">設定を保存しました。</p>}
    </div>
  );
}
