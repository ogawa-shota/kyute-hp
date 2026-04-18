import { representative } from "@/data/site-content";

export function RepresentativeSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              Message
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold leading-snug text-[var(--ink)] md:text-3xl">
              ステラなら、志望校だけでなく
              <span className="text-[var(--brand)]">「将来の輪郭」</span>
              も描ける
            </h2>
            <p className="mt-2 text-sm font-semibold text-[var(--ink)]">{representative.name}</p>
          </div>
          <div className="space-y-6 text-sm leading-relaxed text-[var(--muted)]">
            <p>{representative.title}</p>
            <p>{representative.body}</p>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <h3 className="font-bold text-[var(--ink)]">ステラのお約束</h3>
              <p className="mt-2">{representative.promise}</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <h3 className="font-bold text-[var(--ink)]">教育ポリシー</h3>
              <p className="mt-2">{representative.policy}</p>
            </div>
            <a
              href="#about"
              className="inline-flex text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline"
            >
              もっとステラについて知る
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
