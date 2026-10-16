"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Sends a `column_cta_click` event (Vercel Analytics custom event) for every
 * click on an element with data-cta while a column article is open: in-body
 * cards, the end-of-article CTA, and the site header / mobile bar.
 */
export function ColumnCtaTracker({ slug, service }: { slug: string; service: string }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cta]");
      if (!target) return;
      const cta = target.dataset.cta ?? "";
      const position = cta.startsWith("column-inline-") ? "inline" : cta.startsWith("column-end-") ? "end" : "site";
      track("column_cta_click", { slug, service, cta, position, href: target.getAttribute("href") ?? "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [slug, service]);
  return null;
}
