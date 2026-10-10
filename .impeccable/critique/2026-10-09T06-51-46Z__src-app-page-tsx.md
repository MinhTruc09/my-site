---
target: home page (src/app/page.tsx)
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/Users/nguyenminhtruc/Downloads/Porfolio/my-site/src/app/page.tsx"
target_fingerprint: "sha256:849810ea71704f134beeb9ecf05f05bfffb312f12379e728d26110f1994999c4"
target_path: /Users/nguyenminhtruc/Downloads/Porfolio/my-site/src/app/page.tsx
timestamp: 2026-10-09T06-51-46Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser). Shared browser: A re-measured on a clean self-made page.

## Design Health Score: 23/32 (72%, Good) — was 22/32
H1 3 · H2 3 · H3 3 (was 2) · H4 3 · H5 3 · H6 2 · H7 n/a · H8 3 · H9 3 · H10 n/a

## Verified fixed
Proof links select the right sheet + announce; carousel pauses while reading (8.5s held); fixed index bar with aria-current; EXPERIENCE row and NOW SHOWING links; 0 real contrast failures; Works h3 names clean. CLI detect 0; live overlay 26 items, all false positives / owner overrides.

## Priority Issues
- [P1] Horizontal overflow: Skills Mobile slab disc (375: scrollWidth 405) and rotated Contact stamp (1440: intermittent +4px); html not clipped. Fix: html overflow-x: clip + clip the disc. /impeccable harden
- [P1] Skills proof shows codes not names (PRJ-02…). Fix: short names with codes or an inline key. /impeccable clarify
- [P2] Mobile slab: giant 05 disc ~480px before Flutter. Fix: list first, disc crosses the bottom/right edge. /impeccable layout
- [P2] Mobile hero: EXPERIENCE at y=1102, Works at 1.9 screens. Fix: EXPERIENCE/SEEKING under CTAs, smaller phone. /impeccable adapt
- [P3] ~200px dead air before WORKS/SKILLS; ~250px gap panel↔phone; proof links 24px tall, desktop EXPERIENCE link 16px. /impeccable polish

## Persona Red Flags
Rina: decoding PRJ codes. Casey: ~30px pan, Works at 1.9 screens, 24 text leaves <11px. Sam: EXPERIENCE jump does not move focus; inactive Works h3s hidden. Jordan: competing hero motion, cryptic PRJ/INT/■.

## Minor
Cursor HUD overlaps the index bar; hero phone and Works rail run separate clocks; THREE.Clock warning.
