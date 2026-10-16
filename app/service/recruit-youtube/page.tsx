import { breadcrumbSchema, jsonLd, pageMetadata, serviceSchema } from "@/app/seo";
import { RecruitYoutubePage } from "@/components/site/RecruitYoutubePage";

export const metadata = pageMetadata({
  path: "/service/recruit-youtube",
  title: "採用YouTube運用代行｜認知を取って、心を掴んで、離さない｜KYUTE",
  description:
    "採用YouTubeの企画・撮影・編集・運用・分析まで一気通貫で支援します。消費ではなく資産になる採用を。料金は月8万円（税別）から。",
});

export default function Page() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([
      serviceSchema("/service/recruit-youtube", "採用YouTube運用代行", String(metadata.description)),
      breadcrumbSchema([{ name: "トップ", path: "/" }, { name: "サービス", path: "/service" }, { name: "採用YouTube運用代行", path: "/service/recruit-youtube" }]),
    ]) }} />
    <RecruitYoutubePage />
  </>;
}
