/**
 * Palette metadata for components that print hex codes as typography (swatch bands, labels).
 * Hex values MUST match the @theme tokens in src/app/globals.css (and DESIGN.md frontmatter).
 * Fills still use the Tailwind utilities; this file only supplies the printed codes and
 * which ink a small label can sit on (WCAG 2.x, 12px label = normal text, needs 4.5:1).
 */

export type Ink =
  | "signal-red"
  | "vermilion"
  | "wine"
  | "cobalt"
  | "navy-ink"
  | "denki-cyan"
  | "amber"
  | "flame"
  | "acid-screen"
  | "acid-print"
  | "acid-shadow"
  | "cream"
  | "paper-grey"
  | "sumi";

type InkMeta = {
  hex: string;
  /** Tailwind background utility (literal, so Tailwind can see it). */
  bg: string;
  /**
   * How a 12px label sits on this ink:
   * - "sumi" / "cream": text color with ≥ 4.5:1 directly on the ink
   * - "plate": neither reaches 4.5:1, so the label gets a sumi backing plate with cream text
   */
  label: "sumi" | "cream" | "plate";
};

export const PALETTE: Record<Ink, InkMeta> = {
  "signal-red": { hex: "#BD1B1F", bg: "bg-signal-red", label: "cream" }, // 5.74
  vermilion: { hex: "#FA2D1A", bg: "bg-vermilion", label: "plate" }, // sumi 4.27, cream 3.51
  wine: { hex: "#8B011A", bg: "bg-wine", label: "cream" }, // 9.05
  cobalt: { hex: "#2A4C9E", bg: "bg-cobalt", label: "cream" }, // 7.30
  "navy-ink": { hex: "#253054", bg: "bg-navy-ink", label: "cream" }, // 11.76
  "denki-cyan": { hex: "#0489BE", bg: "bg-denki-cyan", label: "plate" }, // sumi 4.17, cream 3.60
  amber: { hex: "#F6BB02", bg: "bg-amber", label: "sumi" }, // 9.42
  flame: { hex: "#E44F0A", bg: "bg-flame", label: "plate" }, // sumi 4.25, cream 3.53
  "acid-screen": { hex: "#D4F53C", bg: "bg-acid-screen", label: "sumi" }, // 13.26
  "acid-print": { hex: "#BBB81E", bg: "bg-acid-print", label: "sumi" }, // 7.83
  "acid-shadow": { hex: "#6A662E", bg: "bg-acid-shadow", label: "cream" }, // 5.39
  cream: { hex: "#FFF3E1", bg: "bg-cream", label: "sumi" }, // 15.01
  "paper-grey": { hex: "#DAD2C8", bg: "bg-paper-grey", label: "sumi" }, // 11.00
  sumi: { hex: "#201F1E", bg: "bg-sumi", label: "cream" }, // 15.01
};
