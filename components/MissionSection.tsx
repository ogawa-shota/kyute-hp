import { site, valuePoints } from "@/data/site-content";

export function MissionSection() {
  return (
    <section id="mission" className="relative border-b border-[var(--line-soft)] bg-[var(--cream)] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow inline-flex border border-[var(--ink)] bg-[var(--ink)] px-3 py-2 text-[var(--accent)]">Mission</p>
            <h2 className="section-title mt-7 text-balance text-6xl leading-[0.86] text-[var(--ink)] md:text-8xl">
              <span className="block text-[var(--brand-deep)]">WHY</span>
              <span className="block">THEY LEAVE</span>
            </h2>
            <p className="mt-7 text-3xl font-black leading-tight md:text-4xl">辞退は、応募数の問題だけではない。</p>
          </div>

          <div className="lg:col-span-8">
            <p className="border-l-4 border-[var(--brand)] pl-6 text-2xl font-black leading-loose text-[var(--ink)] md:text-3xl">
              {site.mission}
            </p>
            <p className="mt-8 text-[15px] font-medium leading-loose text-[var(--ink-soft)]">
              {site.description}
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:mt-28 lg:grid-cols-3">
          {valuePoints.map((v) => (
            <div
              key={v.no}
              className="group relative overflow-hidden border border-[var(--line-soft)] bg-paper p-7 transition hover:-translate-y-1 hover:border-[var(--ink)] hover:shadow-[10px_10px_0_var(--ink)]"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-latin text-7xl font-extrabold leading-none text-[var(--brand-deep)]">
                  {v.no}
                </span>
                <span className="border border-[var(--ink)] bg-[var(--accent)] px-3 py-1 font-latin text-sm font-extrabold tracking-[0.12em] text-[var(--ink)]">
                  {v.label.toUpperCase()}
                </span>
              </div>

              <h3 className="mt-8 text-xl font-black leading-snug text-[var(--ink)]">
                {v.title}
              </h3>
              <p className="mt-4 text-[13.5px] font-medium leading-loose text-[var(--ink-soft)]">
                {v.body}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--brand)] opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
