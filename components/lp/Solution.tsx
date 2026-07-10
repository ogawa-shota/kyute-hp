import { MediaPlaceholder } from "./MediaPlaceholder";
import { Reveal } from "./Reveal";

const TAGS = [
  "社員の一日",
  "会議",
  "ランチ",
  "商談",
  "雑談",
  "失敗",
  "挑戦",
  "意思決定",
  "カルチャー",
];

/**
 * S5 — 解決策（密着動画の初登場）。短尺クリップを横スクロールで多数並べ、"量と温度"を体感させる。
 */
export function Solution() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">THE SOLUTION</p>
          <h2 className="text-2xl font-semibold leading-snug text-[var(--text-primary)] sm:text-4xl">
            密着動画だから、伝わる。
          </h2>
        </Reveal>

        {/* subject tags */}
        <Reveal delay={80}>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {TAGS.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-4 py-1.5 text-sm text-[var(--ink-soft)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* horizontal rail of clips — bleeds to the right edge for a sense of "量" */}
      <Reveal delay={120}>
        <div className="no-scrollbar mt-10 flex gap-4 overflow-x-auto px-5 pb-2 lg:px-8">
          {/* 差し替え: 実際の密着短尺クリップのサムネに差し替え（自然光・生活感のトーン） */}
          {Array.from({ length: 6 }).map((_, i) => (
            <MediaPlaceholder
              key={i}
              label="短尺クリップ"
              ratio="aspect-[3/4]"
              className="w-[62vw] shrink-0 sm:w-64"
            />
          ))}
        </div>
      </Reveal>

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="mt-10">
          <p className="text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
            リアルだからこそ、「ここで働く自分」が自然と想像できる。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
