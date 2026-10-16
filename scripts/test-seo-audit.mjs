#!/usr/bin/env node
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { parseHtml, attributes, decodeEntities, sitemapLocations, robotsAllows, scopedUrl, fetchDocument, analyzeAudit, repositoryRoutes } from './audit-seo.mjs';

const page = parseHtml(`<!doctype html><html lang="ja"><head>
<title>採用 &amp; KYUTE</title><meta content='説明 &quot;本文&quot;' NAME='description'>
<link href="https://www.kyute.jp/service" rel="alternate canonical">
<meta content="noindex, follow" name="robots">
<script type="application/ld+json">{"@type":"WebSite","name":"KYUTE"}</script>
<script type="application/ld+json">{bad}</script>
<script>window.x = '<h1>fake</h1><a href="/fake">fake</a>';</script>
</head><body><!-- <h1>ignored</h1> --><h1>採用<span>動画</span></h1><h2 id="特徴">特徴</h2>
<img src="/real.png" alt="A > B &amp; C"><img src='/decoration.svg' alt=''><img src='/missing.jpg'>
<a href="/service#%E7%89%B9%E5%BE%B4" title="A > B">特徴 <span>を確認</span></a>
<a href="mailto:hello@example.com">Mail</a><template><h1>inactive</h1></template></body></html>`, 'https://www.kyute.jp/');
assert.deepEqual(page.title, ['採用 & KYUTE']);
assert.deepEqual(page.description, ['説明 "本文"']);
assert.deepEqual(page.canonical, ['https://www.kyute.jp/service']);
assert.deepEqual(page.h1, ['採用 動画']);
assert.equal(page.htmlLang, 'ja');
assert.deepEqual(page.images.map((i) => i.alt), ['A > B & C', '', null]);
assert.equal(page.links.length, 2);
assert.equal(page.links[0].href, 'https://www.kyute.jp/service#%E7%89%B9%E5%BE%B4');
assert.deepEqual(page.jsonLd.map((j) => j.valid), [true, false]);
assert.deepEqual(page.ids, ['特徴']);
assert.deepEqual(attributes('<META name=robots CONTENT="noindex">'), { name: 'robots', content: 'noindex' });
assert.equal(decodeEntities('&#x65e5;&#26412;&amp;&#99999999;'), '日本&�');
assert.deepEqual(sitemapLocations('<loc><![CDATA[https://www.kyute.jp/?x=1&y=2]]></loc><loc>https://www.kyute.jp/?x=1&amp;y=2</loc>'), ['https://www.kyute.jp/?x=1&y=2', 'https://www.kyute.jp/?x=1&y=2']);
assert.equal(robotsAllows('User-agent: *\nDisallow: /private/\nAllow: /private/public', '/private/a'), false);
assert.equal(robotsAllows('User-agent: *\nDisallow: /private/\nAllow: /private/public', '/private/public'), true);
assert.equal(robotsAllows('User-agent: *\nDisallow: /*.pdf$\n', '/test.pdf'), false);
assert.equal(robotsAllows('User-agent: OtherBot\nDisallow: /\nUser-agent: *\nAllow: /', '/'), true);
assert.equal(robotsAllows('User-agent: *\nDisallow: /\nUser-agent: KyuteSeoAudit\nAllow: /', '/'), true);
assert.equal(scopedUrl('https://kyute.jp/contact?service=video#form', 'http://localhost:3000'), 'http://localhost:3000/contact');
assert.equal(scopedUrl('https://evil.example/page', 'https://www.kyute.jp'), null);
assert.equal(scopedUrl('/api/material-request/approve?token=secret', 'https://www.kyute.jp'), null);
assert.equal(scopedUrl('/%61pi/material-request/approve?token=secret', 'https://www.kyute.jp'), null);
assert.equal(scopedUrl('/brochure.pdf', 'https://www.kyute.jp'), null);
assert.equal(scopedUrl('mailto:hello@example.com', 'https://www.kyute.jp'), null);

const calls = [];
const redirect = await fetchDocument('https://kyute.jp/test', { allowedOrigins: new Set(['https://kyute.jp', 'https://www.kyute.jp']), fetchImpl: async (url, options) => {
  calls.push({ url, method: options.method });
  return url.includes('www.') ? new Response('<html>ok</html>', { status: 200, headers: { 'content-type': 'text/html' } }) : new Response('', { status: 307, headers: { location: 'https://www.kyute.jp/test' } });
} });
assert.deepEqual(calls.map((c) => c.method), ['GET', 'GET']);
assert.equal(redirect.redirects[0].status, 307);
assert.equal(redirect.finalUrl, 'https://www.kyute.jp/test');
assert.equal(redirect.outcome, 'http_response');
const outside = await fetchDocument('http://localhost:3000/', { allowedOrigins: new Set(['http://localhost:3000']), fetchImpl: async () => new Response('', { status: 307, headers: { location: 'https://www.kyute.jp/' } }) });
assert.equal(outside.outcome, 'redirect_out_of_scope');
const apiRedirect = await fetchDocument('https://www.kyute.jp/', { fetchImpl: async () => new Response('', { status: 307, headers: { location: '/api/material-request/approve?token=fake' } }) });
assert.equal(apiRedirect.outcome, 'redirect_out_of_scope');
const failed = await fetchDocument('https://www.kyute.jp/', { fetchImpl: async () => { throw new TypeError('DNS blocked'); } });
assert.equal(failed.status, null); assert.equal(failed.outcome, 'fetch_failed');
const denied = await fetchDocument('https://www.kyute.jp/', { fetchImpl: async () => new Response('Denied', { status: 403 }) });
assert.equal(denied.outcome, 'access_restricted');
const basic = (url, { robots = [], canonical = url, title = 'Unique', description = 'desc ' + url, alt = '' } = {}) => ({ requestedUrl: url, finalUrl: url, outcome: 'http_response', status: 200, redirects: [], headers: {}, html: { title: [title], description: [description], canonical: [canonical], robots, h1: ['heading'], jsonLd: [], images: [{ alt }], links: [], ids: [] } });
const audit = { expectedOrigin: 'https://www.kyute.jp', pages: [basic('https://www.kyute.jp/'), basic('https://www.kyute.jp/lp', { robots: ['noindex'], canonical: 'https://www.kyute.jp/service' }), { ...failed, requestedUrl: 'https://www.kyute.jp/unverified' }], sitemap: { entries: [{ url: 'https://www.kyute.jp/', response: { status: 200, redirects: [] } }] }, inbound: {}, brokenAnchors: [] };
const issues = analyzeAudit(audit);
assert.deepEqual(issues.map((i) => i.code), ['fetch_failed']);
assert.equal(issues[0].severity, 'unverified');
assert.equal(analyzeAudit({ ...audit, pages: [basic('https://www.kyute.jp/', { canonical: 'https://kyute.jp/' })] })[0].code, 'canonical_mismatch');
assert.ok(analyzeAudit({ ...audit, pages: [basic('https://www.kyute.jp/', { robots: ['noindex'] })] }).some((i) => i.code === 'sitemap_noindex'));
const blockedSitemap = analyzeAudit({ ...audit, pages: [{ requestedUrl: 'https://www.kyute.jp/', status: null, outcome: 'robots_disallowed', redirects: [] }] });
assert.ok(blockedSitemap.some((i) => i.code === 'sitemap_robots_disallowed'));
assert.equal(analyzeAudit({ ...audit, pages: [{ requestedUrl: 'https://www.kyute.jp/', finalUrl: 'https://www.kyute.jp/', outcome: 'http_response', status: 200, redirects: [], headers: { 'content-type': 'text/plain' } }] })[0].code, 'unexpected_page_type');
// Route intent must survive even if sitemap output and meta regress together.
const emptyMap = { entries: [] };
const exposedLp = analyzeAudit({ ...audit, sitemap: emptyMap, pages: [basic('https://www.kyute.jp/lp/recruit-video')] });
assert.ok(exposedLp.some((i) => i.code === 'expected_noindex_missing'));
const hiddenPublic = analyzeAudit({ ...audit, sitemap: emptyMap, pages: [basic('https://www.kyute.jp/', { robots: ['noindex'] }), basic('https://www.kyute.jp/service/recruit-video', { robots: ['noindex'] })] });
assert.equal(hiddenPublic.filter((i) => i.code === 'expected_indexable_noindex').length, 2);
assert.equal(hiddenPublic.filter((i) => i.code === 'sitemap_missing_expected_url').length, 2);
assert.ok(hiddenPublic.some((i) => i.code === 'sitemap_empty'));
const exposedEmptyCategory = analyzeAudit({ ...audit, sitemap: emptyMap, expectedNoindexPaths: ['/column/category/general'], pages: [basic('https://www.kyute.jp/column/category/general')] });
assert.ok(exposedEmptyCategory.some((i) => i.code === 'expected_noindex_missing'));
const botSpecific = 'User-agent: Googlebot\nDisallow: /\n\nUser-agent: *\nAllow: /';
assert.equal(robotsAllows(botSpecific, '/service/recruit-video'), true);
assert.equal(robotsAllows(botSpecific, '/service/recruit-video', 'Googlebot'), false);
assert.equal(robotsAllows('User-agent: Googlebot\nDisallow: /\nUser-agent: Googlebot-Image\nAllow: /', '/', 'Googlebot'), false);
assert.equal(robotsAllows('User-agent: Googlebot\nDisallow: /\nUser-agent: Googlebot-Image\nAllow: /', '/', 'Googlebot-Image'), true);
const blockedGoogle = analyzeAudit({ ...audit, robots: { text: botSpecific }, pages: [basic('https://www.kyute.jp/')] });
assert.ok(blockedGoogle.some((i) => i.code === 'googlebot_disallowed'));
assert.equal(blockedGoogle.filter((i) => i.code === 'page_http_error').length, 0);
const unavailableMap = analyzeAudit({ ...audit, sitemap: { entries: [], documents: [{ outcome: 'fetch_failed', status: null }] }, pages: [failed] });
assert.equal(unavailableMap.filter((i) => i.severity === 'error').length, 0);
const wrongSitemapHost = analyzeAudit({ ...audit, sitemap: { entries: [{ url: 'https://kyute.jp/', response: { status: 200, redirects: [] } }] }, pages: [basic('https://www.kyute.jp/')] });
assert.ok(wrongSitemapHost.some((i) => i.code === 'sitemap_url_noncanonical'));
const explicitAbsent = analyzeAudit({ ...audit, expectedIndexablePaths: ['/', '/service/recruit-video'], pages: [basic('https://www.kyute.jp/')] });
assert.ok(explicitAbsent.some((i) => i.code === 'expected_page_not_crawled'));

// PACE became an indexable static rewrite in main. Its file alias is the same
// canonical document; unrelated LPs and arbitrary canonical claims are not.
const paceUrl = 'https://www.kyute.jp/lp/pace';
const paceAlias = 'https://www.kyute.jp/pace/index.html';
const paceFields = { canonical: paceUrl, title: 'PACE', description: 'PACE service' };
const pacePage = basic(paceUrl, paceFields);
const paceFile = basic(paceAlias, paceFields);
const paceAudit = {
  ...audit,
  expectedIndexablePaths: ['/lp/pace'],
  pages: [pacePage, paceFile, { ...pacePage, requestedUrl: 'https://www.kyute.jp/pace', redirects: [{ url: 'https://www.kyute.jp/pace', status: 308, location: paceUrl }] }],
  sitemap: { entries: [{ url: paceUrl, response: { status: 200, redirects: [] } }] },
  inbound: { '/lp/pace': ['/'] },
};
assert.deepEqual(analyzeAudit(paceAudit), []);
assert.ok(analyzeAudit({ ...paceAudit, sitemap: emptyMap }).some((i) => i.code === 'sitemap_missing_expected_url'));
assert.ok(analyzeAudit({ ...paceAudit, pages: [basic(paceUrl, { ...paceFields, robots: ['noindex'] })] }).some((i) => i.code === 'expected_indexable_noindex'));
const wrongAlias = analyzeAudit({ ...paceAudit, pages: [pacePage, basic(paceAlias, { ...paceFields, canonical: paceAlias })] });
assert.ok(wrongAlias.some((i) => i.code === 'canonical_mismatch'));
assert.ok(wrongAlias.some((i) => i.code === 'duplicate_title'));
assert.ok(wrongAlias.some((i) => i.code === 'duplicate_description'));
const claimedAlias = analyzeAudit({ ...paceAudit, pages: [...paceAudit.pages, basic('https://www.kyute.jp/other', paceFields)] });
assert.ok(claimedAlias.some((i) => i.code === 'canonical_mismatch'));
assert.ok(claimedAlias.some((i) => i.code === 'duplicate_title'));
assert.ok(claimedAlias.some((i) => i.code === 'duplicate_description'));
for (const excluded of ['https://www.kyute.jp/lp/recruit-video', paceAlias]) {
  assert.ok(analyzeAudit({ ...paceAudit, sitemap: { entries: [...paceAudit.sitemap.entries, { url: excluded }] } }).some((i) => i.code === 'sitemap_unexpected_url' && i.url === excluded));
}
const repository = await repositoryRoutes(fileURLToPath(new URL('..', import.meta.url)), '2026-10-16');
for (const route of ['/lp/pace', '/pace/index.html', '/pace']) assert.ok(repository.routes.includes(route), `${route} must be fetched`);
assert.ok(repository.expectedIndexablePaths.includes('/lp/pace'));
assert.ok(!repository.expectedNoindexPaths.includes('/lp/pace'));
assert.ok(!repository.expectedIndexablePaths.includes('/pace/index.html'));
assert.ok(repository.expectedNoindexPaths.includes('/lp/recruit-video'));
console.log('SEO audit fixtures passed: HTML, entities, sitemap, robots, scoped GET, redirects, network failures, intentional noindex, PACE aliases and canonical checks.');
