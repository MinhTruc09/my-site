"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, REDUCED_MOTION } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION);
    let lenis: Lenis | null = null;
    const raf = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis || query.matches) return;
      lenis = new Lenis({ autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenis = null;
    };

    const onChange = () => (query.matches ? stop() : start());

    start();
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return children;
}
