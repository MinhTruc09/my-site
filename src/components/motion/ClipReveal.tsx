"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// A right triangle anchored bottom-left; at full size its hypotenuse clears the top-right corner.
const HIDDEN = "polygon(0% 100%, 0% 100%, 0% 100%)";
const SHOWN = "polygon(0% 100%, 200% 100%, 0% -100%)";

// Diagonal scanner wipe (bottom-left → top-right) in mechanical steps.
// Plays once when the element is 20% into the viewport. No opacity fade.
export function ClipReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { clipPath: HIDDEN },
          {
            clipPath: SHOWN,
            duration: motion.durScene,
            ease: "steps(6)",
            scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
            clearProps: "clipPath",
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
