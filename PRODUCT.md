# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters and hiring leads** screening an Intern / Junior Mobile Developer (Flutter, Swift/SwiftUI). They skim fast, want to verify skills against real code, and decide whether to invite an interview.
- **Freelance clients** looking for someone who can take an app from Figma design to working mobile UI. They want proof of shipped work and a direct way to make contact.
- **Community and friends** browsing for personality: music, guitar, chess, the owner's visual taste.
- **Academic reviewers** (scholarships, programs, competitions) checking education, GPA and certifications.

## Product Purpose

The personal portfolio of Nguyễn Minh Trực, an IT graduate (University of Transport Ho Chi Minh City, 2022–2026) working as a mobile developer. It exists to turn a CV into evidence: show real projects, link to their code, and make the owner's design-plus-engineering range visible. Success means a visitor quickly understands what Trực builds, trusts it through linked repositories, and contacts him (interview, project inquiry, or follow).

## Positioning

A mobile developer who designs as well as builds: he redesigned full UI/UX in Figma for government systems and then implemented it himself in FlutterFlow, and ships both cross-platform Flutter and native SwiftUI apps. The portfolio site is itself a working sample of that design sensibility. Most intern-level mobile portfolios show only code or only screenshots; this one shows both ends of the pipeline.

## Operating Context

- Visitors arrive from the CV (TopCV), LinkedIn, GitHub, or a direct link; many on phones.
- Recruiters typically compare against a job description: stack keywords, project scope, team size, dates.
- Projects are verified by opening the GitHub repositories.

## Capabilities and Constraints

- Existing codebase: Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/base-ui; GSAP, Lenis, three.js / react-three-fiber, p5 and Rive are installed for motion and visuals.
- Content is currently the CV only; sections that lack material must use clearly marked placeholders, never invented content.
- **Site language: English** (owner decision, 2026-10-08). The CV is in English; the name keeps its Vietnamese diacritics.
- **Published contacts:** email, GitHub, LinkedIn and phone (owner decision, 2026-10-08). The birth year (2004) may be shown; the full birth date and gender are never published.

## Brand Commitments

- Name: Nguyễn Minh Trực. Handle: MinhTruc09.
- Title: Mobile Developer (CV targets "Intern Mobile Developer").
- Voice: none confirmed yet.
- Images in `art/` and `design-refs/` are third-party reference moodboards (credited to other designers, an album cover, a game poster, anime stills). They signal the owner's taste only; they must not be presented as his work or shipped as site content without rights. Until owned assets exist, they may be used as **temporary, tagged placeholders during local development only** (see DESIGN.md → Imagery & Assets: `public/ref/`, gitignored, rendered through `RefImage`), and they must be replaced before any public deploy.

### Visual references (binding direction, confirmed by the owner)

Direction in one line: **Japanese retro print × cyberpunk**: a halftone poster/zine world built on primary red + cobalt blue + cream, with acid lime and warm yellow/orange as signal colors and a dark HUD layer for interactive parts.

**Layout and interaction (`design-refs/`)**

| File | Take | Leave |
|---|---|---|
| `01-trang-chu-cyperpunk.png` | Hero built from giant stacked display words that mix solid and outline-only letters; an image interlocking with the type; tiny spaced mono copy anchored to corners; slash-separated mono nav (`/ GITHUB / LINKEDIN`); a thin angular circuit-line frame; one acid lime (≈`#D4F53C`) as the hero color on near-black | NFT/crypto copy, the purple accent rule, the rounded outer frame |
| `02-layout-hon-loan-style-nhat-ban.png` | "Product card as terminal" layout: `/TITLE ラーメン`-style headers that mix Latin and Japanese, 7-segment/LCD display type, bordered spec panels with bullet lists, a 3-cell icon footer row, bento tiles that alternate dark and lime; a mobile mock beside the desktop panel (fits a mobile developer's portfolio) | Neon pink/green glow, AI-rendered food imagery, the Cyrillic copy |
| `03-chia-cac-tab.png` | Section menu as a constellation: circular emblem nodes joined by thin diagonal lines, condensed uppercase labels (STORY / GAMEPLAY / … → WORKS / ABOUT / SKILLS / CONTACT), a vertical side label, micro HUD readouts in the corners, a large dimmed figure behind | The iridescent holographic background, blue outer glow, soft blur |

**Type, poster and palette (`art/`)**

| File | Take |
|---|---|
| `manga-cyperpunk.jpg` (Bomb Rush Cyberfunk poster) | **Primary poster model.** Halftone duotone background (acid `#BBB81E` + sumi black), a red subject breaking the frame, a wide techno logotype with an outline, a widely tracked subtitle, a staggered vertical tracklist on a cyan band (`#0489BE`), a ✂ coupon cut line, a Japanese text block, "certified bad design" micro-copy |
| `font-chu-va-mau.jpg` (ATEEZ *Fever* cover) | Extended heavy sans whose letters break into horizontal speed stripes; repeated stacked words; palette `#FCF5AF #F0A533 #E44F0A #BA011A #0B4B8B #000000`. Leave the blurred heat-map gradient |
| `poster-retro.jpg` | Coarse halftone dot screen over a whole subject, a blue dot field, heavy slab/display type cropped at the edge, CJK headline blocks, sticker shapes ("!"). Leave the QR/watermark and the AI-generated broken English |
| `style-nhat-ban-noi-loan.jpg` | Big heavy CJK headline, vertical CJK text, rounded color blocks tiled like a poster grid, a giant "01" numeral, `©` and circle glyphs as ornament, hex codes as labels; palette `#253054` navy, red, `#F4E39A` cream-yellow |
| `layout-cac-bang-mau.jpg` | Palette `#2E4C8C` YInMn blue · `#FFF3E1` old lace · `#FA2D1A` red; condensed bold labels |
| `nghe-thuat.jpg` | Palette `#DAD2C8` · `#F6BB02` · `#2A4C9E` · `#BD1B1F` · `#8B011A`: the same primary triad, plus a darker wine red for depth |
| `hero-va-cac-tab.jpg` | Complementary pair: cobalt blue field with a glowing orange subject (blue `#0B3A9A`-ish, amber `#FDB515`, orange `#F2500F`, maroon `#5A0A08`) |
| `mau-tham-khao.jpg` | Anime warm set `#F2C230 #F2921D #F24F13`, with muted `#8082A6` and `#46334F` as shadows only |
| `mau-tham-khoa.jpg` | Anime cool set `#64B9F9 #4574B8 #389BF8 #15298A` with one coral `#EE5C66` accent |

**What the references agree on (use this as the palette brief)**
- **Core triad:** red (`#BA011A`–`#FA2D1A`), cobalt blue (`#0B4B8B`–`#2E4C8C`), cream (`#FFF3E1` / `#FCF5AF` / `#DAD2C8`). It appears in 6 of 12 references.
- **Warm signal:** yellow `#F6BB02` / `#F2C230`, orange `#E44F0A` / `#F24F13`.
- **Cyberpunk signal:** acid lime (`#BBB81E` print, `#D4F53C` screen), used on dark surfaces only.
- **Darks:** sumi near-black and navy `#253054` / `#15298A`. Never pure-black backgrounds on large areas.
- **Type families wanted:** a wide/extended heavy display (striped or stencil-cut), an angular techno display with an outline variant, a widely tracked mono, a 7-segment/LCD accent, a condensed bold for labels, and heavy Japanese gothic set vertically.
- **Textures:** halftone dot screens, duotone photos, misregistered print, paper grain.

### Anti-references

- Holographic or iridescent gradients, glassmorphism, outer glows and neon bloom (the `03` background, the `02` food renders).
- Purple/violet accents and synthwave pink-purple palettes.
- Blurred heat-map gradients as backgrounds (the *Fever* cover keeps the type, not the blur). **Exception (owner decision, 2026-10-08):** the home hero's background is a smooth *Fever*-style "oil" gradient on cream; nowhere else.
- Generic dark "developer portfolio" templates: centered hero + avatar + 3 skill cards, Inter, indigo buttons.
- NFT/crypto marketing tone ("invest in the future", "own a piece of").
- Fake or decorative-only Japanese; every Japanese string must be real and meaningful.

## Evidence on Hand

Source: `NguyenMinhTruc_CV_MobileDeveloperIntern.pdf`.

**Education:** University of Transport Ho Chi Minh City, Information Technology, 2022–2026. Graduated with Good Classification, GPA 3.30/4.00, Academic Scholarship (first semester, 2023).

**Experience:** Intern Mobile Developer, Trung tâm Chuyển đổi số tỉnh Tây Ninh (Tay Ninh Digital Transformation Center), 7/2025–12/2025.
- Redesigned the complete UI/UX in Figma for the Slaughterhouse Management System and the ICT Document Management System.
- Turned the Figma designs into interactive interfaces in FlutterFlow, from UI implementation to functional testing.
- Built standalone prototypes to validate features with management, cutting demo preparation time.

**Projects:**
| Project | Dates | Team | Stack | Repo |
|---|---|---|---|---|
| ShareXe – Carpooling app (passenger app UI/UX, maps, real-time chat) | 12/2024–8/2025 | 2 | Flutter, Dart, BLoC/Riverpod, Google Maps API, Socket.io, Node.js, MongoDB, Firebase | github.com/MinhTruc09/ShareXe |
| SwiftUI Movie – movie discovery (search, debounce, SwiftData) | 9/2026 | 1 | Swift, SwiftUI, SwiftData, REST, Xcode | github.com/MinhTruc09/swiftui-movie |
| Agricultural Product Traceability (AI image recognition, blockchain records) | 3/2025–7/2025 | 2 | Flutter, Solidity, AI APIs, Dio, Node.js, MySQL | github.com/MinhTruc09/Agricultural-Traceability |
| Movieom – movie streaming (Chewie player, Firebase auth, favorites) | 12/2023–2/2024 | 3 | Flutter, Chewie, REST, Firebase Auth, Cloud Firestore | github.com/MinhTruc09/LTD |

**Certifications:** Google Foundations of User Experience (UX) Design (7/2026); CS50's Web Programming with Python and JavaScript (10/2026).

**Skills:** Flutter, Dart, Swift, SwiftUI, Kotlin; Riverpod; REST APIs, Dio, Firebase, Node.js; MySQL, MongoDB, SwiftData, Cloud Firestore; Git/GitHub, Figma, Swagger, Xcode; Python, Django, Java, HTML/CSS, JavaScript; prompt engineering (intermediate). English: intermediate (about IELTS 6.0), strong technical reading.

**Hobbies:** music, guitar, gym, chess, reading.

**Links:** GitHub github.com/MinhTruc09 · LinkedIn linkedin.com/in/nguyen-minh-truc-aa1a99336 · Email nminhtruc0910@gmail.com.

**Absent (do not fabricate):** project screenshots and demo videos, app store links, testimonials, client names beyond the CV, metrics or download numbers, the owner's original artwork, a portrait photo.

## Product Principles

1. **Proof over claims.** Every skill shown traces to a project, a role or a certification in the CV, and every project links to its repository.
2. **Recruiter-scannable first, expressive second.** Role, stack, projects and contact must be findable in seconds, even inside a bold visual world.
3. **The site is a sample.** Its craft (responsiveness, performance, motion, accessibility) is part of the pitch for a UI-minded developer.
4. **Honest provenance.** Reference imagery stays reference; placeholders are marked as placeholders.
5. **One clear next step for each audience:** recruiters to the CV and email, clients to contact, peers to GitHub and LinkedIn.
