export function ExamInfoStrip() {
  return (
    <section id="exam-info" className="scroll-mt-28 bg-white py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)] md:text-2xl">
          入試情報・学びのヒント
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          総合型選抜の最新トレンド、小論文の型、面接で聞かれやすい論点など、学びの入口となる記事・説明会情報を順次公開していきます（準備中のページは順次リンクを有効化予定）。
        </p>
        <ul className="mt-6 flex flex-wrap gap-3 text-sm">
          <li>
            <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-[var(--ink)]">
              総合型選抜とは
            </span>
          </li>
          <li>
            <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-[var(--ink)]">
              大学別の注意点
            </span>
          </li>
          <li>
            <span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-[var(--ink)]">
              受験お役立ち記事
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
