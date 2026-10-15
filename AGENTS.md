# kyute-hp repository guidance

## Read first

- `docs/SITE.md` is the current route, purpose, CTA, navigation, and surface map.
- `docs/DESIGN.md` is the current observed implementation contract. It is neither user approval nor Gold.
- `README.md` records setup, architecture, integrations, and commands.
- `docs/COLUMN.md` and `.claude/skills/column/` define how column articles are written, checked, and published. Use the `column` skill for any article work.
- For company facts, consult the sibling `KYUTE/context/` repository. Do not invent missing facts or copy private Vault material.
- Use [Shota AI OS orchestration](../shota-ai-os/core/orchestration.md) and its `web-product` skill for methodology.

## Local constraints

- `app/layout.tsx` and `components/SiteChrome.tsx` provide shared chrome; `/lp` routes intentionally render without it.
- Preserve the distinct surface contracts in `docs/DESIGN.md`; do not normalize one LP to another or to the shared corporate system without an explicit redesign request.
- API routes integrate with Resend, Slack, and scheduling. Tests must use mocks; never expose secrets or send real email/Slack messages without explicit approval.
- Preserve historical source documents and assets unless removal is explicitly approved. Archived documents are not current specifications.
- Keep generic web methodology in Shota AI OS, not in this repository.

## Change routing

Classify UI scope and run the corresponding workflow through the canonical Shota AI OS `web-product` skill. This repository contributes only the applicable surface contract in `docs/DESIGN.md`, local constraints, and commands; do not replace an existing surface contract without an explicit redesign request.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm test
npm run build
```

## Definition of done

- `npm run lint`, `npm test`, and `npm run build` pass, or skipped/failed checks are reported.
- `docs/SITE.md` and `docs/DESIGN.md` remain accurate when routes, navigation, CTAs, or visual systems change.
- Technical QA and visual QA are reported separately. Affected UI is checked in a real browser at desktop and mobile; add tablet for large changes.
- Small UI work changes only the requested scope; unrelated Hero, sections, and LP surfaces remain visually unchanged.
- Metadata, accessibility, responsive behavior, forms, and video dialogs remain correct for affected routes.
- No production deployment, real external message, secret, or private Vault content is included without explicit approval.
