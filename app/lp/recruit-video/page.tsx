import { pageMetadata } from "@/app/seo";
import { RecruitVideoPage } from "@/components/site/RecruitVideoPage";
import { LpShell } from "../LpShell";

export const metadata = pageMetadata({
  path: "/lp/recruit-video",
  title: "面白く、心に残る採用動画｜初回トライアル20万円｜KYUTE",
  description: "人・仕事・カルチャーの魅力を、最後まで見たくなる映像に。初回トライアルは密着動画1本20万円（税別）、満足できなければ全額返金。",
  noindex: true,
});

export default function Page() {
  return <LpShell><RecruitVideoPage lp /></LpShell>;
}
