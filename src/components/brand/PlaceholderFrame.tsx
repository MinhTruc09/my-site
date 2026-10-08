import { cn } from "@/lib/utils";

type Props = {
  /** Shown as `[ LABEL ]`. */
  label?: "SCREENSHOT PENDING" | "IMAGE PENDING" | "CV PENDING" | "SECTION PENDING";
  /** CSS aspect ratio of the final asset, e.g. "9 / 19.5" for a phone screen. */
  aspect?: string;
  className?: string;
};

// A visibly marked gap where a real asset will go (PRODUCT.md: never invent content).
// Paper-grey, 1px sumi diagonal hatching 12px apart, 1px sumi border (DESIGN.md › Imagery).
export function PlaceholderFrame({ label = "IMAGE PENDING", aspect = "4 / 3", className }: Props) {
  return (
    <div
      role="img"
      aria-label={label.toLowerCase()}
      className={cn("relative grid place-items-center border border-sumi bg-paper-grey text-sumi", className)}
      style={{
        aspectRatio: aspect,
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-sumi) 0 1px, transparent 1px 12px)",
      }}
    >
      <span className="type-label bg-paper-grey px-2 py-1 text-center text-balance">
        {/* non-breaking spaces keep the brackets on their words when the label wraps */}
        {`[\u00A0${label}\u00A0]`}
      </span>
    </div>
  );
}
