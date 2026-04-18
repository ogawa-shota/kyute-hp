import Link from "next/link";
import { whyPoints } from "@/data/site-content";

export function WhySection() {
  return (
    <section id="why" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          Why Stellar?
        </p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] md:text-3xl">
          ステラが選ばれる理由
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {whyPoints.map((w) => (
            <article
              key={w.title}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6"
            >
              <h3 className="text-lg font-bold leading-snug text-[var(--ink)]">
                {w.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-[var(--brand)]">{w.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{w.body}</p>
              {w.href && w.linkLabel ? (
                <p className="mt-6">
                  <Link
                    href={w.href}
                    className="text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
                  >
                    {w.linkLabel}
                  </Link>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
