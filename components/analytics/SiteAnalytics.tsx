"use client";

import { Analytics } from "@vercel/analytics/next";
import { redactAnalyticsUrl } from "@/lib/analytics";
import { GoogleAnalytics } from "./GoogleAnalytics";

/** GA4 needs both a real production ID and the visitor's explicit permission. */
export function SiteAnalytics() {
  return <><Analytics beforeSend={redactAnalyticsUrl} /><GoogleAnalytics /></>;
}
