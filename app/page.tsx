import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OWNED_VIDEOS, SERVICES, VIEWS_NOTE, thumb } from "@/components/site/data";
import { Button, Container, Eyebrow, Faq, Heading, Pill, Section, VideoThumb } from "@/components/site/ui";
import { ColumnGrid } from "@/components/column/ColumnParts";
import { getColumns } from "@/lib/column";
import { OG_DESCRIPTION, SITE_DESCRIPTION, SITE_TITLE } from "./seo";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: SITE_TITLE, description: OG_DESCRIPTION, url: "/", images: ["/og.jpg"] },
};

const FAQ = [
  {
    q: "どのサービスから相談すればいいですか？",
    a: "決まっていなくて大丈夫です。無料相談で採用の状況を伺い、採用動画制作と採用YouTube運用代行のどちらが合うかをご提案します。",
  },
  {
    q: "費用はどのくらいかかりますか？",
    a: (
      <>
        採用動画制作は密着動画1本50万円（税別）から、採用YouTube運用代行は月8万円（税別）からです。初めての方向けに、密着動画1本を20万円（税別）でお試しいただける初回トライアルがあります。詳しくは
        <Link className="underline" href="/service/recruit-video#price">採用動画制作</Link>・
        <Link className="underline" href="/service/recruit-youtube#price">採用YouTube運用代行</Link>
        の料金をご覧ください。
      </>
    ),
  },
  {
    q: "採用動画と採用YouTube、どちらから始めるべきですか？",
    a: "まずは密着動画を1本つくり、候補者の反応を確かめてから、採用YouTubeで本数を積み上げる進め方をおすすめしています。",
  },
];

export default function Home() {
  const columns = getColumns().slice(0, 3);
  const [cafe, lab, ...rest] = OWNED_VIDEOS;
  return (
    <>
      {/* FV */}
      <section className="overflow-hidden bg-white pb-16 pt-12 md:pb-24 md:pt-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <Eyebrow>採用動画制作・採用YouTube運用代行</Eyebrow>
              <h1 className="text-[44px] leading-[1.25] md:text-[76px]">
                カルチャーを<br />体験させる、<br /><span className="marker">面白い採用動画</span>
              </h1>
              <p className="mt-6 text-[18px] leading-[1.9] text-[var(--ink-soft)] md:text-[20px]">
                人・仕事・カルチャーの魅力を、<br />最後まで見たくなる映像に。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" cta="top-fv-contact">無料で相談する →</Button>
                <Button href="/download" variant="outline" cta="top-fv-download">資料をダウンロード</Button>
              </div>
            </div>
            <div aria-hidden="true" className="relative h-[320px] md:h-[540px]">
              {OWNED_VIDEOS.map((v, i) => (
                <div
                  key={v.id}
                  className="absolute aspect-video w-[66%] overflow-hidden rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                  style={{ left: ["14%", "34%", "0%", "30%"][i], top: ["0%", "24%", "48%", "70%"][i], transform: `rotate(${[-6, -4, -8, -5][i]}deg)` }}
                >
                  <Image src={thumb(v.id)} alt="" fill priority={i < 2} sizes="(min-width: 1024px) 35vw, 66vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 課題から選ぶ */}
      <Section labelledBy="find">
        <Eyebrow>FIND YOUR SOLUTION</Eyebrow>
        <Heading id="find">採用の、どこで困っていますか。</Heading>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link key={s.id} href={s.href} className="group flex flex-col gap-4 rounded-3xl bg-[var(--bg-soft)] p-7 transition hover:bg-[var(--bg-tint)] md:p-9">
              <div className="flex flex-wrap gap-2">
                {s.pains.map((p) => (
                  <span key={p} className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-[15px]">{p}</span>
                ))}
              </div>
              <p className="text-[26px] font-extrabold md:text-[30px]">{s.name} <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></p>
              <p className="text-[var(--ink-soft)]">{s.lead}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* 制作事例 */}
      <Section tone="soft" labelledBy="works">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><Eyebrow>WORKS</Eyebrow><Heading id="works">制作事例</Heading></div>
          <Button href="/works" variant="outline" size="sm" cta="top-works-more">制作事例をもっと見る →</Button>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {[cafe, lab].map((v) => (
            <article key={v.id} className="flex flex-col gap-3">
              <VideoThumb video={v} />
              <Pill>自社メディア「運動部のシゴト。」</Pill>
              <h3 className="text-[19px] leading-[1.6] md:text-[22px]">{v.title}</h3>
              {v.views && <p className="font-bold">{v.views.label}<span className="ml-2 text-[15px] text-[var(--brand-ink)]">{v.views.note}</span></p>}
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.map((v) => (
            <article key={v.id} className="grid grid-cols-[160px_1fr] items-center gap-4 md:grid-cols-[220px_1fr]">
              <VideoThumb video={v} play={false} sizes="220px" />
              <h3 className="text-[16px] leading-[1.6] md:text-[18px]">{v.short}</h3>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[14px] text-[var(--ink-mute)]">{VIEWS_NOTE}</p>
      </Section>

      {/* コラム */}
      {columns.length > 0 && (
        <Section labelledBy="column">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><Eyebrow>COLUMN</Eyebrow><Heading id="column">採用広報のお役立ちコラム</Heading></div>
            <Button href="/column" variant="outline" size="sm" cta="top-column-more">一覧を見る →</Button>
          </div>
          <div className="mt-10"><ColumnGrid columns={columns} /></div>
        </Section>
      )}

      <Section tone={columns.length > 0 ? "soft" : "white"} labelledBy="faq">
        <Heading id="faq">よくある質問</Heading>
        <Faq items={FAQ} />
      </Section>
    </>
  );
}
