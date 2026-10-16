"use client";

import { Analytics } from "@vercel/analytics/next";
import { redactAnalyticsUrl } from "@/lib/analytics";
import { GoogleAnalytics } from "./GoogleAnalytics";

/** Each sink has one owner. GA4 stays disabled until its measurement ID is set. */
export function SiteAnalytics() {
  return <><Analytics beforeSend={redactAnalyticsUrl} /><GoogleAnalytics /></>;
}
