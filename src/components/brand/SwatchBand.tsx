import { cn } from "@/lib/utils";
import { PALETTE, type Ink } from "@/lib/palette";

type Swatch = Ink | { ink: Ink; label: string };

type Props = {
  swatches: readonly Swatch[];
  className?: string;
  /** Column height. Defaults to a poster-band 96px (64px on phones). */
  heightClassName?: string;
};

const LABEL_INK = {
  sumi: "text-sumi",
  cream: "text-cream",
  plate: "bg-sumi px-1.5 py-0.5 text-cream",
} as const;

// Equal flat colour columns, each labeled in spaced mono with its hex (or a section code).
// The most repeated motif of the art set (DESIGN.md › Swatch Band).
// `data-count` marks each code so a section intro can type it on (swatch count-in).
export function SwatchBand({ swatches, className, heightClassName = "h-16 md:h-24" }: Props) {
  return (
    <ul aria-hidden="true" className={cn("flex w-full", heightClassName, className)}>
      {swatches.map((s, i) => {
        const ink = typeof s === "string" ? s : s.ink;
        const meta = PALETTE[ink];
        const label = typeof s === "string" ? meta.hex.slice(1) : s.label;
        return (
          <li key={`${ink}-${i}`} className={cn("relative flex min-w-0 flex-1 items-end p-2 md:p-3", meta.bg)}>
            <span className={cn("type-label truncate tracking-[0.2em] max-md:hidden", LABEL_INK[meta.label])}>
              № <span data-count>{label}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
