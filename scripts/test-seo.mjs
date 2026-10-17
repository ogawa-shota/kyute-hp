// Regression cases for indexability, canonical signals, dates and JSON-LD.
// No network, repository content writes, or external messages.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { isPublic, isValidDate, publicationDate, validateColumns } from "../lib/column/core.mjs";

function loadTs(file, imports = {}, env = {}) {
  const output = ts.transpileModule(fs.readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(output, {
    exports, URL, process: { env },
    require(name) {
      assert.ok(name in imports, `Unexpected dependency: ${name}`);
      return imports[name];
    },
  });
  return exports;
}

const seo = loadTs("../app/seo.ts");
const canonical = "https://www.kyute.jp";
assert.equal(seo.SITE_URL, canonical);
for (const path of ["/", "/contact", "/service/recruit-video", "/column/example"]) {
  const result = seo.pageMetadata({ path, title: `Title ${path}`, description: `Description ${path}` });
  assert.equal(result.alternates.canonical, new URL(path, canonical).href);
  assert.equal(result.openGraph.url, result.alternates.canonical);
  assert.equal(result.openGraph.title, result.title);
  assert.equal(result.twitter.description, result.description);
  assert.equal(result.robots.index, true);
}
assert.equal(seo.pageMetadata({ path: "/lp", title: "Ad", description: "Ad", noindex: true }).robots.index, false);
assert.equal(seo.pageRobots(true).follow, true, "Crawlers may follow public links on a noindex page");
const preview = loadTs("../app/seo.ts", {}, { VERCEL_ENV: "preview" });
for (const noindex of [true, false]) {
  assert.equal(preview.pageRobots(noindex).index, false);
  assert.equal(preview.pageRobots(noindex).googleBot.index, false);
  assert.equal(preview.pageRobots(noindex).follow, false);
}

const hostileTitle = "</script><script>alert(1)</script>";
assert.ok(!seo.jsonLd({ headline: hostileTitle }).includes("<"));
assert.equal(JSON.parse(seo.jsonLd({ headline: hostileTitle })).headline, hostileTitle);
const breadcrumb = seo.breadcrumbSchema([{ name: "トップ", path: "/" }, { name: "コラム", path: "/column" }]);
assert.equal(breadcrumb.itemListElement[1].position, 2);
assert.equal(breadcrumb.itemListElement[1].item, `${canonical}/column`);
assert.equal(seo.WEBSITE_SCHEMA["@graph"][1].publisher["@id"], seo.ORGANIZATION["@id"]);
assert.equal(seo.serviceSchema("/service/recruit-video", "採用動画制作", "説明").provider["@id"], seo.ORGANIZATION["@id"]);

const publicData = { status: "published", service: "recruit-video", publishedAt: "2026-10-16" };
assert.equal(publicationDate(new Date("2026-10-15T14:59:59Z")), "2026-10-15");
assert.equal(publicationDate(new Date("2026-10-15T15:00:00Z")), "2026-10-16");
assert.equal(isPublic(publicData, "2026-10-16"), true);
for (const patch of [
  { status: "draft" }, { status: "review" }, { publishedAt: "2026-10-17" },
  { publishedAt: "2026-02-30" }, { service: "ai-casual-interview" }, { service: "missing" },
]) assert.equal(isPublic({ ...publicData, ...patch }, "2026-10-16"), false);
assert.equal(isValidDate("2024-02-29"), true);
assert.equal(isValidDate("2026-02-29"), false);
assert.equal(isValidDate("2026-13-01"), false);
const badDate = validateColumns([{ file: "content/column/date-test.md", data: {
  title: "Date test", description: "Date test", slug: "date-test", keyword: "Date test",
  author: "editor", service: "recruit-video", status: "draft", primarySources: ["source"],
  publishedAt: "2026-10-16", updatedAt: "2026-10-15",
}, body: "## Date test" }], { editor: { name: "Editor" } });
assert.ok(badDate.errors.some((error) => error.message.includes("updatedAt")));

// An older article may have the newest substantive update. Listing dates must use it.
const columns = [
  { slug: "new", service: "recruit-video", publishedAt: "2026-10-16" },
  { slug: "updated", service: "recruit-video", publishedAt: "2026-09-01", updatedAt: "2026-10-17" },
];
const sitemap = loadTs("../app/sitemap.ts", {
  "@/lib/column": { VISIBLE_SERVICES: ["recruit-video", "recruit-youtube"], getPublishedColumns: () => columns },
  "./seo": { SITE_URL: canonical },
}).default();
assert.equal(sitemap.find((entry) => entry.url === `${canonical}/column`).lastModified, "2026-10-17");
assert.equal(sitemap.find((entry) => entry.url.endsWith("/category/recruit-video")).lastModified, "2026-10-17");
assert.deepEqual(Array.from(sitemap.filter((entry) => /^\/lp(?:\/|$)/.test(new URL(entry.url).pathname)), (entry) => entry.url), [`${canonical}/lp/pace`], "PACE is the only indexable LP; advertising LPs stay out of the sitemap");
assert.ok(!sitemap.some((entry) => entry.url.includes("recruit-youtube") && entry.url.includes("category")));
assert.ok(!sitemap.some((entry) => ["/pace", "/pace/index.html"].includes(new URL(entry.url).pathname)), "PACE redirect and static alias stay out of the sitemap");
assert.ok(!sitemap.some((entry) => new URL(entry.url).pathname === "/analytics"), "Analytics settings utility stays out of the sitemap");
assert.ok(sitemap.every((entry) => entry.url.startsWith(`${canonical}/`)));
assert.equal(new Set(sitemap.map((entry) => entry.url)).size, sitemap.length);

const robots = fs.readFileSync(new URL("../public/robots.txt", import.meta.url), "utf8");
assert.ok(robots.includes(`Sitemap: ${canonical}/sitemap.xml`));
assert.ok(!/^Disallow:\s*\/\s*$/m.test(robots));
console.log("SEO regressions passed: canonical, metadata, preview/noindex, JSON-LD, dates, sitemap.");
