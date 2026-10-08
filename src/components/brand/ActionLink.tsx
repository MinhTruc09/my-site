import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"a"> & {
  variant?: "primary" | "ghost";
  /** Trailing 1-bit arrow: down for in-page jumps, up-right for external links. */
  arrow?: "down" | "up-right";
};

function Arrow({ dir }: { dir: "down" | "up-right" }) {
  // 24px grid, 2px square-capped stroke, mitred joins (DESIGN.md › Icons)
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      {dir === "down" ? <path d="M12 4v15M5 12l7 7 7-7" /> : <path d="M7 17 17 7M8 7h9v9" />}
    </svg>
  );
}

// Stamped, square buttons (DESIGN.md › Buttons). Rendered as links: every hero action navigates.
// Hover: fill steps (primary → wine, ghost → sumi) and the label jitters 2px once.
// Active: a 2px press. Focus: 2px outline in the surface's ring colour (globals.css).
export function ActionLink({ variant = "primary", arrow, className, children, ...props }: Props) {
  return (
    <a
      {...props}
      className={cn(
        "type-label group/action inline-flex min-h-tap items-center gap-3 border-2 px-6 py-3",
        "transition-colors duration-120 ease-[steps(2)] active:translate-x-0.5 active:translate-y-0.5",
        variant === "primary"
          ? "border-signal-red bg-signal-red text-cream hover:border-wine hover:bg-wine"
          : "border-sumi bg-cream text-sumi hover:bg-sumi hover:text-cream",
        className,
      )}
    >
      <span className="inline-flex items-center gap-3 motion-safe:group-hover/action:animate-jitter">
        {children}
        {arrow && <Arrow dir={arrow} />}
      </span>
    </a>
  );
}
