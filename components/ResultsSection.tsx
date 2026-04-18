import Link from "next/link";
import { results } from "@/data/site-content";
import { CtaButton } from "./CtaButton";

export function ResultsSection() {
  return (
    <section id="results" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] md:text-3xl">
              ステラの実績
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
              {results.copy}
            </p>
          </div>
          <Link
            href="#voices"
            className="text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
          >
            合格者の声を見る
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {results.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-6 text-center"
            >
              <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--brand)] md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <CtaButton href="#" variant="line" external>
            LINEで資料請求
          </CtaButton>
          <CtaButton href="#consult">受験相談を予約</CtaButton>
        </div>
      </div>
    </section>
  );
}
