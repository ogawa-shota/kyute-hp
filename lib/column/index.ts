import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import {
  CTAS,
  INLINE_CTA_RE,
  SERVICES,
  ctaFor,
  isPublic,
  readAuthors,
  readColumns,
  visibleServiceIds,
} from "./core.mjs";

export type ServiceId = keyof typeof SERVICES;
export type CtaId = keyof typeof CTAS;

export type Author = {
  name: string;
  role: string;
  bio: string;
  image?: string;
};

export type Column = {
  slug: string;
  title: string;
  description: string;
  service: ServiceId;
  keyword: string;
  ctaId: CtaId;
  cta: (typeof CTAS)[CtaId];
  author: Author;
  status: "draft" | "review" | "published";
  publishedAt?: string;
  updatedAt?: string;
  eyecatch?: { src: string; alt: string };
  body: string;
};

export { SERVICES };

/** Services with a public category tab and page. */
export const VISIBLE_SERVICES = visibleServiceIds() as ServiceId[];

/**
 * Drafts are visible locally and on Vercel preview deployments (which are
 * noindex), so a reviewer can read the article from the PR's preview link.
 */
const showDrafts =
  process.env.NODE_ENV !== "production" ||
  process.env.VERCEL_ENV === "preview";

function load(): Column[] {
  const authors = readAuthors() as Record<string, Author>;
  return readColumns()
    // Hidden services stay out of lists everywhere; their drafts are still
    // reachable by URL on previews so a reviewer can read them.
    .filter(({ data }) => showDrafts || isPublic(data))
    .map(({ data, body }) => ({
      slug: data.slug,
      title: data.title,
      description: data.description,
      service: data.service,
      keyword: data.keyword,
      ctaId: ctaFor(data) as CtaId,
      cta: CTAS[ctaFor(data) as CtaId],
      author: authors[data.author],
      status: data.status,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      eyecatch: data.eyecatch,
      body,
    }))
    .sort((a, b) =>
      (b.publishedAt ?? "9999").localeCompare(a.publishedAt ?? "9999"),
    );
}

export function getColumns(service?: ServiceId): Column[] {
  const all = load();
  return service
    ? all.filter((c) => c.service === service)
    : all.filter((c) => VISIBLE_SERVICES.includes(c.service));
}

/** Every article this build may render, including hidden-service drafts on previews. */
export function getAllColumns(): Column[] {
  return load();
}

export function getColumn(slug: string): Column | undefined {
  return load().find((c) => c.slug === slug);
}

export function getRelated(column: Column, limit = 3): Column[] {
  return getColumns(column.service)
    .filter((c) => c.slug !== column.slug)
    .slice(0, limit);
}

const YOUTUBE_RE =
  /^https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;

type MdNode = {
  type: string;
  url?: string;
  alt?: string | null;
  title?: string | null;
  value?: string;
  children?: MdNode[];
  data?: Record<string, unknown>;
};

/** A paragraph that holds only a YouTube URL becomes an embedded player. */
function remarkYouTube() {
  return (tree: MdNode) => {
    const visit = (node: MdNode) => {
      for (const child of node.children ?? []) {
        const only = child.children?.length === 1 ? child.children[0] : null;
        const url = only?.type === "link" ? only.url : only?.value;
        const id = child.type === "paragraph" && url ? YOUTUBE_RE.exec(url)?.[1] : undefined;
        if (id) {
          child.data = {
            hName: "div",
            hProperties: { className: ["column-video"] },
            hChildren: [
              {
                type: "element",
                tagName: "iframe",
                properties: {
                  src: `https://www.youtube-nocookie.com/embed/${id}`,
                  title: "YouTube動画",
                  loading: "lazy",
                  allow: "accelerometer; encrypted-media; gyroscope; picture-in-picture",
                  allowFullScreen: true,
                },
                children: [],
              },
            ],
          };
        } else {
          visit(child);
        }
      }
    };
    visit(tree);
  };
}

type HastNode = {
  type: "element" | "text";
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

const el = (tagName: string, properties: Record<string, unknown>, children: HastNode[] = []): HastNode => ({
  type: "element",
  tagName,
  properties,
  children,
});
const text = (value: string): HastNode => ({ type: "text", value });

/**
 * A line `<!-- cta: <id> -->` becomes an in-body CTA card built from CTAS.
 * Unknown ids render nothing (the checker reports them).
 */
function remarkInlineCta() {
  const marker = new RegExp(INLINE_CTA_RE.source);
  return (tree: MdNode) => {
    tree.children = (tree.children ?? []).flatMap((node) => {
      const id = node.type === "html" ? marker.exec(node.value ?? "")?.[1] : undefined;
      if (!id) return [node];
      const cta = CTAS[id as CtaId];
      if (!cta) return [];
      return [
        {
          type: "columnCta",
          data: {
            hName: "aside",
            hProperties: { className: ["column-inline-cta"], "aria-label": cta.eyebrow },
            hChildren: [
              el("p", { className: ["column-inline-cta-eyebrow"] }, [text(cta.eyebrow)]),
              el("p", { className: ["column-inline-cta-title"] }, [text(cta.title)]),
              el("p", { className: ["column-inline-cta-body"] }, [text(cta.body)]),
              el("a", { href: cta.href, className: ["column-inline-cta-button"], dataCta: `column-inline-${id}` }, [
                text(cta.label),
              ]),
            ],
          },
        },
      ];
    });
  };
}

/**
 * Images load lazily. An image alone in a paragraph with a title
 * (`![alt](/column/x/a.png "caption")`) becomes a figure with a caption.
 * A blockquote that starts with [!POINT] or [!NOTE] becomes a labelled box.
 */
function remarkFigures() {
  const CALLOUTS: Record<string, string> = { POINT: "ポイント", NOTE: "補足" };
  return (tree: MdNode) => {
    const visit = (node: MdNode) => {
      for (const child of node.children ?? []) {
        if (child.type === "image") {
          child.data = { hProperties: { loading: "lazy", decoding: "async" } };
        }
        const only = child.children?.length === 1 ? child.children[0] : null;
        if (child.type === "paragraph" && only?.type === "image" && only.title) {
          child.data = {
            hName: "figure",
            hChildren: [
              el("img", { src: only.url, alt: only.alt ?? "", loading: "lazy", decoding: "async" }),
              el("figcaption", {}, [text(only.title)]),
            ],
          };
          continue;
        }
        if (child.type === "blockquote") {
          const first = child.children?.[0]?.children?.[0];
          const m = first?.type === "text" ? /^\[!(POINT|NOTE)\][ \t]*\n?/.exec(first.value ?? "") : null;
          if (first && m) {
            first.value = (first.value ?? "").slice(m[0].length);
            child.data = {
              hProperties: { className: ["column-callout"], dataLabel: CALLOUTS[m[1]] },
            };
          }
        }
        visit(child);
      }
    };
    visit(tree);
  };
}

export async function renderMarkdown(body: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkInlineCta)
    .use(remarkFigures)
    .use(remarkYouTube)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(body);
  return String(file);
}

/** The table of contents, taken from the ## headings. */
export function headings(html: string): { id: string; text: string }[] {
  return [...html.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, ""),
  }));
}
