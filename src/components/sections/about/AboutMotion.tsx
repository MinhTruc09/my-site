"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, motion } from "@/lib/gsap";

/**
 * About entrance (once, ~20% into the viewport): the objective rises line by line, the
 * timeline rule prints down in steps, each entry stamps in one chorus beat apart, the GPA
 * decodes and the stickers slap on.
 * Everything is visible without JS; reduced motion runs nothing.
 */
export function AboutMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(scope);
        // the objective rises line by line out of a mask, in steps
        const lead = q("[data-lead]")[0];
        if (lead) {
          SplitText.create(lead, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 100,
                duration: 0.36,
                ease: "steps(4)",
                stagger: motion.staggerChorus,
                scrollTrigger: { trigger: lead, start: "top 85%", once: true },
              }),
          });
        }

        const line = gsap.timeline({
          scrollTrigger: { trigger: q("[data-timeline]")[0], start: "top 80%", once: true },
        });
        line.from(q("[data-rule]"), { scaleY: 0, transformOrigin: "50% 0%", duration: 0.9, ease: "steps(8)" });
        line.from(
          q("[data-entry]"),
          { x: -12, autoAlpha: 0, duration: motion.durUi, ease: "steps(3)", stagger: motion.staggerChorus },
          0.1,
        );

        const aside = gsap.timeline({
          scrollTrigger: { trigger: q("[data-aside]")[0], start: "top 80%", once: true },
        });
        q("[data-decode]").forEach((el) => {
          aside.to(el, { duration: 0.5, scrambleText: { text: el.textContent ?? "", chars: "0123456789", speed: 1 } }, 0);
        });
        aside.from(
          q("[data-sticker]"),
          { scale: 1.4, duration: motion.durUi, ease: "steps(3)", stagger: motion.staggerTight },
          0.3,
        );
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
