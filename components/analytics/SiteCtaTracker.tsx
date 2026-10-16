"use client";

import { useEffect } from "react";
import { ctaEvent, sendAnalyticsEvent } from "@/lib/analytics";

export function SiteCtaTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("a[data-cta]");
      if (!target) return;
      sendAnalyticsEvent(ctaEvent({
        cta: target.dataset.cta ?? "",
        href: target.getAttribute("href") ?? "",
        path: window.location.pathname,
      }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
