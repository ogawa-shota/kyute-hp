import Image from "next/image";
import { services } from "@/data/site-content";

export function ServicesSection() {
  return (
    <section id="services" className="bg-section-soft relative overflow-hidden border-b border-[var(--line-soft)] py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-20" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow inline-flex border border-[var(--ink)] bg-[var(--accent)] px-3 py-2">Service</p>
            <h2 className="mt-7 max-w-4xl text-balance text-4xl font-black leading-tight text-[var(--ink)] md:text-6xl">
              興味喚起から入社の腹落ちまでを生み出す採用広報支援
            </h2>
            <p className="mt-6 text-2xl font-black leading-tight md:text-3xl">集める・伝える・選ばれるを、ひとつの採用体験に。</p>
          </div>
          <p className="max-w-md border border-[var(--ink)] bg-[var(--cream)] p-5 text-sm font-bold leading-loose text-[var(--ink)] shadow-[6px_6px_0_var(--brand)]">
            密着動画は、会社紹介だけで終わらせない採用広報コンテンツ。仕事のリアルと社員の価値観を可視化し、候補者の興味を志望度と腹落ちへつなげます。
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-12 md:mt-24 md:gap-20">
          {services.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={s.id}
                className={`group grid items-center gap-8 border-t border-[var(--ink)] pt-10 lg:grid-cols-12 lg:gap-14 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative lg:col-span-7">
                  <div className="relative aspect-[16/10] overflow-hidden border border-[var(--ink)] bg-black shadow-[10px_10px_0_var(--ink)]">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-contain p-5 opacity-90 transition duration-700 group-hover:scale-[1.04]"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/54 via-transparent to-black/8" />
                    <div className="absolute inset-x-0 top-0 h-8 border-b border-white/15 bg-black/55">
                      <div className="film-strip h-full opacity-80" />
                    </div>
                    <div className="absolute left-6 top-12 inline-flex items-center gap-2 border border-white/20 bg-black/65 px-4 py-2 text-sm font-black tracking-wider text-white backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                      {s.badge}
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 border border-white/20 bg-black/55 text-white backdrop-blur">
                      {["興味喚起", "理解促進", "腹落ち"].map((label) => (
                        <span key={label} className="border-r border-white/20 px-3 py-2 text-center text-[11px] font-black last:border-r-0">
                          {label}
                        </span>
                      ))}
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
                    className="mt-8 inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--ink)] px-6 py-3 text-sm font-black text-white shadow-[5px_5px_0_var(--brand)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
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
