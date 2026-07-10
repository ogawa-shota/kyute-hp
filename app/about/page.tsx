import type { Metadata } from "next";
import { PageHeader } from "@/components/lp/PageHeader";
import { Shift } from "@/components/lp/Shift";
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
        title="採用は「どれだけ伝わるか」が全て。"
        lead="私たちが大切にしている価値観と、会社概要をご紹介します。"
      />
      {/* 価値観の提示（S4） */}
      <Shift />
      {/* 会社概要 */}
      <CompanyInfo />
      {/* ブランドクロージング */}
      <Closing />
    </>
  );
}
