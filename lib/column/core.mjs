// Column content model shared by the site (lib/column/index.ts) and the
// checker (scripts/check-columns.mjs). Plain ESM so any Node version can run it.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const CONTENT_DIR = "content/column";
export const AUTHORS_DIR = "content/authors";

/**
 * Services an article can belong to. The id doubles as the category slug.
 * `hidden` services are not announced yet: no category tab or page, no sitemap
 * entry, and their articles cannot be published (drafts are fine).
 */
export const SERVICES = {
  "recruit-video": { label: "採用動画", name: "採用動画制作", defaultCta: "download-recruit-video" },
  "recruit-youtube": { label: "採用YouTube", name: "採用YouTube運用代行", defaultCta: "download-recruit-youtube" },
  "ai-casual-interview": { label: "AIカジュアル面談", name: "AIカジュアル面談", defaultCta: "demo-ai-casual-interview", unproven: true, hidden: true },
  "experience-briefing": { label: "会社説明会", name: "体験型会社説明会", defaultCta: "demo-experience-briefing", unproven: true, hidden: true },
  general: { label: "採用広報", name: "採用広報全般", defaultCta: "consult-general" },
};

/**
 * Calls to action. Every entry can close an article (`cta:` in frontmatter, or
 * the service default) and can be placed inside the body with a marker line:
 *   <!-- cta: price-recruit-video -->
 * Only offer what the site actually provides; `service` ties an entry to a
 * service so hidden-service CTAs cannot leak into other articles.
 */
export const CTAS = {
  "download-recruit-video": {
    eyebrow: "採用動画制作",
    title: "面白く、企業の魅力を伝える採用動画を。",
    body: "考え方・制作事例・料金をまとめた資料をお送りします。",
    label: "採用動画の資料をもらう",
    href: "/service/recruit-video#download",
    service: "recruit-video",
  },
  "download-recruit-youtube": {
    eyebrow: "採用YouTube運用代行",
    title: "採用を、消費から資産へ。",
    body: "採用YouTubeの価値と、企画から改善までの支援範囲をまとめた資料です。",
    label: "採用YouTubeの資料をもらう",
    href: "/service/recruit-youtube#download",
    service: "recruit-youtube",
  },
  "demo-ai-casual-interview": {
    eyebrow: "AIカジュアル面談｜先行導入企業 募集中",
    title: "1対1で魅力を伝えたいが、人手が足りない。",
    body: "候補者が好きな時間に、AIと1対1で会社を知る面談です。デモと先行導入の条件をご案内します。",
    label: "デモ・先行導入について相談する",
    href: "/contact?service=ai-casual-interview",
    service: "ai-casual-interview",
  },
  "demo-experience-briefing": {
    eyebrow: "体験型会社説明会｜先行導入企業 募集中",
    title: "説明会の満足度と、運営の手間を両方変える。",
    body: "候補者が動画で会社を順番に体験し、疑問・アンケート・面談までつながる説明会です。",
    label: "デモ・先行導入について相談する",
    href: "/contact?service=experience-briefing",
    service: "experience-briefing",
  },
  "consult-general": {
    eyebrow: "無料相談",
    title: "採用の悩みを、まずは聞かせてください。",
    body: "採用動画・採用YouTubeを中心に、貴社に合う採用広報の進め方をご提案します。",
    label: "無料で相談する",
    href: "/contact",
  },
  "price-recruit-video": {
    eyebrow: "採用動画制作｜料金",
    title: "KYUTEの料金は、サービスページで公開しています。",
    body: "密着動画・オフィスツアー・インタビューの料金と、初回トライアルの条件を確認できます。",
    label: "採用動画の料金を見る",
    href: "/service/recruit-video#price",
    service: "recruit-video",
  },
  "price-recruit-youtube": {
    eyebrow: "採用YouTube運用代行｜料金",
    title: "月額プランと本数の目安を公開しています。",
    body: "目指す状態ごとの3つのプランと、それぞれの本数・形式を確認できます。",
    label: "採用YouTubeの料金を見る",
    href: "/service/recruit-youtube#price",
    service: "recruit-youtube",
  },
  "works-owned-media": {
    eyebrow: "制作事例｜自社メディア",
    title: "KYUTEが企画・撮影・編集した1日密着動画を見る。",
    body: "自社メディア「運動部のシゴト。」の動画です。顧客の導入実績ではありません。",
    label: "制作事例を見る",
    href: "/works",
  },
};

/** Buyer stage of the reader. Decides how strongly the article converts. */
export const STAGES = {
  learn: "情報収集",
  compare: "比較検討",
  decide: "発注直前",
};

/** Fields of the `strategy:` frontmatter block, decided before writing. */
export const STRATEGY_FIELDS = {
  reader: "想定読者",
  intent: "検索意図",
  stage: "検討フェーズ",
  value: "この記事で得られること",
  strength: "KYUTEに相談する理由",
};

/**
 * Articles written before the 2026-10 workflow (strategy, required eyecatch,
 * in-body CTA). Their missing items are warnings, not errors. Do not add new
 * slugs here; bring the article up to the current rules instead.
 */
export const LEGACY_SLUGS = ["recruit-video-production-company"];

/** Marker line for an in-body CTA. */
export const INLINE_CTA_RE = /^[ \t]*<!--\s*cta:\s*([a-z0-9-]+)\s*-->[ \t]*$/gm;

export const EYECATCH = { width: 1600, height: 900, minWidth: 1200, maxBytes: 500_000, warnBytes: 300_000 };

export const STATUSES = ["draft", "review", "published"];
export const MODES = ["auto", "plan"];

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Reads every article (files starting with "_" are templates and skipped). */
export function readColumns(root = process.cwd()) {
  const dir = path.join(root, CONTENT_DIR);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { file: `${CONTENT_DIR}/${file}`, data: normalize(data), body: content };
    });
}

export function readAuthors(root = process.cwd()) {
  const dir = path.join(root, AUTHORS_DIR);
  if (!fs.existsSync(dir)) return {};
  return Object.fromEntries(
    fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => [path.basename(f, ".json"), JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"))]),
  );
}

// gray-matter turns unquoted YAML dates into Date objects; keep them as YYYY-MM-DD.
function normalize(data) {
  const out = { ...data };
  for (const key of ["publishedAt", "updatedAt"]) {
    if (out[key] instanceof Date) out[key] = out[key].toISOString().slice(0, 10);
  }
  return out;
}

/** Service ids shown on the site. */
export function visibleServiceIds() {
  return Object.keys(SERVICES).filter((id) => !SERVICES[id].hidden);
}

export function ctaFor(data) {
  return data.cta ?? SERVICES[data.service]?.defaultCta;
}

/** In-body CTA ids, in order of appearance. */
export function inlineCtaIds(body) {
  return [...body.matchAll(INLINE_CTA_RE)].map((m) => m[1]);
}

/** Width/height from a PNG, JPEG or WebP header; null when unknown. */
export function imageSize(buf) {
  if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { format: "png", width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { format: "jpg", width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
    return { format: "jpg", width: 0, height: 0 };
  }
  if (buf.length >= 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { format: "webp", width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { format: "webp", width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") return { format: "webp", width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
  }
  return null;
}

/** Reads a site-relative asset ("/column/x/a.jpg") from public/. */
export function publicAssetInfo(root = process.cwd()) {
  return (src) => {
    const file = path.join(root, "public", decodeURI(src.split(/[?#]/)[0]));
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return null;
    const buf = fs.readFileSync(file);
    const ext = path.extname(file).slice(1).toLowerCase();
    return { bytes: buf.length, ext, ...(imageSize(buf) ?? {}) };
  };
}

export function isPublic(data, today = new Date().toISOString().slice(0, 10)) {
  return (
    data.status === "published" &&
    typeof data.publishedAt === "string" &&
    data.publishedAt <= today &&
    !SERVICES[data.service]?.hidden
  );
}

/** Visible length in characters, ignoring Markdown syntax roughly. */
function textLength(body) {
  return body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|\-\s]/g, "").length;
}

const ASSERTIVE = /必ず|確実に|保証|絶対|No\.?1|業界最安|業界初|\d+(?:\.\d+)?倍に/g;
const NUMERIC_CLAIM = /\d+(?:\.\d+)?\s*(?:%|％|倍|万人|万回|万円|件|社)/;

/**
 * Validates articles. Errors block a merge; warnings are hints for the writer.
 * @returns {{errors: {file: string, message: string}[], warnings: {file: string, message: string}[]}}
 */
export function validateColumns(items, authors, { assetInfo = publicAssetInfo() } = {}) {
  const errors = [];
  const warnings = [];
  const err = (file, message) => errors.push({ file, message });
  const warn = (file, message) => warnings.push({ file, message });

  const slugs = new Map();
  const keywords = new Map();

  for (const { file, data, body } of items) {
    const base = path.basename(file, ".md");

    for (const key of ["title", "description", "slug", "service", "keyword", "author", "status"]) {
      if (typeof data[key] !== "string" || !data[key].trim()) err(file, `「${key}」が未入力です`);
    }
    if (data.slug && !SLUG_RE.test(data.slug)) err(file, `slug「${data.slug}」は半角英小文字・数字・ハイフンだけにしてください`);
    if (data.slug && data.slug !== base) err(file, `ファイル名（${base}.md）と slug（${data.slug}）を一致させてください`);
    if (data.service && !SERVICES[data.service]) err(file, `service「${data.service}」は ${Object.keys(SERVICES).join(" / ")} のいずれかです`);
    if (data.status && !STATUSES.includes(data.status)) err(file, `status は ${STATUSES.join(" / ")} のいずれかです`);
    if (data.mode !== undefined && !MODES.includes(data.mode)) err(file, `mode は ${MODES.join(" / ")} のいずれかです`);
    const cta = ctaFor(data);
    if (data.cta !== undefined && !CTAS[data.cta]) err(file, `cta「${data.cta}」は ${Object.keys(CTAS).join(" / ")} のいずれかです`);
    if (data.author && !authors[data.author]) err(file, `author「${data.author}」が content/authors にありません`);
    if (data.reviewer && !authors[data.reviewer]) err(file, `reviewer「${data.reviewer}」が content/authors にありません`);

    // The one rule that keeps articles from being generic.
    const sources = Array.isArray(data.primarySources) ? data.primarySources.filter((s) => typeof s === "string" && s.trim()) : [];
    if (sources.length === 0) err(file, "primarySources（KYUTEにしか書けない一次情報）を1つ以上書いてください");

    if (data.references !== undefined) {
      if (!Array.isArray(data.references)) err(file, "references は URL のリストにしてください");
      else for (const ref of data.references) if (!/^https?:\/\//.test(String(ref))) err(file, `references に URL でない値があります: ${ref}`);
    }

    for (const key of ["publishedAt", "updatedAt"]) {
      if (data[key] !== undefined && !DATE_RE.test(String(data[key]))) err(file, `${key} は YYYY-MM-DD で書いてください`);
    }
    if (data.status === "published") {
      if (!data.publishedAt) err(file, "公開する記事には publishedAt が必要です");
      if (/TODO|要確認|ここに/.test(body)) err(file, "本文に TODO・要確認・仮の文言が残っています");
      if (SERVICES[data.service]?.hidden) err(file, `${SERVICES[data.service].name}はまだサイトで公開していないサービスです。公開できるのは下書きまでです`);
    }

    // From review on, new articles must ship complete: strategy, a real
    // eyecatch, and CTAs placed for the reader's stage. Drafts get hints.
    const legacy = LEGACY_SLUGS.includes(data.slug);
    const strict = data.status !== "draft" && !legacy;
    const must = (message) => (strict ? err : warn)(file, message);

    const strategy = data.strategy && typeof data.strategy === "object" ? data.strategy : {};
    const missing = Object.keys(STRATEGY_FIELDS).filter((k) => typeof strategy[k] !== "string" || !strategy[k].trim());
    if (missing.length) must(`strategy（CV戦略）の ${missing.map((k) => `${k}（${STRATEGY_FIELDS[k]}）`).join("・")} が未入力です`);
    if (strategy.stage && !STAGES[strategy.stage]) err(file, `strategy.stage は ${Object.keys(STAGES).join(" / ")} のいずれかです`);

    checkEyecatch(data, { file, err, warn, must, assetInfo });
    for (const m of body.matchAll(/!\[([^\]]*)\]\(\s*([^)\s]*)[^)]*\)/g)) {
      const [, alt, src] = m;
      if (!alt.trim()) err(file, `画像に代替テキストがありません: ${src}`);
      if (/^https?:\/\//.test(src)) {
        warn(file, `外部サイトの画像を直接表示しています（権利と表示速度を確認してください）: ${src}`);
        continue;
      }
      const info = assetInfo(src);
      if (!info) { err(file, `画像ファイルがありません: public${src}`); continue; }
      if (data.slug && !src.startsWith(`/column/${data.slug}/`)) warn(file, `記事の画像は public/column/${data.slug}/ に置いてください: ${src}`);
      if (info.bytes > 400_000) warn(file, `画像が${Math.round(info.bytes / 1000)}KBあります（目安 400KB以下）: ${src}`);
    }

    const inline = inlineCtaIds(body);
    for (const id of inline) {
      if (!CTAS[id]) err(file, `本文中のCTA「${id}」は ${Object.keys(CTAS).join(" / ")} のいずれかです`);
    }
    for (const id of [...new Set([...inline, ...(data.cta ? [data.cta] : [])])]) {
      const owner = CTAS[id]?.service;
      if (owner && SERVICES[owner]?.hidden && owner !== data.service) err(file, `CTA「${id}」は非公開サービス（${SERVICES[owner].name}）のものです`);
    }
    if (["compare", "decide"].includes(strategy.stage) && inline.length === 0) {
      must(`検討フェーズが「${STAGES[strategy.stage]}」の記事なのに、本文中のCTA（<!-- cta: ... -->）がありません`);
    }
    if (inline.length > 3) warn(file, `本文中のCTAが${inline.length}個あります（3個以内が目安）`);

    const visuals =
      (body.match(/!\[[^\]]*\]\([^)]*\)/g) ?? []).length +
      (body.match(/^\|.*\|\s*\n\|[\s:|-]+\|/gm) ?? []).length +
      (body.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)\S+$/gm) ?? []).length;
    if (visuals === 0) warn(file, "図表・画像・動画が1つもありません。理解を助ける箇所に入れられないか確認してください");
    if (/運動部のシゴト/.test(body) && !/自社メディア/.test(body)) warn(file, "「運動部のシゴト。」に触れていますが、KYUTEの自社メディアである（顧客実績ではない）ことが書かれていません");

    if (data.slug) {
      if (slugs.has(data.slug)) err(file, `slug が ${slugs.get(data.slug)} と重複しています`);
      slugs.set(data.slug, file);
    }
    if (data.keyword) {
      const key = data.keyword.replace(/\s+/g, " ").trim().toLowerCase();
      if (keywords.has(key)) err(file, `狙う検索ワード「${data.keyword}」が ${keywords.get(key)} と重複しています（自社記事どうしで順位を奪い合います）`);
      keywords.set(key, file);
    }

    // Hints for the writer.
    const title = data.title ?? "";
    if (title.length > 40) warn(file, `タイトルが${title.length}文字です（検索結果では32文字前後で切れます）`);
    if (data.keyword && title && !data.keyword.split(/\s+/).every((w) => title.includes(w))) warn(file, `タイトルに検索ワード「${data.keyword}」の語が全部は入っていません`);
    const desc = data.description ?? "";
    if (desc && (desc.length < 70 || desc.length > 130)) warn(file, `description が${desc.length}文字です（目安 70〜130文字）`);
    const length = textLength(body);
    if (length < 2500) warn(file, `本文が約${length}文字です（目安 3,000文字以上）`);
    const h2 = (body.match(/^## /gm) ?? []).length;
    if (h2 < 3) warn(file, `見出し（##）が${h2}個です。構成を確認してください`);
    if (!/\]\(\/(?:service|works|media|download|contact)/.test(body) && inlineCtaIds(body).length === 0) warn(file, "本文中にサービスページ・制作事例へのリンクがありません（文脈に合う箇所に1つ入れてください）");
    if ((body.match(/\]\(\/column\//g) ?? []).length < 2) warn(file, "関連コラムへのリンクが2本未満です");
    if (NUMERIC_CLAIM.test(body) && !(Array.isArray(data.references) && data.references.length)) warn(file, "数字が出てきますが references（出典）がありません");
    const assertive = [...new Set(body.match(ASSERTIVE) ?? [])];
    if (assertive.length) {
      const msg = `言い切り表現があります: ${assertive.join("、")}`;
      if (SERVICES[data.service]?.unproven) err(file, `${msg}（${SERVICES[data.service].name}は検証中のサービスです。効果を言い切らないでください）`);
      else warn(file, msg);
    }
    if (cta && !CTAS[cta]) err(file, `CTA を決められません（service か cta を確認してください）`);
  }

  return { errors, warnings };
}

function checkEyecatch(data, { file, err, warn, must, assetInfo }) {
  const eye = data.eyecatch;
  if (eye === undefined) {
    must(`アイキャッチ（eyecatch）がありません。public/column/${data.slug}/eyecatch.jpg（${EYECATCH.width}×${EYECATCH.height}）を作ってください`);
    return;
  }
  if (!eye?.src || !eye?.alt) {
    err(file, "eyecatch には src と alt の両方が必要です");
    return;
  }
  if (data.slug && !eye.src.startsWith(`/column/${data.slug}/`)) err(file, `eyecatch は public/column/${data.slug}/ に置いてください: ${eye.src}`);
  if (eye.alt.trim().length < 10) warn(file, "eyecatch の alt が短すぎます。画像に写っているものを具体的に書いてください");
  if (eye.alt.trim() === String(data.title ?? "").trim()) warn(file, "eyecatch の alt がタイトルと同じです。画像の内容を書いてください");
  const info = assetInfo(eye.src);
  if (!info) {
    err(file, `アイキャッチの画像ファイルがありません: public${eye.src}`);
    return;
  }
  if (!["jpg", "jpeg", "png", "webp"].includes(info.ext)) err(file, `アイキャッチは JPG / PNG / WebP にしてください（${info.ext}）`);
  else if (info.ext === "webp") warn(file, "アイキャッチが WebP です。SNSのシェア画像として確実に出すなら JPG を推奨します");
  if (info.width && info.height) {
    if (info.width < EYECATCH.minWidth) must(`アイキャッチの幅が${info.width}pxです（${EYECATCH.minWidth}px以上。推奨 ${EYECATCH.width}×${EYECATCH.height}）`);
    if (Math.abs(info.width / info.height - 16 / 9) > 0.02) must(`アイキャッチの比率が ${info.width}×${info.height} です（16:9 にしてください）`);
  }
  if (info.bytes > EYECATCH.maxBytes) must(`アイキャッチが${Math.round(info.bytes / 1000)}KBあります（${EYECATCH.maxBytes / 1000}KB以下。npm run column:eyecatch で最適化できます）`);
  else if (info.bytes > EYECATCH.warnBytes) warn(file, `アイキャッチが${Math.round(info.bytes / 1000)}KBあります（目安 ${EYECATCH.warnBytes / 1000}KB以下）`);
}
