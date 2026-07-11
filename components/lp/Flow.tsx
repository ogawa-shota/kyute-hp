import { Reveal } from "./Reveal";

const STEPS = [
  "無料相談（採用課題のヒアリング）",
  "採用課題の整理・目標KPIの設定",
  "企画（誰を・何を・どう見せるか）",
  "撮影（密着）",
  "編集・公開",
  "運用・分析・改善",
];

/**
 * S9 — 導入の流れ。横（PC）/縦（モバイル）のステップライン。
 */
export function Flow() {
  return (
    <section id="flow" className="bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">PROCESS</p>
          <h2 className="section-title text-[var(--text-primary)]">
            導入の流れ
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal
              key={step}
              as="li"
              delay={i * 70}
              className="relative flex items-start gap-4 rounded-2xl border border-[var(--line)] bg-white p-6"
            >
              <span className="font-latin flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-semibold text-[var(--text-primary)]">
                {i + 1}
              </span>
              <span className="pt-1 text-base font-medium leading-[1.75] text-[var(--ink)]">
                {step}
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
