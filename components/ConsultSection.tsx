import { consultMerits, consultSteps } from "@/data/site-content";
import { CtaButton } from "./CtaButton";

export function ConsultSection() {
  return (
    <section id="consult" className="scroll-mt-28 border-t border-[var(--line)] bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] md:text-3xl">
          ステラの受験相談とは
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-[var(--muted)]">
          成績や評定だけでなく、あなたの本気度と向き合うのがステラの相談です。
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {consultMerits.map((m) => (
            <div
              key={m}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-6 text-center text-sm font-semibold text-[var(--ink)]"
            >
              {m}
            </div>
          ))}
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-4">
          {consultSteps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-[var(--line)] bg-white p-5">
              <span className="text-xs font-bold text-[var(--brand)]">
                STEP {i + 1}
              </span>
              <h3 className="mt-2 text-base font-bold text-[var(--ink)]">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaButton href="#" variant="line" external>
            LINEで資料請求
          </CtaButton>
          <CtaButton href="#consult">受験相談を予約</CtaButton>
        </div>
      </div>
    </section>
  );
}
