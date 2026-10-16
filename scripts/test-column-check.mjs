// Unit tests for the column validator (no files touched).
import assert from "node:assert/strict";
import { validateColumns } from "../lib/column/core.mjs";

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
const messages = (r) => r.errors.map((e) => e.message).join("\n");

// A complete draft passes.
assert.equal(validateColumns([item(base)], authors).errors.length, 0);

// primarySources is required.
assert.match(messages(validateColumns([item({ ...base, primarySources: [] })], authors)), /primarySources/);

// Duplicate keyword across articles is an error.
const dup = validateColumns([item(base), item({ ...base, slug: "other" })], authors);
assert.match(messages(dup), /重複/);

// Published needs a date and no leftover TODO, but no approver.
const pub = validateColumns([item({ ...base, status: "published" }, body + "TODO")], authors);
assert.match(messages(pub), /publishedAt/);
assert.match(messages(pub), /TODO/);
assert.doesNotMatch(messages(pub), /reviewer/);
assert.equal(validateColumns([item({ ...base, status: "published", publishedAt: "2026-10-01" })], authors).errors.length, 0);

// Unproven services may not assert outcomes.
const ai = validateColumns([item({ ...base, service: "ai-casual-interview" }, body + "応募が必ず増えます")], authors);
assert.match(messages(ai), /検証中/);
const video = validateColumns([item(base, body + "応募が必ず増えます")], authors);
assert.equal(video.errors.length, 0);
assert.ok(video.warnings.some((w) => /言い切り/.test(w.message)));

// Slug must match the file name; image alt is required.
assert.match(messages(validateColumns([item(base, body, "content/column/wrong.md")], authors)), /ファイル名/);
assert.match(messages(validateColumns([item(base, body + "![](/a.png)")], authors)), /代替テキスト/);

// Unknown author and CTA.
assert.match(messages(validateColumns([item({ ...base, author: "nobody", cta: "x" })], authors)), /author[\s\S]*cta/);

// Hidden (unannounced) services can be drafted but not published.
const hidden = validateColumns(
  [item({ ...base, service: "experience-briefing", status: "published", publishedAt: "2026-10-01" })],
  authors,
);
assert.match(messages(hidden), /まだサイトで公開していない/);
assert.equal(validateColumns([item({ ...base, service: "experience-briefing" })], authors).errors.length, 0);

console.log("column check tests passed");
