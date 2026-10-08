---
name: jp-retro-cyberpunk-ui
description: Industrial brutalist interfaces filtered through Japanese retro print and cyberpunk street culture. Halftone duotone posters, acid yellow + hanko red + electric cyan on washi cream or deep navy, wide techno display type, spaced monospace telemetry, vertical Japanese text, staggered label tabs, coupon cut-lines and seal stamps. For portfolios, music/game/editorial sites that should feel like a 90s Tokyo zine printed on a broken risograph.
---

# SKILL: Japanese Retro × Cyberpunk Brutalism

## 1. Skill Meta
**Name:** Japanese Retro Print & Cyberpunk Street Interface Engineering
**Description:** Building web interfaces that fuse three sources: (1) industrial Swiss-style rigidity (visible grids, extreme type contrast, zero radius), (2) Japanese retro print culture: Shōwa-era posters, manga screentone, risograph zines, ticket stubs, hanko seals, vertical *tategaki* text, and (3) cyberpunk street aesthetics: graffiti/skate-punk energy, halftone megastructures, HUD brackets, CRT glitch. The result should look **printed, cut, stamped and sticker-bombed**. It should never look glossy, gradient-lit or "synthwave".

Reference DNA:
- **Poster mode:** a halftone photo of a megastructure in acid yellow + black, a red figure breaking out of the frame, a wide techno logotype, staggered vertical track-list tabs on a cyan band, a dashed coupon line with ✂, and a Japanese text block in the corner.
- **Brand-board mode:** flat color columns (navy / red / steel blue / cream) with circular badges straddling the boundary, and widely tracked monospace hex labels with slashed zeros.

## 2. Visual Archetypes
**Pick ONE per project and commit to it. Never mix both substrates in one interface.**

### 2.1 Retro Print Zine (Light)
Shōwa poster, riso zine, ticket and packaging print.
- Cream washi or white poster-stock substrate. Sumi-black ink.
- Large halftone **duotone** imagery (sumi + acid yellow), with one red subject cut out and overlapping the frame.
- Flat color bands and columns (cyan, navy, steel blue) used as structural slabs, not as backgrounds behind cards.
- Print artifacts: misregistration offset, paper grain, crop and registration marks, dashed cut lines.

### 2.2 Neo-Tokyo Night (Dark)
Cyberpunk street, arcade cabinet, pirate-radio terminal.
- Deep navy substrate (not pure black). Cream as the primary text color.
- Acid yellow and electric cyan act like neon *signage*: flat solid fills with no glow blur.
- HUD framing: brackets, crosshairs, katakana readouts, scanlines.
- Hanko red is reserved for alerts, the hero subject and the seal.

## 3. Typographic Architecture
Typography is the structure. There are four voices, and each has exactly one job.

### 3.1 Macro Display: Techno Logotype
Wide, heavy, rounded-square geometric letters with horizontal slits and stencil cuts (the "BOMB RUSH" voice).
- **Web fonts (pick one):** `Orbitron` 800–900, `Audiowide`, `Russo One`. Paid alternative: `Monument Extended`.
- **Scale:** `clamp(3.5rem, 11vw, 13rem)`. Leading `0.85–0.92`. Tracking `-0.02em` to `0`. Wide faces need less negative tracking.
- **Casing:** uppercase only.
- **Treatment:** cream or white fill with a sumi outline (`-webkit-text-stroke: 3px var(--sumi)` plus a hard offset `text-shadow: 6px 6px 0 var(--sumi)`, with no blur). Max 2 words per lockup. Stack the words, never one long line.

### 3.2 Spaced Monospace: Telemetry and Brand Labels
The "CYBERFUNK" / "YULLY LACERDA" / "0C324A" voice: thin, extremely tracked, with slashed zeros.
- **Web fonts:** `IBM Plex Mono` 400/500 (preferred) or `JetBrains Mono`. Always set `font-feature-settings: "zero" 1;`.
- **Scale:** 11–14px for metadata; 18–28px for subtitles under the logotype.
- **Tracking:** `0.25em–0.5em`. This wide spacing is the signature.
- **Casing:** uppercase. Use it for nav, metadata, hex values, coordinates, catalog numbers (`REV-04`, `VOL.02`, `№ 0C324A`).

### 3.3 Condensed Italic: Tab Labels
The track-list voice: bold condensed oblique set inside colored tabs.
- **Web fonts:** `Barlow Condensed` 600–700 *italic*, or `Archivo Narrow` 700 italic.
- **Scale:** 14–20px. Tracking `0`. Sentence case or title case is allowed here, and only here.
- **Usage:** rotated -90° labels in staggered tabs (see §6), tags, stickers, buttons.

### 3.4 Japanese: Tategaki and Katakana
- **Gothic (default):** `Noto Sans JP` 700/900, or `Zen Kaku Gothic New` 700.
- **Pixel / CRT (Dark mode only):** `DotGothic16`.
- **Mincho disruption (sparingly):** `Shippori Mincho B1` 800, halftoned or dithered. This replaces the Western serif disruption.
- **Usage:** vertical text with `writing-mode: vertical-rl`, small paragraph blocks in corners, giant katakana as background structure (8–15% opacity, or outlined only).
- **Rule:** Japanese must be **real and meaningful** (section names, translations, credits) with `lang="ja"`. Never fill space with gibberish kana.

## 4. Color System
Hex values are sampled from the two reference images. No gradients, no soft shadows, no translucency or blur. Every fill is flat, like ink.

### 4.1 Master Palette
| Token | Hex | Source | Name |
|---|---|---|---|
| `--washi` | `#FEF1D5` | brand board | Washi cream (light substrate / dark-mode text) |
| `--stock` | `#FDFDFD` | poster | Poster-stock white (alt light substrate, logotype fill) |
| `--sumi` | `#201F1E` | poster | Sumi ink (primary ink, halftone dots) |
| `--navy` | `#0C324A` | brand board | Deep navy (dark substrate / secondary ink) |
| `--hanko` | `#C11720` | brand board (poster red `#BB3134` merged in) | Hanko red: hero subject, seal, alerts |
| `--acid` | `#BBB81E` | poster | Acid yellow: halftone duotone, big slabs, signage |
| `--olive` | `#6A662E` | poster | Halftone midtone (duotone shadows only) |
| `--denki` | `#0489BE` | poster | Electric cyan: bands, tabs, links |
| `--steel` | `#679CBC` | brand board | Steel blue: secondary slabs, muted UI, badges |

### 4.2 If Retro Print Zine (Light)
- **Substrate:** `--washi` (or `--stock` for a colder poster look; choose one).
- **Ink:** `--sumi` for text, rules and halftone. `--navy` for secondary headings or one structural slab.
- **Color slabs:** `--acid`, `--denki`, `--steel`, `--navy`.
- **Accent:** `--hanko`, which is the only red.

### 4.3 If Neo-Tokyo Night (Dark)
- **Substrate:** `--navy` (sections may step down to `--sumi`; never use `#000`).
- **Text:** `--washi`. Muted text: `--steel`.
- **Signage:** `--acid` and `--denki` as solid fills with `--sumi` text on top.
- **Accent:** `--hanko`.
- **Optional CRT green is removed.** Status readouts use `--acid`.

### 4.4 Color Discipline
- **Max 3 chromatic colors per viewport** (besides substrate and ink). The classic triad is acid + hanko + denki. The brand quad is navy + hanko + steel + washi.
- **Hanko red ≤ 10% of any screen.** It marks the subject, never the whole background.
- **Contrast pairs (WCAG):**
  - `--sumi` on `--acid` ✔
  - `--washi` on `--navy` ✔
  - `--stock` on `--hanko` ✔
  - `--sumi` on `--steel` ✔
  - `--stock` on `--denki` only for text ≥ 24px or bold ≥ 19px.
  - Never put `--acid` text on `--washi`.
- **Banned:** neon pink, purple, magenta, synthwave gradients, outer glow, glassmorphism, drop shadows with blur.

## 5. Layout and Spatial Engineering
The page is a **printed poster cut into a grid**: rigid structure underneath, with collage energy on top.

- **Blueprint grid:** 12-column CSS Grid with visible 1–2px `--sumi` rules. Use `gap: 1px` over an ink-colored parent for hairlines.
- **Poster sections:** at least one full-bleed "poster" per page. It has a halftone image filling the slab, a logotype top-left overlapping the image, a cut-out subject breaking past the slab edge (negative margin and higher z-index), and a color band anchored to the bottom.
- **Brand-board columns:** equal flat color columns running edge to edge, labeled with spaced mono hex or section codes. Circular badges sit **centered on the boundary** between the substrate and the columns, half in and half out. This is the only place `border-radius: 50%` is allowed (badges and seals).
- **Bimodal density:** dense clusters (track-list tabs, credit blocks, Japanese paragraphs) set against vast empty slabs and giant type.
- **Asymmetry:** content never centers by default. Anchor to corners and grid edges, like poster metadata (top-left name, top-right category, bottom-right Japanese block).
- **Geometry:** `border-radius: 0` everywhere except circular badges, seals and pill logos.

## 6. Components and Symbology
- **Staggered tab labels (track list):** a row of narrow `--denki` (or `--acid`) tabs rising from a color band to different heights, like an equalizer. Each holds one rotated condensed-italic label (`writing-mode: vertical-rl; transform: rotate(180deg)`). Use them for project lists, tags and nav.
- **Coupon cut line:** `border-top: 2px dashed var(--sumi)` running the full width, with a `✂` glyph at the left end. It separates the "stub" (footer, credits, CTA) from the poster body.
- **Hanko seal:** a red circle or rounded square with 1–4 kanji or initials in `--stock`, rotated -8° to 8°, slightly offset. Use one per page, as a signature or "approved" stamp.
- **Pill logo / sticker:** an outlined pill with italic condensed text (the "revenga" style). Use it for brand marks, badges and "NEW".
- **Disclaimer micro-copy:** tiny uppercase bold grotesk lines, e.g. `THIS IS A CERTIFIED BAD DESIGN` / `LIMITED EDITION — VOL.02`. They act as texture, not as information.
- **Manga stamp:** a 1-bit line-art character or icon (`--sumi` lines on `--stock`) placed against the logotype. Never use emoji.
- **HUD syntax (Dark mode):** `[ 作品 / WORKS ]`, `>>>`, `///`, crosshairs `+` at grid intersections, catalog codes `UNIT/D-01`, `REV 2.6`.
- **Registration marks:** ⊕ crop and registration marks in sheet corners, plus `®` `©` `™` used as geometric ornaments.
- **Bilingual labels:** pair Latin and Japanese: `WORKS / 作品`, `ABOUT / 概要`, `CONTACT / 連絡`.

## 7. Texture and Post-Processing
The analog print must be visible. It should look misregistered, screened and grainy.

- **Halftone duotone images:** map every photo to `--sumi` + `--acid` (or `--navy` + `--steel`). Either pre-process the images, or use an SVG filter (`feColorMatrix` grayscale → `feComponentTransfer` duotone) plus a radial-dot `mask`/overlay with `mix-blend-mode: multiply`.
- **Cut-out subject:** the hero subject is a separate transparent PNG in flat `--hanko` with sumi halftone shading, layered above the duotone background.
- **Riso misregistration:** offset one ink layer by 1–3px (for example the hanko layer, or a duplicated logotype in `--denki` behind `--sumi`).
- **Screentone:** manga dot or line patterns via `radial-gradient` / `repeating-linear-gradient` on slabs at low contrast.
- **Paper grain:** a global SVG `feTurbulence` noise overlay at 4–7% opacity on the root.
- **Scanlines (Dark mode only):** `repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,.12) 2px 4px)`.
- **Glitch (Dark mode, hover only):** a hard RGB split using `--hanko` / `--denki` text-shadow offsets, with no blur.

## 8. Motion
Motion should feel mechanical and printed: things are **stamped, cut, slid in and misregistered**. They never float.

- **Easing:** `steps(4–8)` for mechanical beats; `power4.inOut` / `cubic-bezier(.7,0,.2,1)` for slides. No spring and no bounce.
- **Hanko stamp-in:** scale 1.4 → 1 with a slight rotation over 180ms using `steps(3)`, plus a 1-frame offset "ink bleed".
- **Tab rise:** the staggered labels grow from the color band one by one, like an equalizer (stagger 40ms).
- **Katakana scramble:** headings decode from random katakana into the final Latin text (GSAP ScrambleText, chars = katakana set).
- **Halftone reveal:** images wipe in with `clip-path` like a scanner or paper being slid out, never with an opacity fade.
- **Misregistration jitter:** on hover, the offset ink layer jumps 2px for 120ms.
- **Marquee:** a bilingual mono ticker between sections.
- **`prefers-reduced-motion`:** show final states immediately and disable scramble, jitter and scrub.

## 9. Web Engineering Directives
1. **Grid determinism:** `display: grid; gap: 1px;` over a `--sumi` parent for razor rules. Elements snap to tracks; the cut-out subject is the only element allowed to break the grid.
2. **Tokens first:** declare §4.1 as CSS custom properties on `:root`. Never hard-code hex values in components.
3. **Fonts:** load via `next/font` or Google Fonts with `display: swap`. Subset Noto Sans JP to the characters you use, because it is large. Always add `font-feature-settings: "zero" 1` to the mono stack.
4. **Vertical text:** `writing-mode: vertical-rl; text-orientation: mixed;` for Japanese; `upright` only for single kana or kanji stacks.
5. **Semantics:** `<data>`, `<samp>`, `<kbd>`, `<dl>` for telemetry; `lang="ja"` on every Japanese span; decorative kana and ornaments get `aria-hidden="true"`.
6. **Clamp:** use `clamp()` only for macro display type. Everything else uses fixed sizes.
7. **Images:** pre-process halftones at build time where possible, since live SVG filters on large images are expensive. Provide `width`/`height` so nothing shifts.
8. **Mobile:** tabs collapse into a horizontal scroll strip, the cut-out subject scales down but still breaks the frame, and giant katakana drops to an outline only.
