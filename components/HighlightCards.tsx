import { highlights } from "@/data/site-content";

export function HighlightCards() {
  return (
    <section id="curriculum" className="scroll-mt-28 border-t border-[var(--line)] bg-[var(--surface)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] md:text-3xl">
          ステラが大切にしている3つの軸
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <article
              key={h.title}
              className="flex flex-col rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
                {h.title}
              </p>
              <h3 className="mt-2 text-lg font-bold text-[var(--ink)]">{h.subtitle}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                {h.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
