import { site, valuePoints } from "@/data/site-content";

export function MissionSection() {
  return (
    <section id="mission" className="relative border-b-2 border-[var(--ink)] bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow inline-flex rotate-[-3deg] bg-[var(--brand)] px-3 py-2 text-white">Mission</p>
            <h2 className="section-title mt-7 text-balance text-6xl leading-[0.86] text-[var(--ink)] md:text-8xl">
              <span className="block text-[var(--brand-deep)]">WHY</span>
              <span className="block">WE EXIST</span>
            </h2>
            <p className="mt-7 text-3xl font-black leading-tight md:text-4xl">なぜ KYUTE が、<br />存在するのか。</p>
          </div>

          <div className="lg:col-span-8">
            <p className="border-l-8 border-[var(--accent)] pl-6 text-2xl font-black leading-loose text-[var(--ink)] md:text-3xl">
              {site.mission}
            </p>
            <p className="mt-8 text-[15px] font-medium leading-loose text-[var(--ink-soft)]">
              {site.description}
            </p>
          </div>
        </div>

        <div className="mt-20 grid max-w-3xl gap-6 md:mt-28">
          {valuePoints.map((v) => (
            <div
              key={v.no}
              className="group relative overflow-hidden border-2 border-[var(--ink)] bg-white p-7 shadow-[8px_8px_0_var(--ink)] transition hover:-translate-y-1 hover:shadow-[12px_12px_0_var(--brand)]"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-latin text-7xl font-extrabold leading-none text-[var(--brand-deep)]">
                  {v.no}
                </span>
                <span className="rounded-full border-2 border-[var(--ink)] bg-[var(--accent)] px-3 py-1 font-latin text-sm font-extrabold tracking-[0.12em] text-[var(--ink)]">
                  {v.label.toUpperCase()}
                </span>
              </div>

              <h3 className="mt-8 text-xl font-black leading-snug text-[var(--ink)]">
                {v.title}
              </h3>
              <p className="mt-4 text-[13.5px] font-medium leading-loose text-[var(--ink-soft)]">
                {v.body}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-2 bg-[var(--brand)] opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
