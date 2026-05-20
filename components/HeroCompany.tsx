import Image from "next/image";
import { heroCopy } from "@/data/site-content";

export function HeroCompany() {
  return (
    <section className="bg-aomaru relative min-h-screen overflow-hidden border-b border-[var(--ink)] pt-28 text-[var(--cream)] md:pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="film-strip absolute left-0 top-20 h-10 w-full border-y border-white/15 bg-black/30" />
        <div className="absolute bottom-20 left-1/2 h-28 w-[140vw] -translate-x-1/2 -rotate-2 border-y border-[var(--ink)] bg-[var(--cream)]/92" />
        <div className="absolute right-[8vw] top-28 hidden h-[58vh] w-px bg-white/20 lg:block" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-16">
          <div className="relative z-10 lg:col-span-6 xl:col-span-7">
            <p className="inline-flex border border-white/20 bg-white/8 px-4 py-2 font-latin text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--accent)] backdrop-blur">
              {heroCopy.eyebrow}
            </p>

            <h1 className="mt-8 max-w-[760px] font-latin text-[clamp(40px,10vw,96px)] font-extrabold uppercase leading-[0.94] text-[var(--cream)] lg:text-[clamp(64px,6.4vw,108px)]">
              {heroCopy.titleLines.map((line, i) => (
                <span key={i} className={i === 1 ? "block whitespace-nowrap text-[var(--accent)]" : "block whitespace-nowrap"}>
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-8 max-w-2xl whitespace-pre-line border-l-4 border-[var(--accent)] bg-black/28 p-6 text-base font-bold leading-loose text-white/88 backdrop-blur md:text-[16px]">
              {heroCopy.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-8 py-4 text-sm font-black text-[var(--ink)] shadow-[6px_6px_0_var(--brand)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                無料で相談する
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 border border-white/30 bg-white/8 px-8 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[var(--ink)]"
              >
                サービスを見る
              </a>
            </div>
          </div>

          <div className="relative z-0 lg:col-span-6 xl:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden border border-white/20 bg-black shadow-[18px_18px_0_rgba(0,0,0,0.35)] xl:max-w-xl">
              <Image
                src="/recruitment-closing-film.png"
                alt="KYUTEの採用広報向け密着動画イメージ"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-contain p-5 opacity-90 lg:object-cover lg:p-0"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.62))]" />
              <div className="absolute inset-x-0 top-0 h-10 border-b border-white/15 bg-black/45">
                <div className="film-strip h-full opacity-80" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 border border-white/20 bg-black/70 p-4 backdrop-blur md:bottom-6 md:left-6 md:right-6 md:p-5">
                <p className="font-latin text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--accent)]">
                  Candidate Journey Film
                </p>
                <p className="mt-2 text-base font-black leading-tight text-white md:text-xl">
                  興味喚起から腹落ちまで、候補者の理解を積み上げる。
                </p>
              </div>
            </div>

            <div className="absolute -bottom-6 left-2 hidden max-w-[min(92%,360px)] border border-[var(--ink)] bg-[var(--cream)] px-5 py-4 shadow-[7px_7px_0_var(--brand)] sm:block xl:-left-4">
              <p className="font-latin text-sm font-extrabold tracking-[0.16em] text-[var(--brand-deep)]">PR TO DECISION</p>
              <p className="mt-1 text-sm font-black text-[var(--ink)]">集めるだけで終わらず、選ばれる理由を。</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid border border-white/15 bg-black/25 text-white/84 backdrop-blur md:grid-cols-3">
          {["Attract: 興味をつくる", "Understand: 働く未来を具体化", "Commit: 入社の腹落ちへ接続"].map((item) => (
            <p key={item} className="border-b border-white/15 px-5 py-4 text-sm font-black last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
