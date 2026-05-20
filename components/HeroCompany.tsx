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
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="inline-flex border border-white/20 bg-white/8 px-4 py-2 font-latin text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--accent)] backdrop-blur">
              {heroCopy.eyebrow}
            </p>

            <h1 className="mt-8 text-balance font-latin text-[64px] font-extrabold uppercase leading-[0.86] text-[var(--cream)] sm:text-[96px] md:text-[122px] lg:text-[148px]">
              {heroCopy.titleLines.map((line, i) => (
                <span key={i} className={i === 1 ? "block text-[var(--accent)]" : "block"}>
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

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden border border-white/20 bg-black shadow-[18px_18px_0_rgba(0,0,0,0.35)]">
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
              <div className="absolute bottom-6 left-6 right-6 border border-white/20 bg-black/55 p-5 backdrop-blur">
                <p className="font-latin text-xs font-extrabold uppercase tracking-[0.22em] text-[var(--accent)]">
                  Candidate Decision Film
                </p>
                <p className="mt-2 text-xl font-black leading-tight text-white">
                  ロールモデルの1日を記録し、入社後の景色を残す。
                </p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 hidden border border-[var(--ink)] bg-[var(--cream)] px-5 py-4 shadow-[7px_7px_0_var(--brand)] sm:block">
              <p className="font-latin text-sm font-extrabold tracking-[0.16em] text-[var(--brand-deep)]">OFFER CLOSING</p>
              <p className="mt-1 text-sm font-black text-[var(--ink)]">迷いが戻る時間に、腹落ちの材料を。</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid border border-white/15 bg-black/25 text-white/84 backdrop-blur md:grid-cols-3">
          {["Issue: 最終局面で辞退される", "Film: 働く未来を具体化", "Close: 承諾率へ接続"].map((item) => (
            <p key={item} className="border-b border-white/15 px-5 py-4 text-sm font-black last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
