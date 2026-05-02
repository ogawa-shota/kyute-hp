import Image from "next/image";
import { services } from "@/data/site-content";

export function ServicesSection() {
  return (
    <section id="services" className="bg-section-soft relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Services</p>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-[var(--ink)] md:text-5xl">
              <span className="font-script text-2xl font-normal text-[var(--brand)] md:text-3xl">two ways to evolve</span>
              <span className="mt-3 block">人と AI、両輪で<br className="md:hidden" />伴走する。</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-loose text-[var(--ink-soft)]">
            総合型選抜の対策に特化した 2 つのサービスで、受験生それぞれの「らしさ」を引き出します。
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-12 md:mt-24 md:gap-20">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.id}
                className={`group grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="relative lg:col-span-7">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[28px] border border-[var(--line)] bg-white shadow-[0_30px_60px_-30px_rgba(11,37,69,0.25)]">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ink)]/20 via-transparent to-transparent" />
                    <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-semibold tracking-wider text-[var(--ink)] backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                      {s.badge}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="lg:col-span-5">
                  <p className="font-script text-2xl text-[var(--brand)]">{s.tagline}</p>
                  <h3 className="mt-3 text-2xl font-bold leading-snug text-[var(--ink)] md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-sm leading-loose text-[var(--ink-soft)]">
                    {s.body}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[13.5px] text-[var(--ink)]">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={s.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] transition hover:text-[var(--brand)]"
                  >
                    <span className="border-b border-[var(--ink)] pb-0.5 group-hover:border-[var(--brand)]">
                      詳しく問い合わせる
                    </span>
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
