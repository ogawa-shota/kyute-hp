import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/lp/Header";
import { SiteFooter } from "@/components/lp/SiteFooter";
import { MobileCtaBar } from "@/components/lp/MobileCtaBar";

// 和文: 端正で知的な人文系ゴシック。太字でも圧迫感が少なく、BtoB採用サイトに合う。
const sans = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// 欧文・数字: 中立で図形的に美しく、和文と自然に併記できる。ラベル/ロゴ/数字に使用。
const latin = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const SITE_URL = "https://kyute.jp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'KYUTE｜密着動画で"伝わる会社"をつくる採用広報',
  description:
    "採用成果は「伝わる会社」から生まれる。密着動画で企業のリアルを届け、応募・承諾・定着につながる採用広報を支援します。無料相談受付中。",
  openGraph: {
    title: 'KYUTE｜密着動画で"伝わる会社"をつくる採用広報',
    description:
      "採用成果は「伝わる会社」から生まれる。密着動画で企業のリアルを届け、応募・承諾・定着につながる採用広報を支援します。無料相談受付中。",
    url: SITE_URL,
    siteName: "KYUTE",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "KYUTE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: 'KYUTE｜密着動画で"伝わる会社"をつくる採用広報',
    description:
      "採用成果は「伝わる会社」から生まれる。密着動画で企業のリアルを届け、応募・承諾・定着につながる採用広報を支援します。無料相談受付中。",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${sans.variable} ${latin.variable} font-sans antialiased`}
      >
        <Header />
        <main>{children}</main>
        <SiteFooter />
        <MobileCtaBar />
      </body>
    </html>
  );
}
