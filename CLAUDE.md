@AGENTS.md

# CLAUDE.md: MinhTruc09 Portfolio

Personal portfolio of **Nguyễn Minh Trực** (handle `MinhTruc09`), a mobile developer working in Flutter and Swift/SwiftUI. The site is a Japanese retro poster-zine crossed with cyberpunk print, and it doubles as a sample of his design-plus-engineering range.

## Communication
- Reply to the owner in **Vietnamese**. Code, comments, commit messages and project docs stay in **English**.
- Before writing any UI, state which DESIGN.md rules a change relies on. When a request conflicts with DESIGN.md or PRODUCT.md, say so and ask. Do not silently pick one.

## Sources of truth (read before working)
| File | Owns | Precedence |
|---|---|---|
| `PRODUCT.md` | users, purpose, positioning, real content (CV facts), anti-references, open decisions | product truth: highest |
| `DESIGN.md` | tokens, typography, layout, surfaces, components, motion, do's and don'ts. Frontmatter is normative; every token cites its source (`từ tranh X` / `từ skill` / `đề xuất`) | visual truth |
| `src/app/globals.css` | the implemented tokens | must match DESIGN.md. If they drift, flag it |
| `.claude/skills/jp-retro-cyberpunk-ui/SKILL.md` | the **frame**: grid, type scale, rules, mono labels | below DESIGN.md |
| `~/.claude/skills/my-art-style/` (global) | the owner's taste: color, texture, motif, motion | DESIGN.md wins on specifics |

Rule of thumb: **frame from the skill; color, texture, motif and motion from the art; DESIGN.md decides.**

**Known drift (open):** DESIGN.md still names Unbounded, Barlow Condensed, Orbitron, Noto Sans JP and DotGothic16. The code uses **Archivo** (variable, `wdth` 62–125) and **IBM Plex Mono**, as the owner chose. Follow the code. Update DESIGN.md only when asked.

## Commands
```bash
npm run dev            # dev server (Turbopack) on http://localhost:3000
npm run build          # production build; also type-checks
npm run lint           # ESLint (next core-web-vitals + typescript)
npx tsc --noEmit       # type-check only
```
`build`, `lint` and `tsc` are pre-allowed in `.claude/settings.json`. Run `build` and `lint` before calling any task done.

## Stack
- **Next.js 16.4** (App Router, Turbopack), **React 19.3**, TypeScript strict, path alias `@/*` → `src/*`.
- **Tailwind CSS 4.** CSS-first config lives in `globals.css` (`@theme`). There is no `tailwind.config.*`.
- **shadcn** (style `base-nova`, primitives from `@base-ui/react`). Add components with `npx shadcn add <name>`, then restyle them to DESIGN.md (0 radius, ink borders, label voice).
- `cn()` comes from the **`cn`** package (shadcn's compiled clsx + tailwind-merge). Import it from `@/lib/utils`.
- Motion and visuals are installed but not used yet: **GSAP** + `@gsap/react`, **Lenis**, **three** / `@react-three/fiber` / `drei`, **p5**, **Rive**.
- Icons: `lucide-react` is installed, but DESIGN.md requires custom 1-bit square-capped SVG icons. Use Lucide only where shadcn internals need it.

### Next.js 16 specifics
- Read `node_modules/next/dist/docs/` before using any Next API (see AGENTS.md). The getting-started guides are in `01-app/01-getting-started/`.
- `cacheComponents: true` and `partialPrefetching: true` are on in `next.config.ts`. Data and UI caching use the `"use cache"` directive paired with `cacheLife`. Dynamic or uncached work must sit inside `<Suspense>`.
- Layouts and pages use the global `LayoutProps<"/">` / `PageProps<"/...">` types, with no import needed.
- `next dev` rewrites the managed block in `AGENTS.md`. Leave it alone.

## Project structure
```
src/
  app/
    layout.tsx        # fonts (next/font), metadata, <html>/<body>
    page.tsx          # home; currently an empty <main />
    globals.css       # ALL design tokens + type utilities + grain overlay
  components/ui/      # shadcn primitives (button.tsx so far)
  lib/utils.ts        # cn()
PRODUCT.md  DESIGN.md # product + design truth
art/  design-refs/    # third-party moodboard: gitignored, never ship
```
Planned conventions (follow them when creating files):
- `src/components/sections/`: one file per poster section (`hero.tsx`, `works.tsx`, `experience.tsx`, `skills.tsx`, `about.tsx`, `contact.tsx`), in DESIGN.md's section order.
- `src/components/brand/` (built, test page `/lab/brand`): `SwatchBand`, `TrackListTabs`, `TerminalPanel`, `HankoSeal` (`MinhTruc09`), `PhoneFrame`, `PlaceholderFrame`, `RefImage`, `JpLabel` (Japanese as SVG outlines from the generated `jp-glyphs.ts`), plus the global `Cursor` and `GrainOverlay`. Reuse these before writing new markup.
- `src/lib/palette.ts`: hex codes and label-contrast rule per ink, for components that print hex as typography. Keep it in sync with the `@theme` tokens.
- `src/components/motion/`: GSAP and Lenis client wrappers.
- `src/content/profile.ts` (built): **the single typed source for all CV content** (projects newest first as `PRJ-01…04`, experience, education, certifications, skills, contacts incl. phone, `cv: null` until the redacted PDF exists, `screenshots: null` per project until real captures exist). Components never hard-code CV facts; `formatPeriod()` prints dates as in the CV.
- Server Components by default. Add `"use client"` only to the smallest component that needs state, effects, GSAP, Lenis, canvas or WebGL.

## Styling rules
**Tokens only.** Never hard-code hex values or arbitrary colors in components. Use the brand utilities:
- Colors: `signal-red`, `vermilion`, `wine`, `cobalt`, `navy-ink`, `denki-cyan`, `amber`, `flame`, `acid-screen`, `acid-print`, `acid-shadow`, `cream`, `paper-grey`, `sumi` (e.g. `bg-cobalt`, `text-cream`). The default Tailwind palette is **removed** (`--color-*: initial`), so `bg-zinc-*`, `text-white` and similar do not exist.
- shadcn semantics map onto these: `primary` = signal-red, `secondary` = cobalt, `accent` = amber, `muted` = paper-grey, `border`/`ring` = sumi.
- Type roles: `type-display`, `type-display-vi` (Vietnamese lines), `type-headline`, `type-subtitle`, `type-label`, `type-tab`, `type-body`. Prefer these to ad-hoc font utilities. Archivo width comes from `font-stretch` (125% for display, 62% for condensed).
- Radius: everything is square. `--radius` is 0, so all of shadcn's `rounded-*` resolve to 0. `rounded-slab` (28px) is **only** for full-color blocks that hold no controls. `rounded-full` is **only** for seals, badges and constellation nodes.
- Spacing extras: `gutter`, `gutter-desktop`, `section`, `section-mobile`, `tap` (44px minimum target), `rule`, `rule-heavy`. Container: `max-w-page` (1440px). Breakpoints: `sm` 480, `md` 768, `lg` 1024, `xl` 1440.
- Easing: `ease-press` = `cubic-bezier(.7,0,.2,1)`. Its GSAP twin is the CustomEase `"cut"` (`EASE_CUT` / `motion.easeCut` from `@/lib/gsap`). Keep the two curves identical.
- z-index layers are CSS vars: `--z-subject` 10, `--z-sticker` 20, `--z-header` 30, `--z-overlay` 40, `--z-grain` 50, `--z-cursor` 60. The grain overlay is `body::after` at `--z-grain`. Nothing interactive may sit above it except the cursor; it is `pointer-events: none`.
- The dark terminal register is a scope, not a theme: put `data-register="terminal"` on a section to get a sumi ground, cream text and an acid focus ring. There is no light/dark toggle, and `prefers-color-scheme` is ignored.

**Hard rules from DESIGN.md (most frequently broken):**
- **Surface pairing table** decides text colors. In particular: **no red text on cobalt or navy** (1.3:1 and 2.0:1), **no acid colors on cream**, and vermilion or flame text only at 24px or larger.
- **Ink, not light:** no `box-shadow` blur, glow, gradient, `backdrop-filter`, translucency or glass. Depth comes from overlap, a hard offset (`6px 6px 0` sumi) and 1–3px misregistration.
- **Poster ratio:** blue and cream 60–70%, red 20–30% (at most one full red slab per viewport), signals under 10%. At most 3 chromatic inks per viewport.
- **Text never sits directly on halftone or photo.** Give it a solid backing plate.
- **No purple or violet,** no synthwave, no centered "hero + avatar + 3 cards" template, no Inter or indigo buttons.
- **Japanese must be real** and marked `lang="ja"` (作品 WORKS, 概要 ABOUT, 技術 SKILLS, 連絡 CONTACT). Purely decorative glyphs get `aria-hidden="true"`.
- **Vietnamese at display size:** use `type-display-vi`, one word per line (NGUYỄN / MINH / TRỰC). Check that marks (Ễ, Ự) are not clipped at 375px and 1440px.

## Motion
- Use GSAP (with `useGSAP` from `@gsap/react`) plus Lenis synced to ScrollTrigger, only in client components under `src/components/motion/`. Import `gsap` and plugins only from `@/lib/gsap`; it registers CustomEase, ScrollTrigger, SplitText, ScrambleTextPlugin and useGSAP.
- `motion/SmoothScroll.tsx` (wraps the app in `layout.tsx`) owns Lenis. It calls `ScrollTrigger.clearScrollMemory("manual")`, refreshes triggers after `document.fonts.ready`, and jumps to the top on every route change. Lenis fights native `window.scrollTo` while it is animating, so programmatic scrolling must use `useSmoothScroll().scrollTo(target)` (number, selector or element; falls back to native under reduced motion). Same-page `href="#id"` links are intercepted by SmoothScroll and need no extra code; do not enable Lenis's own `anchors` option (it flashes a native jump first). In dev, `window.__lenis` exposes the instance for Playwright checks.
- Global chrome lives in `brand/`: `GrainOverlay` and `Cursor` (crosshair + mono coordinates on fine pointers; on `a[href]`, `button` and `[role=button]` it extends and shows `[ LINK ]` / `[ PRESS ]`).
- `/lab` (motion test bench) and `/lab/still` (captures `art/hero-still.webp`) exist only in development; `src/app/lab/layout.tsx` calls `notFound()` in production.
- Patterns and tokens are listed in DESIGN.md › Motion: stripe wipe, chorus stagger, equalizer rise, halftone resolve, diagonal entry, sticker slap, swatch count-in.
- Animate only `transform`, `opacity` and `clip-path`. Entrances play once. Use at most **one show-off effect per viewport**.
- **5-Second Rule:** name, `MOBILE DEVELOPER`, `FLUTTER · SWIFTUI` and the primary CTA are visible on first paint. No intro may hide them for more than 600ms.
- `prefers-reduced-motion`: show final states, and turn off wipes, jitter, scrambles, the ticker and Lenis.
- Below 768px, turn off pin and scrub. Pause canvas and WebGL when offscreen.

## Content and honesty
- **All content comes from PRODUCT.md › Evidence on Hand** (from the CV). Never invent projects, metrics, testimonials, clients, app-store links, dates or skills.
- Where something is missing, use the **placeholder frame** (`[ SCREENSHOT PENDING ]` / `[ IMAGE PENDING ]`).
- **Personal data:** the owner approved publishing **email, GitHub, LinkedIn and phone** (2026-10-08). The **birth year (2004)** may be shown (hero ticket stub, owner request); the full birth date and gender never go on the site. Render the phone as a `tel:` link in international format (`+84 …`) from `profile.ts`; do not repeat it in metadata, OG images or JSON-LD.
- **Moodboard images** in `art/` and `design-refs/` are third-party works. They are gitignored and may be used only as temporary dev placeholders: copy them to `public/ref/` (gitignored), render them through `RefImage` (house treatment + `REF · TEMP` tag + fallback). They are never presented as the owner's work and never used as fake app screenshots.
- **Pre-launch gate:** no `RefImage` on any route, and `public/ref/` empty.
- `NguyenMinhTruc_CV_MobileDeveloperIntern.pdf` contains the birth date and is gitignored (`NguyenMinhTruc_CV_*.pdf`). Never link it publicly. The `DOWNLOAD CV` button points to a **redacted copy** (birth date and gender removed) at `public/cv-nguyen-minh-truc.pdf`, only once the owner provides it; until then the button shows the placeholder state.

## Decisions (confirmed by the owner, 2026-10-08)
1. **Language: English.** `<html lang="en">`. The name keeps full Vietnamese diacritics in a `lang="vi"` element; Japanese only for the fixed bilingual labels.
2. **Contacts: email, GitHub, LinkedIn, phone** (see Personal data).
3. **Hanko seal: `MinhTruc09`** in Latin (Archivo, stacked inside the circle). No kanji on the seal.
4. **Japanese labels: SVG outlines** (作品 WORKS, 概要 ABOUT, 技術 SKILLS, 連絡 CONTACT) with the Latin twin as the accessible text. No Japanese webfont is loaded.
5. **Home page direction: A "Print Run"** (poster stack on cream). Order: **Hero → 作品 Works → 技術 Skills → 概要 About → 連絡 Contact**. Skills is its own section, each skill linked to the projects that used it.
6. **Hero subject: a rotating 3D phone** (react-three-fiber, built in code: **rounded like the real device** — owner override of the 0-radius rule for this object only — with Dynamic Island, camera plateau and side buttons; three-step toon + halftone in palette inks, never photoreal; screen = a real app screenshot from `profile.ts`, otherwise a **mini poster of the app** (code, name, stack, sun over a halftone slab, swatch band, `[ SCREENSHOT PENDING ]`) drawn at 1080×2340 with mipmaps). **Hero background: `HalftoneField`** (`src/components/art/halftone/`), a full-bleed WebGL2 fragment shader. **Current look: "oil"** after the *Fever* cover (owner decision, 2026-10-08): a smooth, flowing heat gradient (domain-warped noise) shaped as a full-width horizontal band with wavy edges **running behind the name** (`data-oil-anchor` on the `h1`, like the cover: red type on the pale core), ramping cream → cobalt fringe → signal red → flame → amber → pale butter core, opening out on load and leaning toward the pointer. The name's stripe cuts are real gaps (CSS `mask-image`, padded so Vietnamese marks such as the tilde on Ễ are never clipped), so the oil shows through them. **This overrides the "no gradients / no blur" and stepped-motion rules for the hero background only**; everywhere else they still hold. The oil is a **45% wash** over the stock and simply sits under all the type: no knockout boxes or nav plate (owner feedback, 2026-10-08). At this strength sumi text reads ≥ 6.8:1 on every colour of the ramp, so small type in the hero must be **sumi** (the role line was cobalt and was switched; cobalt would drop to ~3.3:1). `data-knockout` still exists in the shader for any element that needs to opt in. Reduced motion draws one finished frame; no WebGL2 falls back to the older static halftone prints `hero-bg-desktop/mobile.webp` (out of date with the oil look). p5 never runs on the home page.
8. **Works section (built):** `src/components/sections/works/` — giant `WORKS` + vertical 作品, track-list tabs on a full-width cyan band (tabs rise like an equalizer), then an **auto-advancing carousel** (owner request, 2026-10-08: no pin, the page scrolls straight through): one project sheet (TerminalPanel + rounded PhoneFrame) at a time, **next sheet every 4s**, printed in with a stepped wipe + 2-tick red misregistration, the active tab turns amber and an amber bar fills the cyan band over the interval. Tabs and ‹ › select; a PAUSE/PLAY button (WCAG 2.2.2). Pauses on hover, keyboard focus, off-screen and hidden tab; reduced motion = no autoplay. `PhoneFrame` is rounded to match the hero phone.
9. **Skills section (built):** `src/components/sections/skills/` — giant `SKILLS` + vertical 技術 + a legend; a bento of rounded colour slabs, one per CV skill group (Mobile = red subject with a navy disc and giant count crossing its edge; Backend cobalt; Database navy; State amber; Tools paper-grey; Other cream). Every skill carries its **proof codes**, computed in `skill-proof.ts` from CV facts only: `PRJ-0x` (stack or bullet names it, whole-phrase match), `INT` (internship bullet), `CERT` (certificate title), else `CV`. Never hand-edit a proof; change `profile.ts`. Slabs print in diagonally, counts decode; reduced motion = static.
7. **Languages shown: English, Intermediate (~IELTS 6.0), strong technical reading** (as in the CV). No other language is listed.

## Open decisions (ask the owner; do not decide silently)
1. Whether DESIGN.md gets updated to the Archivo + Plex Mono stack.

## Verification checklist
Run this before saying a UI task is done:
1. `npm run build` and `npm run lint` pass. Report the real output.
2. Screenshot with the Playwright MCP (enabled in `.mcp.json`) at **375×667** and **1440×900**. Check:
   - the 5-Second Rule
   - no horizontal scroll
   - Vietnamese diacritics not clipped
   - surface-pairing contrast
   - focus rings visible
3. Run the Impeccable detector on changed UI files once:
   `~/.claude/plugins/cache/impeccable/impeccable/4.5.0/skills/impeccable/scripts/impeccable detect --json <files>`
4. Do one batched fix round, then one confirm round. Do not polish in open-ended loops.

## Skills and tools
- `/impeccable <command>` (plugin): `shape`, `critique`, `audit`, `polish`, `animate`, `document` and others. It reads PRODUCT.md and DESIGN.md automatically. After the first real build, run `/impeccable document` to replace the SEED DESIGN.md with extracted tokens.
- `jp-retro-cyberpunk-ui` (project skill): the frame. `skills-lock.json` still records it as `industrial-brutalist-ui` from `Leonxlnx/taste-skill`, but it has been renamed and edited locally. **Do not re-sync it from upstream**, or the local edits are lost.
- `my-art-style` (global skill): the owner's taste across all media.
- Playwright MCP: the browser for screenshots and checks.

## Git
- The repo is on `main` with **no commits yet**. Commit only when the owner asks. Branch first for feature work once `main` has history.
- Never commit `art/`, `design-refs/`, `public/ref/`, `.env*` or the CV PDF.
- Default create-next-app assets in `public/` (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) are unused and can be deleted. `public/art/` is an empty folder.
