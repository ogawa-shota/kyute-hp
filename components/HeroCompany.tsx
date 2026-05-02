import { heroCopy, site } from "@/data/site-content";

export function HeroCompany() {
  return (
    <section className="bg-aomaru relative overflow-hidden pt-32 md:pt-40">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-32 h-[420px] w-[420px] rounded-full bg-[#bcd8ec] opacity-50 blur-3xl animate-drift" />
        <div className="absolute -right-24 top-64 h-[360px] w-[360px] rounded-full bg-[#d6e8f5] opacity-60 blur-3xl animate-drift" style={{ animationDelay: "-5s" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-36">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <p className="font-script text-2xl text-[var(--brand)] md:text-3xl">
              {heroCopy.eyebrow}
            </p>

            <h1 className="mt-6 text-balance text-[44px] font-bold leading-[1.18] tracking-tight text-[var(--ink)] sm:text-6xl md:text-7xl lg:text-[88px]">
              {heroCopy.titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-8 max-w-xl whitespace-pre-line text-base leading-loose text-[var(--ink-soft)] md:text-[15px]">
              {heroCopy.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#services"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--brand)]"
              >
                サービスを見る
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#mission"
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/70 px-7 py-3.5 text-sm font-semibold text-[var(--ink)] backdrop-blur-sm transition hover:border-[var(--ink)]"
              >
                私たちのミッション
              </a>
            </div>
          </div>

          {/* Right: floating brand monogram card */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-md">
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[var(--brand)] to-[#0b2545] shadow-[0_30px_80px_-30px_rgba(11,37,69,0.4)]" />
              <div className="absolute inset-[1px] rounded-[27px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />

              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white md:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-latin text-xs tracking-[0.32em] opacity-80">
                    K Y U T E
                  </span>
                  <span className="rounded-full border border-white/30 px-3 py-1 text-[10px] font-medium tracking-[0.18em]">
                    SINCE 2026
                  </span>
                </div>

                <div className="text-center animate-float">
                  <p className="font-script text-3xl text-white/85">Keep</p>
                  <p className="font-script text-3xl text-white/85 -mt-2">You To</p>
                  <p className="font-script text-3xl text-white/85 -mt-2">Evolve</p>
                  <p className="mt-6 text-3xl font-bold tracking-tight">{site.tagline}</p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-latin text-[10px] tracking-[0.28em] opacity-70">MISSION</p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90">
                      総合型選抜の最前線で<br />可能性に火を灯し続ける。
                    </p>
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-base">
                    ◎
                  </div>
                </div>
              </div>
            </div>

            {/* Badge floating */}
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-[var(--line)] bg-white/95 px-5 py-4 shadow-xl backdrop-blur-sm sm:block">
              <p className="font-latin text-[10px] tracking-[0.24em] text-[var(--ink-mute)]">
                EDUCATION × AI
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
                総合型選抜 専門
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-20 flex items-center gap-3 text-[var(--ink-mute)]">
          <span className="font-latin text-[10px] tracking-[0.32em]">{heroCopy.scrollLabel}</span>
          <span className="h-px w-12 bg-[var(--ink-mute)]/40" />
        </div>
      </div>
    </section>
  );
}
