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
// Each word scrambles in its own span, so spaces (and line breaks) survive the scramble
// and the heading never grows wider than its final layout.
export function ScrambleTitle({ text, as: Tag = "h1", className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ref.current!.querySelectorAll<HTMLElement>("[data-word]").forEach((el) => {
          gsap.to(el, {
            duration: 0.6, // 5-Second Rule: never hide text for more than 600ms
            ease: "none",
            scrambleText: {
              text: el.dataset.word!,
              chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#",
              speed: 0.8,
              revealDelay: motion.durUi,
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <Tag ref={ref} aria-label={text} className={cn("overflow-x-clip", className)}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span data-word={word}>{word}</span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
