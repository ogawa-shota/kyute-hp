import type { Metadata } from "next";
import { RecruitYoutubePage } from "@/components/site/RecruitYoutubePage";
import { LpShell } from "../LpShell";

export const metadata: Metadata = {
  title: "採用YouTube運用代行｜認知を取って、心を掴んで、離さない｜KYUTE",
  description: "消費ではなく資産になる採用を。採用YouTubeの企画・撮影・編集・運用・分析まで一気通貫で支援します。",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LpShell><RecruitYoutubePage lp /></LpShell>;
}
