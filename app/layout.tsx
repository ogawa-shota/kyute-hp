import type { Metadata } from "next";
import { Archivo_Black, Barlow_Condensed, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_JP({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const latin = Barlow_Condensed({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const serif = Archivo_Black({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KYUTE合同会社 | 総合型選抜メディア「AOナビ」運営",
  description:
    "KYUTE合同会社は、総合型選抜メディア「AOナビ」を企画・開発・運営する会社です。大学情報、塾比較、合格体験記、出願ノウハウを届け、受験生の挑戦を支えます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${sans.variable} ${latin.variable} ${serif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
