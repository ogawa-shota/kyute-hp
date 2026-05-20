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
  title: "KYUTE合同会社 | 密着動画で、内定承諾を設計する",
  description:
    "KYUTE合同会社は、密着動画制作と採用広報設計で候補者の腹落ちを支え、内定承諾につながる採用体験を設計します。",
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
