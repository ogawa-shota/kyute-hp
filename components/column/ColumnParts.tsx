import Link from "next/link";
import { CtaButton } from "@/components/lp/CtaButton";
import { SERVICES, type Column, type ServiceId } from "@/lib/column";

export function formatDate(date?: string) {
  return date ? date.replaceAll("-", ".") : "";
}

/** Category filter shared by the list and category pages. */
export function CategoryNav({ current }: { current?: ServiceId }) {
  const items: { href: string; label: string; active: boolean }[] = [
    { href: "/column", label: "すべて", active: !current },
    ...(Object.keys(SERVICES) as ServiceId[]).map((id) => ({
      href: `/column/category/${id}`,
      label: SERVICES[id].label,
      active: current === id,
    })),
  ];
  return (
    <nav aria-label="カテゴリ" className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            item.active
              ? "border-[var(--ink-strong)] bg-[var(--ink-strong)] text-white"
              : "border-[var(--line)] text-[var(--ink-soft)] hover:border-[var(--ink-strong)]"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function ColumnCard({ column }: { column: Column }) {
  return (
    <article className="group flex flex-col gap-3">
      <Link href={`/column/${column.slug}`} className="flex flex-col gap-3">
        <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[var(--bg-soft)]">
          {column.eyecatch && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={column.eyecatch.src}
              alt={column.eyecatch.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--ink-mute)]">
          <span className="whitespace-nowrap rounded-full bg-[var(--brand-soft)] px-3 py-1 text-[var(--brand-ink)]">
            {SERVICES[column.service].label}
          </span>
          <time dateTime={column.publishedAt}>{formatDate(column.publishedAt)}</time>
          {column.status !== "published" && <DraftBadge status={column.status} />}
        </div>
        <h2 className="text-lg font-bold leading-[1.6] text-[var(--text-primary)] group-hover:text-[var(--brand-ink)]">
          {column.title}
        </h2>
      </Link>
    </article>
  );
}

export function DraftBadge({ status }: { status: Column["status"] }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-[var(--ink-strong)] px-3 py-1 text-xs font-bold text-[var(--ink-strong)]">
      {status === "review" ? "レビュー中" : "下書き"}・非公開
    </span>
  );
}

export function ColumnGrid({ columns }: { columns: Column[] }) {
  if (columns.length === 0) {
    return <p className="text-[var(--ink-soft)]">記事は準備中です。</p>;
  }
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {columns.map((c) => (
        <ColumnCard key={c.slug} column={c} />
      ))}
    </div>
  );
}

/** End-of-article CTA, chosen by the article's service or explicit cta. */
export function ColumnCta({ column }: { column: Column }) {
  const { cta } = column;
  return (
    <aside className="rounded-2xl bg-[var(--ink-strong)] px-6 py-10 text-white sm:px-10">
      <p className="text-sm font-bold tracking-wide text-[var(--brand)]">{cta.eyebrow}</p>
      <p className="mt-3 text-2xl font-bold leading-[1.5]">{cta.title}</p>
      <p className="mt-3 leading-[1.9] text-white/80">{cta.body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <CtaButton href={cta.href} cta={`column-${column.slug}`}>
          {cta.label}
        </CtaButton>
        <CtaButton href="/contact" variant="secondary" onDark cta={`column-${column.slug}-contact`}>
          無料で相談する
        </CtaButton>
      </div>
    </aside>
  );
}

export function AuthorBox({ column }: { column: Column }) {
  const { author } = column;
  return (
    <section aria-label="この記事を書いた人" className="flex gap-5 rounded-2xl bg-[var(--bg-soft)] p-6">
      {author.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={author.image} alt="" className="h-16 w-16 flex-none rounded-full object-cover" />
      )}
      <div>
        <p className="text-sm text-[var(--ink-mute)]">この記事を書いた人</p>
        <p className="mt-1 font-bold text-[var(--text-primary)]">
          {author.name}
          <span className="ml-2 text-sm font-normal text-[var(--ink-soft)]">{author.role}</span>
        </p>
        <p className="mt-2 text-[15px] leading-[1.9] text-[var(--ink-soft)]">{author.bio}</p>
      </div>
    </section>
  );
}
