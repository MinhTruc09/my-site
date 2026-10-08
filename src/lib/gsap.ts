"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);

// Motion tokens (DESIGN.md › Motion)
export const motion = {
  durMicro: 0.12,
  durUi: 0.18,
  durReveal: 0.5,
  durScene: 0.9,
  staggerTight: 0.04,
  staggerChorus: 0.08,
  // cubic-bezier(.7,0,.2,1); power4.inOut is the skill's named equivalent
  easeCut: "power4.inOut",
} as const;

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const DESKTOP = "(min-width: 768px)";

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP };
