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

/** End-of-article calls to action. */
export const CTAS = {
  "download-recruit-video": {
    eyebrow: "採用動画制作",
    title: "面白く、企業の魅力を伝える採用動画を。",
    body: "考え方・制作事例・料金をまとめた資料をお送りします。",
    label: "採用動画の資料をもらう",
    href: "/service/recruit-video#download",
  },
  "download-recruit-youtube": {
    eyebrow: "採用YouTube運用代行",
    title: "採用を、消費から資産へ。",
    body: "採用YouTubeの価値と、企画から改善までの支援範囲をまとめた資料です。",
    label: "採用YouTubeの資料をもらう",
    href: "/service/recruit-youtube#download",
  },
  "demo-ai-casual-interview": {
    eyebrow: "AIカジュアル面談｜先行導入企業 募集中",
    title: "1対1で魅力を伝えたいが、人手が足りない。",
    body: "候補者が好きな時間に、AIと1対1で会社を知る面談です。デモと先行導入の条件をご案内します。",
    label: "デモ・先行導入について相談する",
    href: "/contact?service=ai-casual-interview",
  },
  "demo-experience-briefing": {
    eyebrow: "体験型会社説明会｜先行導入企業 募集中",
    title: "説明会の満足度と、運営の手間を両方変える。",
    body: "候補者が動画で会社を順番に体験し、疑問・アンケート・面談までつながる説明会です。",
    label: "デモ・先行導入について相談する",
    href: "/contact?service=experience-briefing",
  },
  "consult-general": {
    eyebrow: "無料相談",
    title: "採用の悩みを、まずは聞かせてください。",
    body: "採用動画・採用YouTubeを中心に、貴社に合う採用広報の進め方をご提案します。",
    label: "無料で相談する",
    href: "/contact",
  },
};

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
export function validateColumns(items, authors) {
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

    if (data.eyecatch !== undefined && (!data.eyecatch?.src || !data.eyecatch?.alt)) err(file, "eyecatch には src と alt の両方が必要です");
    for (const m of body.matchAll(/!\[([^\]]*)\]\(([^)]*)\)/g)) {
      if (!m[1].trim()) err(file, `画像に代替テキストがありません: ${m[2]}`);
    }

    if (data.slug) {
      if (slugs.has(data.slug)) err(file, `slug が ${slugs.get(data.slug)} と重複しています`);
      slugs.set(data.slug, file);
    }
    if (data.keyword) {
      const key = data.keyword.replace(/\s+/g, " ").trim().toLowerCase();
      if (keywords.has(key)) err(file, `狙う検索ワード「${data.keyword}」が ${keywords.get(key)} と重複しています（自社記事どうしで順位を奪い合います）`);
      keywords.set(key, file);
    }

    // Reviewer hints.
    const title = data.title ?? "";
    if (title.length > 40) warn(file, `タイトルが${title.length}文字です（検索結果では32文字前後で切れます）`);
    if (data.keyword && title && !data.keyword.split(/\s+/).every((w) => title.includes(w))) warn(file, `タイトルに検索ワード「${data.keyword}」の語が全部は入っていません`);
    const desc = data.description ?? "";
    if (desc && (desc.length < 70 || desc.length > 130)) warn(file, `description が${desc.length}文字です（目安 70〜130文字）`);
    const length = textLength(body);
    if (length < 2500) warn(file, `本文が約${length}文字です（目安 3,000文字以上）`);
    const h2 = (body.match(/^## /gm) ?? []).length;
    if (h2 < 3) warn(file, `見出し（##）が${h2}個です。構成を確認してください`);
    if (!/\]\(\/(?:service|lp|contact)/.test(body)) warn(file, "本文中にサービスページへのリンクがありません（末尾のCTAとは別に1つ入れると効果的です）");
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
