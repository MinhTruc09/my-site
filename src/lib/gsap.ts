"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);

// ease-cut: the exact curve of --ease-press in globals.css, cubic-bezier(.7,0,.2,1).
// CustomEase takes the two control points of a cubic-bezier as "x1,y1,x2,y2".
export const EASE_CUT = "cut";
CustomEase.create(EASE_CUT, "0.7,0,0.2,1");

// Motion tokens (DESIGN.md › Motion)
export const motion = {
  durMicro: 0.12,
  durUi: 0.18,
  durReveal: 0.5,
  durScene: 0.9,
  staggerTight: 0.04,
  staggerChorus: 0.08,
  easeCut: EASE_CUT,
} as const;

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const DESKTOP = "(min-width: 768px)";

export { gsap, CustomEase, ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP };
