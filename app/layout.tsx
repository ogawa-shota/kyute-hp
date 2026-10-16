import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Inter, LINE_Seed_JP } from "next/font/google";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { pageRobots, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./seo";

// 和文: 端正で知的な人文系ゴシック。太字でも圧迫感が少なく、BtoB採用サイトに合う。
const sans = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

// 欧文・数字: 中立で図形的に美しく、和文と自然に併記できる。ラベル/ロゴ/数字に使用。
const latin = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

// コーポレートサイト（/lp 以外）の書体。営業資料（Figma Slides）と同じ LINE Seed JP。
const kyute = LINE_Seed_JP({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-kyute",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  robots: pageRobots(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${sans.variable} ${latin.variable} ${kyute.variable} font-sans antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
        <SiteAnalytics />
      </body>
    </html>
  );
}
