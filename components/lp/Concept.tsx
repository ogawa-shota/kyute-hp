import { Reveal } from "./Reveal";

const POINTS = [
  {
    title: "Real Story",
    body: "求人票に載らない現場の空気、働く人の言葉、意思決定の背景まで掘り起こします。",
  },
  {
    title: "Recruiting Media",
    body: "単発動画ではなく、候補者が何度も接触できる採用広報の資産として設計します。",
  },
  {
    title: "Conversion Design",
    body: "応募、面接、承諾、定着まで、採用ファネル上の行動変化を見据えて運用します。",
  },
];

export function Concept() {
  return (
    <section className="bg-[var(--ink-strong)] py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="eyebrow mb-6">FOR RECRUITMENT</p>
            <h2 className="font-latin text-[3.25rem] font-semibold uppercase leading-[0.9] tracking-normal text-white sm:text-[5.6rem] lg:text-[7.4rem]">
              Real
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-xl font-semibold leading-[1.75] text-white text-balance sm:text-3xl">
              採用広報に必要なのは、
              <br />
              会社を大きく見せることではなく、
              <br />
              正しく深く伝わること。
            </p>
            <p className="mt-7 text-[15px] leading-[2.1] text-white/80 sm:text-base">
              KYUTEは、密着動画を起点に候補者の理解を深めます。企業のリアルを編集しすぎず、でも伝わる構造に整えることで、応募前の不安と入社後のギャップを減らします。
            </p>
          </div>
        </Reveal>

        <div className="mt-16 border-t border-white/15">
          {POINTS.map((point, index) => (
            <Reveal
              key={point.title}
              delay={index * 90}
              className="grid gap-5 border-b border-white/15 py-7 sm:grid-cols-[120px_0.8fr_1.2fr] sm:items-baseline"
            >
              <span className="font-latin text-sm font-semibold tracking-[0.22em] text-[var(--brand)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-latin text-2xl font-semibold uppercase tracking-normal text-white">
                {point.title}
              </h3>
              <p className="text-sm leading-[1.9] text-white/75 sm:justify-self-end">
                {point.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
