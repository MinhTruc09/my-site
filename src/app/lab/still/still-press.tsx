"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("@/components/art/HeroCanvas"), { ssr: false });

// tickRate ~0 freezes the press on its first sheet.
export function StillPress() {
  return <HeroCanvas params={{ tickRate: 0.0001 }} />;
}
