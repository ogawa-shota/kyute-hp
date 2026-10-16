# KYUTE Site Contract

Status: current implemented route and surface map.

This document describes the routes currently present in the repository. It does not approve their design or content quality. When this document conflicts with executable routing, `app/**`, `next.config.*`, and `components/SiteChrome.tsx` are authoritative and this document must be corrected.

## Purpose

The application serves KYUTE's corporate site (renewed 2026-10): two services (採用動画制作, 採用YouTube運用代行) that each convert on their own page, owned-media works (「運動部のシゴト。」), the column, and ad / legacy landing pages.

## Shared navigation and primary actions

Every application route except `/lp/**` uses `SiteChrome` (`components/site/Header.tsx`, `Footer.tsx`). The standalone static PACE LP is also outside this chrome. Header (from 1280px): 採用動画制作, 採用YouTube運用代行, 運動部のシゴト。, 制作事例, コラム, 会社紹介, plus 資料請求 (`/download`) and 無料相談 (`/contact`). Narrower screens use a menu button and a fixed bottom bar with both actions.

Each service page has its own material request form (`#download`), posting to the existing delivery endpoints: 採用動画 → `/api/material-request`, 採用YouTube → `/api/culture-material`.

AIカジュアル面談 and 体験型会社説明会 are not announced yet and appear nowhere on the site.

## Current implemented routes

### Corporate site

| Route | Current role | Main CTA or destination |
| --- | --- | --- |
| `/` | FV, 課題から選ぶ (2 services), 制作事例, latest columns (hidden while none are published), FAQ | `/contact`, `/download`, service pages |
| `/service` | Index of the two services | Service pages |
| `/service/recruit-video` | 採用動画制作: 情報過多 → 心に残る採用広報 → works → price (incl. 初回トライアル) → 活用 → FAQ → form | `#download` form, `/contact` |
| `/service/recruit-youtube` | 採用YouTube運用代行: お金が消える → 心が離れる → 認知を取って、心を掴んで、離さない → 資産 → proof → plans → FAQ → form | `#download` form, `/contact` |
| `/media` | 「運動部のシゴト。」 media page: the `/lp/undo-job` content embedded in the site chrome (LP layout and colors, site typeface) | Material request form, `/contact` |
| `/works` | Owned-media works list | `/media`, YouTube, `/service/recruit-video` |
| `/about` | Mission, 「採用を、消費から資産へ。」, company profile | — |
| `/download` | Both material request forms | Forms |
| `/contact` | Embedded Google Forms contact surface and FAQ | Embedded external form |
| `/column` | Column index with category filter | Article pages |
| `/column/category/[category]` | Column list per visible service (`recruit-video`, `recruit-youtube`, `general`; `ai-casual-interview` and `experience-briefing` are hidden until announced) | Article pages |
| `/column/[slug]` | Column article from `content/column/<slug>.md`; drafts render only locally and on Vercel previews (noindex) | Per-service end-of-article CTA and optional in-body CTA cards (`<!-- cta: id -->`), both from `CTAS` in `lib/column/core.mjs`: service `#price` / `#download`, `/works`, `/contact`. Clicks on any `data-cta` element are sent as the Vercel Analytics event `column_cta_click` |

Redirects (`next.config.ts`, permanent): `/service/youtube` → `/service/recruit-youtube`, `/service/media` → `/media`, `/pace` → `/lp/pace`.

Rewrite (`next.config.ts`): `/lp/pace` → `/pace/index.html`. The static file remains directly accessible; it has the same `index,follow` metadata and canonical URL (`https://www.kyute.jp/lp/pace`). Only the canonical PACE URL is included in the sitemap.

### Landing pages

PACE is indexable and included in the sitemap, as requested on 2026-10-16. Other LPs remain noindex and outside the sitemap.

| Route | Current role | Main CTA or destination |
| --- | --- | --- |
| `/lp/recruit-video` | Ad LP: the 採用動画制作 page without site navigation, trial band under the FV | `#download` form |
| `/lp/recruit-youtube` | Ad LP: the 採用YouTube運用代行 page without site navigation | `#download` form |
| `/lp` | Legacy recruitment-YouTube campaign LP (kept for existing links) | Material download, consultation |
| `/lp/day-in-the-life` | Legacy day-in-the-life LP (kept for existing links) | Material request form |
| `/lp/undo-job` | Standalone 「運動部のシゴト。」 LP with its own header/footer; same content as `/media` (`app/lp/undo-job/UndoJobContent.tsx`) | Service-material request and consultation |
| `/lp/pace` | Standalone PACE recruiting-operations LP served from `public/pace/index.html`; monthly plans from 49,800円 | Consultation (`https://www.kyute.jp/contact`), pricing simulator (`#pricing`) |

### Route handlers

| Route | Current role |
| --- | --- |
| `/api/contact` | Resend contact handler retained in the codebase; not called by the current `/contact` page |
| `/api/culture-material` | Culture LP material delivery flow |
| `/api/material-request` | Material request and internal notification flow |
| `/api/material-request/approve` | Approval step for scheduling guidance |
| `/api/slack/material-request` | Slack interaction endpoint for the approval flow |
| `/api/undo-job-material` | 「運動部のシゴト。」 material delivery flow |

## Major surfaces and ownership

- **Corporate site:** every non-`/lp` application route, built from `components/site/` and scoped tokens under `.site` in `app/globals.css`; excludes the standalone static PACE file.
- **Ad LPs:** `/lp/recruit-video` and `/lp/recruit-youtube` reuse the service page components inside `app/lp/LpShell.tsx`.
- **Legacy LPs:** `/lp`, `/lp/day-in-the-life`, `/lp/undo-job` keep their own route-scoped systems.
- **PACE LP:** `/lp/pace` serves `public/pace/index.html` with its own styles, runtime, header/footer, and mobile consultation CTA. It is not included in the corporate service navigation.

## Status boundaries

### Current

Only the routes listed above are represented as currently implemented. `app/sitemap.ts` generates the sitemap (static pages plus published columns). Public sitemap, metadata, PDFs, and external destinations must be checked separately when route behavior changes.

### Planned

No additional page route is established as an approved plan by the current implementation or current project-truth documents. A proposal must be recorded as planned before an agent treats it as committed scope.

### Archived

- [`archive/2026-05-06_ao-navi-corporate-site.md`](archive/2026-05-06_ao-navi-corporate-site.md) is a historical AOナビ-focused corporate-site plan. It conflicts with the current product and visual implementation and must not be used as a current specification.
