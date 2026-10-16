import Image from "next/image";
import Link from "next/link";
import { FUNNEL, OWNED_VIDEOS, YOUTUBE_PLANS, thumb } from "./data";
import { AnswerCards, AssetCompare, HeartCurve, MoneyCycle } from "./diagrams";
import { MaterialForm } from "./MaterialForm";
import { Breadcrumb, Button, Container, Eyebrow, Faq, Heading, Lead, Section, VideoThumb } from "./ui";

const FAQ = [
  {
    q: "料金には何が含まれますか？",
    a: "企画・撮影・編集・運用・分析まで、採用YouTubeを一気通貫で支援します。本数・形式はプランごとに異なり、契約期間は個別にご提案します。金額はすべて税別・月額です。",
  },
  {
    q: "再生数や応募数は保証されますか？",
    a: "再生数や応募数などの成果を保証するものではありません。貴社の採用課題に合わせて、目指す状態と強化する段階を決めてから運用します。",
  },
  {
    q: "採用動画と採用YouTube、どちらから始めるべきですか？",
    a: (
      <>
        まずは<Link className="underline" href="/service/recruit-video">密着動画を1本</Link>
        つくり、候補者の反応を確かめてから、採用YouTubeで本数を積み上げる進め方をおすすめしています。
      </>
    ),
  },
];

export function RecruitYoutubePage({ lp = false }: { lp?: boolean }) {
  return (
    <>
      {/* FV */}
      <section className="bg-white pb-16 pt-10 md:pb-24 md:pt-14">
        <Container>
          {!lp && <Breadcrumb items={[{ label: "トップ", href: "/" }, { label: "サービス", href: "/service" }, { label: "採用YouTube運用代行" }]} />}
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Eyebrow>KYUTEの採用YouTube運用代行</Eyebrow>
              <h1 className="text-[44px] leading-[1.25] md:text-[72px]">
                認知を取って、<br />心を掴んで、<br /><span className="marker">離さない。</span>
              </h1>
              <Lead>消費ではなく、資産になる採用を。<br />企画・撮影・編集・運用・分析まで、採用YouTubeを一気通貫で支援します。</Lead>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#download" cta="youtube-fv-download">採用YouTubeの資料をもらう →</Button>
                <Button href="/contact" variant="outline" cta="youtube-fv-contact">無料で相談する</Button>
              </div>
            </div>
            <div aria-hidden="true" className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-full bg-[var(--ink-strong)]" />
                <div><p className="font-bold">貴社 採用チャンネル</p><p className="text-[13px] text-[var(--ink-mute)]">動画が積み上がるほど、会社を知る入口が増える</p></div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[...OWNED_VIDEOS, ...OWNED_VIDEOS].slice(0, 6).map((v, i) => (
                  <div key={i}>
                    <span className="relative block aspect-video overflow-hidden rounded-lg">
                      <Image src={thumb(v.id)} alt="" fill sizes="160px" className="object-cover" priority={i < 2} />
                    </span>
                    <span className="mt-2 block h-2 w-4/5 rounded bg-[#e6e4dc]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="soft" labelledBy="p1">
        <Eyebrow>PROBLEM 1</Eyebrow>
        <Heading id="p1">1人の応募を獲得するのに、<br />膨大なお金がかかるのが採用。</Heading>
        <Lead>しかも、そのお金は毎年毎年、かかっては消えていく。</Lead>
        <MoneyCycle />
      </Section>

      <Section tone="soft" className="!pt-0" labelledBy="p2">
        <Eyebrow>PROBLEM 2</Eyebrow>
        <Heading id="p2">なのに、一度掴んだ心が、<br />何度も離れてしまうのが採用。</Heading>
        <HeartCurve />
      </Section>

      <Section tone="dark" labelledBy="answer">
        <Eyebrow onDark>KYUTE’S ANSWER</Eyebrow>
        <h2 id="answer" className="text-[44px] leading-[1.25] text-white md:text-[80px]">
          認知を取って、<br />心を掴んで、<br /><span className="text-[var(--brand)]">離さない。</span>
        </h2>
        <p className="mt-5 text-[22px] font-extrabold text-[var(--brand)] md:text-[26px]">それが、採用YouTube。</p>
        <AnswerCards />
      </Section>

      <Section labelledBy="asset">
        <Eyebrow>ASSET</Eyebrow>
        <Heading id="asset">しかも、採用YouTubeは<br />消費ではなく、資産。</Heading>
        <Lead>一度つくったコンテンツは、公開後も働き続ける。</Lead>
        <AssetCompare />
      </Section>

      <Section tone="soft" labelledBy="proof">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>PROOF</Eyebrow>
            <Heading id="proof">自社メディアで、<br />採用YouTubeの運用を<br />実践しています。</Heading>
            <Lead>「運動部のシゴト。」では、企画・撮影・編集・サムネイル・分析までをKYUTEが行っています。そこで試して効いたことを、貴社のチャンネルに持ち込みます。</Lead>
            {!lp && <div className="mt-8"><Button href="/media" variant="outline" cta="youtube-proof-media">運動部のシゴト。を見る</Button></div>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {OWNED_VIDEOS.map((v) => <VideoThumb key={v.id} video={v} play={false} sizes="(min-width: 1024px) 25vw, 50vw" />)}
          </div>
        </div>
        <p className="mt-6 text-[14px] text-[var(--ink-mute)]">自社メディアの運用実績です。顧客の導入実績ではありません。</p>
      </Section>

      <Section id="price" labelledBy="price-h">
        <Eyebrow>PRICE</Eyebrow>
        <Heading id="price-h">料金プラン</Heading>
        <Lead>「志望度を上げる」から「採用の主戦場を変える」まで、目指す状態に合わせて選べます。</Lead>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {YOUTUBE_PLANS.map((p) => (
            <div key={p.name} className={`flex flex-col gap-5 rounded-3xl p-7 md:p-8 ${p.featured ? "bg-[var(--ink-strong)] text-white" : "bg-[var(--bg-soft)]"}`}>
              <div>
                <p className={`num text-[13px] tracking-[0.12em] ${p.featured ? "text-[var(--brand)]" : "text-[var(--brand-ink)]"}`}>{p.no}</p>
                <h3 className="mt-1 text-[24px]">{p.name}</h3>
              </div>
              <p className="flex items-baseline gap-2"><span className="text-lg font-bold">月</span><span className="num text-[72px] leading-none">{p.price}</span><span className="text-lg font-bold">万円</span></p>
              <dl className={`grid grid-cols-[88px_1fr] gap-y-3 border-t pt-5 text-[15px] ${p.featured ? "border-white/20" : "border-[var(--line)]"}`}>
                <dt className="opacity-70">本数</dt><dd className="font-bold">{p.count}</dd>
                <dt className="opacity-70">形式</dt><dd className="font-bold">{p.format}</dd>
                <dt className="opacity-70">目指す状態</dt><dd className="font-bold">{p.goal}</dd>
              </dl>
              <div>
                <p className="text-[13px] opacity-70">強化する段階{p.featured ? "（特に認知）" : ""}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {FUNNEL.map((f) => (
                    <li key={f} className={`rounded-full px-3 py-1 text-[13px] font-bold ${p.stages.includes(f) ? "bg-[var(--brand)] text-[var(--ink-strong)]" : p.featured ? "bg-white/10 text-white/50" : "bg-white text-[var(--ink-mute)]"}`}>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[14px] text-[var(--ink-mute)]">金額はすべて税別・月額です。本数・形式・契約期間は個別にご提案します。再生数や応募数などの成果を保証するものではありません。</p>
      </Section>

      <Section tone="soft" labelledBy="faq">
        <Heading id="faq">よくある質問</Heading>
        <Faq items={FAQ} />
      </Section>

      <Section tone="dark" id="download" labelledBy="download-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_520px]">
          <div>
            <Eyebrow onDark>DOWNLOAD</Eyebrow>
            <Heading id="download-h">採用YouTube運用代行の<br />資料を受け取る</Heading>
            <Lead onDark>採用YouTubeの価値と、企画から改善までの支援範囲をまとめた資料を、メールでお送りします。</Lead>
            <div className="mt-8"><Button href="/contact" variant="outline" onDark cta="youtube-download-contact">無料で相談する →</Button></div>
          </div>
          <MaterialForm endpoint="/api/culture-material" service="採用YouTube運用代行" onDark />
        </div>
      </Section>

      {!lp && (
        <Section>
          <div className="grid gap-5 md:grid-cols-2">
            <Link href="/service/recruit-video" className="rounded-3xl bg-[var(--bg-soft)] p-7 hover:bg-[var(--bg-tint)]">
              <p className="text-[14px] text-[var(--ink-mute)]">まずは1本から</p>
              <p className="mt-2 text-[22px] font-extrabold">採用動画制作 →</p>
              <p className="mt-1 text-[15px] text-[var(--ink-soft)]">初回トライアル 密着動画1本 20万円（税別）</p>
            </Link>
            <Link href="/column/category/recruit-youtube" className="rounded-3xl bg-[var(--bg-soft)] p-7 hover:bg-[var(--bg-tint)]">
              <p className="text-[14px] text-[var(--ink-mute)]">お役立ちコラム</p>
              <p className="mt-2 text-[22px] font-extrabold">採用YouTubeのコラムを読む →</p>
            </Link>
          </div>
        </Section>
      )}
    </>
  );
}
