import type { Metadata } from "next";
import { CHANNEL_URL, OWNED_VIDEOS, VIEWS_NOTE } from "@/components/site/data";
import { Button, Eyebrow, Heading, Lead, PageIntro, Pill, Section, VideoThumb } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "制作事例・運動部のシゴト。｜KYUTE",
  description: "KYUTEが制作した採用動画と、自社メディア「運動部のシゴト。」の1日密着動画をご紹介します。",
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return (
    <>
      <PageIntro
        eyebrow="WORKS"
        title="制作事例"
        lead="KYUTEが制作した、面白く、心に残る動画をご紹介します。"
        crumbs={[{ label: "トップ", href: "/" }, { label: "制作事例" }]}
      />
      <Section tone="soft" id="undo-job" labelledBy="undo-job-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>OWNED MEDIA</Eyebrow>
            <Heading id="undo-job-h">運動部のシゴト。</Heading>
            <Lead>元運動部の“今”を追う、1日密着ドキュメンタリー。KYUTEが企画・撮影・編集・運用まで行っている自社メディアです。</Lead>
            <div className="mt-8"><Button href={CHANNEL_URL} variant="outline" cta="works-channel">YouTubeチャンネルを見る ↗</Button></div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {OWNED_VIDEOS.map((v) => (
              <article key={v.id} className="flex flex-col gap-3">
                <VideoThumb video={v} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw" />
                <div className="flex flex-wrap gap-2">{v.tags.map((t) => <Pill key={t} tone="outline">#{t}</Pill>)}</div>
                <h3 className="text-[17px] leading-[1.6]">{v.title}</h3>
                {v.views && <p className="text-[15px] font-bold">{v.views.label}<span className="ml-2 text-[var(--brand-ink)]">{v.views.note}</span></p>}
              </article>
            ))}
          </div>
        </div>
        <p className="mt-8 text-[14px] text-[var(--ink-mute)]">{VIEWS_NOTE}</p>
      </Section>
      <Section className="text-center">
        <Heading>貴社の魅力も、<br className="md:hidden" />面白く、心に残る動画に。</Heading>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/service/recruit-video" cta="works-service">採用動画制作を見る →</Button>
          <Button href="/contact" variant="outline" cta="works-contact">無料で相談する</Button>
        </div>
      </Section>
    </>
  );
}
