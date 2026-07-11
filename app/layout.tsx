import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/lp/Header";
import { SiteFooter } from "@/components/lp/SiteFooter";
import { MobileCtaBar } from "@/components/lp/MobileCtaBar";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./seo";

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

const isPreview = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  robots: {
    index: !isPreview,
    follow: !isPreview,
    googleBot: {
      index: !isPreview,
      follow: !isPreview,
    },
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
