import Image from "next/image";
import { services } from "@/data/site-content";

export function ServicesSection() {
  return (
    <section id="services" className="bg-section-soft relative overflow-hidden border-b-2 border-[var(--ink)] py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow inline-flex rotate-[2deg] bg-[var(--accent)] px-3 py-2">Service</p>
            <h2 className="section-title mt-7 text-balance text-6xl leading-[0.88] text-[var(--ink)] md:text-8xl">
              CLOSE<br />THE OFFER
            </h2>
            <p className="mt-6 text-2xl font-black leading-tight md:text-3xl">密着動画で、候補者の意思決定を動かす。</p>
          </div>
          <p className="max-w-md border-2 border-[var(--ink)] bg-white p-5 text-sm font-bold leading-loose text-[var(--ink)] shadow-[6px_6px_0_var(--brand)]">
            密着動画は、会社紹介ではなく「意思決定支援コンテンツ」。仕事のリアルと社員の価値観を可視化し、候補者の最後のひと押しを動かします。
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-12 md:mt-24 md:gap-20">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.id}
                className={`group grid items-center gap-8 border-t-2 border-[var(--ink)] pt-10 lg:grid-cols-12 lg:gap-14 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative lg:col-span-7">
                  <div className="relative aspect-[16/10] overflow-hidden border-2 border-[var(--ink)] bg-white shadow-[10px_10px_0_var(--ink)]">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-contain bg-black p-5 transition duration-700 group-hover:scale-[1.04]"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ink)]/22 via-transparent to-transparent" />
                    <div className="absolute left-6 top-6 inline-flex rotate-[-2deg] items-center gap-2 border-2 border-[var(--ink)] bg-[var(--accent)] px-4 py-2 text-sm font-black tracking-wider text-[var(--ink)]">
                      <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                      {s.badge}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-latin text-xl font-extrabold uppercase tracking-[0.08em] text-[var(--brand-deep)]">{s.tagline}</p>
                  <h3 className="mt-4 text-3xl font-black leading-snug text-[var(--ink)] md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-sm font-medium leading-loose text-[var(--ink-soft)]">
                    {s.body}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[13.5px] font-bold text-[var(--ink)]">
                        <span className="mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[var(--brand-deep)]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={s.href}
                    {...(s.external && !s.href.startsWith("#")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-white px-6 py-3 text-sm font-black text-[var(--ink)] shadow-[5px_5px_0_var(--brand)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  >
                    <span>{s.ctaLabel ?? "詳しく問い合わせる"}</span>
                    <span className="transition group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
