#!/usr/bin/env node
// Checks every column article before review. Errors exit 1 (the PR cannot merge);
// warnings are hints for the writer.
//   npm run column:check            all articles
//   npm run column:check -- --keywords   list the keyword registry
import { CTAS, SERVICES, ctaFor, readAuthors, readColumns, validateColumns } from "../lib/column/core.mjs";

const items = readColumns();

if (process.argv.includes("--keywords")) {
  console.log("| 検索ワード | サービス | 状態 | 記事 |");
  console.log("|---|---|---|---|");
  for (const { data } of [...items].sort((a, b) => String(a.data.service).localeCompare(String(b.data.service)))) {
    console.log(`| ${data.keyword} | ${SERVICES[data.service]?.label ?? data.service} | ${data.status} | /column/${data.slug} |`);
  }
  process.exit(0);
}

const { errors, warnings } = validateColumns(items, readAuthors());

const group = (list) =>
  Object.entries(Object.groupBy ? Object.groupBy(list, (x) => x.file) : list.reduce((acc, x) => ((acc[x.file] ??= []).push(x), acc), {}));

for (const [file, list] of group(errors)) {
  console.log(`\n✖ ${file}`);
  for (const { message } of list) console.log(`  - ${message}`);
}
for (const [file, list] of group(warnings)) {
  console.log(`\n△ ${file}`);
  for (const { message } of list) console.log(`  - ${message}`);
}

const published = items.filter((i) => i.data.status === "published").length;
console.log(
  `\n${items.length}本（公開 ${published}本）を確認しました。エラー ${errors.length}件・注意 ${warnings.length}件。` +
    (items.length ? ` CTA: ${[...new Set(items.map((i) => ctaFor(i.data)).filter((c) => CTAS[c]))].join(", ")}` : ""),
);
process.exit(errors.length ? 1 : 0);
