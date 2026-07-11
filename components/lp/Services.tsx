import Link from "next/link";
import { Reveal } from "./Reveal";

const SERVICES = [
  {
    n: "01",
    tag: "CHANNEL",
    title: "YouTube運営代行事業",
    href: "/service/youtube",
    body: (
      <>
        企業の採用広報を、YouTubeで&quot;資産&quot;に。
        <br />
        企画・撮影・編集・運用・分析・改善まで一気通貫で支援します。
      </>
    ),
  },
  {
    n: "02",
    tag: "MEDIA",
    title: "自社メディア事業",
    href: "/service/media",
    body: (
      <>
        日本中の&quot;働く&quot;を密着取材する動画メディアを運営。
        <br />
        企業と求職者を、リアルなコンテンツで新しく出会わせます。
      </>
    ),
  },
];

/**
 * S1 — サービス（事業一覧）。概要のみ。3秒で全体像を掴ませる。深掘りしない。
 */
export function Services() {
  return (
    <section id="services" className="bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="section-header-split">
          <div>
            <p className="eyebrow mb-4">SERVICES</p>
            <h2 className="section-title text-[var(--text-primary)]">
              KYUTEのサービス
            </h2>
          </div>
          <p className="section-lead md:justify-self-end">
            密着動画で&quot;働くリアル&quot;を届け、採用成果につなげる2つの事業。単発制作で終わらせず、企画から運用改善まで接続します。
          </p>
        </Reveal>

        <div className="mt-12 border-t border-[var(--line)] md:mt-16">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} className="border-b border-[var(--line)]">
              <Link
                href={s.href}
                data-cta={`service-${s.tag.toLowerCase()}`}
                className="group grid gap-5 bg-transparent py-8 transition-colors hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand)] sm:grid-cols-[72px_0.9fr_1.1fr] sm:items-center sm:px-5 md:py-10"
              >
                <span className="font-latin text-sm font-semibold tracking-[0.2em] text-[var(--brand-ink)]">
                  {s.n}
                </span>
                <div>
                  <span className="font-latin text-xs font-semibold tracking-[0.22em] text-[var(--ink-mute)]">
                    {s.tag}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold leading-[1.5] text-[var(--text-primary)] transition-colors group-hover:text-[var(--brand-ink)] sm:text-2xl">
                    {s.title}
                  </h3>
                </div>
                <div>
                  <p className="max-w-[34rem] text-base leading-[1.9] text-[var(--ink-soft)]">
                    {s.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-ink)]">
                    詳しく見る
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M3 8h9M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
