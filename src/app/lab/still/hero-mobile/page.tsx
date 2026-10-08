import type { Metadata } from "next";
import { StillPress } from "../still-press";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// Hero background, phones (2:5): clean stock on top for name/role/actions, sun behind the phone.
// Captured as src/components/sections/hero/hero-bg-mobile.webp.
export default function HeroMobileStill() {
  return (
    <main className="relative h-[1500px] w-[600px]">
      <StillPress params={{ sunX: 0.5, sunY: 0.62, sunRadius: 0.44, clearY: 0.38, stripes: 4 }} />
    </main>
  );
}
