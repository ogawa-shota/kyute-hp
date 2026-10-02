# kyute-hp repository guidance

## Purpose and stack

KYUTE's corporate site and recruitment-video landing pages. The application uses Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3, and Vercel Analytics. Use npm and the committed `package-lock.json`; Node 24 is recommended by `.nvmrc`.

## Read first

- `README.md` for routes, integrations, commands, and environment variables.
- `app/`, `components/`, and route-scoped CSS are the current implementation source of truth.
- `docs/site-structure-kyute.md` is legacy AO Navi material and does not describe the current site.
- For company facts, consult the sibling `KYUTE/context/` repository context. Do not invent missing facts.

## Architecture constraints

- `app/layout.tsx` and `components/SiteChrome.tsx` provide shared chrome; `/lp` routes intentionally render without it.
- Preserve each LP's scoped visual system and responsive behavior.
- API routes integrate with Resend, Slack, and the scheduling flow. Never expose secrets or send real email/Slack messages during tests.
- Preserve historical source assets unless removal is explicitly approved.
- Shared product/design methods belong in `shota-ai-os`; keep this file repository-specific.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm test
npm run build
```

## Definition of done

- Lint, mocked API tests, and production build pass.
- Product-facing changes are checked in a real browser on desktop, tablet, and mobile, including keyboard use, reduced motion, console/network errors, and affected forms/video dialogs.
- Metadata, sitemap, accessibility, performance, and responsive behavior remain correct for affected routes.
- Tests must use mocks; production deployment and real external messages require explicit approval.
