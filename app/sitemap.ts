import type { MetadataRoute } from "next";
import { SERVICES, getColumns } from "@/lib/column";
import { SITE_URL } from "./seo";

type Entry = MetadataRoute.Sitemap[number];

// Static pages, carried over unchanged from the former public/sitemap.xml.
const PAGES: [string, string, Entry["changeFrequency"], number][] = [
  ["/", "2026-07-11", "weekly", 1.0],
  ["/service", "2026-07-11", "weekly", 0.9],
  ["/service/youtube", "2026-07-11", "weekly", 0.9],
  ["/service/media", "2026-07-11", "weekly", 0.9],
  ["/about", "2026-07-11", "monthly", 0.7],
  ["/contact", "2026-07-11", "monthly", 0.8],
  ["/lp", "2026-09-09", "monthly", 0.8],
  ["/lp/day-in-the-life", "2026-09-09", "monthly", 0.8],
  ["/lp/pace", "2026-09-09", "monthly", 0.8],
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Only published articles; drafts never reach the sitemap, even on previews.
  const columns = getColumns().filter((c) => c.status === "published");
  const latest = columns[0]?.updatedAt ?? columns[0]?.publishedAt;

  return [
    ...PAGES.map(([path, lastModified, changeFrequency, priority]) => ({
      url: `${SITE_URL}${path === "/" ? "/" : path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    { url: `${SITE_URL}/column`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...(Object.keys(SERVICES) as (keyof typeof SERVICES)[])
      .filter((id) => columns.some((c) => c.service === id))
      .map((id) => ({
        url: `${SITE_URL}/column/category/${id}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
    ...columns.map((c) => ({
      url: `${SITE_URL}/column/${c.slug}`,
      lastModified: c.updatedAt ?? c.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
