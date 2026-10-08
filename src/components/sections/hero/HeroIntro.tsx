"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion } from "@/lib/gsap";

/**
 * The hero's load sequence (DESIGN.md › Motion › Orchestration). Everything is already
 * visible on first paint; this only adds marks on top, and the whole run is ≈1s:
 * 1. stripe cuts slice through the name, line by line (chorus stagger)      ≤ 600ms
 * 2. the ticket stub's values decode, row by row (LCD)
 * 3. the hanko seal stamps down
 * 4. the swatch band's hex labels type on, left to right (count-in)
 * Reduced motion: nothing runs; the final state is the server-rendered one.
 */
export function HeroIntro({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "none" } });
        const q = gsap.utils.selector(scope);

        tl.from(q("[data-cut]"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.36,
          ease: "steps(6)",
          stagger: motion.staggerChorus,
        });

        q("[data-decode]").forEach((el, i) => {
          tl.to(
            el,
            {
              duration: 0.42,
              scrambleText: { text: el.textContent ?? "", chars: "0123456789ABCDEF/·", speed: 1, revealDelay: 0.12 },
            },
            0.12 + i * 0.06,
          );
        });

        tl.from(
          q("[data-seal]"),
          { scale: 1.4, rotate: "-=10", duration: motion.durUi, ease: "steps(3)" },
          0.5,
        );

        q("[data-count]").forEach((el, i) => {
          tl.to(
            el,
            { duration: 0.3, scrambleText: { text: el.textContent ?? "", chars: "0123456789ABCDEF", speed: 1 } },
            0.6 + i * motion.staggerChorus,
          );
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  );
}
