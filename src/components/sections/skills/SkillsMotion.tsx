"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion } from "@/lib/gsap";

/**
 * Skills entrance: the slabs are printed in along the reference diagonal (bottom-left →
 * top-right), one chorus beat apart, and each slab's count decodes. Plays once at ~20% into
 * the viewport. Everything is visible without JS; reduced motion runs nothing.
 */
export function SkillsMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(scope);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: q("[data-bento]")[0], start: "top 80%", once: true },
        });
        tl.from(q("[data-slab]"), {
          clipPath: "polygon(0% 100%, 0% 100%, 0% 100%)",
          duration: motion.durReveal,
          ease: "steps(6)",
          stagger: motion.staggerChorus,
          clearProps: "clipPath",
        });
        q("[data-count]").forEach((el, i) => {
          tl.to(
            el,
            { duration: 0.36, scrambleText: { text: el.textContent ?? "", chars: "0123456789", speed: 1 } },
            0.15 + i * motion.staggerChorus,
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
