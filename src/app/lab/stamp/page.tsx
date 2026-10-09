import type { Metadata } from "next";
import { StampPrint } from "./stamp-print";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// Renders the Contact stamp print at 900×1200 so it can be captured as
// src/components/sections/contact/stamp-saigon.webp (transparent perforations).
export default function StampPage() {
  return (
    <main className="bg-navy-ink p-10">
      <StampPrint />
    </main>
  );
}
