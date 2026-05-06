import Image from "next/image";
import { externalLinks, heroCopy } from "@/data/site-content";

export function HeroCompany() {
  return (
    <section className="bg-aomaru relative min-h-screen overflow-hidden border-b-2 border-[var(--ink)] pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-4 top-24 hidden h-[68vh] w-[16vw] -rotate-12 bg-[var(--brand)] lg:block" />
        <div className="absolute right-[-6vw] top-36 hidden h-[46vh] w-[34vw] rotate-6 border-2 border-[var(--ink)] bg-[var(--accent)] lg:block" />
        <div className="absolute bottom-16 left-1/2 h-24 w-[140vw] -translate-x-1/2 -rotate-3 border-y-2 border-[var(--ink)] bg-white/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="inline-flex rotate-[-2deg] border-2 border-[var(--ink)] bg-[var(--accent)] px-4 py-2 font-latin text-lg font-extrabold uppercase tracking-[0.1em] text-[var(--ink)] shadow-[5px_5px_0_var(--ink)]">
              {heroCopy.eyebrow}
            </p>

            <h1 className="mt-8 text-balance font-latin text-[72px] font-extrabold uppercase leading-[0.82] text-[var(--ink)] sm:text-[104px] md:text-[136px] lg:text-[178px]">
              {heroCopy.titleLines.map((line, i) => (
                <span key={i} className={i === 1 ? "block text-[var(--brand-deep)]" : "block"}>
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-8 max-w-2xl whitespace-pre-line border-l-8 border-[var(--brand)] bg-white/88 p-6 text-base font-bold leading-loose text-[var(--ink)] shadow-[8px_8px_0_var(--ink)] md:text-[16px]">
              {heroCopy.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={externalLinks.aonavi}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] px-8 py-4 text-sm font-black text-white shadow-[6px_6px_0_var(--brand)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                AOナビを見る
                <span className="transition group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#mission"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-white px-8 py-4 text-sm font-black text-[var(--ink)] transition hover:bg-[var(--accent)]"
              >
                私たちのミッション
              </a>
            </div>
          </div>

          <div className="relative lg:col-span-4">
            <div className="relative mx-auto aspect-[2048/681] w-full max-w-xl rotate-3 overflow-hidden border-2 border-[var(--ink)] bg-black shadow-[12px_12px_0_var(--ink)] transition hover:rotate-0 lg:aspect-[4/3]">
              <Image
                src="/aonavi-header.png"
                alt="AOナビ"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-contain p-5 lg:object-cover lg:p-0"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 hidden -rotate-6 border-2 border-[var(--ink)] bg-[var(--accent)] px-5 py-4 shadow-[7px_7px_0_var(--ink)] sm:block">
              <p className="font-latin text-sm font-extrabold tracking-[0.12em] text-[var(--ink)]">
                EDUCATION × MEDIA
              </p>
              <p className="mt-1 text-sm font-black text-[var(--ink)]">
                AOナビ 運営
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-3 text-[var(--ink)]">
          <span className="font-latin text-lg font-extrabold tracking-[0.14em]">{heroCopy.scrollLabel}</span>
          <span className="h-1 w-16 bg-[var(--ink)]" />
        </div>
      </div>
    </section>
  );
}
