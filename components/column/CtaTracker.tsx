"use client";

import { useEffect } from "react";
import { ctaEvent, sendAnalyticsEvent } from "@/lib/analytics";

/**
 * Sends a `column_cta_click` event (Vercel Analytics custom event) for every
 * click on an element with data-cta while a column article is open: in-body
 * cards, the end-of-article CTA, and the site header / mobile bar.
 */
export function ColumnCtaTracker({ slug, service }: { slug: string; service: string }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("a[data-cta]");
      if (!target) return;
      sendAnalyticsEvent(ctaEvent({
        cta: target.dataset.cta ?? "",
        href: target.getAttribute("href") ?? "",
        path: window.location.pathname,
        column: { slug, service },
      }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [slug, service]);
  return null;
}
