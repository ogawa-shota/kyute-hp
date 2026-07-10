import { Reveal } from "./Reveal";

const NOT_CONVEYED = [
  "どんな人が働いているのか",
  "どんな空気の職場なのか",
  "実際にどう働いているのか",
  "何を大切にしている会社なのか",
];

/**
 * S3 — 原因の特定。左に見出し、右に本文＋リスト。帰結の3文を大きめに。
 */
export function Cause() {
  return (
    <section className="bg-soft py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        {/* Left: heading */}
        <Reveal>
          <p className="eyebrow mb-5">THE CAUSE</p>
          <h2 className="text-2xl font-semibold leading-[1.5] text-[var(--text-primary)] sm:text-4xl">
            企業の魅力はある。
            <br />
            でも、伝わっていない。
          </h2>
        </Reveal>

        {/* Right: body + list */}
        <Reveal delay={100}>
          <p className="text-[15px] leading-[2] text-[var(--ink-soft)] sm:text-base">
            候補者が本当に知りたいのは、給与でも、仕事内容だけでも、福利厚生だけでもありません。
            <br />
            「この会社で働く自分」を、知りたいのです。
          </p>

          <div className="mt-8">
            <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
              求人票や採用サイトでは、
            </p>
            <ul className="mt-3 space-y-2.5 border-l-2 border-[var(--brand-ink)]/30 pl-5">
              {NOT_CONVEYED.map((item) => (
                <li
                  key={item}
                  className="text-[15px] leading-relaxed text-[var(--ink)]"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
              までは、伝わりません。
            </p>
          </div>

          <p className="mt-9 text-lg font-bold leading-[1.7] text-[var(--text-primary)] sm:text-xl">
            だから、応募されない。承諾されない。入社後にギャップが生まれる。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
