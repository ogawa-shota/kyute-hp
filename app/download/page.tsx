import { pageMetadata } from "@/app/seo";
import { MaterialForm } from "@/components/site/MaterialForm";
import { PageIntro, Section } from "@/components/site/ui";

export const metadata = pageMetadata({
  path: "/download",
  title: "資料請求｜KYUTE",
  description: "採用動画制作・採用YouTube運用代行の資料をメールでお送りします。",
});

export default function DownloadPage() {
  return (
    <>
      <PageIntro
        eyebrow="DOWNLOAD"
        title="資料請求"
        lead="ご希望のサービスの資料を、メールでお送りします。"
        crumbs={[{ label: "トップ", href: "/" }, { label: "資料請求" }]}
      />
      <Section tone="soft">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-[24px] md:text-[28px]">採用動画制作</h2>
            <p className="mb-5 mt-2 text-[var(--ink-soft)]">考え方・制作事例・料金をまとめた資料です。</p>
            <MaterialForm endpoint="/api/material-request" service="採用動画制作" />
          </div>
          <div>
            <h2 className="text-[24px] md:text-[28px]">採用YouTube運用代行</h2>
            <p className="mb-5 mt-2 text-[var(--ink-soft)]">採用YouTubeの価値と支援範囲をまとめた資料です。</p>
            <MaterialForm endpoint="/api/culture-material" service="採用YouTube運用代行" />
          </div>
        </div>
      </Section>
    </>
  );
}
