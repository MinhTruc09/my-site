import { cn } from "@/lib/utils";
import { JP_GLYPHS, type JpLabelKey } from "./jp-glyphs";

const LATIN: Record<JpLabelKey, string> = {
  works: "WORKS",
  about: "ABOUT",
  skills: "SKILLS",
  contact: "CONTACT",
};

type Props = {
  label: JpLabelKey;
  /** Glyph size in px (one em). */
  size?: number;
  /** Show the Latin twin beside the glyphs. Hidden or not, it is the accessible text. */
  showLatin?: boolean;
  /** Tategaki: glyphs stay upright and stack top to bottom. */
  vertical?: boolean;
  className?: string;
};

// Bilingual section label: Japanese drawn as SVG outlines (no JP webfont) + Latin twin.
// Screen readers get the Latin word only; the glyphs are decorative.
export function JpLabel({ label, size = 16, showLatin = true, vertical = false, className }: Props) {
  const { glyphs } = JP_GLYPHS[label];
  const n = glyphs.length;
  const latin = LATIN[label];

  return (
    <span className={cn("type-label inline-flex items-center gap-2", vertical && "flex-col", className)}>
      {showLatin ? <span>{latin}</span> : <span className="sr-only">{latin}</span>}
      {showLatin && !vertical && <span aria-hidden="true">/</span>}
      <svg
        aria-hidden="true"
        viewBox={vertical ? `0 0 1000 ${n * 1000}` : `0 0 ${n * 1000} 1000`}
        width={vertical ? size : size * n}
        height={vertical ? size * n : size}
        className="shrink-0 fill-current"
      >
        {glyphs.map((d, i) => (
          <path key={i} d={d} transform={vertical ? `translate(0 ${i * 1000})` : `translate(${i * 1000} 0)`} />
        ))}
      </svg>
    </span>
  );
}
