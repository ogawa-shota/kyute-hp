import { newsItems } from "@/data/site-content";

export function NewsSection() {
  return (
    <section id="news" className="bg-section-soft py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">News</p>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-[var(--ink)] md:text-5xl">
              <span className="font-script text-2xl font-normal text-[var(--brand)] md:text-3xl">
                latest updates
              </span>
              <span className="mt-3 block">最新のお知らせ。</span>
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] transition hover:text-[var(--brand)]"
          >
            一覧を見る
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
        </div>

        <ul className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)] bg-white/60 backdrop-blur">
          {newsItems.map((n) => (
            <li key={n.title}>
              <a
                href={n.href}
                className="group grid items-center gap-3 px-2 py-6 transition hover:bg-white sm:grid-cols-[120px_120px_1fr_24px] sm:gap-6 sm:px-6"
              >
                <span className="font-latin text-sm tracking-wider text-[var(--ink-mute)]">
                  {n.date}
                </span>
                <span className="inline-flex w-fit items-center justify-center rounded-full border border-[var(--line)] px-3 py-1 text-[11px] font-semibold tracking-wider text-[var(--brand)]">
                  {n.category}
                </span>
                <span className="text-sm font-medium text-[var(--ink)] transition group-hover:text-[var(--brand)]">
                  {n.title}
                </span>
                <span className="hidden text-[var(--ink-mute)] transition group-hover:translate-x-1 group-hover:text-[var(--brand)] sm:block">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
