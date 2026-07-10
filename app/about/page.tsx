import type { Metadata } from "next";
import { PageHeader } from "@/components/lp/PageHeader";
import { Shift } from "@/components/lp/Shift";
import { OwnedMedia } from "@/components/lp/OwnedMedia";
import { CompanyInfo } from "@/components/lp/CompanyInfo";
import { Closing } from "@/components/lp/Closing";

export const metadata: Metadata = {
  title: "ABOUT US｜KYUTE",
  description:
    "KYUTEは、企業のリアルを届けることで、応募・承諾・定着につながる採用を実現します。私たちの価値観と会社概要をご紹介します。",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT US"
        title="採用成果は、「伝わる会社」から生まれる。"
        lead="私たちが大切にしている価値観と、事業についてご紹介します。"
      />
      {/* 価値観の提示（S4） */}
      <Shift />
      {/* 自社動画メディア */}
      <OwnedMedia />
      {/* 会社概要 */}
      <CompanyInfo />
      {/* ブランドクロージング */}
      <Closing />
    </>
  );
}
