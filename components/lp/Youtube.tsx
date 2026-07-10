import { Reveal } from "./Reveal";

const COLUMNS = [
  { key: "media", label: "求人媒体", note: "消える広告" },
  { key: "youtube", label: "YouTube", note: "貯まる資産" },
] as const;

type RowKey = (typeof COLUMNS)[number]["key"];

const ROWS: { item: string; values: Record<RowKey, string> }[] = [
  {
    item: "届く相手",
    values: {
      media: "掲載期間中の登録者だけ",
      youtube: "まだ転職を考えていない層にも",
    },
  },
  {
    item: "伝わるもの",
    values: {
      media: "条件とスペック",
      youtube: "働くリアル・人・空気",
    },
  },
  {
    item: "広がり方",
    values: {
      media: "掲載期間だけ・拡散しない",
      youtube: "SNS・関連動画で広がる",
    },
  },
  {
    item: "掲載が終わると",
    values: {
      media: "掲載終了で消える",
      youtube: "検索され、見られ続ける",
    },
  },
  {
    item: "費用の性質",
    values: {
      media: "出すたびに消える広告費",
      youtube: "積み上がる採用資産",
    },
  },
];

/**
 * S7 — なぜYouTubeなのか。採用サイト／求人媒体／YouTube を項目別に比較。
 * YouTube列を強調し、"消える広告"→"貯まる資産"の転換を伝える。
 */
export function Youtube() {
  return (
    <section className="bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow mb-4">WHY YOUTUBE</p>
          <h2 className="text-2xl font-bold leading-snug text-[var(--text-primary)] sm:text-4xl">
            なぜ、YouTubeなのか。
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-base">
            同じ採用予算でも、&quot;どこに使うか&quot;で残るものは変わります。
          </p>
        </Reveal>

        {/* 項目別の比較表 */}
        <Reveal delay={100} className="mt-12">
          <div className="no-scrollbar overflow-x-auto">
            <table className="w-full min-w-[440px] border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th className="w-[26%] px-4 py-4 align-bottom" />
                  {COLUMNS.map((col) => {
                    const isYt = col.key === "youtube";
                    return (
                      <th
                        key={col.key}
                        className={`px-4 py-4 align-bottom ${
                          isYt
                            ? "rounded-t-2xl bg-[var(--brand-soft)]"
                            : ""
                        }`}
                      >
                        <span
                          className={`font-latin block text-base font-bold sm:text-lg ${
                            isYt ? "text-[var(--brand-ink)]" : "text-[var(--text-primary)]"
                          }`}
                        >
                          {col.label}
                        </span>
                        {col.note && (
                          <span
                            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                              isYt
                                ? "bg-[var(--brand)] text-[var(--brand-ink)]"
                                : "bg-[var(--bg)] text-[var(--ink-mute)] line-through"
                            }`}
                          >
                            {col.note}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => {
                  const isCost = row.item === "費用の性質";
                  const isLast = i === ROWS.length - 1;
                  return (
                    <tr key={row.item}>
                      <th
                        scope="row"
                        className="border-t border-[var(--line)] px-4 py-5 align-top text-sm font-semibold text-[var(--ink-mute)]"
                      >
                        {row.item}
                      </th>
                      {COLUMNS.map((col) => {
                        const isYt = col.key === "youtube";
                        return (
                          <td
                            key={col.key}
                            className={`border-t border-[var(--line)] px-4 py-5 align-top text-[15px] leading-relaxed ${
                              isYt
                                ? `bg-[var(--brand-soft)] font-semibold text-[var(--brand-ink)] ${
                                    isLast ? "rounded-b-2xl" : ""
                                  }`
                                : isCost
                                  ? "text-[var(--ink-mute)]"
                                  : "text-[var(--ink)]"
                            }`}
                          >
                            {row.values[col.key]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-12 text-center">
          <p className="text-xl font-bold leading-relaxed text-[var(--text-primary)] sm:text-2xl">
            採用広報を、&quot;消える広告&quot;から&quot;貯まる資産&quot;へ。
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--ink-soft)]">
            一度つくった動画が、検索され、拡散され、見られ続ける。
            <br className="hidden sm:block" />
            これができるのは、YouTubeだけです。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
