"use client";

import { useSmoothScroll } from "@/components/motion/SmoothScroll";

// Lab check for programmatic scrolling through Lenis.
export function BackToTop() {
  const { scrollTo } = useSmoothScroll();
  return (
    <button
      type="button"
      onClick={() => scrollTo(0)}
      className="type-label min-h-tap border-2 border-sumi px-4 hover:bg-sumi hover:text-cream"
    >
      ↑ BACK TO TOP
    </button>
  );
}
