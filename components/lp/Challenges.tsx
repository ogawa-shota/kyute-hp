import { Reveal } from "./Reveal";

const ITEMS = [
  "求人を出しても、応募が集まらない",
  "面接までは進むのに、辞退される",
  "内定を出しても、承諾率が上がらない",
  "入社後のギャップで、早期に辞めてしまう",
];

/**
 * S2 — 課題の言語化。2×2グリッド。煽らず、締めの一文でS3へ視線を送る。
 */
export function Challenges() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">CHALLENGES</p>
          <h2 className="section-title mx-auto text-[var(--text-primary)]">
            こんな採用課題は、ありませんか？
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item}
              delay={i * 80}
              className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--bg-soft)] p-6"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[var(--brand-ink)]"
              >
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M8 12l2.5 2.5L16 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-base font-medium leading-[1.8] text-[var(--ink)]">
                {item}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-sm text-[var(--ink-mute)]">
            どれも違う問題に見えて、原因は一つに行き着きます。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
