import type { Metadata } from "next";
import { Hero } from "@/components/lp/Hero";
import { Youtube } from "@/components/lp/Youtube";
import { Services } from "@/components/lp/Services";
import { Funnel } from "@/components/lp/Funnel";
import { Closing } from "@/components/lp/Closing";
import {
  OG_DESCRIPTION,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "./seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "KYUTE",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "KYUTE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export default function Home() {
  return (
    <>
      {/* 成果の約束 */}
      <Hero />
      {/* なぜYouTubeなのか（消える広告から貯まる資産へ） */}
      <Youtube />
      {/* サービス一望（概要） */}
      <Services />
      {/* 効果の証明（採用ファネル図） */}
      <Funnel />
      {/* ブランドクロージング＋CTA */}
      <Closing />
    </>
  );
}
