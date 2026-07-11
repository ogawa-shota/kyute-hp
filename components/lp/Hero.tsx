import { CtaButton } from "./CtaButton";

/**
 * HERO — 成果の約束。動画は将来設置予定のため、現状はコピー主役の1カラム構成。
 * キーメッセージ「YouTube採用のプロ」を主役に、ブランドタグラインを添える。
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white pb-20 pt-28 md:pb-24 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_2%,rgba(255,219,103,0.3),transparent_46%),linear-gradient(180deg,rgba(244,244,246,0.9),rgba(255,255,255,0))]" />

      <div className="relative mx-auto max-w-5xl px-5 text-center lg:px-8">
        <div className="reveal is-visible">
          <p className="eyebrow mb-6">YOUTUBE RECRUITMENT</p>
          <p className="font-latin mb-7 text-[clamp(3rem,11vw,8rem)] font-semibold uppercase leading-[0.82] tracking-normal text-[var(--text-primary)]">
            KYUTE
          </p>
          <h1 className="mx-auto max-w-[13em] text-[2.35rem] font-bold leading-[1.22] tracking-normal text-[var(--text-primary)] text-balance sm:text-6xl lg:text-[4.1rem]">
            YouTube採用のプロ
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-[1.75] text-[var(--text-primary)] text-balance sm:text-2xl">
            採用は「どれだけ伝わるか」が全て。
          </p>
          <p className="mx-auto mt-5 max-w-[38rem] text-base leading-[2] text-[var(--ink-soft)] sm:text-lg">
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

          <dl className="mx-auto mt-12 grid max-w-[38rem] grid-cols-3 border-y border-[var(--line-soft)] py-6">
            {[
              {
                term: "企画",
                icon: (
                  <path
                    d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .8 1.6v.6h5.6v-.6c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3ZM9.5 20h5M10.5 22h3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
              {
                term: "撮影",
                icon: (
                  <>
                    <rect x="2.5" y="6.5" width="12" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M14.5 10.5l6-3v9l-6-3z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                ),
              },
              {
                term: "運用",
                icon: (
                  <path
                    d="M20 12a8 8 0 1 1-2.3-5.6M20 4v3h-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
            ].map(({ term, icon }) => (
              <div
                key={term}
                className="flex min-h-20 flex-col items-center justify-center gap-2.5 border-r border-[var(--line-soft)] px-3 last:border-r-0"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-[var(--brand-ink)]"
                >
                  {icon}
                </svg>
                <dt className="text-xs font-semibold tracking-[0.12em] text-[var(--brand-ink)]">
                  {term}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* scroll hint */}
      <div className="relative mt-14 flex justify-center md:mt-16">
        <a
          href="#why-youtube"
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
