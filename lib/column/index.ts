import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import {
  CTAS,
  SERVICES,
  ctaFor,
  isPublic,
  readAuthors,
  readColumns,
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
  cta: (typeof CTAS)[CtaId];
  author: Author;
  status: "draft" | "review" | "published";
  publishedAt?: string;
  updatedAt?: string;
  eyecatch?: { src: string; alt: string };
  body: string;
};

export { SERVICES };

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
    .filter(({ data }) => showDrafts || isPublic(data))
    .map(({ data, body }) => ({
      slug: data.slug,
      title: data.title,
      description: data.description,
      service: data.service,
      keyword: data.keyword,
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
  return service ? all.filter((c) => c.service === service) : all;
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

export async function renderMarkdown(body: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
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
