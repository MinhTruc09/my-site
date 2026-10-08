"use client";

import { useRef } from "react";
import { gsap, useGSAP, DESKTOP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// Pins the section and scrubs its track sideways (desktop, motion allowed).
// Below 768px or with reduced motion the track is a native swipe strip instead.
export function HorizontalPin({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP} and (prefers-reduced-motion: no-preference)`, () => {
        const track = trackRef.current!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={cn("overflow-hidden", className)}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto motion-safe:md:w-max motion-safe:md:snap-none motion-safe:md:overflow-visible"
      >
        {children}
      </div>
    </section>
  );
}
