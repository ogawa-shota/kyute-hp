---
Status: current observed implementation
Approval: Not proof of user approval
Gold: Not Gold
---

# KYUTE Web Design Contract

This document records what the repository currently renders so that scoped changes can preserve it. It does **not** claim that the design is good, finished, approved, or an accepted brand standard. Shota AI OS defines the work method; this file defines only the current project-specific evidence.

## Corporate site (2026-10 renewal)

- **Status:** Implemented from the Figma direction selected by Shota on 2026-10-15 (file 「KYUTE HP リニューアル」, page 「構成・ワイヤー」, v4 row). Not Gold.
- **Routes:** every application route outside `/lp/**` (excluding the standalone static PACE file), plus `/lp/recruit-video` and `/lp/recruit-youtube` (same components without site navigation).
- **Typography:** LINE Seed JP (400/700/800) for Japanese, Inter for numerals and Latin labels — the same faces as the KYUTE sales decks. Headings are 800 weight; body text is 17px or larger.
- **Colors:** White and warm off-white (`#f4f3ef`) surfaces, charcoal (`#1d1f24`) text and dark sections, a single yellow accent (`#ffdb67`) for primary buttons, markers and small labels, pale yellow (`#fff3cf`) for asset panels. Tokens live under `.site` in `app/globals.css`.
- **Spacing and shape:** Sections `py-20`/`md:py-28`, content width 1200px, rounded 24px panels and pill buttons.
- **Imagery:** Thumbnails of KYUTE's own 「運動部のシゴト。」 videos (`public/works/`), always labelled as owned media, not customer work.
- **Story:** 採用動画 follows 情報過多 → 心に残る採用広報 → 面白く、心に残る採用動画. 採用YouTube follows お金が消える → 心が離れる → 認知を取って、心を掴んで、離さない → 資産. Both come from the 2026-10 sales decks.
- **CTA:** 資料請求 (service-specific form) and 無料相談 (`/contact`) on every page; mobile fixed bottom bar with both.
- **/media exception:** `/media` embeds the Undo Job LP below unchanged except for the typeface (`.site .uj-embedded` in `app/globals.css`) and its sticky mobile CTA, which the site bar replaces.
- **Preserve rules:** Do not show AIカジュアル面談 or 体験型会社説明会 until announced. Do not publish customer names, outcomes or SoVa material without permission. Keep the LP systems below separate.

### Access analytics settings

- `/analytics` uses the corporate typography, a 768px reading width, white background and one off-white settings panel. Body text is at least 17px. The footer includes a 17px underlined link.
- React LPs keep a single 17px underlined settings link in normal document flow after their existing content/footer. Mobile bottom padding leaves it above the LP's fixed CTA at the end of the page; it is not a floating control. Static PACE is excluded.
- A configured GA4 ID on a production hostname shows a compact white permission panel until the visitor chooses. Equal outlined, 48px minimum-height buttons read 「許可する」 and 「許可しない」; no choice is preselected. The panel has a details link and does not lock page scrolling or move focus.
- The panel sits above the corporate mobile CTA (80px bottom clearance; 96px on app LPs), is scrollable in short viewports and moves to the bottom-right on desktop. Existing Hero, page sections, primary CTAs and independent LP systems are unchanged. The static PACE document is outside this integration.

### Column articles (`/column/[slug]`)

- **Status:** Current observed implementation inside the corporate system; not approval.
- **Layout:** Single 768px reading column (`max-w-3xl`), breadcrumb, title, meta, 16:9 eyecatch (rounded 16px), table of contents (3+ H2), body, end CTA, author box, related columns on off-white.
- **Body typography:** `app/column/column.css` — 17px (18px from 640px), line-height 2; H2 with a charcoal underline, H3 with a yellow left rule; strong text uses a pale-yellow marker.
- **Visual blocks:** Markdown tables (horizontal scroll on narrow screens), figures with captions (image with a Markdown title), `> [!POINT]` / `> [!NOTE]` boxes (charcoal border, yellow label), YouTube embeds.
- **CTA:** In-body cards from `<!-- cta: id -->` (pale-yellow panel, rounded 24px, yellow pill button, 48px minimum height) placed after decision material; the dark end-of-article CTA per service; the site's mobile bottom bar stays.
- **Imagery:** Article-specific 1600×900 JPG eyecatch under `public/column/<slug>/`, shared by the list card, the article, OGP and Article structured data. AI-generated images must not be presented as real employees, customers or shoots. Rules: `.claude/skills/column/references/visual-design.md`.
- **Trust footer:** A collapsed `出典・参考資料` details block follows the body; public reference URLs wrap on mobile. The existing author panel also shows the named content reviewer when provided and a link to `/about`. This is a scoped extension of the existing reading surface.
- **Performance:** Japanese font preloading is disabled to prevent hundreds of initial font downloads. Font families, weights and `display: swap` are unchanged. This is not a typography redesign.

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

- **Status:** Restored 2026-10-16 as an independent LP; current observed implementation, not approval.
- **Routes:** `/lp/pace` rewrites to `public/pace/index.html`; `/pace` redirects to `/lp/pace`. The static `/pace/index.html` remains directly accessible. All served versions use `index,follow` and the canonical URL `https://www.kyute.jp/lp/pace`. The canonical URL is included in the sitemap, as requested on 2026-10-16.
- **Typography and colors:** Noto Sans JP for Japanese with Montserrat and Oswald display treatments; navy, light blue, cyan, and lime accents.
- **Layout and runtime:** Standalone header/footer, large sections, candidate-journey diagram, interactive pricing simulator, plan comparison, expandable FAQ, scroll reveals, and mobile sticky consultation CTA. The hero is followed by the simulator, four illustrated customer challenges, then the existing plan cards. A system-free onboarding section precedes the plan comparison. Below the one-email-address headline, a navy PACE enclosure combines two illustrated white panels: recruitment-system functions and recruiting-administrator work, joined by a lime plus. The four existing service areas are grouped two per role; the panels stack on mobile. Challenge illustrations use original SVG scenes under `public/pace/illustrations/`, with navy outlines, cyan and lime. The new challenge grid uses four columns on desktop, two below 1100px, and one below 640px; existing primary breakpoints remain 980px and 640px.
- **Messaging:** Hero label: 「採用管理システム不要」. Main message: 「神速×神対応で、選考辞退を防ぐ。採用オペレーションは、PACEに丸投げ。」. Onboarding asks for one email address; services cover application/scheduling, candidate communication, candidate records, and a hiring dashboard. FAQ and existing record-management labels reflect that the client does not need an ATS.
- **CTA and pricing:** Consultation links use `https://www.kyute.jp/contact`; the pricing simulator is linked from the hero. Monthly prices are fixed by plan at 49,800円 / 79,800円 / 99,800円, regardless of interview count. STEP 2 retains the monthly interview count selector solely for internal effort/cost and savings estimates. Bands use 10/20/30/40 representative candidates; 51+ uses 51 as an explicitly stated lower-bound reference. Plan cards, comparison, and FAQ use the same fixed fees.
- **Preserve rules:** Keep the static LP's design and runtime independent from the corporate site and other LPs. Do not add PACE to corporate service navigation as part of this restoration.

## Evidence locations

- Corporate site: `app/globals.css` (`.site`), `app/layout.tsx`, `components/SiteChrome.tsx`, `components/site/`, `app/lp/LpShell.tsx`.
- Culture LP: `app/lp/page.tsx`, `app/lp/CultureLP.tsx`, `app/lp/culture.css`, `app/lp/culture-refinements.css`, `app/lp/culture-engine.css`, and its sibling route components.
- Day-in-the-life LP: `app/lp/day-in-the-life/` and its route components/styles.
- Undo Job LP: `app/lp/undo-job/` and its route components/styles.
- PACE LP: `next.config.*` and `public/pace/index.html`.
