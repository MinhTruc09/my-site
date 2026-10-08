import type { Metadata } from "next";
import { FrozenPhone } from "./frozen-phone";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// Renders the phone's first pose (PRJ-01, facing front) once, transparent, at a narrow
// 3:5 ratio, so it can be captured as src/components/sections/hero/phone-still.webp.
// The still is shown first and under reduced motion; regenerate it when screenshots change.
export default function PhoneStillPage() {
  return (
    <main className="relative h-[2000px] w-[1200px]">
      <FrozenPhone />
    </main>
  );
}
