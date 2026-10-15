---
Status: current observed implementation
Approval: Not proof of user approval
Gold: Not Gold
---

# KYUTE Web Design Contract

This document records what the repository currently renders so that scoped changes can preserve it. It does **not** claim that the design is good, finished, approved, or an accepted brand standard. Shota AI OS defines the work method; this file defines only the current project-specific evidence.

## Corporate site (2026-10 renewal)

- **Status:** Implemented from the Figma direction selected by Shota on 2026-10-15 (file 「KYUTE HP リニューアル」, page 「構成・ワイヤー」, v4 row). Not Gold.
- **Routes:** every route outside `/lp/**`, plus `/lp/recruit-video` and `/lp/recruit-youtube` (same components without site navigation).
- **Typography:** LINE Seed JP (400/700/800) for Japanese, Inter for numerals and Latin labels — the same faces as the KYUTE sales decks. Headings are 800 weight; body text is 17px or larger.
- **Colors:** White and warm off-white (`#f4f3ef`) surfaces, charcoal (`#1d1f24`) text and dark sections, a single yellow accent (`#ffdb67`) for primary buttons, markers and small labels, pale yellow (`#fff3cf`) for asset panels. Tokens live under `.site` in `app/globals.css`.
- **Spacing and shape:** Sections `py-20`/`md:py-28`, content width 1200px, rounded 24px panels and pill buttons.
- **Imagery:** Thumbnails of KYUTE's own 「運動部のシゴト。」 videos (`public/works/`), always labelled as owned media, not customer work.
- **Story:** 採用動画 follows 情報過多 → 心に残る採用広報 → 面白く、心に残る採用動画. 採用YouTube follows お金が消える → 心が離れる → 認知を取って、心を掴んで、離さない → 資産. Both come from the 2026-10 sales decks.
- **CTA:** 資料請求 (service-specific form) and 無料相談 (`/contact`) on every page; mobile fixed bottom bar with both.
- **Preserve rules:** Do not show AIカジュアル面談 or 体験型会社説明会 until announced. Do not publish customer names, outcomes or SoVa material without permission. Keep the LP systems below separate.

## Culture / recruitment-video LP

- **Status:** Current observed independent implementation; not approval.
- **Routes:** `/lp`.
- **Typography:** Zen Kaku Gothic New for body content with Impact / Arial Narrow-style condensed display treatment for oversized editorial headings.
- **Colors:** Near-black (`#141414`), off-white (`#f9f9f4`), acid lime (`#d6ef62`), and fine rule colors.
- **Spacing:** Large editorial sections, typically around `120px` vertical padding on desktop, with deliberate dense/sparse alternation.
- **Borders:** Strong rules, framed media, and hard-edged divisions.
- **Radius:** Predominantly square or minimally rounded controls and panels.
- **Motion:** Scroll reveals, counters, sticky states, video/dialog interactions, and other route runtime behavior.
- **Section rhythm:** Oversized type, documentary media, grid changes, and high-contrast callouts create a campaign-like cadence.
- **Component language:** Editorial grids, numbered/content bands, documentary frames, bold CTA bands, sticky/mobile conversion UI.
- **Imagery/video:** Video is a primary storytelling surface; preserve aspect ratios, poster behavior, overlays, and dialog controls.
- **CTA:** Primary material-download journey anchored to the download section, with consultation and production-video pathways as supporting actions.
- **Responsive behavior:** Desktop editorial compositions stack and reflow into mobile layouts; the route owns mobile sticky conversion behavior.
- **Preserve rules:** Do not replace the lime/black editorial system with the shared corporate gold system. A scoped CTA or section change must not restyle the Hero or neighboring sections.

## Day-in-the-life LP

- **Status:** Current observed independent implementation; not approval.
- **Routes:** `/lp/day-in-the-life`.
- **Typography:** Zen Kaku Gothic New-based Japanese typography with editorial headline scale and documentary labeling.
- **Colors:** Paper (`#f5f3ed`), ink (`#1c1d1b`), muted gray (`#62635e`), red (`#ce402c`), and pale line (`#d4d2ca`).
- **Spacing:** Film-like long sections, commonly around `112px` vertical spacing on desktop.
- **Borders:** Fine rules and framed media; accents are used for hierarchy rather than generalized decoration.
- **Radius:** Predominantly square controls and frames.
- **Motion:** Runtime/reveal behavior and video interactions support the documentary sequence; reduced-motion behavior must remain intact where implemented.
- **Section rhythm:** Fixed header, editorial copy, asymmetric film/media rail, and long-form evidence sections.
- **Component language:** Documentary labels, time/scene framing, photographic panels, red conversion blocks, and material-request dialog/form.
- **Imagery/video:** Cinematic photography and video are structural content, not interchangeable decoration.
- **CTA:** Material download/request is primary; video viewing supports evaluation.
- **Responsive behavior:** Major composition changes occur around `1100px` and `767px`; media rails and multi-column sections stack on narrow screens.
- **Preserve rules:** Retain the paper/red documentary language and its pacing. Do not import the `/lp` lime system or corporate gold accents during small changes.

## Undo Job LP

- **Status:** Current observed independent implementation; not approval.
- **Routes:** `/lp/undo-job`.
- **Typography:** Zen Kaku Gothic New-based body typography with bold editorial display hierarchy.
- **Colors:** Paper (`#f5f3eb`), ink (`#181b19`), blue (`#3044b8`), gold (`#ebc752`), and fine line colors.
- **Spacing:** Large sections around `115px` on desktop and a fixed/sticky header region around `90px`.
- **Borders:** Strong one-pixel rules and clearly framed content/media.
- **Radius:** Mostly square components and CTAs.
- **Motion:** Reveal effects, counters, video/dialog controls, and sticky navigation/conversion UI.
- **Section rhythm:** Bold headings, editorial media, proof sections, and alternating conversion moments.
- **Component language:** Media-led editorial panels, data/counter elements, direct corporate CTA bands, and mobile dual-action controls.
- **Imagery/video:** Athlete/workplace video and still imagery carry the product story; maintain crop, overlay, and playback behavior.
- **CTA:** Service-material request and consultation are the principal conversion paths.
- **Responsive behavior:** Primary layout change is around `760px`, with an additional narrow-phone adjustment around `360px`; mobile uses a sticky dual CTA.
- **Preserve rules:** Keep the blue/gold/paper language and existing CTA hierarchy. Do not unify it with other LPs during scoped maintenance.

## PACE LP

- **Status:** Retired 2026-10-15. `/lp/pace` and `/pace/*` redirect to `/`; the static files remain in `public/pace/` as history.

## Evidence locations

- Corporate site: `app/globals.css` (`.site`), `app/layout.tsx`, `components/SiteChrome.tsx`, `components/site/`, `app/lp/LpShell.tsx`.
- Culture LP: `app/lp/page.tsx`, `app/lp/CultureLP.tsx`, `app/lp/culture.css`, `app/lp/culture-refinements.css`, `app/lp/culture-engine.css`, and its sibling route components.
- Day-in-the-life LP: `app/lp/day-in-the-life/` and its route components/styles.
- Undo Job LP: `app/lp/undo-job/` and its route components/styles.
- PACE LP: `next.config.*` and `public/pace/index.html`.
