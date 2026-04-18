import { worries } from "@/data/site-content";

export function WorrySection() {
  return (
    <section id="about" className="scroll-mt-28 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] md:text-3xl">
          こんなお悩み、ありませんか？
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-[var(--muted)]">
          総合型選抜は情報量が多く、ひとりで抱え込みやすい入試です。最初の一歟を一緒に整理しましょう。
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {worries.map((w) => (
            <article
              key={w.title}
              className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-[var(--ink)]">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {w.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
