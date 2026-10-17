import { track } from "@vercel/analytics";

// Only public route shapes are accepted. Never pass form values, query strings,
// fragments, arbitrary external URLs, request IDs or DOM text to analytics.
const PUBLIC_PATH = /^(?:\/(?:service(?:\/(?:recruit-video|recruit-youtube))?|media|works|about|contact|download|analytics|column(?:\/category\/(?:recruit-video|recruit-youtube|general)|\/[a-z0-9]+(?:-[a-z0-9]+)*)?|lp(?:\/(?:recruit-video|recruit-youtube|day-in-the-life|undo-job))?)?)$/;
const SITE_ORIGINS = new Set(["https://kyute.jp", "https://www.kyute.jp"]);
const BASE_ORIGIN = "https://kyute.jp";
const IDENTIFIER = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function analyticsPath(value: string, currentPath = "/"): string {
  try {
    const url = new URL(value, `${BASE_ORIGIN}${currentPath.startsWith("/") ? currentPath : "/"}`);
    if (!SITE_ORIGINS.has(url.origin)) return "";
    const path = url.pathname.replace(/\/$/, "") || "/";
    return path.length <= 160 && PUBLIC_PATH.test(path) ? path : "";
  } catch {
    return "";
  }
}

export function serviceForPath(path: string): string {
  if (path.endsWith("/recruit-video")) return "recruit-video";
  if (path.endsWith("/recruit-youtube")) return "recruit-youtube";
  return "general";
}

export function isColumnArticlePath(path: string): boolean {
  return /^\/column\/[a-z0-9]+(?:-[a-z0-9]+)*\/?$/.test(path);
}

type ColumnContext = { slug: string; service: string };

export function ctaEvent({ cta, href, path, column }: {
  cta: string;
  href: string;
  path: string;
  column?: ColumnContext;
}): { name: string; properties: Record<string, string> } | null {
  if (!IDENTIFIER.test(cta) || cta.length > 100) return null;
  const source = analyticsPath(path);
  const destination = analyticsPath(href, source);
  if (!source || !href || !destination) return null;

  if (column) {
    if (!IDENTIFIER.test(column.slug) || column.slug.length > 120) return null;
    const service = ["recruit-video", "recruit-youtube", "general", "ai-casual-interview", "experience-briefing"].includes(column.service) ? column.service : "general";
    const position = cta.startsWith("column-inline-") ? "inline" : cta.startsWith("column-end-") ? "end" : "site";
    // Keep the existing name and property keys. href now contains path only;
    // cta remains the way to distinguish a price link from a download link.
    return { name: "column_cta_click", properties: { slug: column.slug, service, cta, position, href: destination } };
  }

  // Article clicks belong exclusively to ColumnCtaTracker, including chrome.
  if (isColumnArticlePath(source)) return null;
  const position = ["header", "footer", "mobile"].find((prefix) => cta.startsWith(`${prefix}-`)) ?? "body";
  const service = serviceForPath(destination) === "general" ? serviceForPath(source) : serviceForPath(destination);
  return { name: "site_cta_click", properties: { path: source, cta, position, href: destination, service } };
}

export function sendAnalyticsEvent(event: ReturnType<typeof ctaEvent>): void {
  if (!event) return;
  try {
    track(event.name, event.properties);
  } catch {
    // Analytics availability must never change navigation or a successful form.
  }
  try {
    const google = typeof window !== "undefined" ? window.kyuteAnalytics : undefined;
    if (!google) return;
    const context = googlePageContext(window.location.pathname, google.referrer);
    if (!context) return;
    // A material request is an initial lead, never a qualified lead or sale.
    const name = event.name === "material_request_success" ? "generate_lead" : event.name;
    google.send("event", name, { ...event.properties, ...context, send_to: google.measurementId });
  } catch {
    // Keep Google availability independent of both the Vercel sink and the UI.
  }
}

export function trackMaterialRequestSuccess(endpoint: string, path: string): void {
  const service = endpoint === "/api/material-request" ? "recruit-video" : endpoint === "/api/culture-material" ? "recruit-youtube" : null;
  const source = analyticsPath(path);
  if (!service || !source) return;
  sendAnalyticsEvent({ name: "material_request_success", properties: {
    path: source,
    service,
    form_id: service === "recruit-video" ? "material-request" : "culture-material",
  } });
}

/** Vercel's transport expects an absolute URL. Its URL has no query or hash. */
export function redactAnalyticsUrl<T extends { url: string }>(event: T): T | null {
  try {
    const url = new URL(event.url);
    const path = analyticsPath(url.pathname);
    if (!path) return null;
    return { ...event, url: `${url.origin}${path}` };
  } catch {
    return null;
  }
}

type GoogleTag = (...args: unknown[]) => void;
export type AnalyticsConsent = "granted" | "denied" | null;
export const ANALYTICS_CONSENT_KEY = "kyute:analytics-consent:v1";
const CONSENT_CHANGED = "kyute:analytics-consent-changed";
// A failed write/read must not leave an earlier grant active in this tab.
let storageBlocked = false;

declare global {
  interface Window {
    [key: `ga-disable-${string}`]: boolean | undefined;
    dataLayer?: unknown[];
    kyuteAnalytics?: {
      measurementId: string;
      send: GoogleTag;
      lastPath: string;
      referrer: string;
      active: boolean;
    };
  }
}

export function validGaMeasurementId(value: string | undefined): value is string {
  return /^G-[A-Z0-9]{6,20}$/.test(value ?? "");
}

export function googleAnalyticsAvailable(measurementId: string | undefined): measurementId is string {
  return validGaMeasurementId(measurementId) && typeof window !== "undefined" &&
    ["kyute.jp", "www.kyute.jp"].includes(window.location.hostname);
}

export function readAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined" || storageBlocked) return null;
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

/** Stop both our events and the already-loaded tag's automatic requests. */
export function stopGoogleAnalytics(measurementId?: string): void {
  if (typeof window === "undefined") return;
  const google = window.kyuteAnalytics;
  const id = google?.measurementId ?? measurementId;
  if (validGaMeasurementId(id)) window[`ga-disable-${id}`] = true;
  if (google) {
    google.active = false;
    google.lastPath = "";
  }
  // GA cookies use the root path. Include host-only and parent-domain variants;
  // browser restrictions can prevent deletion, so this is best effort.
  try {
    const names = document.cookie.split(";").map((cookie) => cookie.trim().split("=")[0])
      .filter((name) => /^_ga(?:_|$)/.test(name));
    for (const name of names) {
      for (const domain of ["", window.location.hostname, "kyute.jp", ".kyute.jp"]) {
        document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
      }
    }
  } catch { /* Disabling analytics must also work when cookies are inaccessible. */ }
}

/** Persist an explicit choice before starting any Google collection. */
export function setAnalyticsConsent(choice: Exclude<AnalyticsConsent, null>): boolean {
  if (typeof window === "undefined") return false;
  let saved = false;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
    saved = window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === choice;
  } catch { /* Block collection below when storage is unavailable. */ }
  storageBlocked = !saved;
  if (!saved) {
    try { window.localStorage.removeItem(ANALYTICS_CONSENT_KEY); } catch { /* Best effort. */ }
  }
  if (choice !== "granted" || !saved) stopGoogleAnalytics();
  window.dispatchEvent(new Event(CONSENT_CHANGED));
  return saved;
}

export function subscribeAnalyticsConsent(onChange: () => void): () => void {
  const sync = () => {
    if (readAnalyticsConsent() !== "granted") stopGoogleAnalytics();
    onChange();
  };
  const storage = (event: StorageEvent) => {
    if (event.key === ANALYTICS_CONSENT_KEY || event.key === null) sync();
  };
  window.addEventListener(CONSENT_CHANGED, sync);
  window.addEventListener("storage", storage);
  // Recheck after a suspended tab resumes as well as on cross-tab changes.
  window.addEventListener("pageshow", sync);
  return () => {
    window.removeEventListener(CONSENT_CHANGED, sync);
    window.removeEventListener("storage", storage);
    window.removeEventListener("pageshow", sync);
  };
}

export function googlePageContext(path: string, referrer: string) {
  const safePath = analyticsPath(path);
  if (!safePath) return null;
  let origin = "";
  try {
    const url = new URL(referrer);
    if (url.protocol === "https:" || url.protocol === "http:") origin = url.origin;
  } catch { /* No referrer is a normal direct visit. */ }
  return {
    // GA4 requires a protocol + host for page_location. Never use location.href.
    page_location: `https://www.kyute.jp${safePath}`,
    page_referrer: origin,
    // A fixed public path avoids accidental DOM titles containing form values.
    page_title: safePath,
  };
}

/** Basic consent: no Google script, cookie or ping before an explicit grant. */
export function initializeGoogleAnalytics(measurementId: string | undefined, path: string): void {
  if (!googleAnalyticsAvailable(measurementId)) return;
  if (readAnalyticsConsent() !== "granted") {
    stopGoogleAnalytics(measurementId);
    return;
  }
  const safePath = analyticsPath(path);
  if (!safePath) {
    stopGoogleAnalytics(measurementId);
    return;
  }

  if (!window.kyuteAnalytics) {
    window.dataLayer = window.dataLayer ?? [];
    const send: GoogleTag = function () {
      if (readAnalyticsConsent() !== "granted") {
        stopGoogleAnalytics(measurementId);
        return;
      }
      if (!window.kyuteAnalytics?.active) return;
      // gtag.js consumes the argument queue even when the script loads later.
      // eslint-disable-next-line prefer-rest-params -- Match the documented gtag.js arguments-object queue.
      window.dataLayer?.push(arguments);
    };
    const context = googlePageContext(safePath, document.referrer);
    if (!context) return;
    window.kyuteAnalytics = { measurementId, send, lastPath: "", referrer: context.page_referrer, active: true };
    window[`ga-disable-${measurementId}`] = false;
    send("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    send("js", new Date());
    send("config", measurementId, {
      ...context,
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement("script");
    script.id = "kyute-ga4-script";
    script.async = true;
    script.referrerPolicy = "origin";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  const google = window.kyuteAnalytics;
  if (google.measurementId !== measurementId || google.lastPath === safePath) return;
  // Reuse a loaded tag after a later grant; never insert a second script.
  const resumed = !google.active;
  google.active = true;
  window[`ga-disable-${measurementId}`] = false;
  const context = googlePageContext(safePath, google.referrer);
  if (!context) return;
  // Update defaults for GA's session/engagement events as well as this event.
  google.send("set", context);
  if (google.lastPath || resumed) {
    google.send("config", measurementId, { ...context, send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
  }
  google.send("event", "page_view", { ...context, send_to: measurementId });
  google.lastPath = safePath;
}
