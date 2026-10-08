import { cn } from "@/lib/utils";

type Props = {
  /** Diameter in px (DESIGN.md hanko-seal: 72). */
  size?: number;
  /** Rotation in degrees, within ±8 (DESIGN.md › Hanko Seal). */
  rotate?: number;
  className?: string;
};

// One per page: a signal-red seal carrying the handle MinhTruc09, stacked MINH / TRUC / 09
// (owner decision, 2026-10-08). Decorative: the handle is printed elsewhere as text.
export function HankoSeal({ size = 72, rotate = -6, className }: Props) {
  const r = Math.max(-8, Math.min(8, rotate));
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn("shrink-0 text-cream", className)}
      style={{ rotate: `${r}deg` }}
    >
      <circle cx="50" cy="50" r="49" className="fill-signal-red" />
      {/* inner hairline ring, like a carved stamp border */}
      <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g
        fill="currentColor"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-display)", fontStretch: "125%", fontWeight: 900 }}
      >
        <text x="50" y="40" fontSize="19" letterSpacing="-0.5">
          MINH
        </text>
        <text x="50" y="60" fontSize="19" letterSpacing="-0.5">
          TRUC
        </text>
        <text x="50" y="80" fontSize="17" style={{ fontFamily: "var(--font-mono)", fontStretch: "100%", fontWeight: 700 }}>
          09
        </text>
      </g>
    </svg>
  );
}
