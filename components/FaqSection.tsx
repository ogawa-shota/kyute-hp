const items = [
  {
    q: "オンラインだけでも受講できますか？",
    a: "はい。ライブ指導とチャット添削を組み合わせ、対面と同等の密度を目指すプランをご用意しています（詳細は資料で）。",
  },
  {
    q: "一般入試との併願は相談できますか？",
    a: "可能です。出願スケジュールと学習配分を一緒に整理し、負荷が偏らないよう伴走します。",
  },
  {
    q: "体験や説明会はありますか？",
    a: "説明会・個別相談の枠を設けています。最新日程はLINEまたはお問い合わせフォームでご案内します。",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-28 border-t border-[var(--line)] bg-[var(--surface)] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] md:text-3xl">
          よくある質問
        </h2>
        <div className="mt-10 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[var(--line)] bg-white p-5 open:bg-[var(--surface)]"
            >
              <summary className="cursor-pointer list-none text-sm font-bold text-[var(--ink)] marker:content-none">
                <span className="flex items-start justify-between gap-3">
                  <span>Q. {item.q}</span>
                  <span className="text-[var(--brand)] transition group-open:rotate-45">＋</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">A. {item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
