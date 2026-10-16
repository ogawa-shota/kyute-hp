import type { Metadata } from "next";

// The live apex domain redirects here. Keep canonical, sitemap and schema aligned.
export const SITE_URL = "https://www.kyute.jp";

export const SITE_TITLE =
  "KYUTE｜カルチャーを体験させる、面白い採用動画";

export const SITE_DESCRIPTION =
  "KYUTEは、人・仕事・カルチャーの魅力を最後まで見たくなる映像にする採用動画制作と、認知を取って心を掴んで離さない採用YouTube運用代行を提供しています。";

export const OG_DESCRIPTION =
  "カルチャーを体験させる、面白い採用動画。KYUTEの採用動画制作・採用YouTube運用代行。";

export function pageRobots(noindex = false): Metadata["robots"] {
  const preview = process.env.VERCEL_ENV === "preview";
  return {
    index: !preview && !noindex,
    follow: !preview,
    googleBot: { index: !preview && !noindex, follow: !preview, "max-image-preview": "large" },
  };
}

/** Each route supplies its own URL and copy; never inherit the homepage URL. */
export function pageMetadata({ path, title, description, image = "/og.jpg", noindex = false }: {
  path: string;
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: new URL(path, SITE_URL).toString() },
    robots: pageRobots(noindex),
    openGraph: {
      type: "website", locale: "ja_JP", siteName: "KYUTE",
      title, description, url: new URL(path, SITE_URL).toString(),
      images: [{ url: image, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** Escape HTML-significant input before inserting JSON-LD into a script element. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "KYUTE",
  legalName: "KYUTE合同会社",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/kyute-logo.png`,
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    ORGANIZATION,
    {
      "@type": "WebSite", "@id": `${SITE_URL}/#website`,
      name: "KYUTE", url: `${SITE_URL}/`, inLanguage: "ja",
      publisher: { "@id": ORGANIZATION["@id"] },
    },
  ],
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

export function serviceSchema(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org", "@type": "Service",
    "@id": `${SITE_URL}${path}#service`, name, description,
    url: `${SITE_URL}${path}`, provider: ORGANIZATION,
  };
}
