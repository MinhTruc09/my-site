import type { Metadata } from "next";
import Image from "next/image";
import { HeroArt } from "@/components/art/HeroArt";
import { BackToTop } from "./back-to-top";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { HorizontalPin } from "@/components/motion/HorizontalPin";
import { ScrambleTitle } from "@/components/motion/ScrambleTitle";

export const metadata: Metadata = {
  title: "Motion Lab",
  robots: { index: false, follow: false },
};

// Temporary third-party references from public/ref (gitignored). Dev only; never ship.
const refs = [
  { file: "manga-cyperpunk.jpg", w: 736, h: 1040 },
  { file: "hero-va-cac-tab.jpg", w: 736, h: 1104 },
  { file: "style-nhat-ban-noi-loan.jpg", w: 736, h: 983 },
] as const;

function RefTag({ file }: { file: string }) {
  return (
    <figcaption className="type-label absolute top-0 left-0 bg-sumi px-2 py-1 text-amber">
      REF · TEMP · {file}
    </figcaption>
  );
}

export default function LabPage() {
  return (
    <main>
      <header id="lab-top" className="grid min-h-dvh grid-rows-[auto_1fr_auto] px-gutter py-6 lg:px-gutter-desktop">
        <div className="type-label flex justify-between">
          <span>№ LAB-01</span>
          <span>/ MOTION TEST</span>
        </div>
        <div className="self-end">
          <p className="type-subtitle mb-4 text-cobalt">SCRAMBLE TEXT</p>
          <ScrambleTitle text="MOTION LAB" className="type-display text-signal-red" />
        </div>
        <p className="type-label mt-10 border-t-2 border-sumi pt-3">↓ SCROLL · CLIP-PATH REVEAL</p>
      </header>

      <section className="relative h-dvh min-h-[560px] overflow-hidden">
        <HeroArt className="absolute inset-0" priority={false} />
        <div className="relative flex h-full flex-col justify-between px-gutter py-6 lg:px-gutter-desktop">
          <p className="type-label self-start bg-cream px-2 py-1">04 / P5 · REGISTRATION DRIFT</p>
          <div className="max-w-[44ch] self-start bg-cream p-4">
            <h2 className="type-headline">HALFTONE PRESS</h2>
            <p className="type-body mt-3">
              Two screens at 15° and 75°, ticking at 12 per second. Move the pointer: the sun leans a
              cell or two, the blue screen lifts. Pauses off-screen; reduced motion shows the still.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 px-gutter py-section-mobile md:grid-cols-12 md:py-section lg:px-gutter-desktop">
        <div className="md:col-span-4">
          <p className="type-label">02 / CLIP-PATH</p>
          <h2 className="type-headline mt-3">DIAGONAL SCANNER WIPE</h2>
          <p className="type-body mt-4 max-w-[40ch]">
            Six mechanical steps, bottom-left to top-right, once at 20% into the viewport.
          </p>
        </div>
        <ClipReveal className="md:col-span-6 md:col-start-6">
          <figure className="relative border-2 border-sumi">
            <Image
              src="/ref/poster-retro.jpg"
              alt="Reference placeholder: halftone apple poster"
              width={564}
              height={783}
              className="h-auto w-full"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <RefTag file="poster-retro.jpg" />
          </figure>
        </ClipReveal>
      </section>

      <div className="bg-navy-ink px-gutter pt-10 pb-4 text-cream lg:px-gutter-desktop">
        <p className="type-label">03 / PIN + HORIZONTAL SCRUB</p>
      </div>
      <HorizontalPin className="bg-navy-ink text-cream">
        {refs.map((r, i) => (
          <figure
            key={r.file}
            className="relative flex h-dvh w-[85vw] shrink-0 snap-start flex-col gap-3 px-gutter pb-10 md:w-[60vw] lg:px-gutter-desktop"
          >
            <span className="type-label">№ {String(i + 1).padStart(2, "0")} / 03</span>
            <div className="relative min-h-0 flex-1 border-2 border-cream">
              <Image
                src={`/ref/${r.file}`}
                alt="Reference placeholder from the moodboard"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 60vw, 85vw"
              />
              <RefTag file={r.file} />
            </div>
          </figure>
        ))}
      </HorizontalPin>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-sumi px-gutter py-section-mobile lg:px-gutter-desktop">
        <span className="type-label">✂ END OF LAB</span>
        <span className="flex gap-4">
          <a href="#lab-top" className="type-label inline-flex min-h-tap items-center underline underline-offset-4">
            #LAB-TOP (ANCHOR)
          </a>
          <BackToTop />
        </span>
      </footer>
    </main>
  );
}
