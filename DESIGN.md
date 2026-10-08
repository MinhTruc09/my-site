---
name: MinhTruc09 Portfolio
description: "A mobile developer's portfolio printed as a Japanese retro poster-zine: cobalt, cream and signal red, cut on a visible grid."
colors:
  # ── Primary: red family ───────────────────────────────
  signal-red: "#BD1B1F"     # (từ tranh nghe-thuat): replaces skill --hanko #C11720
  vermilion: "#FA2D1A"      # (từ tranh layout-cac-bang-mau)
  wine: "#8B011A"           # (từ tranh nghe-thuat)
  # ── Secondary: blue family ────────────────────────────
  cobalt: "#2A4C9E"         # (từ tranh nghe-thuat): replaces skill --steel #679CBC
  navy-ink: "#253054"       # (từ tranh style-nhat-ban-noi-loan): replaces skill --navy #0C324A
  denki-cyan: "#0489BE"     # (từ tranh manga-cyperpunk)
  # ── Tertiary: signal colors ───────────────────────────
  amber: "#F6BB02"          # (từ tranh nghe-thuat)
  flame: "#E44F0A"          # (từ tranh font-chu-va-mau)
  acid-screen: "#D4F53C"    # (từ tranh design-refs/01-trang-chu-cyperpunk)
  acid-print: "#BBB81E"     # (từ tranh manga-cyperpunk)
  acid-shadow: "#6A662E"    # (từ tranh manga-cyperpunk, giá trị lấy mẫu sẵn trong skill)
  # ── Neutral ───────────────────────────────────────────
  cream: "#FFF3E1"          # (từ tranh layout-cac-bang-mau): replaces skill --washi #FEF1D5
  paper-grey: "#DAD2C8"     # (từ tranh nghe-thuat)
  sumi: "#201F1E"           # (từ skill): the references' pure #000000 is rejected by PRODUCT.md
typography:
  display:
    # family: Archivo variable at wdth 125 (owner's choice; extended heavy like tranh font-chu-va-mau, has a vietnamese subset); size/case (từ skill §3.1)
    # lineHeight 0.88 is for Latin-only lines; lines with Vietnamese diacritics use display-vi
    fontFamily: "Archivo, 'Arial Black', sans-serif"
    fontVariation: "'wdth' 125"
    fontSize: "clamp(3.5rem, 11vw, 13rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.02em"
  display-vi:
    # (đề xuất: stacked diacritics on capitals such as Ễ, Ự need room above the cap height)
    fontFamily: "Archivo, 'Arial Black', sans-serif"
    fontVariation: "'wdth' 125"
    fontSize: "clamp(3rem, 9vw, 10rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    # condensed voice (từ skill §3.3) = Archivo at wdth 62; fixed size (đề xuất: skill §9.6 chỉ cho clamp ở display)
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontVariation: "'wdth' 62"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0"
  subtitle:
    # (từ skill §3.2: mono 18–28px, tracking 0.25–0.5em)
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.35em"
    fontFeature: "'zero' 1"
  label:
    # (từ skill §3.2: mono 11–14px)
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.3em"
    fontFeature: "'zero' 1"
  tab:
    # (từ skill §3.3: condensed italic 14–20px) = Archivo italic at wdth 62; 19px floor (đề xuất: contrast on denki-cyan)
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontVariation: "'wdth' 62"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0"
  body:
    # (đề xuất: skill has no body voice; mono matches the spec panels of tranh design-refs/02)
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
    fontFeature: "'zero' 1"
  jp:
    # (từ skill §3.4); not loaded yet: see Typography › Loading
    fontFamily: "'Noto Sans JP', sans-serif"
    fontSize: "1rem"
    fontWeight: 900
    lineHeight: 1.4
  lcd:
    # LCD readout role (từ tranh design-refs/02); IBM Plex Mono 500 with tabular figures replaces the skill's DotGothic16
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.05em"
    fontFeature: "'zero' 1, 'tnum' 1"
rounded:
  none: "0px"               # (từ skill §5: radius 0 everywhere by default)
  slab: "28px"              # (từ tranh style-nhat-ban-noi-loan + layout-cac-bang-mau): color-block tiles only
  full: "9999px"            # (từ skill §5: badges, seals, pill stickers)
spacing:
  rule: "1px"               # (từ skill §5/§9.1: hairline via gap over a sumi parent)
  rule-heavy: "2px"         # (từ skill §5)
  xs: "4px"                 # (đề xuất)
  sm: "8px"                 # (đề xuất)
  md: "16px"                # (đề xuất)
  lg: "32px"                # (đề xuất)
  xl: "64px"                # (đề xuất)
  2xl: "128px"              # (đề xuất: vertical gap between poster sections, desktop)
  section-mobile: "72px"    # (đề xuất: vertical gap between poster sections, < 768px)
  gutter: "16px"            # (đề xuất: mobile side gutter)
  gutter-desktop: "32px"    # (đề xuất: side gutter ≥ 1024px)
  container: "1440px"       # (đề xuất: max content width; slabs and bands still bleed full width)
  tap: "44px"               # (đề xuất: minimum touch target, WCAG 2.5.5)
components:
  button-primary:           # (màu từ tranh nghe-thuat; hình từ skill)
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
    height: "{spacing.tap}"
  button-primary-hover:
    backgroundColor: "{colors.wine}"
  button-ghost:             # (từ skill: ink outline)
    backgroundColor: "transparent"
    textColor: "{colors.sumi}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
    height: "{spacing.tap}"
  button-ghost-hover:
    backgroundColor: "{colors.sumi}"
    textColor: "{colors.cream}"
  tab-label:                # (component từ skill §6; màu từ tranh manga-cyperpunk)
    backgroundColor: "{colors.denki-cyan}"
    textColor: "{colors.sumi}"
    typography: "{typography.tab}"
    rounded: "{rounded.none}"
    width: "{spacing.tap}"
  swatch-slab:              # (từ tranh style-nhat-ban-noi-loan, layout-cac-bang-mau)
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.slab}"
    padding: "32px"
  terminal-panel:           # (từ tranh design-refs/02)
    backgroundColor: "{colors.sumi}"
    textColor: "{colors.cream}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "24px"
  hanko-seal:               # (component từ skill §6; màu từ tranh nghe-thuat)
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.cream}"
    typography: "{typography.jp}"
    rounded: "{rounded.full}"
    size: "72px"
  nav-link:                 # (từ tranh design-refs/01: "/ GITHUB" slash nav; typography từ skill)
    textColor: "{colors.sumi}"
    typography: "{typography.label}"
    padding: "8px 0"
    height: "{spacing.tap}"
  placeholder-frame:        # (đề xuất: PRODUCT.md requires visibly marked placeholders)
    backgroundColor: "{colors.paper-grey}"
    textColor: "{colors.sumi}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "24px"
  ref-tag:                  # (đề xuất: corner tag on temporary reference images)
    backgroundColor: "{colors.sumi}"
    textColor: "{colors.amber}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  phone-frame:              # (đề xuất: device mock for app screenshots, từ tranh design-refs/02)
    backgroundColor: "{colors.sumi}"
    rounded: "{rounded.none}"
    padding: "10px"
    width: "320px"
---

<!-- SEED: established with the user before implementation; re-run /impeccable document once there's code to capture the actual tokens and components. Motion, breakpoint and z-index tokens live in prose (Layout, Components → Motion) until that run moves them into the .impeccable/design.json sidecar. -->

# Design System: MinhTruc09 Portfolio

**Source key.** Every token and rule names where it came from:
- **(từ skill)**: `.claude/skills/jp-retro-cyberpunk-ui/SKILL.md`. It owns the **frame**: grid, type scale, rules and lines, mono labels.
- **(từ tranh X)**: a file in `art/` or `design-refs/`. These own **color, texture, motif and motion**, and **override the skill wherever the two conflict**. Overrides are marked **⟲ ghi đè skill**.
- **(đề xuất)**: no source; a working value to confirm during implementation.

## Overview

**Creative North Star: "The Cobalt Zine"**

The site is a risograph poster-zine from a Tokyo print shop: cobalt and navy ink slabs on cream stock, a signal-red subject that breaks out of the frame, and staccato bands of color code running along the bottom. Underneath it all is a strict, visible print grid (từ skill). On top sit the energy and the palette of the references: the red-on-blue tension shared by 8 of the 9 art pieces (từ tranh), headline words repeated like a chorus (từ tranh font-chu-va-mau), and halftone screens (từ tranh poster-retro, manga-cyperpunk).

The rhythm is **loud but counted**. Dense clusters such as tab stacks, spec panels and credit blocks sit against large flat slabs and oversized type that bleeds off the edge (từ tranh poster-retro, style-nhat-ban-noi-loan). Interactive parts switch into a dark terminal register: sumi panels, acid readouts and LCD numerals (từ tranh design-refs/01, design-refs/02). This register is the only place the cyberpunk HUD voice speaks.

The material is ink on paper. There are no glows, no glass, no gradients and no soft shadows. The references that use them (the *Fever* heat-blur, the holographic background of design-refs/03, the neon food renders in design-refs/02) were kept for their type and layout only.

Loud is never a reason to hide the facts. A recruiter must find role, stack, projects and contact within seconds (PRODUCT.md principle 2). The poster sits **around** those facts; it never sits **on top of** them.

**Key Characteristics:**
- Red against cobalt, on cream: the core triad (từ tranh, 6/12 references).
- A visible 12-column ink grid with hairline rules (từ skill).
- Extended heavy display words, stacked and repeated, some cut with speed stripes (từ tranh font-chu-va-mau).
- Hex codes and catalog numbers used as typography (từ tranh, 6/9 art pieces).
- Halftone and duotone imagery, misregistration, paper grain (từ tranh poster-retro, manga-cyperpunk).
- Motion that is stamped, striped and staggered, never floating (từ tranh, see Motion under Components).

## Colors

A primary-color poster palette: one hot red family against one cool blue family, printed on warm cream, with yellow and acid used as small signal flashes. Contrast ratios below are WCAG 2.x values computed from the hex tokens.

### Primary
- **Signal Red** (signal-red): the hero subject, the main headline color on cream, the primary button and the hanko seal. It is the "character" color of the references: the apple, the robot, the FEVER letters (từ tranh nghe-thuat, font-chu-va-mau, poster-retro, manga-cyperpunk). Cream on signal red is 5.7:1. ⟲ ghi đè skill `--hanko #C11720`.
- **Vermilion** (vermilion): hot fills only (color slabs, stickers, the stripe-cut layer of display type). It reaches only 3.5:1 on cream, so never use it for text under 24px (từ tranh layout-cac-bang-mau).
- **Wine** (wine): the depth of the red family: halftone shadow in red duotones, pressed and hover states of red controls, and a substrate for cream text (9.1:1) (từ tranh nghe-thuat).

### Secondary
- **Cobalt** (cobalt): the large cool field: full-bleed section slabs, swatch tiles, secondary headings on cream (7.3:1) (từ tranh nghe-thuat, layout-cac-bang-mau, hero-va-cac-tab). ⟲ ghi đè skill `--steel`.
- **Navy Ink** (navy-ink): the dark substrate for poster sections and the second ink. Cream on navy is 11.8:1 (từ tranh style-nhat-ban-noi-loan). ⟲ ghi đè skill `--navy #0C324A`.
- **Denki Cyan** (denki-cyan): only the track-list band and its tabs, as in the Bomb Rush poster. Sumi on cyan is 4.2:1 and cream on cyan is 3.6:1, so text on it must count as large text: bold and at least 19px (từ tranh manga-cyperpunk).

### Tertiary
- **Amber** (amber): the warm signal on light or navy grounds: the active state, the "NOW" marker, small bars. Sumi on amber is 9.4:1 (từ tranh nghe-thuat, mau-tham-khao).
- **Flame** (flame): an orange flash used inside the red family's stripe layers and stickers. It is never body text; cream on flame is only 3.5:1 (từ tranh font-chu-va-mau, hero-va-cac-tab).
- **Acid Screen** (acid-screen): the cyberpunk signal, **on sumi or navy only**: HUD readouts, LCD numerals, the focus ring in the terminal register. It reads at 13.3:1 on sumi and 10.4:1 on navy (từ tranh design-refs/01).
- **Acid Print** and **Acid Shadow** (acid-print, acid-shadow): the two inks of the halftone duotone for photos (từ tranh manga-cyperpunk).

### Neutral
- **Cream** (cream): the default page stock and the text color on every dark or red ground (từ tranh layout-cac-bang-mau, font-chu-va-mau). ⟲ ghi đè skill `--washi`.
- **Paper Grey** (paper-grey): a second, cooler paper for alternate panels, placeholder frames and disabled fills (từ tranh nghe-thuat).
- **Sumi** (sumi): the ink for body text, rules, halftone dots and terminal panels. Sumi on cream is 15.0:1 (từ skill). The references' pure `#000000` is not used.

### Surface Pairing (đề xuất)
Every section declares one surface. Text, rules, accents and focus rings follow this table and nothing else. There is **no light/dark theme toggle**: the register is chosen per section as part of the poster stack, and the site ignores `prefers-color-scheme`.

| Surface | Text | Muted text | Rules | Accent fill | Focus ring | Never |
|---|---|---|---|---|---|---|
| cream | sumi | cobalt | sumi | signal-red | sumi | acid-*, vermilion/flame text < 24px |
| paper-grey | sumi | navy-ink | sumi | signal-red | sumi | acid-* |
| cobalt | cream | cream (label voice) | cream | amber | cream | **any red text**, sumi body text |
| navy-ink | cream | paper-grey | cream | amber, acid-screen | acid-screen | **any red text** |
| sumi (terminal) | cream | paper-grey | cream (1px) | acid-screen | acid-screen | red text < 24px |
| signal-red / wine slab | cream | cream (label voice) | cream | amber | cream | cobalt or navy text |
| denki-cyan band | sumi, bold ≥ 19px | none | sumi | none | sumi | text < 19px |

### Named Rules
**The Poster Ratio Rule.** On any viewport, blue and cream slabs cover about 60–70%, the red family about 20–30%, and amber, flame or acid under 10% (từ tranh: the approved moodboard analysis). ⟲ ghi đè skill §4.4 "hanko ≤ 10%": red may fill one whole slab per viewport, but never two.

**The Red-Meets-Blue Rule.** Every viewport contains at least one point where a red **shape** touches or overlaps a cobalt or navy **shape**: a subject breaking a slab, a seal crossing a band edge, a stripe-cut cutting through a blue field. That tension is the signature of the set (từ tranh, 8/9 art pieces). It applies to shapes only. **Red text never sits on cobalt or navy**: signal red reads at 1.3:1 on cobalt and 2.0:1 on navy, which is unreadable and makes the edge vibrate. Where red type must cross a blue slab, give it a cream or sumi backing plate, or set it in cream instead.

**The Acid Lives at Night Rule.** Acid colors appear only on sumi or navy. They never touch cream (từ tranh design-refs/01; also skill §4.4 "never acid on washi").

**The Three Inks Rule.** At most three chromatic colors per viewport, not counting substrate and ink (từ skill §4.4).

## Typography

**Display Font:** Archivo variable, weight 900 at `wdth` 125 (extended), with Arial Black. Supports Vietnamese.
**Condensed Font:** the same Archivo at `wdth` 62, 700/800, plus 700 italic for tabs, with Arial Narrow.
**Label/Mono Font:** IBM Plex Mono 400/500/700 with slashed zero (with ui-monospace). It also carries the LCD role.
**Japanese:** Noto Sans JP 900, for the fixed bilingual labels only.

One variable family gives both the extended display voice and the condensed voice through its width axis (62–125), so the site ships two font files instead of five. This is the owner's choice and replaces the skill's Orbitron, Barlow Condensed and DotGothic16. ⟲ ghi đè skill §3.

**Character:** wide, heavy display words carry the volume, and the thin, widely spaced mono lines carry the information. The contrast between the two is the hierarchy (từ skill §3).

**Loading.** Archivo (`axes: ["wdth"]`, `normal` + `italic`) and IBM Plex Mono load through `next/font/google` in `layout.tsx`, with `display: "swap"` and the subsets `latin` + `vietnamese`. Width is set with `font-stretch` (125% display, 62% condensed) in the `type-*` utilities.

**Japanese glyphs: SVG outlines (owner decision, 2026-10-08).** The four fixed labels (作品, 概要, 技術, 連絡) are rendered as inline SVG outlines, `aria-hidden="true"`, each beside its Latin twin, which carries the meaning. No Japanese webfont is loaded.

Never let JP labels fall back to the system font: it differs on every OS and breaks the print look.

### Hierarchy
- **Display** (900, clamp(3.5rem, 11vw, 13rem), 0.88): hero lockups of one or two stacked **Latin** words, uppercase. Scale and leading come from the skill (§3.1). The extended family and the **stripe-cut** treatment, where horizontal bars of vermilion or flame cut through the letters, come from the art (từ tranh font-chu-va-mau). The display face is Archivo at `wdth` 125 instead of the skill's Orbitron, because the owner's name needs Vietnamese diacritics. ⟲ ghi đè skill.
- **Display VI** (900, clamp(3rem, 9vw, 10rem), 1.05): any display line that carries Vietnamese diacritics, the owner's name first of all. See The Diacritic Rule.
- **Outline Display** (same token as Display): Latin words such as WORKS, MOBILE or the handle MINHTRUC09 may be set **outline-only** (`color: transparent; -webkit-text-stroke: 1.5px currentColor`) and mixed with solid letters in the same lockup (từ tranh design-refs/01). Never outline Vietnamese lines: the stroke muddies the stacked marks.
- **Headline** (800, 3rem fixed, 0.95): section titles, uppercase and condensed, set in heavy stacks like "EUROPEAN / COLOR / MATCHING" (family từ skill §3.3; stacking từ tranh style-nhat-ban-noi-loan).
- **Subtitle** (400, 1.25rem, tracking 0.35em): the "CYBERFUNK" line directly under a display lockup, for example `MOBILE DEVELOPER` (từ skill §3.2; từ tranh manga-cyperpunk).
- **Body** (400, 15px, 1.6, max 65ch): project descriptions and the about text, in sentence case (đề xuất; matches the spec panels of tranh design-refs/02). Because it is monospace, keep paragraphs to 3–4 sentences and prefer spec lists for anything longer.
- **Label** (500, 12px, tracking 0.3em, uppercase): nav, metadata, dates, team size, stack keywords, hex codes, catalog numbers such as `PRJ-01` and `№ 2A4C9E` (từ skill §3.2).
- **Tab** (700 italic, 19px): track-list tab labels and stickers. This is the only place sentence or title case is allowed (từ skill §3.3).
- **JP** (900): vertical *tategaki* section names and bilingual pairs (từ skill §3.4; vertical CJK từ tranh style-nhat-ban-noi-loan).
- **LCD** (Plex Mono 500, 24px, tabular figures): numeric readouts inside the terminal register: years, the GPA `3.30`, project counters (family từ skill; role từ tranh design-refs/02).

### Named Rules
**The Diacritic Rule.** Any Vietnamese string, the name **NGUYỄN MINH TRỰC** first of all, is set only in Archivo or IBM Plex Mono. Both load their `vietnamese` subset (verified against next/font data). Mark the name's element `lang="vi"` while `<html lang>` stays `en`, so screen readers pronounce it correctly. At display size, Vietnamese lines use the **display-vi** token: line-height at least 1.05, plus padding-top of about 0.15em on the first line, so that stacked marks such as Ễ and Ự never collide with the line above or get clipped by `overflow: hidden`. **One word per line**: NGUYỄN / MINH / TRỰC. At `wdth` 125, Archivo cannot fit the full name on one line. Check the rendered name at 375px and 1440px before shipping.

**The Chorus Rule.** A display word may repeat two or three times in a vertical stack, with the stripe-cut moving to a different letter on each line, like the FEVER ×3 cover (từ tranh font-chu-va-mau, poster-retro).

**The Real Japanese Rule.** Every Japanese string is real, meaningful and marked `lang="ja"`: 作品 WORKS, 概要 ABOUT, 技術 SKILLS, 連絡 CONTACT (từ skill §3.4). Decorative Japanese gets `aria-hidden="true"`; the Latin twin carries the meaning.

**Language: English** (owner decision, 2026-10-08). The name stays in Vietnamese with full diacritics, and Japanese is limited to the fixed bilingual labels above, drawn as SVG.

## Layout

**Grid (từ skill §5, §9.1).** A 12-column CSS grid with `gap: 1px` over a sumi parent, so the hairline rules are the grid itself. Heavy 2px rules separate major blocks. Elements snap to tracks. The cut-out hero subject and display type that bleeds off the edge are the only things allowed to break the grid.

**Layout tokens (đề xuất).**

| Token | Value | Use |
|---|---|---|
| bp-sm | 480px | large phones |
| bp-md | 768px | grid goes from 4 to 8 columns |
| bp-lg | 1024px | grid goes from 8 to 12 columns; gutter goes to `gutter-desktop` |
| bp-xl | 1440px | `container` max width reached; slabs and bands keep bleeding full width |
| section gap | `2xl` (128px) / `section-mobile` (72px) | vertical rhythm between poster sections |

**Stacking order (đề xuất).**

| Layer | z-index | Holds |
|---|---|---|
| base | 0 | slabs, grid, images |
| subject | 10 | the cut-out hero subject, edge-bleeding type |
| sticker | 20 | stickers, the hanko seal, chips that overlap edges |
| header | 30 | corner metadata and nav |
| overlay | 40 | the section index (constellation) menu |
| grain | 50 | the paper-grain overlay, always `pointer-events: none` |
| cursor | 60 | the custom crosshair cursor (fine pointers only) |

**The 5-Second Rule (đề xuất; PRODUCT.md principle 2).** The first viewport, at both 375 × 667 and 1440 × 900, must show without scrolling: the name, the role `MOBILE DEVELOPER`, the core stack (`FLUTTER · SWIFTUI`) and one primary CTA. The poster treatment wraps these elements but never replaces them with pure decoration. No intro animation may hide them for longer than 600ms.

**Page as poster stack (từ tranh).** Each section follows the poster sequence of the references: a heavy title anchored top-left, then the image or slab, then a **color band along the bottom** carrying hex or catalog labels (từ tranh font-chu-va-mau, mau-tham-khao, mau-tham-khoa, manga-cyperpunk). Sections alternate cream stock with navy or cobalt full-bleed slabs. ⟲ ghi đè skill §2 "pick ONE substrate": the references put navy and cream in the same poster (từ tranh style-nhat-ban-noi-loan).

**Section order (owner decision, 2026-10-08: direction A "Print Run").**
1. **Hero:** name, role, stack, CTA (5-Second Rule), plus a ticket stub with birth year, major, school, class years and GPA. Subject: the rotating 3D phone, standing on its own. Background: a full-bleed, smoothly flowing "oil" heat gradient after the *Fever* cover (cream → cobalt fringe → red → flame → amber → butter core), centred behind the phone; the type is knocked out to bare stock. Owner decision, 2026-10-08: this overrides the "no gradients / no blur" and stepped-motion rules **for the hero background only**.
2. **Works / 作品:** the four CV projects, using track-list tabs and terminal panels.
3. **Skills / 技術:** its own section; each skill points to the projects that used it.
4. **About / 概要:** education, GPA, the Tây Ninh internship (Figma → FlutterFlow), certifications, languages (English), hobbies.
5. **Contact / 連絡:** the stub below the ✂ cut line.

**Asymmetry and eye path (từ tranh).** Nothing is centered by default (also skill §5). The eye enters top-left and travels down a **diagonal**: rising tabs, a tilted subject, a stepped stack of swatch slabs (từ tranh hero-va-cac-tab, manga-cyperpunk, nghe-thuat). It comes to rest on the bottom band.

**Density (từ skill §5 + tranh).** Bimodal: tight clusters (tabs, spec panels, credits, vertical Japanese) set against large flat slabs and giant type. There are few true white gaps; slabs run edge to edge (từ tranh poster-retro, style-nhat-ban-noi-loan).

**Bento tiles (từ tranh style-nhat-ban-noi-loan, design-refs/02).** Groups such as skills or certifications may sit as a bento of swatch slabs and terminal panels that alternate dark and light.

**Section index (từ tranh design-refs/03).** The full-screen menu is a constellation: circular emblem nodes for WORKS, ABOUT, SKILLS and CONTACT, joined by thin diagonal sumi or cream lines, with a vertical side label and micro HUD readouts in the corners.

**Corner metadata (từ skill §5; từ tranh design-refs/01).** The name sits top-left, slash nav (`/ GITHUB / LINKEDIN / EMAIL`) top-right, tiny tracked mono copy in the side margins, and a vertical Japanese block bottom-right.

**Responsive (từ skill §9.8).** Below 768px:
- The grid collapses to 4 columns with a 16px gutter.
- Tabs become a horizontal scroll strip. **Their labels turn back to horizontal reading** instead of rotated, and each tab keeps a 44px minimum height (đề xuất).
- The cut-out subject scales down but still breaks the frame.
- Giant background katakana becomes outline-only.
- The constellation menu becomes a vertical list with the node circles kept.
- There is no horizontal page scroll, except inside the tab strip.

## Elevation & Depth

Flat, printed depth. There are no `box-shadow` blurs, no glows and no translucency (từ skill §4; confirmed by the PRODUCT.md anti-references). Depth comes from three print devices:

- **Overlap.** Type and subject sit over slabs and break their edges. The red subject crosses the grid with a higher z-index (từ skill §5; từ tranh manga-cyperpunk, style-nhat-ban-noi-loan).
- **Hard offset.** A solid, unblurred offset shadow on display type and stickers: `6px 6px 0` in sumi (từ skill §3.1).
- **Misregistration.** One ink layer is shifted 1–3px, for example a cyan or vermilion copy of a heading sitting behind the sumi layer (từ skill §7; từ tranh manga-cyperpunk).

### Texture (từ tranh)
- **Halftone dot screen** over a whole subject or slab: coarse dots that stay visible at 1×, as in the apple poster (từ tranh poster-retro). Blue dot fields on cobalt slabs work the same way.
- **Duotone photos** in acid-print and sumi, or in cobalt and cream (từ tranh manga-cyperpunk; technique từ skill §7).
- **Photocopy grit**: scratches, ink drop-outs and high-contrast crushed shadows on poster images (từ tranh manga-cyperpunk).
- **Paper grain**: a global noise overlay at 4–7% (technique từ skill §7; film grain từ tranh layout-cac-bang-mau).
- **Flat cel fills**: illustration and icon work uses flat fills with no gradients (từ tranh mau-tham-khao, mau-tham-khoa).
- **Scanlines**: terminal register only (từ skill §7).

### Named Rules
**The Ink-Not-Light Rule.** If an effect needs a blur radius, it is out. Every depth cue must be printable with two inks and an offset (từ skill §4; từ tranh: the *Fever* blur was explicitly excluded).

**The Readable-Over-Texture Rule (đề xuất).** Text never sits directly on a halftone, duotone or photographic area. It gets a solid backing plate in the surface color (see Surface Pairing), or it moves off the image.

## Shapes

- **Square by default.** Radius 0 for panels, buttons, inputs, tabs and the grid (từ skill §5).
- **Rounded swatch slabs.** Large color blocks may use the `slab` radius (28px), tiled like the poster grid of the European Color Matching board and the Babiichuk swatch cards (từ tranh style-nhat-ban-noi-loan, layout-cac-bang-mau). ⟲ ghi đè skill §5 "radius 0 everywhere except badges". This applies only to full-color slabs that hold no controls.
- **The big circle.** A recurring large disc: the sun behind a headline, a lens, the apple, the jellyfish bell. It is used as one oversized cream, amber or red circle per poster section that a headline overlaps (từ tranh style-nhat-ban-noi-loan, mau-tham-khao, poster-retro, hero-va-cac-tab).
- **Full circles** are also used for the hanko seal, the badges straddling slab boundaries and the constellation nodes (từ skill §5, §6; từ tranh design-refs/03).
- **Angular frames.** In the terminal register, panels may carry thin circuit-line borders with 45° chamfered corners (từ tranh design-refs/01, design-refs/02).
- **Cut lines.** A dashed 2px sumi rule with ✂ separates the stub (footer, contact) from the poster body (từ skill §6; từ tranh manga-cyperpunk).

## Components

No components are implemented yet. These entries record the committed patterns, not shipped code.

### Buttons
Stamped and tactile (từ skill).
- **Shape:** square (0px), with a minimum height of 44px.
- **Primary:** signal-red fill with cream mono label text, 16px × 24px padding (color từ tranh nghe-thuat).
- **Hover / Focus:** the fill steps to wine and the label jumps 2px as one misregistration jitter (120ms). The focus ring is a 2px solid outline offset 3px in the surface's focus color (see Surface Pairing) (đề xuất; jitter từ skill §8).
- **Active:** a 2px down-right press, so the hard offset collapses (đề xuất).
- **Disabled:** a paper-grey fill with sumi text at 60% and no jitter. Prefer hiding an action over disabling it (đề xuất).
- **Ghost:** a 2px sumi outline with no fill. On hover it inverts to a sumi fill with cream text.

### Primary CTAs (đề xuất; PRODUCT.md principle 5)
One clear next step for each audience, in this order of weight:
1. **`DOWNLOAD CV ↓`** (primary button). It links to the PDF in `public/`.
2. **`EMAIL ME`** (ghost button). Use a `mailto:` link to the CV email.
3. **`/ GITHUB / LINKEDIN`** (nav-link voice).

The hero shows 1 and 2. The contact stub repeats all three and adds the phone as a `tel:` link (owner decision, 2026-10-08). The birth year may appear in the hero stub; the full birth date and gender are never published.

### Links and states (đề xuất)
- **Inline links:** sumi text with a 2px underline in signal red, offset 3px. On hover the underline thickens into a solid red block behind cream text (on cream surfaces). On blue surfaces the underline is amber, per the Red-Meets-Blue Rule.
- **External links** end with `↗`. Repository links show the repo path in label voice: `GITHUB.COM/MINHTRUC09/SHAREXE ↗`.
- **Active nav item:** an amber block marker `■` before the label, and `aria-current="page"`.
- **Card hover** (project panels, swatch slabs): the hard offset appears (`6px 6px 0` sumi) and the panel shifts -2px/-2px. There is no scale and no shadow blur.
- **Text selection:** `::selection` uses a signal-red background with cream text (5.7:1), as implemented in `globals.css`.
- **Loading:** an LCD readout `LOADING ▮▮▮▯▯` in steps, never a spinner.
- **Empty or missing content:** use the placeholder frame (see Imagery & Assets).
- **Cursor:** native on touch devices. On fine pointers, an optional crosshair `+` with mono coordinates. The native text cursor always stays over inputs and text.

### Chips
- **Style:** stack keywords such as `FLUTTER` or `SWIFTUI` as tab-voice stickers, or as an outlined pill for brand-like marks (pill từ skill §6). Sticker shapes such as "!" may appear as decoration (từ tranh poster-retro).

### Cards / Containers
- **Terminal panel** (từ tranh design-refs/02): sumi ground, a `/TITLE 作品` header in label or LCD voice, a bordered spec list (stack, team size, dates), and a 3-cell footer row. Used for project details.
- **Project panel content** (đề xuất, fixed order so recruiters can compare): catalog number `PRJ-01`, project name, one-line purpose, role, team size, dates, stack chips, and the repository link. Every field comes from the CV; nothing is invented (PRODUCT.md).
- **Swatch slab** (từ tranh style-nhat-ban-noi-loan, layout-cac-bang-mau): a full-color rounded slab with a mono hex or catalog label and a large numeral such as `01`.
- **No shadows.** Borders are 1px or 2px sumi rules.

### Imagery & Assets (đề xuất)
**Current state.** The owner has no original artwork, screenshots or photos yet (PRODUCT.md "Absent"). Until replacements exist, images from `art/` and `design-refs/` **may be used as temporary reference placeholders during development**, under these rules:
- Copy them into `public/ref/` (gitignored, like `art/` and `design-refs/`). They never get committed or deployed.
- Render them only through one `RefImage` component, so they can all be found and swapped at once. That component:
  - always applies the house treatment (halftone or duotone in palette inks), so the placeholder also previews the final look;
  - always shows a **ref-tag** in the corner: `REF · TEMP · <file name>` in amber on sumi;
  - falls back to the **placeholder frame** when the file is missing, for example on a fresh clone or in production.
- They never appear as "the owner's work", and they are never used in a project panel as if they were a screenshot of that app.

**Placeholder frame.** A paper-grey block with diagonal sumi hatching (1px lines, 12px apart), a 1px sumi border, and a centered label `[ SCREENSHOT PENDING ]` or `[ IMAGE PENDING ]`. The aspect ratio matches the final asset.

**Final assets (replace before public launch), in priority order:**
1. **App screenshots and screen recordings** of ShareXe, SwiftUI Movie, Agricultural Traceability and Movieom, shown in the **phone frame**: a flat sumi body, 0 radius, a 10px bezel and a hard offset. Do not use photoreal device mockups. Recordings use MP4/WebM, are muted, loop, and have a poster frame.
2. **Original photos** (for example Saigon flyovers, signage, apartment blocks) shot by the owner and run through the duotone and halftone treatment.
3. **Code-generated art**: p5.js halftone fields, SVG emblems and stripe-cut type. Being procedural, these carry no rights issue.
4. **Optional 3D accent**: at most one low-poly model per page (CC0 or self-made), rendered with a flat toon and halftone shader in palette inks.

**Formats.** Use AVIF/WebP via `next/image` with explicit `width`/`height`. Pre-process halftones at build time where possible (từ skill §9.7).

**Pre-launch gate.** No `RefImage` remains on any route, and `public/ref/` is empty in the deploy.

### Icons (đề xuất)
Use custom 1-bit SVG icons on a 24px grid with a 2px square-capped stroke, mitred joins and no rounded terminals, drawn in `currentColor`. Constellation emblems use the same stroke inside a full circle. Do not use rounded icon sets (Lucide, Heroicons outline) as-is, because their softness breaks the print look. Simple arrows and marks may come from text glyphs: `↗ ↓ → ✂ ■ +`.

### Navigation
- **Corner nav:** label voice, uppercase, slash-separated: `/ WORKS / ABOUT / CONTACT` (từ tranh design-refs/01). Every hit area is at least 44px tall.
- **Section index overlay:** the constellation layout described under Layout (từ tranh design-refs/03). It traps focus while open, closes on `Esc`, and returns focus to its trigger.
- **Bilingual labels:** each pairs Latin and Japanese (từ skill §6).
- **Mobile:** the overlay becomes a full-screen vertical list.

### Track-list Tabs (signature)
Project titles are staggered vertical denki-cyan tabs rising from a cyan band to different heights, like an equalizer. Each holds a rotated condensed-italic label (component từ skill §6; source poster từ tranh manga-cyperpunk). Each tab is a real link or button to its project panel, with an accessible name equal to the project title.

### Swatch Band (signature)
The bottom band of a section: equal flat color columns, each labeled in spaced mono with its hex value or a section code. It is the most repeated motif of the art set (từ tranh font-chu-va-mau, mau-tham-khao, mau-tham-khoa, layout-cac-bang-mau, nghe-thuat, hero-va-cac-tab).

### Hanko Seal
One per page: a signal-red circle with cream glyphs, rotated between -8° and 8° (từ skill §6). Glyphs: the handle **`MinhTruc09`** in Archivo, stacked as `MINH` / `TRUC` / `09` inside the circle (owner decision, 2026-10-08). The seal is decorative (`aria-hidden="true"`).

### Social Card and Favicon (đề xuất)
- **OG image** (1200 × 630, static PNG): a cream stock background, NGUYỄN / MINH / TRỰC in display-vi signal red, `MOBILE DEVELOPER · FLUTTER · SWIFTUI` in subtitle voice, a cobalt swatch band along the bottom with hex labels, and the hanko seal crossing the band edge. This is the preview recruiters see when the link is shared from LinkedIn or TopCV.
- **Favicon:** the hanko seal, simplified to the `MT` initials at 32px and below.

### Motion (từ tranh, ghi đè skill khi mâu thuẫn)
The references are still images, so motion is translated from their rhythm. It is **staccato and counted**.

**Motion tokens (đề xuất; values from skill §8 where noted).**

| Token | Value | Use |
|---|---|---|
| dur-micro | 120ms | jitter, hover steps (skill §8) |
| dur-ui | 180ms | sticker slap, state changes (skill §8) |
| dur-reveal | 500ms | stripe wipe, clip-path reveals |
| dur-scene | 900ms | the longest single entrance |
| stagger-tight | 40ms | equalizer rise (skill §8) |
| stagger-chorus | 80ms | chorus lines, swatch count-in |
| ease-cut | `cubic-bezier(.7,0,.2,1)` | slides and wipes (skill §8) |
| ease-step | `steps(3)` to `steps(6)` | stamps, halftone resolve, LCD (skill §8) |

**Patterns.**
- **Stripe wipe:** display words reveal through horizontal bars sliding across the letters, as in the FEVER stripe-cut (từ tranh font-chu-va-mau). Uses dur-reveal and ease-cut.
- **Chorus stagger:** repeated display lines enter one after another, at stagger-chorus (từ tranh font-chu-va-mau).
- **Equalizer rise:** track-list tabs grow from the band at staggered heights, at stagger-tight (từ tranh manga-cyperpunk; timing từ skill §8).
- **Halftone resolve:** images build from coarse dots to a fine screen with ease-step, never with an opacity fade (từ tranh poster-retro; "no fade" từ skill §8).
- **Diagonal entry:** subjects and slabs enter along the reference's diagonal (bottom-left to top-right), never straight up (từ tranh hero-va-cac-tab, manga-cyperpunk).
- **Sticker slap:** stickers and the seal land with a scale step from 1.4 to 1 and a small rotation, using dur-ui and `steps(3)` (từ skill §8; sticker shapes từ tranh poster-retro).
- **Swatch count-in:** band columns appear left to right like a beat, and their hex labels type on in mono (từ tranh, swatch-band motif).
- **Katakana scramble and the bilingual ticker** are kept from the skill (từ skill §8). They do not conflict with the references.
- **Forbidden:** floating, spring or bounce, glow pulses, blur transitions (từ skill §8; từ tranh: the excluded *Fever* blur).

**Orchestration (đề xuất).**
- **Load sequence (hero):** the corner metadata and CTA are visible on the first paint, with no animation. Then the display stripe wipe runs (≤ 600ms total, per the 5-Second Rule), then the sticker slap of the seal, then the swatch count-in.
- **Scroll:** Lenis smooth scrolling is synced to GSAP ScrollTrigger. Each section entrance plays **once**, at about 20% into the viewport, and does not reverse on scroll-up. Scrub and pin are reserved for the Works section only (tabs to panels).
- **Budget:** at most **one show-off effect per viewport**. The rest of the motion is micro feedback. Animate only `transform`, `opacity` and `clip-path`. Never animate layout properties.
- **Mobile:** turn off pin and scrub below 768px; entrances still play. Any WebGL or p5 canvas is paused when offscreen and replaced with a static image on low-power devices.
- **`prefers-reduced-motion`:** show final states at once, turn off wipes, jitter, scrambles, the ticker and Lenis, and keep all content visible (từ skill §8).

## Do's and Don'ts

### Do:
- **Do** let a red **shape** meet cobalt or navy in every viewport (The Red-Meets-Blue Rule).
- **Do** keep blue and cream at 60–70%, red at 20–30% and signals under 10% (The Poster Ratio Rule).
- **Do** pick text, rule and focus colors from the Surface Pairing table.
- **Do** show name, role, stack and a CTA in the first viewport (The 5-Second Rule).
- **Do** draw the grid with 1px sumi gap rules and snap everything to it except the hero subject and edge-bleeding type (từ skill).
- **Do** label colors, sections and projects with spaced mono codes: `№ 2A4C9E`, `PRJ-01`, `2024—2025` (từ tranh + skill).
- **Do** set the Vietnamese name with display-vi (Archivo), one word per line, inside a `lang="vi"` element (The Diacritic Rule).
- **Do** keep vermilion and flame text at 24px or larger, and cyan tab labels bold at 19px or larger (contrast checked).
- **Do** route every temporary reference image through `RefImage`, with its REF tag showing.

### Don't:
- **Don't** set red text on cobalt or navy (1.3:1 and 2.0:1).
- **Don't** use gradients, glows, blur, glassmorphism or iridescent backgrounds (từ skill; PRODUCT.md anti-references).
- **Don't** use purple, violet or synthwave pink, including the muted purples of tranh mau-tham-khao (PRODUCT.md anti-references; skill §4.4).
- **Don't** put acid colors on cream (The Acid Lives at Night Rule).
- **Don't** use pure `#000000` for large areas; use sumi or navy (PRODUCT.md).
- **Don't** round anything except swatch slabs, circles and pills.
- **Don't** set text directly on halftone or photo areas (The Readable-Over-Texture Rule).
- **Don't** present reference images as the owner's work, commit them, or deploy them publicly. They stay temporary, tagged and gitignored until replaced (PRODUCT.md).
- **Don't** fill space with fake Japanese or kana gibberish (từ skill §3.4).
- **Don't** use rounded icon sets or spinners.
