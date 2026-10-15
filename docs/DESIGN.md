---
Status: current observed implementation
Approval: Not proof of user approval
Gold: Not Gold
---

# KYUTE Web Design Contract

This document records what the repository currently renders so that scoped changes can preserve it. It does **not** claim that the design is good, finished, approved, or an accepted brand standard. Shota AI OS defines the work method; this file defines only the current project-specific evidence.

## Corporate / service / contact shared system

- **Status:** Current observed shared implementation; not approval.
- **Routes:** `/`, `/service`, `/service/youtube`, `/service/media`, `/about`, `/contact`, `/column/**` (article body typography in `app/column/column.css`).
- **Typography:** Zen Kaku Gothic New for Japanese/body content and Inter for Latin text and numerals, with fluid heading/body tokens.
- **Colors:** White and light-gray surfaces; charcoal/near-black text; a warm yellow-gold accent (`#ffdb67`) and related tint/deeper values. These are implementation values, not accepted corporate-brand rules.
- **Spacing:** Wide section spacing, commonly around `py-20` through desktop `py-28`, with bounded content widths and split section headers.
- **Borders:** Fine, low-contrast dividers and outline states.
- **Radius:** Mostly restrained; some dropdown, form, and content surfaces use rounded corners such as `rounded-xl`.
- **Motion:** Smooth scrolling and quiet reveal transitions. Preserve existing reduced-motion handling on affected components.
- **Section rhythm:** Alternation of white, soft-gray, tinted, and dark sections with generous reading space.
- **Component language:** Shared header/footer/mobile CTA, typographic section headings, structured service blocks, evidence/content sections, and restrained decorative treatment.
- **Imagery/video:** Recruitment footage, company/media imagery, and YouTube embeds support the narrative; current cropping and aspect ratios are part of the observed layout.
- **CTA:** The primary shared action leads to `/contact`, currently framed as a free consultation. Service-detail links are secondary.
- **Responsive behavior:** Desktop navigation and multi-column sections collapse to mobile navigation, stacked content, and mobile CTA behavior at Tailwind/component breakpoints.
- **Preserve rules:** Do not apply an LP palette or display type to this surface. Keep shared-chrome behavior, content width, section rhythm, CTA hierarchy, and unaffected routes stable.

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

- **Status:** Current observed independent static implementation; not approval.
- **Routes:** `/lp/pace`, rewritten to `public/pace/index.html`.
- **Typography:** The standalone file loads Montserrat, Noto Sans JP, and Oswald while also using local Avenir/Yu Gothic and Yu Mincho-style stacks in different sections. This mixed stack is an observed fact, not a recommended standard.
- **Colors:** The file defines paper (`#f7f5ed`), ink (`#12241d`), lime (`#d8ff73`), coral (`#ff6a4c`), sky/amber/mint tokens and later layered blue/teal/lime styling. Preserve the effective cascade when making scoped changes.
- **Spacing:** Self-contained max-width layout (about `1180px`) with dense feature, diagram, pricing, and calculator sections.
- **Borders:** Graphic outlines and section/card separators vary within the standalone campaign system.
- **Radius:** Rounded cards and pills are prominent; a base radius around `28px` is defined.
- **Motion:** Reveal and decorative animation behavior is implemented in the static document; reduced-motion overrides exist and must remain effective.
- **Section rhythm:** Dense explanatory diagrams and pricing/product modules alternate with broad campaign statements and CTA bands.
- **Component language:** Rounded cards, pills, diagrams, comparison/pricing structures, interactive simulator, and bright campaign accents.
- **Imagery/video:** Static assets and diagrams are integrated directly into the standalone HTML.
- **CTA:** The main consultation action leads to `/contact` and is currently labeled for PACE consultation.
- **Responsive behavior:** Major layout changes occur around `980px` and `640px`; complex modules stack or simplify on narrow screens.
- **Preserve rules:** Treat `public/pace/index.html` as its own visual system. Do not assume React shared tokens apply, and do not flatten its layered cascade during a small edit.

## Evidence locations

- Shared system: `app/globals.css`, `app/layout.tsx`, `components/SiteChrome.tsx`, `components/lp/`.
- Culture LP: `app/lp/page.tsx`, `app/lp/CultureLP.tsx`, `app/lp/culture.css`, `app/lp/culture-refinements.css`, `app/lp/culture-engine.css`, and its sibling route components.
- Day-in-the-life LP: `app/lp/day-in-the-life/` and its route components/styles.
- Undo Job LP: `app/lp/undo-job/` and its route components/styles.
- PACE LP: `next.config.*` and `public/pace/index.html`.
