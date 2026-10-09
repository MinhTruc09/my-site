import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { PlaceholderFrame } from "./PlaceholderFrame";

type Props = {
  /** App screenshot; null/undefined renders the pending placeholder. */
  src?: StaticImageData | string | null;
  alt?: string;
  /** Screen aspect ratio (width / height). iPhone simulator ≈ 9 / 19.5. */
  aspect?: number;
  /** Rendered body width in px (DESIGN.md phone-frame: 320). */
  width?: number;
  sizes?: string;
  priority?: boolean;
  /** Shown instead of the generic hatch while the screenshot is pending. */
  placeholder?: React.ReactNode;
  className?: string;
};

// Flat device mock for app screenshots: sumi body, thin bezel, hard offset. Rounded like the
// real device, matching the hero's 3D phone (owner decision, 2026-10-08). Never photoreal.
export function PhoneFrame({
  src,
  alt = "",
  aspect = 9 / 19.5,
  width = 320,
  sizes = "320px",
  priority = false,
  placeholder,
  className,
}: Props) {
  return (
    <figure
      className={cn("w-full rounded-[2.25rem] bg-sumi p-[9px] shadow-[6px_6px_0_var(--color-cobalt)]", className)}
      style={{ maxWidth: width }}
    >
      {/* speaker slot: a 1-bit nod to the device, not a photoreal notch */}
      
      {src ? (
        <div className="relative w-full overflow-hidden rounded-[1.75rem] bg-paper-grey" style={{ aspectRatio: aspect }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        </div>
      ) : (
        placeholder ? (
          <div className="relative w-full overflow-hidden rounded-[1.75rem]" style={{ aspectRatio: aspect }}>
            {placeholder}
          </div>
        ) : (
          <PlaceholderFrame label="SCREENSHOT PENDING" aspect={`${aspect}`} className="overflow-hidden rounded-[1.75rem] border-0" />
        )
      )}
    </figure>
  );
}
