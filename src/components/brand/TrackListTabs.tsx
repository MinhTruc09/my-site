import { cn } from "@/lib/utils";

type Tab = {
  id: string;
  /** Visible, rotated label; also the accessible name. */
  title: string;
  href: string;
  /** Small mono code printed at the foot of the tab, e.g. "PRJ-01". */
  code?: string;
};

type Props = {
  tabs: readonly Tab[];
  /** id of the current tab; gets aria-current and the amber marker. */
  activeId?: string;
  /** Accessible name of the list, e.g. "Projects". */
  label: string;
  /** Height of the stage the tabs rise in (the equalizer's 100%). */
  stageClassName?: string;
  /** Draw the cyan band under the tabs (off when the section draws its own full-width band). */
  band?: boolean;
  className?: string;
};

// Equalizer heights, as fractions of the stage. Fixed (not random) so the rhythm is
// identical on server and client and reads as composed, like the Bomb Rush track list.
const HEIGHTS = [0.62, 0.9, 0.74, 1, 0.56, 0.82, 0.68, 0.95];

// Staggered vertical denki-cyan tabs rising from a cyan band (DESIGN.md › Track-list Tabs).
// Each tab is a real link. A tab is never shorter than its own label (the equalizer height
// is a minimum). Phones: a horizontal swipe strip of equal, full-height tabs.
export function TrackListTabs({ tabs, activeId, label, stageClassName = "h-96 max-md:h-80", band = true, className }: Props) {
  return (
    <nav aria-label={label} className={cn("w-full", className)}>
      <ul className={cn("flex items-end gap-1 overflow-x-auto px-gutter md:gap-1.5 lg:px-gutter-desktop", stageClassName)}>
        {tabs.map((tab, i) => {
          const active = tab.id === activeId;
          return (
            <li
              key={tab.id}
              className="flex h-full min-h-max shrink-0 items-end max-md:!h-full"
              style={{ height: `${HEIGHTS[i % HEIGHTS.length] * 100}%` }}
            >
              <a
                href={tab.href}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "group flex h-full min-h-max w-tap flex-col items-center justify-between gap-3 bg-denki-cyan px-1 pt-3 pb-2 text-sumi",
                  "transition-transform duration-120 ease-[steps(2)] hover:-translate-y-2 focus-visible:-translate-y-2",
                  active && "bg-amber",
                )}
              >
                <span className="type-tab whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                  {tab.title}
                </span>
                {tab.code && (
                  <span aria-hidden="true" className="type-label bg-sumi py-1 tracking-[0.15em] text-cream [writing-mode:vertical-rl] rotate-180">
                    {active ? "■" : ""} {tab.code}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
      {/* the band the tabs rise from */}
      {band && <div aria-hidden="true" className="h-3 bg-denki-cyan" />}
    </nav>
  );
}
