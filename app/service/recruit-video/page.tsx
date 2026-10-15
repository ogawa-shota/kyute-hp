import type { Metadata } from "next";
import { RecruitVideoPage } from "@/components/site/RecruitVideoPage";

export const metadata: Metadata = {
  title: "採用動画制作｜面白く、心に残る採用動画｜KYUTE",
  description:
    "人・仕事・カルチャーの魅力を、最後まで見たくなる映像に。密着動画を軸にした、KYUTEの採用動画制作サービスです。初回トライアルは密着動画1本20万円（税別）、満足できなければ全額返金。",
  alternates: { canonical: "/service/recruit-video" },
};

export default function Page() {
  return <RecruitVideoPage />;
}
