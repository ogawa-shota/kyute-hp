// Unit tests for the column validator (no files touched).
import assert from "node:assert/strict";
import { imageSize, inlineCtaIds, validateColumns } from "../lib/column/core.mjs";

const authors = { editor: { name: "KYUTE編集部" }, shota: { name: "S" } };
const body = "## 見出し\n本文\n## 見出し2\n## 見出し3\n";
const base = {
  title: "採用動画の費用相場",
  description: "説明",
  slug: "recruit-video-cost",
  service: "recruit-video",
  keyword: "採用動画 費用",
  author: "editor",
  status: "draft",
  primarySources: ["2026年9月の撮影で分かったこと"],
};
const item = (data, b = body, file = `content/column/${data.slug}.md`) => ({ file, data, body: b });

// Fake public/ so no files are touched. Keys are site-relative paths.
const ASSETS = {
  "/column/recruit-video-cost/eyecatch.jpg": { bytes: 180_000, ext: "jpg", format: "jpg", width: 1600, height: 900 },
  "/column/recruit-video-cost/square.jpg": { bytes: 180_000, ext: "jpg", format: "jpg", width: 1200, height: 1200 },
  "/column/recruit-video-cost/heavy.jpg": { bytes: 900_000, ext: "jpg", format: "jpg", width: 1600, height: 900 },
  "/column/recruit-video-cost/flow.svg": { bytes: 8_000, ext: "svg" },
};
const assetInfo = (src) => ASSETS[src] ?? null;
const validate = (items) => validateColumns(items, authors, { assetInfo });
const messages = (r) => r.errors.map((e) => e.message).join("\n");
const warnings = (r) => r.warnings.map((w) => w.message).join("\n");

const strategy = {
  reader: "採用動画の外注を検討している人事担当者",
  intent: "費用の相場と内訳を知り、予算を決めたい",
  stage: "compare",
  value: "見積もりの内訳と、費用が変わる条件が分かる",
  strength: "料金を公開し、自社メディアで企画から撮影まで実践している",
};
const eyecatch = { src: "/column/recruit-video-cost/eyecatch.jpg", alt: "撮影スタッフが社員にカメラを向け、オフィスで打ち合わせをしている様子" };
const fullBody = body + "\n<!-- cta: price-recruit-video -->\n\n![費用の内訳の図](/column/recruit-video-cost/flow.svg)\n";
const ready = { ...base, status: "review", strategy, eyecatch };

// A bare draft passes with hints; a complete review article passes cleanly.
assert.equal(validate([item(base)]).errors.length, 0);
assert.match(warnings(validate([item(base)])), /strategy[\s\S]*アイキャッチ/);
assert.equal(validate([item(ready, fullBody)]).errors.length, 0, messages(validate([item(ready, fullBody)])));

// From review on, strategy, a real eyecatch and stage-appropriate CTAs are required.
const bare = messages(validate([item({ ...base, status: "review" })]));
assert.match(bare, /strategy/);
assert.match(bare, /アイキャッチ（eyecatch）がありません/);
assert.match(messages(validate([item({ ...ready, strategy: { ...strategy, stage: "soon" } }, fullBody)])), /strategy\.stage/);
assert.match(messages(validate([item(ready, body)])), /本文中のCTA/);
assert.equal(validate([item({ ...ready, strategy: { ...strategy, stage: "learn" } }, body)]).errors.length, 0);

// The eyecatch must exist, sit under the article folder, be 16:9 and light.
const eye = (src) => messages(validate([item({ ...ready, eyecatch: { ...eyecatch, src } }, fullBody)]));
assert.match(eye("/column/recruit-video-cost/missing.jpg"), /画像ファイルがありません/);
assert.match(eye("/column/other/eyecatch.jpg"), /public\/column\/recruit-video-cost\//);
assert.match(eye("/column/recruit-video-cost/square.jpg"), /16:9/);
assert.match(eye("/column/recruit-video-cost/heavy.jpg"), /KB/);

// Legacy articles keep working: missing items are warnings.
const legacy = validate([item({ ...base, slug: "recruit-video-production-company", status: "review" }, body, "content/column/recruit-video-production-company.md")]);
assert.equal(legacy.errors.length, 0, messages(legacy));
assert.match(warnings(legacy), /strategy/);

// In-body CTAs: known ids only, no hidden-service CTA in another service's article.
assert.match(messages(validate([item(ready, fullBody + "\n<!-- cta: nope -->\n")])), /本文中のCTA「nope」/);
assert.match(messages(validate([item(ready, fullBody + "\n<!-- cta: demo-ai-casual-interview -->\n")])), /非公開サービス/);
assert.match(warnings(validate([item(ready, fullBody + "\n<!-- cta: works-owned-media -->\n".repeat(3))])), /3個以内/);
assert.deepEqual(inlineCtaIds("a\n<!-- cta: works-owned-media -->\n  <!-- cta:consult-general -->\n"), ["works-owned-media", "consult-general"]);

// Body images must exist; owned media must be labelled as such.
assert.match(messages(validate([item(ready, fullBody + "![図](/column/recruit-video-cost/nothing.png)")])), /画像ファイルがありません/);
assert.match(warnings(validate([item(ready, fullBody + "運動部のシゴト。の動画では")])), /自社メディア/);
assert.match(warnings(validate([item({ ...ready, strategy: { ...strategy, stage: "learn" } }, body)])), /図表・画像・動画/);

// Image header parsing (PNG / JPEG / WebP VP8X).
const png = Buffer.alloc(24);
png.writeUInt32BE(0x89504e47, 0);
png.writeUInt32BE(1600, 16);
png.writeUInt32BE(900, 20);
assert.deepEqual(imageSize(png), { format: "png", width: 1600, height: 900 });
const jpg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x04, 0, 0, 0xff, 0xc0, 0x00, 0x11, 0x08, 0x03, 0x84, 0x06, 0x40, 0, 0, 0]);
assert.deepEqual(imageSize(jpg), { format: "jpg", width: 1600, height: 900 });
const webp = Buffer.alloc(30);
webp.write("RIFF", 0, "ascii");
webp.write("WEBPVP8X", 8, "ascii");
webp.writeUIntLE(1599, 24, 3);
webp.writeUIntLE(899, 27, 3);
assert.deepEqual(imageSize(webp), { format: "webp", width: 1600, height: 900 });

// primarySources is required.
assert.match(messages(validate([item({ ...base, primarySources: [] })])), /primarySources/);

// Duplicate keyword across articles is an error.
const dup = validate([item(base), item({ ...base, slug: "other" })]);
assert.match(messages(dup), /重複/);

// Published needs a date and no leftover TODO, but no approver.
const pub = validate([item({ ...base, status: "published" }, body + "TODO")]);
assert.match(messages(pub), /publishedAt/);
assert.doesNotMatch(messages(pub), /reviewer/);
assert.match(messages(pub), /TODO/);

// Unproven services may not assert outcomes.
const ai = validate([item({ ...base, service: "ai-casual-interview" }, body + "応募が必ず増えます")]);
assert.match(messages(ai), /検証中/);
const video = validate([item(base, body + "応募が必ず増えます")]);
assert.equal(video.errors.length, 0);
assert.ok(video.warnings.some((w) => /言い切り/.test(w.message)));

// Slug must match the file name; image alt is required.
assert.match(messages(validate([item(base, body, "content/column/wrong.md")])), /ファイル名/);
assert.match(messages(validate([item(base, body + "![](/a.png)")])), /代替テキスト/);

// Unknown author and CTA.
assert.match(messages(validate([item({ ...base, author: "nobody", cta: "x" })])), /author[\s\S]*cta/);

// Hidden (unannounced) services can be drafted but not published.
const hidden = validate(
  [item({ ...base, service: "experience-briefing", status: "published", publishedAt: "2026-10-01" })],
  authors,
);
assert.match(messages(hidden), /まだサイトで公開していない/);
assert.equal(validate([item({ ...base, service: "experience-briefing" })]).errors.length, 0);

console.log("column check tests passed");
