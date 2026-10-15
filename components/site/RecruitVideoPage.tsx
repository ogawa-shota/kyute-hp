import Image from "next/image";
import Link from "next/link";
import { OWNED_VIDEOS, VIDEO_PRICES, VIEWS_NOTE, thumb } from "./data";
import { NoticeCloud } from "./diagrams";
import { MaterialForm } from "./MaterialForm";
import { Breadcrumb, Button, Container, Eyebrow, Faq, Heading, Lead, Pill, Section, VideoThumb } from "./ui";

const FAQ = [
  {
    q: "費用はどのくらいかかりますか？",
    a: "密着動画は1本50万円（税別）、オフィスツアー・対談／インタビュー・その他の採用向け動画は1本30万円（税別）です。初めての方は、密着動画1本を20万円（税別）でお試しいただける初回トライアルがあります。",
  },
  {
    q: "初回トライアルで満足できなかった場合は？",
    a: "初回トライアルの密着動画にご満足いただけなかった場合は、全額返金します。条件の詳細はご契約前に書面でご案内します。",
  },
  { q: "修正は何回までできますか？", a: "密着動画は2回、そのほかの動画は1回までです。" },
  { q: "交通費や追加撮影の費用は？", a: "追加撮影・交通宿泊などは別途お見積もりです。" },
  {
    q: "採用動画と採用YouTube、どちらから始めるべきですか？",
    a: (
      <>
        まずは密着動画を1本つくり、候補者の反応を確かめてから、
        <Link className="underline" href="/service/recruit-youtube">採用YouTube運用代行</Link>
        で本数を積み上げる進め方をおすすめしています。
      </>
    ),
  },
];

export function RecruitVideoPage({ lp = false }: { lp?: boolean }) {
  const [cafe, lab, ...rest] = OWNED_VIDEOS;
  const { main, others, trial } = VIDEO_PRICES;
  return (
    <>
      {/* FV */}
      <section className="overflow-hidden bg-white pb-16 pt-10 md:pb-24 md:pt-14">
        <Container>
          {!lp && <Breadcrumb items={[{ label: "トップ", href: "/" }, { label: "サービス", href: "/service" }, { label: "採用動画制作" }]} />}
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Eyebrow>KYUTEの採用動画制作</Eyebrow>
              <h1 className="text-[64px] leading-[1.1] md:text-[104px]">面白く、</h1>
              <p className="mt-4 text-[28px] font-extrabold leading-[1.45] md:text-[44px]">
                企業の魅力を伝える、<br /><span className="marker">採用動画制作サービス</span>
              </p>
              <Lead>人・仕事・カルチャーの魅力を、最後まで見たくなる映像に。</Lead>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#download" cta="video-fv-download">採用動画の資料をもらう →</Button>
                <Button href="/contact" variant="outline" cta="video-fv-contact">無料で相談する</Button>
              </div>
            </div>
            <div aria-hidden="true" className="relative h-[300px] md:h-[460px]">
              {[cafe, lab, rest[0]].map((v, i) => (
                <div
                  key={v.id}
                  className="absolute aspect-video w-[72%] overflow-hidden rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                  style={{ left: ["18%", "0%", "28%"][i], top: ["0%", "34%", "58%"][i], transform: `rotate(${[-5, -8, -3][i]}deg)` }}
                >
                  <Image src={thumb(v.id)} alt="" fill priority={i === 0} sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          {lp && <TrialBand className="mt-12" />}
        </Container>
      </section>

      {/* 情報過多 */}
      <Section labelledBy="why">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>WHY</Eyebrow>
            <Heading id="why" className="md:text-[52px]">現代人は情報過多で、<br />脳の可処分スペースがない。</Heading>
            <Lead>相手の脳に負担をかけず、<br className="hidden md:block" />相手の心を掴むコンテンツが必要です。</Lead>
          </div>
          <NoticeCloud />
        </div>
      </Section>

      {/* 必要なのは */}
      <Section tone="soft" className="text-center">
        <Eyebrow>WHAT YOU NEED</Eyebrow>
        <p className="text-[34px] font-extrabold leading-[1.4] md:text-[64px]">
          必要なのは、<br /><span className="marker">心に残る採用広報</span>。
        </p>
      </Section>

      {/* 事例 */}
      <Section labelledBy="works">
        <Eyebrow>WORKS</Eyebrow>
        <Heading id="works">KYUTEは、面白く、<br />心に残る採用動画を制作します。</Heading>
        <Lead>人・仕事・カルチャーの魅力を、最後まで見たくなる映像に。</Lead>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {[cafe, lab].map((v) => (
            <article key={v.id} className="flex flex-col gap-3">
              <VideoThumb video={v} />
              <Pill>自社メディア「運動部のシゴト。」</Pill>
              <h3 className="text-[19px] leading-[1.6] md:text-[22px]">{v.title}</h3>
              {v.views && (
                <p className="flex items-baseline gap-3">
                  <span className="num text-[40px]">{v.views.label.replace("万回再生", "")}</span>
                  <span className="font-bold">万回再生</span>
                  <span className="text-[15px] font-bold text-[var(--brand-ink)]">{v.views.note}</span>
                </p>
              )}
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
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="#download" cta="video-works-download">採用動画の資料をもらう →</Button>
          {!lp && <Button href="/works" variant="outline" cta="video-works-more">制作事例をもっと見る</Button>}
        </div>
      </Section>

      {/* 料金 */}
      <Section tone="soft" id="price" labelledBy="price-h">
        <Eyebrow>PRICE</Eyebrow>
        <Heading id="price-h">料金体系</Heading>
        <Lead>密着動画を軸に、伝えたいテーマに合わせて選べます。</Lead>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl bg-[var(--ink-strong)] p-8 text-white md:p-11">
            <Pill>メイン</Pill>
            <h3 className="mt-4 text-[26px] md:text-[32px]">{main.name}</h3>
            <p className="mt-4 flex items-baseline gap-2"><span className="num text-[80px] leading-none md:text-[104px]">{main.price}</span><span className="text-xl font-bold">万円／本</span></p>
            <ul className="mt-6 space-y-1 text-white/80">{main.specs.map((s) => <li key={s}>・{s}</li>)}</ul>
          </div>
          <div className="flex flex-col gap-4">
            {others.map((o) => (
              <div key={o.name} className="flex flex-col items-start gap-3 rounded-3xl border border-[var(--line)] bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div><h3 className="text-[20px]">{o.name}</h3><p className="mt-1 text-[14px] text-[var(--ink-soft)]">{o.spec}</p></div>
                <p className="flex flex-none items-baseline gap-1"><span className="num text-[48px] leading-none">{o.price}</span><span className="text-[15px] font-bold">万円／本</span></p>
              </div>
            ))}
          </div>
        </div>
        <TrialBand className="mt-5" trial={trial} />
        <p className="mt-4 text-[14px] text-[var(--ink-mute)]">価格はすべて税別。追加撮影・交通宿泊などは別見積。</p>
      </Section>

      {/* 活用 */}
      <Section labelledBy="use">
        <Eyebrow>HOW TO USE</Eyebrow>
        <Heading id="use">1本つくれば、採用のあらゆる場面で使える。</Heading>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["01", "採用YouTubeで出会う", "検索・おすすめから、まだ貴社を知らない人にも届く。"],
            ["02", "採用サイトで深める", "職種紹介・社員インタビューに動画を添える。"],
            ["03", "選考中に届ける", "スカウト・面接案内に添えて、志望度を高める。"],
          ].map(([n, t, d]) => (
            <div key={n} className="rounded-3xl bg-[var(--bg-soft)] p-7">
              <p className="num text-[var(--brand-ink)]">{n}</p>
              <h3 className="mt-2 text-[21px]">{t}</h3>
              <p className="mt-2 text-[var(--ink-soft)]">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="soft" labelledBy="faq">
        <Heading id="faq">よくある質問</Heading>
        <Faq items={FAQ} />
      </Section>

      <DownloadSection />

      {!lp && (
        <Section>
          <div className="grid gap-5 md:grid-cols-2">
            <Link href="/service/recruit-youtube" className="rounded-3xl bg-[var(--bg-soft)] p-7 hover:bg-[var(--bg-tint)]">
              <p className="text-[14px] text-[var(--ink-mute)]">あわせて検討されています</p>
              <p className="mt-2 text-[22px] font-extrabold">採用YouTube運用代行 →</p>
              <p className="mt-1 text-[15px] text-[var(--ink-soft)]">志望度向上プラン 月8万円（税別）から</p>
            </Link>
            <Link href="/column/category/recruit-video" className="rounded-3xl bg-[var(--bg-soft)] p-7 hover:bg-[var(--bg-tint)]">
              <p className="text-[14px] text-[var(--ink-mute)]">お役立ちコラム</p>
              <p className="mt-2 text-[22px] font-extrabold">採用動画のコラムを読む →</p>
            </Link>
          </div>
        </Section>
      )}
    </>
  );
}

function TrialBand({ className = "", trial = VIDEO_PRICES.trial }: { className?: string; trial?: typeof VIDEO_PRICES.trial }) {
  return (
    <div className={`flex flex-col gap-4 rounded-3xl bg-[var(--brand)] p-6 md:flex-row md:items-center md:justify-between md:px-10 ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        <Pill tone="dark">初回トライアル</Pill>
        <p className="text-[22px] font-extrabold">{trial.name}</p>
        <Pill tone="outline">満足できなければ全額返金</Pill>
      </div>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="w-full text-lg font-bold sm:w-auto">通常 {trial.regular}万円 →</span>
        <span className="num text-[64px] leading-none">{trial.price}</span>
        <span className="text-lg font-bold">万円（税別）</span>
      </p>
    </div>
  );
}

function DownloadSection() {
  return (
    <Section tone="dark" id="download" labelledBy="download-h">
      <div className="grid gap-10 lg:grid-cols-[1fr_520px]">
        <div>
          <Eyebrow onDark>DOWNLOAD</Eyebrow>
          <Heading id="download-h">採用動画制作の<br />資料を受け取る</Heading>
          <Lead onDark>考え方・制作事例・料金をまとめた資料を、メールでお送りします。</Lead>
          <div className="mt-8"><Button href="/contact" variant="outline" onDark cta="video-download-contact">無料で相談する →</Button></div>
        </div>
        <MaterialForm endpoint="/api/material-request" service="採用動画制作" onDark />
      </div>
    </Section>
  );
}
