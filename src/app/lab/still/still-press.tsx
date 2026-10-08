"use client";

import dynamic from "next/dynamic";
import type { HeroSketchParams } from "@/components/art/hero-sketch";

const HeroCanvas = dynamic(() => import("@/components/art/HeroCanvas"), { ssr: false });

// tickRate ~0 freezes the press on its first sheet.
export function StillPress({ params }: { params?: Partial<HeroSketchParams> }) {
  return <HeroCanvas params={{ ...params, tickRate: 0.0001 }} />;
}
