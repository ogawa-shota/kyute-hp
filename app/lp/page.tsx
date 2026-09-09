import type { Metadata } from "next";
import CultureLP from "./CultureLP";
import "./culture.css";

const title = "カルチャー訴求特化の、採用YouTube運用代行 | KYUTE";
const description = "求人票では伝わらない、人・仕事・会社の空気まで。KYUTEが採用YouTubeの企画・撮影・編集・投稿・改善を一気通貫で支援。制作映像とサービス資料をご覧いただけます。";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  robots: { index: true, follow: true },
  alternates: { canonical: "https://kyute.jp/lp" },
  openGraph: { title, description, type: "website", locale: "ja_JP", siteName: "KYUTE", url: "https://kyute.jp/lp", images: [{ url: "/culture-assets/og.jpg", width: 1200, height: 675, alt: "KYUTE — カルチャー訴求特化の、採用YouTube運用代行" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/culture-assets/og.jpg"] },
};
export default function Page() { return <CultureLP />; }
