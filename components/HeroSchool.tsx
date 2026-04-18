import { site } from "@/data/site-content";
import { CtaButton } from "./CtaButton";

export function HeroSchool() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--line)] bg-gradient-to-b from-[#eef6ff] via-white to-[var(--surface)]">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[var(--brand-soft)] blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-6 md:py-20">
        <div>
          <p className="text-sm font-semibold text-[var(--brand)]">
            {site.tagline}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight text-[var(--ink)] md:text-4xl lg:text-5xl">
            {site.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            {site.hero.lead}
          </p>
          <ul className="mt-8 space-y-2 text-sm text-[var(--ink)]">
            {site.hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span
                  className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--brand)]"
                  aria-hidden
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <CtaButton href={site.hero.primaryCta.href} variant="line" external>
              {site.hero.primaryCta.label}
            </CtaButton>
            <CtaButton href={site.hero.secondaryCta.href} variant="outline">
              {site.hero.secondaryCta.label}
            </CtaButton>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-[var(--muted)]">
            {site.disclaimer}
          </p>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-[var(--line)] bg-white p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              Focus
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
              書類 × 小論文 × 面接
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
              「自分の物語」と「大学の求める人材像」を接続するまで、添削とロールプレイを繰り返します。型にはめず、あなたの言葉で勝負できる状態をつくります。
            </p>
            <div className="mt-6 grid gap-3 rounded-2xl bg-[var(--surface)] p-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">志望理由書</span>
                <span className="font-semibold text-[var(--ink)]">壁打ち → 添削</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">小論文</span>
                <span className="font-semibold text-[var(--ink)]">構造 → 即筆</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[var(--muted)]">面接</span>
                <span className="font-semibold text-[var(--ink)]">想定Q → 改善</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
