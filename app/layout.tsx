import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const display = Shippori_Mincho({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ステラアカデミー | 総合型選抜専門塾（デモ）",
  description:
    "総合型選抜（旧AO入試）に特化。志望理由書・小論文・面接まで伴走する学習塾のデモサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${display.variable} ${sans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
