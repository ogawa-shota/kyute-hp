import type { MetadataRoute } from "next";
import { VISIBLE_SERVICES, getColumns } from "@/lib/column";
import { SITE_URL } from "./seo";

type Entry = MetadataRoute.Sitemap[number];

// Corporate pages. PACE is indexable; other ad LPs remain outside the sitemap.
const RENEWED = "2026-10-15";
const PAGES: [string, string, Entry["changeFrequency"], number][] = [
  ["/", RENEWED, "weekly", 1.0],
  ["/service", RENEWED, "monthly", 0.8],
  ["/service/recruit-video", RENEWED, "monthly", 0.9],
  ["/service/recruit-youtube", RENEWED, "monthly", 0.9],
  ["/media", RENEWED, "monthly", 0.8],
  ["/works", RENEWED, "monthly", 0.8],
  ["/about", RENEWED, "monthly", 0.7],
  ["/download", RENEWED, "monthly", 0.7],
  ["/contact", RENEWED, "monthly", 0.7],
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
    {
      url: "https://www.kyute.jp/lp/pace",
      lastModified: "2026-10-16",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${SITE_URL}/column`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...VISIBLE_SERVICES
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
