import Image from "next/image";
import { OWNED_VIDEOS, thumb } from "./data";

/** Notifications crowding the reader's attention (情報過多). Decorative. */
export function NoticeCloud() {
  const items = [
    { t: "新着メッセージ（12）", c: "left-[2%] top-[4%]" },
    { t: "おすすめの求人が届きました", c: "right-[0%] top-[14%]" },
    { t: "未読メール 128件", c: "left-[8%] top-[32%]" },
    { t: "今だけ無料", c: "right-[10%] top-[42%]", y: true },
    { t: "ライブ配信が始まりました", c: "left-[0%] top-[60%]" },
    { t: "あと3時間で終了！", c: "right-[2%] top-[74%]" },
  ];
  return (
    <div aria-hidden="true" className="relative h-[320px] w-full md:h-[380px]">
      {items.map((it) => (
        <span
          key={it.t}
          className={`absolute whitespace-nowrap rounded-2xl px-4 py-3 text-[14px] font-bold shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:text-[15px] ${it.c} ${it.y ? "bg-[var(--brand)]" : "border border-[var(--line)] bg-white"}`}
        >
          {!it.y && <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />}
          {it.t}
        </span>
      ))}
    </div>
  );
}

/** Year after year, recruiting money is spent and nothing remains. */
export function MoneyCycle() {
  return (
    <div className="mt-10 flex flex-col gap-3">
      {[1, 2, 3].map((y) => (
        <div key={y} className={`flex flex-wrap items-center gap-2 md:gap-3 ${y === 3 ? "opacity-60" : ""}`}>
          <p className="w-14 font-bold md:w-16">{y}年目</p>
          <span className="rounded-xl bg-[var(--brand)] px-3 py-2 text-[14px] font-bold md:px-4 md:py-3 md:text-[15px]">採用予算を投下</span>
          <span aria-hidden="true">→</span>
          <span className="rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-[14px] text-[var(--ink-soft)] md:px-4 md:py-3 md:text-[15px]">求人広告・媒体・スカウト</span>
          <span aria-hidden="true">→</span>
          <span className="rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-[14px] font-bold md:px-4 md:py-3 md:text-[15px]">応募が1件</span>
          <span aria-hidden="true">→</span>
          <span className="rounded-xl border border-dashed border-[var(--line)] px-3 py-2 text-[14px] text-[var(--ink-mute)] md:px-4 md:py-3 md:text-[15px]">残らない</span>
        </div>
      ))}
      <p className="mt-4 text-lg font-extrabold">毎年、同じことの繰り返し。</p>
    </div>
  );
}

/** Interest cools over time when there is no further contact. Concept, not data. */
export function HeartCurve() {
  const steps = [
    { t: "ちょっと気になる", bg: "#ffdb67", face: "◡" },
    { t: "その後、接点がない", bg: "#e8cf72", face: "◡" },
    { t: "他の情報に埋もれる", bg: "#c9c08a", face: "―" },
    { t: "忙しくて忘れかける", bg: "#a9ad9c", face: "︵" },
    { t: "気持ちが離れた", bg: "#8fa3b8", face: "︵" },
  ];
  return (
    <figure className="mt-10 rounded-3xl bg-white p-6 md:p-10">
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-5 md:items-start md:[--step:28px]">
        {steps.map((s, i) => (
          <li key={s.t} className="flex items-center gap-4 md:flex-col md:text-center" style={{ marginTop: `calc(var(--step, 0px) * ${i})` }}>
            <span aria-hidden="true" className="flex h-14 w-14 flex-none items-center justify-center rounded-full text-2xl font-bold text-[var(--ink-strong)] md:h-[72px] md:w-[72px]" style={{ background: s.bg }}>
              {s.face}
            </span>
            <span className="text-[16px] font-bold">{s.t}</span>
          </li>
        ))}
      </ol>
      <div aria-hidden="true" className="mt-6 h-1.5 rounded-full bg-gradient-to-r from-[#ffdb67] to-[#8fa3b8]" />
      <figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-[13px] text-[var(--ink-mute)]">
        <span>他社の求人・通知・日々の仕事に、関心が埋もれていく。※イメージを示す概念図です。実測データではありません。</span>
        <span>時間の経過 →</span>
      </figcaption>
    </figure>
  );
}

/** The three ways recruiting YouTube keeps contact (認知・接点・回遊). */
export function AnswerCards() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-3">
      <div className="rounded-3xl bg-white/[0.06] p-6">
        <div aria-hidden="true" className="rounded-2xl bg-white p-4 text-[var(--ink-strong)]">
          <p className="rounded-full border border-[var(--line)] px-4 py-2 text-[14px]">🔍 エンジニア 1日密着</p>
          <p className="mt-3 rounded-xl border-2 border-[var(--brand)] bg-[var(--bg-tint)] px-4 py-3 text-[14px] font-bold">貴社の動画<span className="block text-[12px] font-normal text-[var(--ink-soft)]">社名を知らなくても出会える</span></p>
        </div>
        <h3 className="mt-5 text-xl leading-[1.5]"><span className="text-[var(--brand)]">①</span> 会社名を知らない人にも届く</h3>
        <p className="mt-2 text-white/75">社名で検索していない人にも、動画が新しい入口になる。</p>
      </div>
      <div className="rounded-3xl bg-white/[0.06] p-6">
        <div aria-hidden="true" className="flex justify-around rounded-2xl bg-white p-4 text-[var(--ink-strong)]">
          {[["1日目", 0], ["1週間後", 2], ["1か月後", 1]].map(([label, slot]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="flex h-24 w-14 flex-col gap-1 rounded-lg border-[3px] border-[var(--ink-strong)] p-1">
                {[0, 1, 2, 3].map((n) => <span key={n} className={`h-full rounded ${n === slot ? "bg-[var(--brand)]" : "bg-[#eceae3]"}`} />)}
              </div>
              <span className="text-[12px]">{label}</span>
            </div>
          ))}
        </div>
        <h3 className="mt-5 text-xl leading-[1.5]"><span className="text-[var(--brand)]">②</span> おすすめで、何度も接点が生まれる</h3>
        <p className="mt-2 text-white/75">一度きりで終わらず、繰り返し表示されて記憶に残る。</p>
      </div>
      <div className="rounded-3xl bg-white/[0.06] p-6">
        <div aria-hidden="true" className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-4">
          {["密着動画", "社員インタビュー", "オフィスツアー", "座談会"].map((t) => (
            <span key={t} className="rounded-lg bg-[var(--ink-strong)] px-3 py-2 text-center text-[13px] font-bold text-white">▶ {t}</span>
          ))}
        </div>
        <h3 className="mt-5 text-xl leading-[1.5]"><span className="text-[var(--brand)]">③</span> いろんな動画を回遊して見てもらえる</h3>
        <p className="mt-2 text-white/75">見るほどに、企業への理解と好意が深まる。</p>
      </div>
    </div>
  );
}

function Stack({ n, cols }: { n: number; cols: number }) {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="relative block aspect-video overflow-hidden rounded-[3px]">
          <Image src={thumb(OWNED_VIDEOS[i % OWNED_VIDEOS.length].id)} alt="" fill sizes="80px" className="object-cover" />
        </span>
      ))}
    </div>
  );
}

/** Consumption vs. asset: budgets are used up; videos accumulate. */
export function AssetCompare() {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-[2fr_3fr]">
      <div className="rounded-3xl border border-[var(--line)] bg-white p-6 md:p-8">
        <p className="font-[family-name:var(--font-en)] text-[13px] font-bold tracking-[0.12em] text-[var(--ink-mute)]">CONSUME</p>
        <h3 className="mt-1 text-xl">消費型の採用</h3>
        <div aria-hidden="true" className="mt-6 grid grid-cols-3 gap-3">
          {["1年目", "2年目", "3年目"].map((y) => (
            <div key={y} className="flex flex-col items-center gap-2">
              <div className="flex h-32 w-full flex-col justify-end rounded-xl border-2 border-dashed border-[var(--line)] p-2">
                <span className="h-5 rounded-md bg-[var(--brand)]" />
              </div>
              <span className="text-[13px] text-[var(--ink-mute)]">使い切り・{y}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[15px] text-[var(--ink-soft)]">終わると効果が途切れ、翌年またゼロから。</p>
      </div>
      <div className="rounded-3xl bg-[var(--bg-tint)] p-6 md:p-8">
        <p className="font-[family-name:var(--font-en)] text-[13px] font-bold tracking-[0.12em] text-[var(--brand-ink)]">ASSET</p>
        <h3 className="mt-1 text-xl">資産型の採用｜採用YouTube</h3>
        <div aria-hidden="true" className="mt-6 grid grid-cols-4 items-end gap-3 md:gap-5">
          {[[1, 1, "1本"], [3, 1, "3本"], [10, 2, "10本"], [30, 3, "30本〜"]].map(([n, cols, label]) => (
            <div key={label as string} className="flex flex-col items-center gap-2">
              <div className="w-full"><Stack n={n as number} cols={cols as number} /></div>
              <span className="font-bold">{label}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[15px]">動画が積み上がり、チャンネルが育つ。候補者は、いろんな動画を見られるようになる。</p>
      </div>
    </div>
  );
}
