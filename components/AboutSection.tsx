import Image from "next/image";
import { aboutCopy } from "@/data/site-content";

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Image collage */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[var(--line)] shadow-[0_30px_60px_-30px_rgba(11,37,69,0.3)]">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                alt="挑戦する受験生のイメージ"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/40 via-transparent to-transparent" />
            </div>

            <div className="absolute -right-4 -top-4 hidden h-40 w-40 rotate-6 overflow-hidden rounded-2xl border-4 border-white shadow-xl md:block">
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
                alt="伴走するメンターのイメージ"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-[var(--line)] bg-white px-5 py-4 shadow-xl md:block">
              <p className="font-script text-xl text-[var(--brand)]">since 2026</p>
              <p className="mt-1 text-xs font-semibold text-[var(--ink)]">
                総合型選抜のいま、隣に。
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="eyebrow">{aboutCopy.eyebrow}</p>
            <h2 className="mt-5 whitespace-pre-line text-balance text-3xl font-bold leading-tight text-[var(--ink)] md:text-5xl">
              {aboutCopy.title}
            </h2>
            <p className="mt-8 whitespace-pre-line text-[15px] leading-loose text-[var(--ink-soft)]">
              {aboutCopy.body}
            </p>

            <div className="mt-12 grid gap-8 border-t border-[var(--line)] pt-10 sm:grid-cols-3">
              {aboutCopy.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-latin text-4xl font-light text-[var(--ink)] md:text-5xl">
                    {s.value}
                    <span className="ml-1 text-base font-medium text-[var(--brand)]">
                      {s.suffix}
                    </span>
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
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
