#!/usr/bin/env node
// Turns a source image (AI-generated, owned photo, or a code-drawn PNG) into a
// column eyecatch: 1600×900 JPG under public/column/<slug>/, within the size
// budget the checker enforces. Also writes thumbnail and square-crop previews
// so the small-size and cropped look can be checked before committing.
//   npm run column:eyecatch -- <slug> <source> [--position attention|center|top|bottom|left|right]
//                                              [--name eyecatch] [--preview-dir <dir>]
import fs from "node:fs";
import path from "node:path";
import { EYECATCH } from "../lib/column/core.mjs";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args.splice(i, 2)[1] : fallback;
};
const position = flag("position", "attention");
const name = flag("name", "eyecatch");
const previewDir = flag("preview-dir", null);
const [slug, source] = args;

if (!slug || !source) {
  console.error("使い方: npm run column:eyecatch -- <slug> <元画像> [--position attention|center|top] [--preview-dir <dir>]");
  process.exit(1);
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error(`slug「${slug}」は半角英小文字・数字・ハイフンだけにしてください`);
  process.exit(1);
}
if (!fs.existsSync(source)) {
  console.error(`元画像がありません: ${source}`);
  process.exit(1);
}

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("sharp を読み込めません。npm ci を実行してください（Next.js の依存として入ります）");
  process.exit(1);
}

const meta = await sharp(source).metadata();
if ((meta.width ?? 0) < EYECATCH.minWidth) {
  console.warn(`△ 元画像の幅が${meta.width}pxです。拡大するので粗くなります（${EYECATCH.width}px以上を推奨）`);
}

const outDir = path.join("public", "column", slug);
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `${name}.jpg`);
const fit = sharp.strategy[position] ?? position;
const base = sharp(source).rotate().resize(EYECATCH.width, EYECATCH.height, { fit: "cover", position: fit });

let bytes = 0;
for (const quality of [82, 76, 70, 64]) {
  const buf = await base.clone().jpeg({ quality, mozjpeg: true, progressive: true }).toBuffer();
  bytes = buf.length;
  fs.writeFileSync(out, buf);
  if (bytes <= EYECATCH.warnBytes) break;
}

console.log(`✔ ${out}（${EYECATCH.width}×${EYECATCH.height}・${Math.round(bytes / 1000)}KB）`);
console.log(`  frontmatter: eyecatch.src: /column/${slug}/${name}.jpg`);
if (bytes > EYECATCH.maxBytes) console.warn(`△ ${EYECATCH.maxBytes / 1000}KBを超えています。細部の少ない元画像にしてください`);

if (previewDir) {
  fs.mkdirSync(previewDir, { recursive: true });
  // List card on a phone (~343px wide) and a square crop (some SNS / apps).
  await sharp(out).resize(343, 193).toFile(path.join(previewDir, `${slug}-thumb-343.png`));
  await sharp(out).resize(900, 900, { fit: "cover", position: "centre" }).resize(400, 400).toFile(path.join(previewDir, `${slug}-square.png`));
  console.log(`  確認用: ${previewDir}/${slug}-thumb-343.png・${slug}-square.png`);
}
