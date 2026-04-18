import { mentorBlocks } from "@/data/site-content";

export function MentorSection() {
  return (
    <section id="mentors" className="scroll-mt-28 border-t border-[var(--line)] bg-[var(--surface)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] md:text-3xl">
          あなたの合格と夢を支えるメンター
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          「正解のない入試」だからこそ、決めつけずに寄り添う。ステラでは、指導者をメンターと呼び、対話を中心に伴走します。
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {mentorBlocks.map((m) => (
            <article key={m.title} className="rounded-2xl border border-[var(--line)] bg-white p-6">
              <h3 className="text-base font-bold text-[var(--ink)]">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{m.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-[var(--muted)]">
          メンター紹介の詳細ページは、公開時に追加できます。
        </p>
      </div>
    </section>
  );
}
