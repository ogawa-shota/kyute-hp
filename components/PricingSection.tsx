import { pricing } from "@/data/site-content";

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-28 border-t border-[var(--line)] bg-[var(--surface)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] md:text-3xl">
          料金プランの考え方
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-[var(--muted)]">
          {pricing.lead}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pricing.points.map((p) => (
            <article
              key={p.title}
              className="rounded-2xl border border-[var(--line)] bg-white p-6 text-center shadow-sm"
            >
              <h3 className="text-lg font-bold text-[var(--ink)]">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{p.text}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-[var(--muted)]">
          {pricing.note}
        </p>
      </div>
    </section>
  );
}
