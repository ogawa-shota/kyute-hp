import type { Metadata } from "next";
import { PageHeader } from "@/components/lp/PageHeader";
import { OwnedMedia } from "@/components/lp/OwnedMedia";
import { Closing } from "@/components/lp/Closing";

export const metadata: Metadata = {
  title: "自社メディア事業｜KYUTE",
  description:
    "日本中の“働く”を密着取材する動画メディア『運動部のしごと』を運営。企業と求職者を、リアルなコンテンツで新しく出会わせます。",
};

export default function ServiceMediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICE / MEDIA"
        title="自社メディア事業"
        lead={
          '日本中の"働く"を密着取材する動画メディア『運動部のしごと』を運営。企業と求職者を、リアルなコンテンツで新しく出会わせます。'
        }
      />
      {/* 自社動画メディア紹介 */}
      <OwnedMedia />
      {/* ブランドクロージング＋CTA */}
      <Closing />
    </>
  );
}
