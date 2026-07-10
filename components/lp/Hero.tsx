import { CtaButton } from "./CtaButton";

/**
 * HERO — 成果の約束。動画は将来設置予定のため、現状はコピー主役の1カラム構成。
 * キーメッセージ「YouTube採用のプロ」を主役に、ブランドタグラインを添える。
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_2%,rgba(255,219,103,0.3),transparent_46%),linear-gradient(180deg,rgba(244,244,246,0.9),rgba(255,255,255,0))]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <div className="reveal is-visible">
          <p className="eyebrow mb-6">YOUTUBE RECRUITMENT</p>
          <p className="font-latin mb-6 text-[clamp(3rem,12vw,8.5rem)] font-semibold uppercase leading-[0.8] tracking-normal text-[var(--text-primary)]">
            KYUTE
          </p>
          <h1 className="mx-auto max-w-[14em] text-[2.4rem] font-bold leading-[1.2] tracking-tight text-[var(--text-primary)] text-balance sm:text-6xl lg:text-[4.2rem]">
            YouTube採用のプロ
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium leading-[1.6] text-[var(--text-primary)] text-balance sm:text-2xl">
            採用成果は、「伝わる会社」から生まれる。
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-[2] text-[var(--ink-soft)] sm:text-lg">
            密着動画で企業のリアルを届け、
            <br className="hidden sm:block" />
            応募・承諾・定着につながる採用広報を実現します。
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton href="/contact" cta="hero-primary">
              無料で相談する
            </CtaButton>
            <CtaButton href="/service" cta="hero-secondary" variant="secondary">
              サービスを見る
            </CtaButton>
          </div>

          <dl className="mx-auto mt-12 grid max-w-xl grid-cols-3 border-y border-[var(--line-soft)] py-5">
            {[
              ["企画", "設計から"],
              ["撮影", "密着取材"],
              ["運用", "改善まで"],
            ].map(([term, desc]) => (
              <div key={term} className="border-r border-[var(--line-soft)] px-3 last:border-r-0">
                <dt className="text-[11px] font-bold tracking-[0.18em] text-[var(--brand-ink)]">
                  {term}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-[var(--text-primary)]">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* scroll hint */}
      <div className="relative mt-14 flex justify-center md:mt-16">
        <a
          href="#services"
          aria-label="次のセクションへ"
          className="flex flex-col items-center gap-1 text-[var(--ink-mute)] transition-colors hover:text-[var(--brand-ink)]"
        >
          <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
            <path
              d="M8 2v18M2 14l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
