import Image from "next/image";
import { aboutCopy } from "@/data/site-content";

export function AboutSection() {
  return (
    <section id="about" className="relative border-b border-[var(--line-soft)] bg-[var(--ink)] py-20 text-white md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/20 shadow-[12px_12px_0_rgba(215,71,47,0.55)]">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="密着動画の撮影現場イメージ"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent" />
              <div className="absolute left-0 top-0 h-full w-12 border-r border-white/15 bg-black/45">
                <div className="film-strip h-full rotate-90 opacity-70" />
              </div>
            </div>

            <div className="absolute -right-4 -top-4 hidden h-40 w-40 overflow-hidden border border-white/25 shadow-[8px_8px_0_var(--accent)] md:block">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
                alt="意思決定を支えるパートナーのイメージ"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 hidden border border-[var(--accent)] bg-[var(--accent)] px-5 py-4 shadow-[7px_7px_0_var(--brand)] md:block">
              <p className="font-latin text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--ink)]">since 2025</p>
              <p className="mt-1 text-xs font-black text-[var(--ink)]">
                採用広報を、設計する。
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow inline-flex border border-white/20 bg-white/10 px-3 py-2 text-[var(--accent)]">{aboutCopy.eyebrow}</p>
            <h2 className="mt-7 text-balance text-4xl font-black leading-tight text-white md:text-6xl">
              {aboutCopy.title.split(" × ").map((term, i, arr) => (
                <span key={term}>
                  <span className="inline-block text-[var(--accent)]">{term}</span>
                  {i < arr.length - 1 && <span className="mx-2 text-white/45">×</span>}
                </span>
              ))}
            </h2>
            <p className="mt-8 whitespace-pre-line border-l-4 border-[var(--accent)] pl-6 text-[15px] font-medium leading-loose text-white/74">
              {aboutCopy.body}
            </p>

            <div className="mt-12 grid gap-0 border border-white/20 bg-white/6 sm:grid-cols-3">
              {aboutCopy.stats.map((s) => (
                <div key={s.label} className="border-b border-white/20 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <p className="font-latin text-4xl font-extrabold leading-none text-white/45 md:text-5xl">
                    {s.value}
                    <span className="ml-1 text-base font-black text-[var(--accent)]">
                      {s.suffix}
                    </span>
                  </p>
                  <h3 className="mt-5 text-2xl font-black leading-tight text-[var(--accent)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-white/78">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
