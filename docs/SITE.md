# KYUTE Site Contract

Status: current implemented route and surface map.

This document describes the routes currently present in the repository. It does not approve their design or content quality. When this document conflicts with executable routing, `app/**`, `next.config.*`, and `components/SiteChrome.tsx` are authoritative and this document must be corrected.

## Purpose

The application currently serves KYUTE's corporate presence, recruitment-video and recruitment-YouTube service information, owned-media information, contact entry points, and several independently designed campaign landing pages.

## Shared navigation and primary action

Corporate, service, about, and contact pages use the shared `SiteChrome`. The shared header links to Home, Service, About, and Contact; service navigation exposes recruitment YouTube and owned-media surfaces. The principal shared conversion action is `/contact` (displayed as a free-consultation action in the current UI).

All `/lp` routes bypass the shared header and footer. Each LP owns its navigation, CTA labels, forms, sticky controls, and responsive behavior.

## Current implemented routes

### Shared corporate/service surface

| Route | Current role | Main CTA or destination |
| --- | --- | --- |
| `/` | KYUTE overview; introduces recruitment YouTube, services, and owned media | `/contact` and service detail routes |
| `/service` | Index for the two currently presented service areas | `/service/youtube`, `/service/media`, `/contact` |
| `/service/youtube` | Recruitment YouTube operation service detail | `/contact` |
| `/service/media` | Owned-media service / 「運動部のシゴト。」 detail | `/contact` and media/video destinations |
| `/about` | Company approach and company information | `/contact` |
| `/contact` | Embedded Google Forms contact surface and FAQ | Form completion in the embedded external form |

### Independent LP surfaces

| Route | Current role | Main CTA or destination |
| --- | --- | --- |
| `/lp` | Recruitment-video / recruitment-YouTube campaign LP | Service-material download section and consultation/video pathways |
| `/lp/day-in-the-life` | Day-in-the-life recruitment-video service LP | Material request form and video viewing |
| `/lp/undo-job` | Corporate-facing LP for 「運動部のシゴト。」 | Service-material request and consultation |
| `/lp/pace` | Static PACE LP rewritten to `public/pace/index.html` by Next config | `/contact` consultation action |

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

- **Shared system:** `/`, `/service`, `/service/youtube`, `/service/media`, `/about`, and `/contact` share global tokens, typography, header/footer, and common content components.
- **Independent LPs:** `/lp`, `/lp/day-in-the-life`, and `/lp/undo-job` use route-scoped components, CSS, runtime interactions, forms, and media treatments.
- **Independent static LP:** `/lp/pace` is a self-contained static HTML/CSS/JS implementation under `public/pace/` and is not governed by the React LP styles.

Do not make a shared-token change under the assumption that every LP inherits it. Do not copy one LP's visual rules into another without an explicit redesign decision.

## Status boundaries

### Current

Only the routes listed above are represented as currently implemented. Public sitemap, metadata, PDFs, and external destinations must be checked separately when route behavior changes.

### Planned

No additional page route is established as an approved plan by the current implementation or current project-truth documents. A proposal must be recorded as planned before an agent treats it as committed scope.

### Archived

- [`archive/2026-05-06_ao-navi-corporate-site.md`](archive/2026-05-06_ao-navi-corporate-site.md) is a historical AOナビ-focused corporate-site plan. It conflicts with the current product and visual implementation and must not be used as a current specification.
