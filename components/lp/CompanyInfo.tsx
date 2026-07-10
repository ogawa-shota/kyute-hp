import { Reveal } from "./Reveal";

// 差し替え: 所在地・連絡先などのプレースホルダーを実データに差し替えてください。
const COMPANY = [
  { label: "社名", value: "KYUTE" },
  {
    label: "事業内容",
    value: "採用YouTubeチャンネル運営代行 ／ 採用密着動画の制作 ／ 自社動画メディア運営",
  },
  { label: "所在地", value: "〒000-0000 —（差し替え）" },
  { label: "連絡先", value: "contact@kyute.jp（差し替え）" },
];

export function CompanyInfo() {
  return (
    <section id="company" className="scroll-mt-20 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">COMPANY</p>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
            会社概要
          </h2>
          <dl className="mt-8 divide-y divide-[var(--line-soft)] border-y border-[var(--line-soft)]">
            {COMPANY.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[7rem_1fr] gap-4 py-4 sm:grid-cols-[10rem_1fr]"
              >
                <dt className="text-sm text-[var(--ink-mute)]">{row.label}</dt>
                <dd className="text-sm leading-relaxed text-[var(--ink)]">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
