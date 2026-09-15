import type { Metadata } from "next";
import CultureLP from "./CultureLP";
import "./culture.css";
import "./culture-refinements.css";
import "./recruitment-hero.css";

const title = "採用動画制作・採用YouTube運用 | KYUTE";
const description = "「ここで働きたい」をつくる、KYUTEの採用動画制作。社員密着・インタビュー・カルチャー紹介を、企画・撮影・編集から採用YouTubeの運用まで支援します。";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  robots: { index: true, follow: true },
  alternates: { canonical: "https://kyute.jp/lp" },
  openGraph: { title, description, type: "website", locale: "ja_JP", siteName: "KYUTE", url: "https://kyute.jp/lp", images: [{ url: "/lp-assets/story-turn-scene-v11.webp", width: 1200, height: 675, alt: "KYUTE — 採用動画制作・採用YouTube運用" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/lp-assets/story-turn-scene-v11.webp"] },
};
export default function Page() { return <CultureLP />; }
