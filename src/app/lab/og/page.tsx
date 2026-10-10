import type { Metadata } from "next";
import Image from "next/image";
import { HankoSeal } from "@/components/brand/HankoSeal";
import { SwatchBand } from "@/components/brand/SwatchBand";
import { Wordmark } from "@/components/brand/Wordmark";
import { profile } from "@/content/profile";
import phone from "@/components/sections/hero/phone-still.webp";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * Capture bench for the share card and the app icons (dev only). Screenshot:
 * - #og   (1200×630) → src/app/opengraph-image.png
 * - #icon (512×512)  → src/app/icon.png, and at 180×180 → src/app/apple-icon.png
 * Recapture whenever the name, role, phone or brand marks change.
 */
export default function OgBench() {
  return (
    <main className="flex flex-col items-start gap-10 bg-paper-grey p-10">
      <div id="og" className="relative flex h-[630px] w-[1200px] shrink-0 flex-col overflow-hidden bg-cream text-sumi">
        <div className="flex items-center justify-between px-14 pt-10">
          <Wordmark />
          <span className="type-label">PORTFOLIO · PRINT RUN</span>
        </div>
        <div className="relative flex flex-1 px-14">
          <div className="flex flex-col justify-center gap-6 pb-6">
            <h1 lang="vi" className="type-display-vi text-[112px] leading-[0.95] text-signal-red">
              {profile.name.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h1>
            <p className="type-subtitle">
              {profile.role.toUpperCase()} · {profile.coreStack.join(" · ").toUpperCase()}
            </p>
          </div>
          <Image src={phone} alt="" className="absolute -top-4 right-24 h-[560px] w-auto" priority />
          <HankoSeal size={110} rotate={-6} className="absolute right-10 bottom-4" />
        </div>
        <SwatchBand swatches={["cobalt", "navy-ink", "signal-red", "cream", "amber"]} heightClassName="h-12" />
      </div>

      <div id="icon" className="flex size-[512px] shrink-0 items-center justify-center bg-signal-red">
        <span className="font-sans text-[300px] leading-none font-black text-cream italic [font-stretch:62%]">m9</span>
      </div>
    </main>
  );
}
