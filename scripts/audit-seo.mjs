#!/usr/bin/env node
/**
 * Read-only, bounded HTML SEO audit. Does not submit forms, execute page scripts,
 * call API routes, follow external links, inspect accounts, or infer index coverage.
 * Node >=20.9, no additional packages. Run from the repository root.
 *
 * SEO_BASE_URL=http://localhost:3000 SEO_EXPECTED_ORIGIN=https://www.kyute.jp \
 *   node scripts/audit-seo.mjs --output docs/seo/evidence/local-20261016
 * Production: node scripts/audit-seo.mjs --output docs/seo/evidence/production-20261016
 * --strict exits nonzero on measured errors OR an incomplete crawl; warnings alone pass.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { readColumns, isPublic, visibleServiceIds } from '../lib/column/core.mjs';

const AGENT = 'KyuteSeoAudit/1.0 (+https://www.kyute.jp; read-only site QA)';
const HOSTS = new Set(['kyute.jp', 'www.kyute.jp']);
const EXTENSION = /\.(?:pdf|png|jpe?g|webp|avif|gif|svg|ico|css|js|mjs|map|woff2?|ttf|mp4|webm|mp3|zip|xml|txt)$/i;
// Explicit route intent is independent of runtime meta tags and sitemap output.
const PUBLIC_PATHS = ['/', '/service', '/service/recruit-video', '/service/recruit-youtube', '/media', '/works', '/about', '/download', '/contact', '/column'];
const REDIRECTS = ['/service/youtube', '/service/media', '/lp/pace', '/pace/index.html'];
const prohibitedPath = (pathname) => {
  try { return /^\/+(?:api|_next)(?:\/|$)/.test(decodeURIComponent(pathname).replaceAll('\\', '/')); }
  catch { return true; }
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export function decodeEntities(text = '') {
  const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return text.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (all, key) => {
    if (!key.startsWith('#')) return entities[key.toLowerCase()] ?? all;
    const point = key[1].toLowerCase() === 'x' ? parseInt(key.slice(2), 16) : Number(key.slice(1));
    return point > 0 && point <= 0x10ffff && !(point >= 0xd800 && point <= 0xdfff) ? String.fromCodePoint(point) : '\ufffd';
  });
}
export function attributes(tag) {
  const out = {};
  const contents = tag.replace(/^<\/?[^\s>]+/, '').replace(/\/?\s*>$/, '');
  for (const match of contents.matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    const name = match[1].toLowerCase();
    if (!(name in out)) out[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return out;
}
const textOnly = (value) => decodeEntities(value.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
export function parseHtml(html, url) {
  // Script bodies can contain serialized HTML: never interpret them as real tags.
  const commentsRemoved = html.replace(/<!--[\s\S]*?-->/g, '');
  const scripts = [...commentsRemoved.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
  const clean = commentsRemoved.replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  const tags = [...clean.matchAll(/<[a-z][a-z0-9:-]*\b(?:"[^"]*"|'[^']*'|[^'">])*?>/gi)].map((m) => ({
    name: /^<([^\s/>]+)/.exec(m[0])[1].toLowerCase(), attrs: attributes(m[0]),
  }));
  const metas = tags.filter((t) => t.name === 'meta');
  const meta = (name) => metas.filter((t) => t.attrs.name?.toLowerCase() === name).map((t) => t.attrs.content ?? '');
  const canonical = tags.filter((t) => t.name === 'link' && t.attrs.rel?.toLowerCase().split(/\s+/).includes('canonical')).map((t) => t.attrs.href ?? '');
  const headings = [...clean.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi)].map((m) => ({ level: Number(m[1]), text: textOnly(m[2]) }));
  const images = tags.filter((t) => t.name === 'img').map((t) => ({
    src: t.attrs.src ?? '', alt: t.attrs.alt ?? null, width: t.attrs.width ?? null, height: t.attrs.height ?? null, loading: t.attrs.loading ?? null,
  }));
  const links = [...clean.matchAll(/<a\b((?:"[^"]*"|'[^']*'|[^'">])*)>([\s\S]*?)<\/a\s*>/gi)].map((m) => {
    const attrs = attributes(`<a ${m[1]}>`);
    if (!attrs.href) return null;
    let href;
    try { href = new URL(attrs.href, url).href; } catch { return null; }
    return { href, text: textOnly(m[2]) || attrs['aria-label'] || '', rel: attrs.rel ?? '' };
  }).filter(Boolean);
  const jsonLd = scripts.filter((m) => attributes(`<script ${m[1]}>`).type?.toLowerCase() === 'application/ld+json').map((m) => {
    try { return { valid: true, data: JSON.parse(m[2]) }; } catch (error) { return { valid: false, error: error.message }; }
  });
  return {
    title: [...clean.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/gi)].map((m) => textOnly(m[1])),
    description: meta('description'), robots: [...meta('robots'), ...meta('googlebot')], canonical,
    htmlLang: tags.find((t) => t.name === 'html')?.attrs.lang ?? null,
    h1: headings.filter((h) => h.level === 1).map((h) => h.text), headings,
    jsonLd, images, links, ids: tags.flatMap((t) => [t.attrs.id, ...(t.name === 'a' ? [t.attrs.name] : [])]).filter(Boolean),
    wordCharacters: textOnly(clean.replace(/<head\b[^>]*>[\s\S]*?<\/head\s*>/gi, '')).length,
  };
}
export function sitemapLocations(xml) {
  return [...xml.matchAll(/<loc\b[^>]*>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/loc>/gi)].map((m) => decodeEntities(m[1].trim()));
}
export function robotsAllows(robots, pathname, userAgent = AGENT) {
  const groups = []; let group = null; let rulesStarted = false;
  for (const line of robots.split(/\r?\n/)) {
    const match = line.replace(/#.*$/, '').match(/^\s*([^:]+):\s*(.*?)\s*$/);
    if (!match) continue;
    const name = match[1].toLowerCase(); const value = match[2];
    if (name === 'user-agent') {
      if (!group || rulesStarted) { group = { agents: [], rules: [] }; groups.push(group); rulesStarted = false; }
      group.agents.push(value.toLowerCase());
    } else if (group && ['allow', 'disallow'].includes(name)) {
      group.rules.push({ allow: name === 'allow', value }); rulesStarted = true;
    }
  }
  const ranked = groups.map((g) => ({ group: g, specificity: Math.max(0, ...g.agents.filter((a) => a !== '*' && userAgent.toLowerCase().startsWith(a)).map((a) => a.length)) }));
  const best = Math.max(0, ...ranked.map((g) => g.specificity));
  const relevant = best ? ranked.filter((g) => g.specificity === best).map((g) => g.group) : groups.filter((g) => g.agents.includes('*'));
  const matched = relevant.flatMap((g) => g.rules).filter((r) => r.value && new RegExp('^' + r.value.replace(/[.+?^{}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')).test(pathname));
  matched.sort((a, b) => b.value.replace(/\*/g, '').length - a.value.replace(/\*/g, '').length || Number(b.allow) - Number(a.allow));
  return matched[0]?.allow ?? true;
}
export function scopedUrl(href, base, { assets = false } = {}) {
  let url; try { url = new URL(href, base); } catch { return null; }
  if (!['http:', 'https:'].includes(url.protocol)) return null;
  if (!HOSTS.has(url.hostname) && url.origin !== new URL(base).origin) return null;
  if (prohibitedPath(url.pathname)) return null;
  if (!assets && EXTENSION.test(url.pathname)) return null;
  // Query URLs are normalized to the path; never follow approval/action query links.
  return `${new URL(base).origin}${url.pathname}`;
}
export async function fetchDocument(url, { timeout = 20000, fetchImpl = fetch, allowedOrigins = null } = {}) {
  const redirects = []; let current = url;
  try {
    for (let i = 0; i <= 8; i++) {
      const started = performance.now();
      const response = await fetchImpl(current, { method: 'GET', redirect: 'manual', headers: { 'user-agent': AGENT, accept: 'text/html,application/xml,text/plain;q=0.9,*/*;q=0.2' }, signal: AbortSignal.timeout(timeout) });
      const elapsedMs = Math.round(performance.now() - started);
      const headers = Object.fromEntries(['content-type', 'x-robots-tag', 'location', 'cache-control', 'server', 'x-vercel-cache'].map((key) => [key, response.headers.get(key)]).filter(([, value]) => value !== null));
      if ([301, 302, 303, 307, 308].includes(response.status) && headers.location) {
        const next = new URL(headers.location, current).href;
        redirects.push({ url: current, status: response.status, location: next });
        await response.body?.cancel();
        if ((allowedOrigins && !allowedOrigins.has(new URL(next).origin)) || prohibitedPath(new URL(next).pathname)) return { requestedUrl: url, finalUrl: current, outcome: 'redirect_out_of_scope', status: response.status, redirects, headers, elapsedMs };
        current = next; continue;
      }
      const body = await response.text();
      return { requestedUrl: url, finalUrl: current, outcome: [401, 403, 429].includes(response.status) ? 'access_restricted' : 'http_response', status: response.status, redirects, headers, elapsedMs, bytes: Buffer.byteLength(body), body };
    }
    return { requestedUrl: url, finalUrl: current, outcome: 'redirect_limit', status: null, redirects };
  } catch (error) {
    return { requestedUrl: url, finalUrl: current, outcome: 'fetch_failed', status: null, redirects, error: `${error.name}: ${error.message}${error.cause?.code ? ` (${error.cause.code})` : ''}` };
  }
}
function stripBody(result) { const { body, ...rest } = result; return rest; }
export function analyzeAudit(audit) {
  const issues = []; const add = (severity, code, url, detail) => issues.push({ severity, code, url, detail });
  const expectedIndexable = new Set(audit.expectedIndexablePaths ?? audit.pages.map((p) => new URL(p.requestedUrl).pathname).filter((p) => PUBLIC_PATHS.includes(p)));
  const expectedNoindex = new Set(audit.expectedNoindexPaths ?? []);
  const sitemapPaths = new Set(audit.sitemap.entries.map((entry) => new URL(entry.url).pathname));
  const sitemapCoverageKnown = !Array.isArray(audit.sitemap.documents) || (audit.sitemap.documents.length > 0 && audit.sitemap.documents.every((d) => d.status === 200 && d.outcome === 'http_response' && !d.parseError));
  if (sitemapCoverageKnown && expectedIndexable.size && !sitemapPaths.size) add('error', 'sitemap_empty', new URL('/sitemap.xml', audit.baseUrl ?? audit.expectedOrigin).href, 'Expected public routes exist, but no sitemap URL was found');
  for (const pathname of expectedIndexable) {
    if (sitemapCoverageKnown && !sitemapPaths.has(pathname)) add('error', 'sitemap_missing_expected_url', new URL(pathname, audit.expectedOrigin).href, 'Public route required by repository intent is absent from sitemap');
    const page = audit.pages.find((p) => new URL(p.requestedUrl).pathname === pathname);
    if (!page) add('unverified', 'expected_page_not_crawled', new URL(pathname, audit.expectedOrigin).href, 'Expected public route was not fetched');
    else if (page.outcome === 'robots_disallowed') add('unverified', 'expected_page_auditbot_blocked', page.requestedUrl, 'Audit bot may not fetch this expected public route');
  }
  const direct = audit.pages.filter((p) => p.outcome === 'http_response' && p.status === 200 && !p.redirects.length && p.html);
  for (const p of audit.pages) {
    const pathname = new URL(p.requestedUrl).pathname;
    if (typeof audit.robots?.text === 'string') {
      p.googlebotAllowed = robotsAllows(audit.robots.text, pathname, 'Googlebot');
      if (expectedIndexable.has(pathname) && !p.googlebotAllowed) add('error', 'googlebot_disallowed', p.requestedUrl, 'robots.txt blocks Googlebot from an expected public route');
    }
    if (['fetch_failed', 'access_restricted', 'redirect_out_of_scope'].includes(p.outcome)) { add('unverified', p.outcome, p.requestedUrl, p.error ?? `HTTP ${p.status}`); continue; }
    if (p.outcome === 'robots_disallowed') continue;
    if (p.status >= 400) add('error', 'page_http_error', p.requestedUrl, `HTTP ${p.status}`);
    if (p.outcome === 'http_response' && p.status === 200 && !p.html) add('error', 'unexpected_page_type', p.requestedUrl, p.headers?.['content-type'] ?? 'Missing Content-Type');
    if (p.outcome === 'redirect_limit') add('error', 'redirect_limit', p.requestedUrl, 'More than 8 redirects');
  }
  for (const p of direct) {
    const h = p.html; const noindex = /\b(?:noindex|none)\b/i.test([...h.robots, p.headers['x-robots-tag'] ?? ''].join(','));
    p.noindex = noindex;
    const pathname = new URL(p.requestedUrl).pathname;
    if (expectedIndexable.has(pathname) && noindex) add('error', 'expected_indexable_noindex', p.requestedUrl, 'Repository intent requires this route to permit indexing');
    if ((expectedNoindex.has(pathname) || /^\/lp(?:\/|$)/.test(pathname)) && !noindex) add('error', 'expected_noindex_missing', p.requestedUrl, 'LP or known empty category must remain noindex');
    if (!noindex && !expectedIndexable.has(pathname) && p.googlebotAllowed === false) add('error', 'googlebot_disallowed', p.requestedUrl, 'robots.txt blocks Googlebot from this index-permitted HTML');
    if (h.jsonLd.some((j) => !j.valid)) add('error', 'invalid_json_ld', p.requestedUrl, 'JSON-LD cannot be parsed');
    if (h.images.some((i) => i.alt === null)) add('warning', 'image_alt_missing', p.requestedUrl, `${h.images.filter((i) => i.alt === null).length} image(s) without alt. Empty alt is recorded separately, not an automatic defect.`);
    if (noindex) continue;
    if (h.title.length !== 1 || !h.title[0]) add('error', 'title_missing_or_multiple', p.requestedUrl, `${h.title.length} title elements`);
    if (h.description.length !== 1 || !h.description[0]) add('warning', 'description_missing_or_multiple', p.requestedUrl, `${h.description.length} descriptions`);
    if (h.h1.length !== 1) add('warning', 'h1_count', p.requestedUrl, `${h.h1.length} H1 elements; inspect meaning and hierarchy`);
    if (h.canonical.length !== 1) add('error', 'canonical_missing_or_multiple', p.requestedUrl, `${h.canonical.length} canonical elements`);
    else {
      let canonical; try { canonical = new URL(h.canonical[0], p.finalUrl); } catch { /* reported below */ }
      const expected = new URL(new URL(p.finalUrl).pathname, audit.expectedOrigin).href;
      if (!canonical || canonical.href !== expected) add('error', 'canonical_mismatch', p.requestedUrl, `Expected ${expected}; got ${h.canonical[0]}`);
    }
  }
  for (const entry of audit.sitemap.entries) {
    if (entry.response?.redirects?.length) add('error', 'sitemap_url_redirects', entry.url, entry.response.redirects.map((r) => `${r.status} → ${r.location}`).join('; '));
    else if (new URL(entry.url).href !== new URL(new URL(entry.url).pathname, audit.expectedOrigin).href) add('error', 'sitemap_url_noncanonical', entry.url, `Sitemap URL must use canonical origin ${audit.expectedOrigin} without query/fragment; local GET remapping does not excuse a wrong public origin`);
    if (entry.response?.status >= 400 && entry.response?.outcome === 'http_response') add('error', 'sitemap_http_error', entry.url, `HTTP ${entry.response.status}`);
    if (entry.response && ['fetch_failed', 'access_restricted'].includes(entry.response.outcome)) add('unverified', 'sitemap_url_unverified', entry.url, entry.response.error ?? `HTTP ${entry.response.status}`);
    const page = direct.find((p) => new URL(p.requestedUrl).pathname === new URL(entry.url).pathname);
    if (page?.noindex) add('error', 'sitemap_noindex', entry.url, 'Sitemap URL has noindex');
    const blocked = audit.pages.find((p) => p.outcome === 'robots_disallowed' && new URL(p.requestedUrl).pathname === new URL(entry.url).pathname);
    if (blocked) add('error', 'sitemap_robots_disallowed', entry.url, 'Sitemap URL is blocked by robots.txt');
    if (page && new URL(entry.url).pathname !== '/' && !(audit.inbound[new URL(page.requestedUrl).pathname]?.length)) add('warning', 'sitemap_orphan_candidate', entry.url, 'No incoming HTML link found in this bounded crawl (not proof of global orphan status)');
  }
  for (const field of ['title', 'description']) {
    const groups = new Map();
    for (const p of direct.filter((p) => !p.noindex)) {
      const value = p.html[field][0]; if (!value) continue;
      groups.set(value, [...(groups.get(value) ?? []), p.requestedUrl]);
    }
    for (const [value, urls] of groups) if (urls.length > 1) add('warning', `duplicate_${field}`, urls.join(' | '), value);
  }
  for (const link of audit.brokenAnchors) add('warning', 'anchor_target_missing', link.from, `${link.to} (${link.text})`);
  return issues;
}
async function repositoryRoutes(root, today) {
  const routes = []; async function walk(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.name === 'api' || entry.name.startsWith('[')) continue;
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(file);
      else if (/^page\.[cm]?[jt]sx?$/.test(entry.name)) routes.push('/' + path.relative(path.join(root, 'app'), dir).split(path.sep).filter((p) => p && !/^\(.+\)$/.test(p)).join('/'));
    }
  }
  await walk(path.join(root, 'app'));
  const publicColumns = readColumns(root).filter((c) => isPublic(c.data, today));
  const publishedPaths = publicColumns.map((c) => `/column/${c.data.slug}`);
  const populatedCategories = visibleServiceIds().filter((service) => publicColumns.some((c) => c.data.service === service)).map((service) => `/column/category/${service}`);
  const emptyCategories = visibleServiceIds().filter((service) => !publicColumns.some((c) => c.data.service === service)).map((service) => `/column/category/${service}`);
  return {
    routes: [...new Set([...routes, ...PUBLIC_PATHS, ...publishedPaths, ...populatedCategories, ...emptyCategories, ...REDIRECTS])],
    expectedIndexablePaths: [...PUBLIC_PATHS, ...publishedPaths, ...populatedCategories],
    expectedNoindexPaths: [...routes.filter((route) => /^\/lp(?:\/|$)/.test(route)), ...emptyCategories],
  };
}
export async function crawl({ baseUrl, expectedOrigin, maxPages = 100, timeout = 20000, delay = 100, root = process.cwd(), today = new Date().toISOString().slice(0, 10) }) {
  const base = new URL(baseUrl).origin; const local = !HOSTS.has(new URL(base).hostname);
  const allowedOrigins = new Set(local ? [base] : [base, 'http://kyute.jp', 'https://kyute.jp', 'http://www.kyute.jp', 'https://www.kyute.jp']);
  const options = { timeout, allowedOrigins }; const cached = new Map();
  const get = async (url) => {
    if (!cached.has(url)) { await sleep(delay); cached.set(url, await fetchDocument(url, options)); }
    return cached.get(url);
  };
  const robots = await get(`${base}/robots.txt`);
  const sitemap = { documents: [], entries: [] };
  const sitemapQueue = [`${base}/sitemap.xml`]; const seenMaps = new Set();
  for (const match of (robots.body ?? '').matchAll(/^sitemap:\s*(\S+)/gim)) {
    const url = scopedUrl(match[1], base, { assets: true }); if (url) sitemapQueue.push(url);
  }
  while (sitemapQueue.length && seenMaps.size < 20) {
    const url = sitemapQueue.shift(); if (seenMaps.has(url)) continue; seenMaps.add(url);
    const result = await get(url); const document = stripBody(result); sitemap.documents.push(document);
    if (result.status !== 200) continue;
    if (!/<(?:urlset|sitemapindex)\b/i.test(result.body ?? '')) { document.parseError = 'No sitemap XML root element'; continue; }
    const locs = sitemapLocations(result.body ?? '');
    if (/<sitemapindex\b/i.test(result.body)) for (const loc of locs) { const next = scopedUrl(loc, base, { assets: true }); if (next) sitemapQueue.push(next); }
    else for (const loc of locs) if (scopedUrl(loc, base) && !sitemap.entries.some((e) => e.url === loc)) sitemap.entries.push({ url: loc });
  }
  const { routes: repositorySeeds, expectedIndexablePaths, expectedNoindexPaths } = await repositoryRoutes(root, today);
  const queue = [...repositorySeeds, ...sitemap.entries.map((e) => e.url)].map((u) => scopedUrl(u, base)).filter(Boolean);
  const visited = new Set(); const pages = [];
  while (queue.length && visited.size < maxPages) {
    const url = queue.shift(); if (visited.has(url)) continue; visited.add(url);
    if (!robotsAllows(robots.body ?? '', new URL(url).pathname)) { pages.push({ requestedUrl: url, outcome: 'robots_disallowed', status: null, redirects: [] }); continue; }
    const response = await get(url); const page = stripBody(response);
    if (response.outcome === 'http_response' && /text\/html/i.test(response.headers?.['content-type'] ?? '')) {
      page.html = parseHtml(response.body, response.finalUrl);
      for (const link of page.html.links) { const next = scopedUrl(link.href, base); if (next && !visited.has(next)) queue.push(next); }
    }
    pages.push(page);
  }
  for (const entry of sitemap.entries.slice(0, maxPages)) {
    // In local mode assess deployed route behavior locally; never contact production.
    entry.checkedUrl = local ? scopedUrl(entry.url, base) : entry.url;
    entry.response = stripBody(await get(entry.checkedUrl));
  }
  const inbound = {}; const brokenAnchors = []; const seenAnchors = new Set();
  for (const page of pages.filter((p) => p.html && p.status === 200 && !p.redirects.length)) for (const link of page.html.links) {
    const next = scopedUrl(link.href, base); if (!next) continue;
    const targetPath = new URL(next).pathname; const sourcePath = new URL(page.requestedUrl).pathname;
    if (sourcePath !== targetPath) inbound[targetPath] = [...new Set([...(inbound[targetPath] ?? []), sourcePath])];
    const hash = new URL(link.href).hash.slice(1); if (!hash || hash.startsWith(':~:text=')) continue;
    const target = pages.find((p) => p.requestedUrl === next);
    const key = `${page.requestedUrl}|${link.href}`;
    let decoded; try { decoded = decodeURIComponent(hash); } catch { decoded = hash; }
    if (target?.html && target.status === 200 && !target.html.ids.includes(decoded) && !seenAnchors.has(key)) { brokenAnchors.push({ from: page.requestedUrl, to: link.href, text: link.text }); seenAnchors.add(key); }
  }
  const hostVariants = [];
  if (!local) for (const origin of ['http://kyute.jp', 'https://kyute.jp', 'http://www.kyute.jp', 'https://www.kyute.jp']) hostVariants.push(stripBody(await get(`${origin}/`)));
  const audit = { schemaVersion: 1, recordedAt: new Date().toISOString(), baseUrl: base, expectedOrigin, mode: local ? 'local' : 'production', methodology: 'Bounded server-rendered HTML GET crawl; no JS execution, external links, API calls, forms, authentication, or inferred search index. Empty image alt may be decorative. Timings are unthrottled response-header time, not CWV.', limits: { maxPages, timeout, delay, javascriptExecuted: false }, repositorySeeds, expectedIndexablePaths, expectedNoindexPaths, robots: { ...stripBody(robots), text: robots.body ?? null }, sitemap, hostVariants, pages, inbound, brokenAnchors, truncated: queue.some((u) => !visited.has(u)) || sitemap.entries.length > maxPages || sitemapQueue.some((u) => !seenMaps.has(u)) };
  audit.issues = analyzeAudit(audit);
  const unreadableAuxiliary = [audit.robots, ...audit.sitemap.documents].filter((p) => p.outcome !== 'http_response' || p.status !== 200 || p.parseError);
  for (const p of unreadableAuxiliary) audit.issues.push({ severity: 'unverified', code: 'auxiliary_unverified', url: p.requestedUrl, detail: p.parseError ?? `${p.outcome}; HTTP ${p.status ?? 'not received'}` });
  audit.summary = { pages: pages.length, directHtml200: pages.filter((p) => p.html && p.status === 200 && !p.redirects.length).length, sitemapUrls: sitemap.entries.length, errors: audit.issues.filter((i) => i.severity === 'error').length, warnings: audit.issues.filter((i) => i.severity === 'warning').length, unverified: audit.issues.filter((i) => i.severity === 'unverified').length, truncated: audit.truncated };
  return audit;
}
function csv(audit) {
  const cols = ['url','status','outcome','final_url','redirects','title','description','canonical','robots','googlebot_allowed','h1_count','h1','headings','json_ld_types','json_ld_invalid','images','missing_alt','empty_alt','links','html_bytes','header_ms','issues'];
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const typeNames = (data) => !data ? [] : Array.isArray(data) ? data.flatMap(typeNames) : typeof data === 'object' ? [...(Array.isArray(data['@type']) ? data['@type'] : data['@type'] ? [data['@type']] : []), ...typeNames(data['@graph'])] : [];
  const rows = audit.pages.map((p) => { const h = p.html; return [p.requestedUrl,p.status,p.outcome,p.finalUrl,p.redirects.map((r) => `${r.status} ${r.location}`).join(' | '),h?.title.join(' | '),h?.description.join(' | '),h?.canonical.join(' | '),[...(h?.robots ?? []),p.headers?.['x-robots-tag'] ?? ''].filter(Boolean).join(' | '),p.googlebotAllowed,h?.h1.length,h?.h1.join(' | '),h?.headings.map((v) => `H${v.level}:${v.text}`).join(' | '),h?.jsonLd.flatMap((j) => typeNames(j.data)).join(' | '),h?.jsonLd.filter((j) => !j.valid).length,h?.images.length,h?.images.filter((i) => i.alt === null).length,h?.images.filter((i) => i.alt === '').length,h?.links.length,p.bytes,p.elapsedMs,audit.issues.filter((i) => i.url === p.requestedUrl).map((i) => `${i.severity}:${i.code}`).join(' | ')]; });
  return [cols, ...rows].map((row) => row.map(cell).join(',')).join('\n') + '\n';
}
async function main() {
  const args = process.argv.slice(2); const arg = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
  const baseUrl = process.env.SEO_BASE_URL ?? 'https://www.kyute.jp';
  const expectedOrigin = process.env.SEO_EXPECTED_ORIGIN ?? 'https://www.kyute.jp';
  const output = arg('--output', `docs/seo/evidence/${HOSTS.has(new URL(baseUrl).hostname) ? 'production' : 'local'}-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}`);
  const maxPages = Number(arg('--max-pages', '100')); if (!Number.isInteger(maxPages) || maxPages < 1 || maxPages > 500) throw new Error('--max-pages must be 1–500');
  const audit = await crawl({ baseUrl, expectedOrigin, maxPages, today: process.env.SEO_AS_OF_DATE ?? new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Tokyo' }) });
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(`${output}.json`, JSON.stringify(audit, null, 2) + '\n');
  await fs.writeFile(`${output}.csv`, csv(audit));
  console.log(JSON.stringify({ output, ...audit.summary }, null, 2));
  if (args.includes('--strict') && (audit.summary.errors || audit.summary.unverified || audit.truncated)) process.exitCode = 1;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main().catch((error) => { console.error(error.message); process.exitCode = 1; });
