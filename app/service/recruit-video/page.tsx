import { breadcrumbSchema, jsonLd, pageMetadata, serviceSchema } from "@/app/seo";
import { RecruitVideoPage } from "@/components/site/RecruitVideoPage";

export const metadata = pageMetadata({
  path: "/service/recruit-video",
  title: "採用動画制作｜面白く、心に残る採用動画｜KYUTE",
  description:
    "人・仕事・カルチャーの魅力を、最後まで見たくなる映像に。密着動画を軸にした、KYUTEの採用動画制作サービスです。初回トライアルは密着動画1本20万円（税別）、満足できなければ全額返金。",
});

export default function Page() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([
      serviceSchema("/service/recruit-video", "採用動画制作", String(metadata.description)),
      breadcrumbSchema([{ name: "トップ", path: "/" }, { name: "サービス", path: "/service" }, { name: "採用動画制作", path: "/service/recruit-video" }]),
    ]) }} />
    <RecruitVideoPage />
  </>;
}
