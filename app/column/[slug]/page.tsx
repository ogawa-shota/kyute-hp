import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AuthorBox,
  ColumnCta,
  ColumnGrid,
  ColumnReferences,
  DraftBadge,
  formatDate,
} from "@/components/column/ColumnParts";
import { ColumnCtaTracker } from "@/components/column/CtaTracker";
import {
  SERVICES,
  VISIBLE_SERVICES,
  getAllColumns,
  getColumn,
  getRelated,
  headings,
  isPublic,
  renderMarkdown,
} from "@/lib/column";
import { breadcrumbSchema, jsonLd, ORGANIZATION, pageMetadata, SITE_URL } from "@/app/seo";
import "../column.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllColumns().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const column = getColumn(slug);
  if (!column) return {};
  return {
    ...pageMetadata({
      path: `/column/${column.slug}`, title: `${column.title}｜KYUTE`,
      description: column.description, image: column.eyecatch?.src,
      noindex: !isPublic(column),
    }),
    openGraph: {
      type: "article",
      siteName: "KYUTE",
      locale: "ja_JP",
      title: column.title,
      description: column.description,
      url: `/column/${column.slug}`,
      publishedTime: column.publishedAt,
      modifiedTime: column.updatedAt ?? column.publishedAt,
      images: column.eyecatch
        ? [{ url: column.eyecatch.src, alt: column.eyecatch.alt, width: 1600, height: 900 }]
        : ["/og.jpg"],
    },
  };
}

export default async function ColumnPage({ params }: Props) {
  const { slug } = await params;
  const column = getColumn(slug);
  if (!column) notFound();

  const html = await renderMarkdown(column.body);
  const toc = headings(html);
  const related = getRelated(column);
  const service = SERVICES[column.service];
  const url = `${SITE_URL}/column/${column.slug}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: column.title,
      description: column.description,
      datePublished: column.publishedAt,
      dateModified: column.updatedAt ?? column.publishedAt,
      author: { "@type": column.author.type ?? "Person", name: column.author.name, url: `${url}#author` },
      publisher: ORGANIZATION,
      inLanguage: "ja",
      citation: column.references,
      mainEntityOfPage: url,
      image: column.eyecatch ? new URL(column.eyecatch.src, SITE_URL).toString() : undefined,
    },
    breadcrumbSchema([
      { name: "トップ", path: "/" },
      { name: "コラム", path: "/column" },
      ...(VISIBLE_SERVICES.includes(column.service) ? [{ name: service.label, path: `/column/category/${column.service}` }] : []),
      { name: column.title, path: `/column/${column.slug}` },
    ]),
  ];

  return (
    <>
      <ColumnCtaTracker slug={column.slug} service={column.service} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <article className="pb-24 pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl px-5">
          <nav aria-label="パンくずリスト" className="text-sm text-[var(--ink-mute)]">
            <Link href="/" className="hover:text-[var(--brand-ink)]">トップ</Link>
            <span className="mx-2">›</span>
            <Link href="/column" className="hover:text-[var(--brand-ink)]">コラム</Link>
            {VISIBLE_SERVICES.includes(column.service) && <>
              <span className="mx-2">›</span>
              <Link href={`/column/category/${column.service}`} className="hover:text-[var(--brand-ink)]">
                {service.label}
              </Link>
            </>}
          </nav>

          {column.status !== "published" && (
            <div className="mt-6">
              <DraftBadge status={column.status} />
            </div>
          )}

          <h1 className="mt-6 text-[28px] font-bold leading-[1.5] text-[var(--text-primary)] sm:text-[36px]">
            {column.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--ink-mute)]">
            <span className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-[var(--brand-ink)]">{service.label}</span>
            {column.publishedAt && <time dateTime={column.publishedAt}>公開 {formatDate(column.publishedAt)}</time>}
            {column.updatedAt && <time dateTime={column.updatedAt}>更新 {formatDate(column.updatedAt)}</time>}
            <span>{column.author.name}</span>
          </div>

          {column.eyecatch && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={column.eyecatch.src}
              alt={column.eyecatch.alt}
              width={1600}
              height={900}
              fetchPriority="high"
              className="mt-10 aspect-[16/9] w-full rounded-2xl object-cover"
            />
          )}

          {toc.length >= 3 && (
            <nav aria-label="目次" className="mt-10 rounded-2xl border border-[var(--line)] p-6">
              <p className="font-bold text-[var(--text-primary)]">目次</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[var(--ink-soft)]">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="hover:text-[var(--brand-ink)]">{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="column-body mt-12" dangerouslySetInnerHTML={{ __html: html }} />

          <ColumnReferences references={column.references} />

          <div className="mt-16 flex flex-col gap-8">
            <ColumnCta column={column} />
            <AuthorBox column={column} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-[var(--bg-soft)] py-20">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <h2 className="mb-10 text-2xl font-bold text-[var(--text-primary)]">関連するコラム</h2>
            <ColumnGrid columns={related} />
          </div>
        </section>
      )}
    </>
  );
}
