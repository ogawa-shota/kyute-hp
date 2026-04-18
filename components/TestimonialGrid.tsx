import { testimonials } from "@/data/site-content";

export function TestimonialGrid() {
  return (
    <section id="voices" className="scroll-mt-28 border-t border-[var(--line)] bg-[var(--surface)] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] md:text-3xl">
          卒塾生の声
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-[var(--muted)]">
          一人ひとりの背景は違って当然です。だからこそ、プロフィールとセットで読み比べてみてください。
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm"
            >
              <figcaption className="text-xs font-semibold text-[var(--brand)]">
                Voice
              </figcaption>
              <blockquote className="mt-3 flex-1">
                <p className="text-base font-bold text-[var(--ink)]">{t.headline}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                  {t.body}
                </p>
              </blockquote>
              <div className="mt-6 border-t border-[var(--line)] pt-4 text-sm">
                <p className="font-bold text-[var(--ink)]">
                  {t.school} {t.faculty}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">{t.profile}</p>
              </div>
            </figure>
          ))}
        </div>
        <p className="mt-10 text-center">
          <span className="text-sm text-[var(--muted)]">
            ※一覧ページは公開時にリンクを設定してください
          </span>
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
          >
            LINEで資料請求
          </a>
          <a
            href="#consult"
            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--ink)] shadow-sm transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            受験相談を予約
          </a>
        </div>
      </div>
    </section>
  );
}
