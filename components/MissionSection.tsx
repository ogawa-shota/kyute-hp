import { site, valuePoints } from "@/data/site-content";

export function MissionSection() {
  return (
    <section id="mission" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Mission</p>
            <h2 className="mt-5 text-balance text-3xl font-bold leading-tight text-[var(--ink)] md:text-5xl">
              <span className="font-script text-2xl font-normal text-[var(--brand)] md:text-3xl">why we exist</span>
              <span className="mt-3 block">なぜ KYUTE が、<br />存在するのか。</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <p className="text-lg leading-loose text-[var(--ink-soft)] md:text-xl">
              {site.mission}
            </p>
            <p className="mt-6 text-[15px] leading-loose text-[var(--ink-soft)]">
              {site.description}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-3">
          {valuePoints.map((v) => (
            <div
              key={v.no}
              className="group relative overflow-hidden rounded-3xl border border-[var(--line)] bg-white p-8 transition hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[0_20px_60px_-20px_rgba(45,107,255,0.25)]"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-latin text-5xl font-light text-[var(--brand)]/30 transition group-hover:text-[var(--brand)]/60">
                  {v.no}
                </span>
                <span className="font-latin text-[10px] tracking-[0.32em] text-[var(--ink-mute)]">
                  {v.label.toUpperCase()}
                </span>
              </div>

              <h3 className="mt-8 text-xl font-bold leading-snug text-[var(--ink)]">
                {v.title}
              </h3>
              <p className="mt-4 text-[13.5px] leading-loose text-[var(--ink-soft)]">
                {v.body}
              </p>

              <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-[var(--brand-soft)] opacity-0 blur-3xl transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
