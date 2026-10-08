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

**Fonts:** **Archivo** (variable, `wdth` 62–125: 125 = display, 62 = condensed and tabs) and **IBM Plex Mono** (labels, body, LCD). DESIGN.md and the code agree. Do not add other families except Noto Sans JP for the fixed Japanese labels (see Styling rules).

## Commands
```bash
npm run dev            # dev server (Turbopack) on http://localhost:3000. The OWNER runs it in their own terminal
npm run build          # production build; also type-checks
npm run lint           # ESLint (next core-web-vitals + typescript)
npx tsc --noEmit       # type-check only
```
`build`, `lint` and `tsc` are pre-allowed in `.claude/settings.json`. Run `build` and `lint` before calling any task done.
**Dev server:** never start `npm run dev` in the foreground, because it never exits. Before taking screenshots, check that http://localhost:3000 responds. If it does not, start it as a background process, or ask the owner to run it.

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
- `src/components/brand/`: signature pieces (`swatch-band`, `track-list-tabs`, `terminal-panel`, `hanko-seal`, `phone-frame`, `placeholder-frame`, `ref-image`).
- `src/components/motion/`: GSAP and Lenis client wrappers.
- `src/content/profile.ts`: **the single typed source for all CV content** (projects, experience, skills, certifications, links). Components never hard-code CV facts.
- Server Components by default. Add `"use client"` only to the smallest component that needs state, effects, GSAP, Lenis, canvas or WebGL.

## Styling rules
**Tokens only.** Never hard-code hex values or arbitrary colors in components. Use the brand utilities:
- Colors: `signal-red`, `vermilion`, `wine`, `cobalt`, `navy-ink`, `denki-cyan`, `amber`, `flame`, `acid-screen`, `acid-print`, `acid-shadow`, `cream`, `paper-grey`, `sumi` (e.g. `bg-cobalt`, `text-cream`). The default Tailwind palette is **removed** (`--color-*: initial`), so `bg-zinc-*`, `text-white` and similar do not exist.
- shadcn semantics map onto these: `primary` = signal-red, `secondary` = cobalt, `accent` = amber, `muted` = paper-grey, `border`/`ring` = sumi.
- Type roles: `type-display`, `type-display-vi` (Vietnamese lines), `type-headline`, `type-subtitle`, `type-label`, `type-tab`, `type-body`. Prefer these to ad-hoc font utilities. Archivo width comes from `font-stretch` (125% for display, 62% for condensed).
- Radius: everything is square. `--radius` is 0, so all of shadcn's `rounded-*` resolve to 0. `rounded-slab` (28px) is **only** for full-color blocks that hold no controls. `rounded-full` is **only** for seals, badges and constellation nodes.
- Spacing extras: `gutter`, `gutter-desktop`, `section`, `section-mobile`, `tap` (44px minimum target), `rule`, `rule-heavy`. Container: `max-w-page` (1440px). Breakpoints: `sm` 480, `md` 768, `lg` 1024, `xl` 1440.
- Easing: `ease-press` = `cubic-bezier(.7,0,.2,1)`.
- z-index layers are CSS vars: `--z-subject` 10, `--z-sticker` 20, `--z-header` 30, `--z-overlay` 40, `--z-grain` 50, `--z-cursor` 60. The grain overlay is `<GrainOverlay />` (class `.grain-overlay`) at `--z-grain`. Nothing interactive may sit above it except the cursor; it is `pointer-events: none`.
- The dark terminal register is a scope, not a theme: put `data-register="terminal"` on a section to get a sumi ground, cream text and an acid focus ring. There is no light/dark toggle, and `prefers-color-scheme` is ignored.

**Hard rules from DESIGN.md (most frequently broken):**
- **Surface pairing table** decides text colors. In particular: **no red text on cobalt or navy** (1.3:1 and 2.0:1), **no acid colors on cream**, and vermilion or flame text only at 24px or larger.
- **Ink, not light:** no `box-shadow` blur, glow, gradient, `backdrop-filter`, translucency or glass. Depth comes from overlap, a hard offset (`6px 6px 0` sumi) and 1–3px misregistration.
- **Poster ratio:** blue and cream 60–70%, red 20–30% (at most one full red slab per viewport), signals under 10%. At most 3 chromatic inks per viewport.
- **Text never sits directly on halftone or photo.** Give it a solid backing plate.
- **No purple or violet,** no synthwave, no centered "hero + avatar + 3 cards" template, no Inter or indigo buttons.
- **Japanese must be real** and marked `lang="ja"` (作品 WORKS, 概要 ABOUT, 技術 SKILLS, 連絡 CONTACT). Purely decorative glyphs get `aria-hidden="true"`.
- **Vietnamese at display size:** use `type-display-vi`, one word per line (NGUYỄN / MINH / TRỰC), on an element with `lang="vi"` (the page is `lang="en"`). Never outline Vietnamese lines. Check that marks (Ễ, Ự) are not clipped at 375px and 1440px.
- **Japanese glyphs are not loaded yet.** Before the first JP label ships, either load `Noto_Sans_JP` (weight 900, `preload: false`, so only the used unicode slices download) or render the labels as SVG with a Latin twin. JP must never fall back to the system font.

## Motion
- Use GSAP (with `useGSAP` from `@gsap/react`) plus Lenis synced to ScrollTrigger, only in client components under `src/components/motion/`.
- Patterns and tokens are listed in DESIGN.md › Motion: stripe wipe, chorus stagger, equalizer rise, halftone resolve, diagonal entry, sticker slap, swatch count-in.
- Animate only `transform`, `opacity` and `clip-path`. Entrances play once. Use at most **one show-off effect per viewport**.
- **5-Second Rule:** name, `MOBILE DEVELOPER`, `FLUTTER · SWIFTUI` and the primary CTA are visible on first paint. No intro may hide them for more than 600ms.
- `prefers-reduced-motion`: show final states, and turn off wipes, jitter, scrambles, the ticker and Lenis.
- Below 768px, turn off pin and scrub. Pause canvas and WebGL when offscreen.

## Content and honesty
- **All content comes from PRODUCT.md › Evidence on Hand** (from the CV). Never invent projects, metrics, testimonials, clients, app-store links, dates or skills.
- Where something is missing, use the **placeholder frame** (`[ SCREENSHOT PENDING ]` / `[ IMAGE PENDING ]`).
- **Personal data:** publish only email, GitHub and LinkedIn. Phone, birth date and gender stay off the site until the owner confirms.
- **Moodboard images** in `art/` and `design-refs/` are third-party works. They are gitignored and may be used only as temporary dev placeholders: copy them to `public/ref/` (gitignored), render them through `RefImage` (house treatment + `REF · TEMP` tag + fallback). They are never presented as the owner's work and never used as fake app screenshots.
- **Pre-launch gate:** no `RefImage` on any route, and `public/ref/` empty.
- `NguyenMinhTruc_CV_MobileDeveloperIntern.pdf` contains phone and birth date. It is **gitignored** (`NguyenMinhTruc_CV_*.pdf`). Never link it publicly. The `DOWNLOAD CV` button must point to a **redacted copy** with a different name in `public/` (for example `public/cv-nguyen-minh-truc.pdf`), and only after the owner provides it.

## Open decisions (ask the owner; do not decide silently)
1. Site language: Vietnamese, English or bilingual. `<html lang="en">` is a placeholder.
2. Which contact details to publish (see above).
3. Hanko seal glyphs: proposed **明直** (Minh Trực); fallback `MT`.
4. Japanese labels: Noto Sans JP webfont or SVG outlines.

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
   `~/.claude/plugins/cache/impeccable/impeccable/*/skills/impeccable/scripts/impeccable detect --json <files>` (the version folder changes when the plugin updates. If the glob matches two versions, use the newest)
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
