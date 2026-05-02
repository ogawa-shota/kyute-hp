import { companyInfo } from "@/data/site-content";

export function CompanySection() {
  return (
    <section id="company" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Company</p>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-[var(--ink)] md:text-5xl">
              <span className="font-script text-2xl font-normal text-[var(--brand)] md:text-3xl">
                about us
              </span>
              <span className="mt-3 block">会社情報。</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <dl className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {companyInfo.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 py-6 sm:grid-cols-[180px_1fr] sm:gap-8"
                >
                  <dt className="font-latin text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-mute)]">
                    {row.label}
                  </dt>
                  <dd className="text-[14.5px] leading-relaxed text-[var(--ink)]">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
