import type { Metadata } from "next";
import { PageHeader } from "@/components/lp/PageHeader";
import { Challenges } from "@/components/lp/Challenges";
import { Cause } from "@/components/lp/Cause";
import { Shift } from "@/components/lp/Shift";
import { Solution } from "@/components/lp/Solution";
import { Funnel } from "@/components/lp/Funnel";
import { Youtube } from "@/components/lp/Youtube";
import { Flow } from "@/components/lp/Flow";
import { Closing } from "@/components/lp/Closing";

export const metadata: Metadata = {
  title: "YouTube運営代行事業｜KYUTE",
  description:
    "企業の採用広報を、YouTubeで“資産”に。企画・撮影・編集・運用・分析・改善まで一気通貫で支援。密着動画で応募・承諾・定着につながる採用広報を実現します。",
};

export default function ServiceYoutubePage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICE / YOUTUBE"
        title="YouTube運営代行事業"
        lead={
          '企業の採用広報を、YouTubeで"資産"に。企画・撮影・編集・運用・分析・改善まで、一気通貫で支援します。'
        }
      />
      {/* 課題 → 原因 → 転換 → 解決 → 証明 → なぜYouTube → 流れ */}
      <Challenges />
      <Cause />
      <Shift />
      <Solution />
      <Funnel />
      <Youtube />
      <Flow />
      <Closing />
    </>
  );
}
