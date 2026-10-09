---
target: home page (src/app/page.tsx)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/nguyenminhtruc/Downloads/Porfolio/my-site/src/app/page.tsx"
target_fingerprint: "sha256:d03ea56e056a53be3804862ebce7a6a82b0e53ffc7779e8f1f81ab84a5fbd368"
target_path: /Users/nguyenminhtruc/Downloads/Porfolio/my-site/src/app/page.tsx
timestamp: 2026-10-09T02-31-57Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser). Note: shared browser — A briefly saw B's overlay labels before hiding them; contrast judgment may be partly anchored.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Works counter/amber tab/progress clear; nav not sticky, no "you are here" |
| 2 | Match System / Real World | 3 | CV wording verbatim; proof codes need the legend |
| 3 | User Control and Freedom | 2 | Works carousel advances every 4s mid-read; PAUSE ~500px above repo link |
| 4 | Consistency and Standards | 3 | Consistent voice; email shown uppercase unlike the real address |
| 5 | Error Prevention | 3 | COPY fallback; CV links the redacted copy |
| 6 | Recognition Rather Than Recall | 2 | PRJ-0x codes in Skills are not links (0 links in Skills) |
| 7 | Flexibility and Efficiency | n/a | portfolio |
| 8 | Aesthetic and Minimalist Design | 3 | Strong poster discipline; GPA x3; empty right halves in openers |
| 9 | Error Recovery | 3 | little can fail |
| 10 | Help and Documentation | n/a | portfolio |
| Total | | 22/32 (69%) | Acceptable (edge of Good) |

## Design Specificity Verdict
Authored, not interchangeable: hero (striped-cut name over oil wash, ticket stub, toon 3D phone with PRJ mini-posters, hex swatch band, seal), Works spines, Skills proof codes, FIGMA→FLUTTERFLOW→TESTING chips, Saigon stamp. Weak spot: WORKS/SKILLS/ABOUT/CONTACT openers repeat one formula (giant black heading + vertical kanji + mono subtitle + empty right half).
Deterministic scan: CLI detect exit 0, no findings. Browser overlay 32 items: 7 real (amber PRJ/CV codes on red, 3.6:1 at 12px); 5 cream-on-cream false positives (text on red/cobalt circles, 5.9:1 / 7.4:1); grain, cream palette, stripes, 10 all-caps labels, 8 nested-cards = intentional print idiom.

## Priority Issues
- [P1] Works carousel advances while reading (1440: 2→3→0 in 10s; sheet needs 15–25s; repo link last). Fix: pause while sheet body in view / advance only while tab band in view, or 10–12s. Cmd: /impeccable harden
- [P1] Proof codes are dead ends (Skills 0 links). Fix: PRJ-0x links scroll to Works and select the sheet; accessible name "Used in PRJ-02 ShareXe". Cmd: /impeccable clarify
- [P2] Contrast: amber #F6BB02 12px codes on red #BD1B1F = 3.6:1 (7 instances). Fix: cream codes on red (5.74:1) or sumi chip. Cmd: /impeccable audit
- [P2] Internship (strongest proof) buried at y≈4200 desktop / ≈6000 mobile; hero has no path to work besides 12px nav. Fix: EXPERIENCE row in ticket stub, or link NOW SHOWING chip to its Works sheet. Cmd: /impeccable layout
- [P3] Repeated section-opener formula with dead space. Fix: vary ≥2 openers. Cmd: /impeccable layout

## Persona Red Flags
- Recruiter Rina: 0–5s excellent; 5–30s internship buried, sheet may switch before GitHub row, proof codes look clickable but aren't; likely downloads CV and leaves.
- Casey (375): ~16 screens, non-sticky nav, Works sheet 1479px with ‹ II › scrolling away above repo link.
- Sam: project h3 reads "SWIFTUI MOVIEWORKS" (sr-only twin joined; both A and B found it); manual ‹ › changes not announced; no skip link.
- Jordan: proof legend 12px at top-right of Skills; "PRINT RUN EDITION" / hex band read as cryptic decoration.

## Minor Observations
Uppercase email (0/O ambiguity); Works footer GitHub link 16px tall (<44); Works phone placeholder heavier than hero mini-poster; cursor telemetry tag can sit off-screen on mobile (clipped); hero seal crowds F6BB02 label; THREE.Clock deprecation warning from r3f.

## Questions to Consider
1. Should the internship be a "Work 00" sheet before the side projects?
2. Does Works need autoplay at all once the visitor is there, given the hero phone already cycles?
3. Could each project's screen show live repo evidence (README excerpt, commits, last-commit date at build) instead of a placeholder?
