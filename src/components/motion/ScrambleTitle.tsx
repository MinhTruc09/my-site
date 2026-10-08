"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

// Decodes from scrambled glyphs into the final text. The final text is server-rendered,
// so it is readable without JS and announced correctly by screen readers.
export function ScrambleTitle({ text, as: Tag = "h1", className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ref.current, {
          duration: 0.6, // 5-Second Rule: never hide text for more than 600ms
          ease: "none",
          scrambleText: {
            text,
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#",
            speed: 0.8,
            revealDelay: motion.durUi,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <Tag ref={ref} aria-label={text} className={cn(className)}>
      {text}
    </Tag>
  );
}
