import type { Metadata } from "next";
import { StillPress } from "./still-press";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// Renders tick 0 of the hero press at a fixed size, so the static fallback
// (src/components/art/hero-still.webp) can be captured from the canvas.
export default function StillPage() {
  return (
    <main className="relative h-[1000px] w-[1600px]">
      <StillPress />
    </main>
  );
}
