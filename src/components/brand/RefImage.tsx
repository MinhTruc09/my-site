import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PlaceholderFrame } from "./PlaceholderFrame";

type Props = {
  /** File name inside public/ref/ (gitignored moodboard copies). */
  file: string;
  width: number;
  height: number;
  alt: string;
  /** House treatment: duotone in two palette inks. */
  inks?: "cobalt" | "acid";
  sizes?: string;
  className?: string;
};

const DUOTONE = {
  // dark ink shows through the screen-blended greyscale; cream multiplies the highlights back to stock
  cobalt: "bg-cobalt",
  acid: "bg-acid-shadow",
} as const;

/**
 * The ONLY way to render a temporary third-party reference image (CLAUDE.md › Content and honesty).
 * - always duotoned in palette inks, so the placeholder previews the house look;
 * - always tagged `REF · TEMP · <file>` (amber on sumi);
 * - falls back to the placeholder frame when the file is absent (fresh clone, production deploy).
 * Server component: the file check runs at build/render time.
 * Pre-launch gate: no <RefImage> may remain on any route.
 */
export function RefImage({ file, width, height, alt, inks = "cobalt", sizes = "100vw", className }: Props) {
  const exists = existsSync(path.join(process.cwd(), "public", "ref", file));
  if (!exists) {
    return <PlaceholderFrame label="IMAGE PENDING" aspect={`${width} / ${height}`} className={className} />;
  }

  return (
    <figure className={cn("relative isolate overflow-hidden", DUOTONE[inks], className)}>
      <Image
        src={`/ref/${file}`}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="h-auto w-full contrast-125 grayscale mix-blend-screen"
      />
      {/* cream stock multiplied over: white → cream, the dark ink stays */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cream mix-blend-multiply" />
      {/* coarse halftone screen, printed in sumi */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-sumi) 0.45px, transparent 0.7px)",
          backgroundSize: "5px 5px",
        }}
      />
      <figcaption className="type-label absolute top-0 left-0 bg-sumi px-2 py-1 text-amber">
        REF · TEMP · {file}
      </figcaption>
    </figure>
  );
}
