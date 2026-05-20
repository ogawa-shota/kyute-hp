import { companyInfo } from "@/data/site-content";

export function CompanySection() {
  return (
    <section id="company" className="border-b border-[var(--line-soft)] bg-[var(--cream)] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow inline-flex border border-[var(--ink)] bg-[var(--ink)] px-3 py-2 text-[var(--accent)]">Company</p>
            <h2 className="section-title mt-7 text-6xl leading-[0.88] text-[var(--ink)] md:text-8xl">
              ABOUT<br />US
            </h2>
            <p className="mt-6 text-3xl font-black">採用の最終局面に向き合う会社。</p>
          </div>

          <div className="lg:col-span-8">
            <dl className="divide-y divide-[var(--line-soft)] border-y border-[var(--ink)]">
              {companyInfo.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 py-6 transition hover:bg-[var(--brand-soft)] sm:grid-cols-[180px_1fr] sm:gap-8 sm:px-4"
                >
                  <dt className="font-latin text-lg font-extrabold uppercase tracking-[0.1em] text-[var(--brand-deep)]">
                    {row.label}
                  </dt>
                  <dd className="text-[14.5px] font-bold leading-relaxed text-[var(--ink)]">
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
