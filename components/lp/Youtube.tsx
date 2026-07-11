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
 * S7 — なぜYouTubeなのか。求人媒体／YouTube を項目別に比較。
 * YouTube列を強調し、"消える広告"→"貯まる資産"の転換を伝える。
 */
export function Youtube() {
  return (
    <section id="why-youtube" className="scroll-mt-16 bg-soft py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="section-header-split">
          <div>
            <p className="eyebrow mb-4">WHY YOUTUBE</p>
            <h2 className="section-title text-[var(--text-primary)]">
              なぜ、YouTubeなのか。
            </h2>
          </div>
          <p className="section-lead md:justify-self-end">
            同じ採用予算でも、&quot;どこに使うか&quot;で残るものは変わります。
            求人媒体との違いを、採用活動の時間軸で比較します。
          </p>
        </Reveal>

        {/* Mobile: 横スクロールを避け、比較軸ごとに縦読みする */}
        <Reveal delay={100} className="mt-10 md:hidden">
          <div className="border-t border-[var(--line)]">
            {ROWS.map((row) => (
              <section key={row.item} className="border-b border-[var(--line)] py-6">
                <h3 className="text-sm font-semibold text-[var(--ink-mute)]">{row.item}</h3>
                <dl className="mt-4 grid grid-cols-2 gap-3">
                  <div className="min-w-0 py-2 pr-2">
                    <dt className="text-xs font-semibold text-[var(--ink-mute)]">求人媒体</dt>
                    <dd className="mt-2 text-sm leading-[1.75] text-[var(--ink)]">
                      {row.values.media}
                    </dd>
                  </div>
                  <div className="min-w-0 rounded-lg bg-[var(--brand-soft)] p-3">
                    <dt className="text-xs font-semibold text-[var(--brand-ink)]">YouTube</dt>
                    <dd className="mt-2 text-sm font-semibold leading-[1.75] text-[var(--brand-ink)]">
                      {row.values.youtube}
                    </dd>
                  </div>
                </dl>
              </section>
            ))}
          </div>
        </Reveal>

        {/* Desktop: 項目別の比較表 */}
        <Reveal delay={100} className="mt-16 hidden md:block">
          <div>
            <table className="w-full border-separate border-spacing-0 text-left">
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
                        className="border-t border-[var(--line)] px-5 py-6 align-top text-sm font-semibold text-[var(--ink-mute)]"
                      >
                        {row.item}
                      </th>
                      {COLUMNS.map((col) => {
                        const isYt = col.key === "youtube";
                        return (
                          <td
                            key={col.key}
                            className={`border-t border-[var(--line)] px-5 py-6 align-top text-base leading-[1.8] ${
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

        <Reveal delay={160} className="mt-12 border-l-2 border-[var(--brand)] pl-5 md:mt-16 md:pl-7">
          <p className="max-w-3xl text-xl font-bold leading-[1.65] text-[var(--text-primary)] sm:text-2xl">
            採用広報を、&quot;消える広告&quot;から&quot;貯まる資産&quot;へ。
          </p>
          <p className="mt-4 max-w-2xl text-base leading-[1.9] text-[var(--ink-soft)]">
            一度つくった動画が、検索され、拡散され、見られ続ける。
            <br className="hidden sm:block" />
            これができるのは、YouTubeだけです。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
