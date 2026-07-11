import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

/**
 * S6 — 効果の証明（採用ファネル図）。
 * このLP最大の"証明"。縦フローのファネルを丁寧に。各段の右に効果の一文。
 * 直後にCTAを挿入。
 */

// 各ステップ。width で漏斗の狭まりを表現。note は右に添える補足（指定のある3段のみ）。
const STEPS = [
  { label: "会社のリアルが伝わる", width: "w-full", note: null },
  {
    label: "応募率の向上",
    width: "w-full sm:w-[92%]",
    note: "働く姿が見えるから、応募につながる。",
  },
  { label: "面接参加率の向上", width: "w-full sm:w-[80%]", note: null },
  {
    label: "内定承諾率の向上",
    width: "w-full sm:w-[68%]",
    note: "働く自分が想像できるから、承諾につながる。",
  },
  {
    label: "定着率の向上",
    width: "w-full sm:w-[56%]",
    note: "知って入社するから、ギャップが小さく定着する。",
  },
];

export function Funnel() {
  return (
    <section id="funnel" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--bg-soft)] to-white" />
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">THE PROOF</p>
          <h2 className="section-title mx-auto text-[var(--text-primary)]">
            採用ファネル全体に、効く。
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-3xl md:mt-16">
          <div className="absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 bg-[var(--line-soft)] sm:block" />
          {STEPS.map((step, i) => (
            <Reveal key={step.label} delay={i * 90}>
              <div className="relative flex flex-col items-center">
                {/* funnel bar */}
                <div
                  className={`relative ${step.width} rounded-[8px] border border-[var(--brand-ink)]/25 bg-white px-5 py-5 shadow-[0_10px_32px_rgba(20,20,25,0.06)] transition-colors sm:px-6`}
                >
                  <div className="absolute inset-y-0 left-0 w-1 rounded-l-[8px] bg-[var(--brand)]" />
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-3 text-base font-semibold leading-relaxed text-[var(--text-primary)] sm:text-lg">
                      <span className="font-latin text-xs font-semibold tracking-[0.16em] text-[var(--brand-ink)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step.label}
                    </span>
                    {step.note && (
                      <span className="hidden text-right text-xs leading-relaxed text-[var(--ink-soft)] sm:block sm:max-w-[46%]">
                        {step.note}
                      </span>
                    )}
                  </div>
                  {/* mobile note under the bar */}
                  {step.note && (
                    <p className="mt-3 pl-8 text-sm leading-relaxed text-[var(--ink-soft)] sm:hidden">
                      {step.note}
                    </p>
                  )}
                </div>

                {/* connector arrow */}
                {i < STEPS.length - 1 && (
                  <svg
                    width="18"
                    height="26"
                    viewBox="0 0 18 26"
                    fill="none"
                    aria-hidden="true"
                    className="my-1.5 text-[var(--brand-ink)]"
                  >
                    <path
                      d="M9 1v20M3 16l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </Reveal>
          ))}

          {/* outcome */}
          <Reveal delay={STEPS.length * 90} className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-[var(--ink-strong)] px-8 py-4 text-white shadow-[0_18px_44px_rgba(20,20,25,0.18)]">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h9M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base font-bold sm:text-lg">採用ROIの向上</span>
            </div>
          </Reveal>
        </div>

        {/* CTA directly after S6 */}
        <Reveal className="mt-14 flex justify-center">
          <div className="flex flex-col items-center gap-3">
            <CtaButton href="/contact" cta="after-s6">
              採用課題を相談する
            </CtaButton>
            <p className="text-xs text-[var(--ink-mute)]">動画の有無に関わらず、採用課題の整理から相談できます。</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
