import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

/**
 * S10 — ブランドクロージング＋最終CTA。静かな全画面級。余白最大。
 */
export function Closing() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-dark py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,219,103,0.16),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="eyebrow mb-6">START WITH KYUTE</p>
          <h2 className="text-3xl font-bold leading-[1.35] text-white text-balance sm:text-5xl">
            採用は、もっと伝わる。
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 text-[15px] leading-[2.1] text-white/80 sm:text-lg">
            会社の魅力は、つくるものではありません。
            <br />
            伝えるものです。
            <br />
            KYUTEは、企業のリアルを届けることで、
            <br />
            応募・承諾・定着につながる採用を実現します。
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-10 inline-flex border-y border-white/15 px-4 py-3 text-sm font-bold text-[var(--brand)]">
            採用成果は、会社が伝わる深さで決まる。
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton href="/contact" cta="closing-primary" className="px-10 py-5 text-base">
              無料で相談する
            </CtaButton>
            <CtaButton
              href="/service"
              cta="closing-secondary"
              variant="secondary"
              onDark
              className="px-10 py-5 text-base"
            >
              サービスを見る
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
