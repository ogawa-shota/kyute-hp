import type { Metadata } from "next";
import { PageHeader } from "@/components/lp/PageHeader";
import { Services } from "@/components/lp/Services";
import { Closing } from "@/components/lp/Closing";

export const metadata: Metadata = {
  title: "SERVICE｜KYUTE",
  description:
    "KYUTEの2つの事業。採用広報を支援するYouTube運営代行事業と、“働くリアル”を届ける自社メディア事業をご紹介します。",
};

export default function ServicePage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICE"
        title="サービス"
        lead={
          '密着動画で"働くリアル"を届け、採用成果につなげる2つの事業をご紹介します。'
        }
      />
      {/* 2事業の一覧 → 各詳細ページへ */}
      <Services />
      <Closing />
    </>
  );
}
