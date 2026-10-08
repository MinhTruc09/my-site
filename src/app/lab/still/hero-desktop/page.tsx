import type { Metadata } from "next";
import { StillPress } from "../still-press";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// Hero background, desktop (16:10): sun right, clean stock on the left half for the type.
// Captured as src/components/sections/hero/hero-bg-desktop.webp.
export default function HeroDesktopStill() {
  return (
    <main className="relative h-[1000px] w-[1600px]">
      <StillPress params={{ sunX: 0.76, sunY: 0.5, sunRadius: 0.33, clearX: 0.56 }} />
    </main>
  );
}
