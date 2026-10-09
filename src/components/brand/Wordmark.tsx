import { cn } from "@/lib/utils";
import { profile } from "@/content/profile";

type Props = {
  /** "sm" for the hero corner, "lg" for the contact lockup. */
  size?: "sm" | "lg";
  className?: string;
};

/**
 * The site's pill logo, after the moodboard poster's sticker mark (DESIGN.md › Pill logo /
 * sticker): the handle in lowercase heavy condensed italic, inside an outlined oval that leans
 * with the letters. Drawn in currentColor so it works on cream and on navy.
 */
export function Wordmark({ size = "sm", className }: Props) {
  const handle = profile.name.handle.toLowerCase();
  return (
    <span
      className={cn(
        "inline-flex -skew-x-12 items-center justify-center rounded-full border-current leading-none",
        size === "sm" ? "border-2 px-4 py-1" : "border-[3px] px-8 py-2 md:px-10",
        className,
      )}
    >
      <span
        className={cn(
          "skew-x-12",
          size === "sm" ? "type-tab font-black" : "type-headline font-black normal-case italic",
        )}
      >
        {handle}
      </span>
    </span>
  );
}
