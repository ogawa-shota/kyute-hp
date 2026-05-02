import type { Metadata } from "next";
import { Bad_Script, Noto_Sans_JP, Rubik } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_JP({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const latin = Rubik({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
});

const script = Bad_Script({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "株式会社KYUTE | Keep You To Evolve ― 総合型選抜の伴走者",
  description:
    "KYUTE は、総合型選抜対策に特化した教育サービスを展開する会社です。伴走型個別指導塾と総合型選抜対策 AI の2軸で、受験生一人ひとりの挑戦を支えます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${sans.variable} ${latin.variable} ${script.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
