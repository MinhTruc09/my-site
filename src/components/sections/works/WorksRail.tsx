"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/brand/PhoneFrame";
import { PhonePoster } from "@/components/brand/PhonePoster";
import { TerminalPanel } from "@/components/brand/TerminalPanel";
import { TrackListTabs } from "@/components/brand/TrackListTabs";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export type WorkItem = {
  code: string;
  slug: string;
  name: string;
  /** Shorter tab label (repository-style) so the rotated tab stays inside its stage. */
  tab: string;
  purpose: string;
  period: string;
  team: string;
  platform: string;
  stack: readonly string[];
  highlights: readonly string[];
  repo: { label: string; href: string };
  screenshot: string | null;
};

const INTERVAL = 4000; // ms per sheet (owner request, 2026-10-08)
const REDUCED = "(prefers-reduced-motion: reduce)";

function Glyph({ d }: { d: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
      <path d={d} />
    </svg>
  );
}

/**
 * WORKS · "the press run", as an auto-advancing carousel (owner request, 2026-10-08: the
 * section must not hold the page scroll). One sheet at a time; every 4s the next sheet is
 * printed in (stepped wipe + 2-tick red misregistration) and its tab turns amber, while an
 * amber bar fills the cyan band over the interval. Pauses on hover, keyboard focus,
 * off-screen, hidden tab, or the pause button (WCAG 2.2.2). Reduced motion: no autoplay.
 */
export function WorksRail({ items, header }: { items: readonly WorkItem[]; header: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true); // the visitor's choice (pause button)
  const [held, setHeld] = useState(false); // hover / focus inside
  const [visible, setVisible] = useState(false);
  // the visitor has scrolled into the sheet itself: they are reading, so the clock waits
  const [reading, setReading] = useState(false);
  // only manual changes are announced; autoplay stays silent
  const [announce, setAnnounce] = useState(false);
  const sheets = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [tick, setTick] = useState(0); // restarts the clock and the bar on manual picks
  const first = useRef(true);
  const n = items.length;

  const go = useCallback(
    (i: number) => {
      setActive(((i % n) + n) % n);
      setTick((t) => t + 1);
    },
    [n],
  );

  useEffect(() => {
    const q = window.matchMedia(REDUCED);
    const sync = () => setReduced(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let inView = false;
    const sync = () => setVisible(inView && !document.hidden);
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // Reading = the sheet's top has passed the upper third of the viewport.
  useEffect(() => {
    const el = sheets.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setReading(e.isIntersecting), {
      rootMargin: "0px 0px -66% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && !held && visible && !reading && !reduced;

  // The clock. Re-armed on every sheet change, so a manual pick also gets a full 4s.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => go(active + 1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [running, active, tick, go]);

  // Equalizer rise: tabs grow from the band, one beat apart (once).
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-tabs] li"), {
          scaleY: 0,
          transformOrigin: "50% 100%",
          duration: 0.4,
          ease: "steps(5)",
          stagger: 0.04,
          scrollTrigger: { trigger: q("[data-tabs]")[0], start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Print the incoming sheet: a stepped wipe left → right, then the red drum slips for 2 ticks.
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (reduced) return;
      const sheet = root.current?.querySelector<HTMLElement>(`[data-sheet="${active}"]`);
      if (!sheet) return;
      const panel = sheet.querySelector("[data-register]");
      const tl = gsap.timeline();
      tl.fromTo(
        sheet,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.42, ease: "steps(6)", clearProps: "clipPath" },
      );
      if (panel) {
        tl.fromTo(
          panel,
          { x: 3, y: -2, boxShadow: "-5px 4px 0 var(--color-signal-red)" },
          {
            x: 0,
            y: 0,
            boxShadow: "0px 0px 0 var(--color-signal-red)",
            duration: 0.3,
            ease: "steps(3)",
            clearProps: "transform,boxShadow",
          },
        );
      }
    },
    { scope: root, dependencies: [active, reduced] },
  );

  // Any "#prj-<slug>" link elsewhere on the page (Skills proof codes, the hero's NOW SHOWING
  // chip) selects that sheet while SmoothScroll scrolls to it; a deep link selects on load.
  useEffect(() => {
    const indexOf = (hash: string) => items.findIndex((it) => `#prj-${it.slug}` === hash);
    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href^='#prj-']") : null;
      if (!link || root.current?.contains(link)) return;
      const i = indexOf(link.getAttribute("href") ?? "");
      if (i >= 0) {
        setAnnounce(true);
        go(i);
      }
    };
    const fromHash = indexOf(window.location.hash);
    if (fromHash >= 0) go(fromHash);
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [items, go]);

  // Tabs select a sheet instead of jumping to an anchor.
  const onTabClick = (e: React.MouseEvent) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>("a[href^='#prj-']");
    if (!link) return;
    const i = items.findIndex((it) => `#prj-${it.slug}` === link.getAttribute("href"));
    if (i < 0) return;
    e.preventDefault();
    setAnnounce(true);
    go(i);
  };

  const current = items[active];
  const control =
    "type-label inline-flex h-tap min-w-tap items-center justify-center gap-2 border-2 border-sumi bg-cream px-3 text-sumi transition-colors duration-120 ease-[steps(2)] hover:bg-sumi hover:text-cream disabled:opacity-60";

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected works"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false);
      }}
      className="flex flex-col"
    >
      {/* title + equalizer, sharing the top of the poster */}
      <div className="mx-auto grid w-full max-w-page grid-cols-4 items-end gap-x-6 px-gutter pt-section-mobile md:grid-cols-12 lg:px-gutter-desktop lg:pt-24">
        <div className="col-span-4 pb-6 md:col-span-8">{header}</div>
        <div data-tabs onClickCapture={onTabClick} className="col-span-4 -mx-gutter md:col-span-4 md:mx-0">
          <TrackListTabs
            label="Projects"
            activeId={current?.slug}
            stageClassName="h-72 justify-end max-md:h-56 max-md:justify-start lg:px-0"
            band={false}
            tabs={items.map((it) => ({ id: it.slug, title: it.tab, href: `#prj-${it.slug}`, code: it.code }))}
          />
        </div>
      </div>

      {/* the band, with the interval filling across it in amber */}
      <div aria-hidden="true" className="relative h-3 overflow-hidden bg-denki-cyan">
        <span
          key={`${active}-${tick}-${running}`}
          className="absolute inset-0 origin-left scale-x-0 bg-amber"
          style={running ? { animation: `works-progress ${INTERVAL}ms linear forwards` } : undefined}
        />
      </div>

      <div className="mx-auto w-full max-w-page px-gutter py-8 lg:px-gutter-desktop">
        {/* controls */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="type-label whitespace-nowrap max-md:tracking-[0.15em]">
            <span className="text-signal-red">{current.code}</span> · {String(active + 1).padStart(2, "0")} /{" "}
            {String(n).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className={control}
              onClick={() => {
                setAnnounce(true);
                go(active - 1);
              }}
              aria-label="Previous project"
            >
              <Glyph d="M15 5l-7 7 7 7" />
            </button>
            <button
              type="button"
              className={control}
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              disabled={reduced}
            >
              <Glyph d={playing && !reduced ? "M8 5v14M16 5v14" : "M7 5l12 7-12 7z"} />
              <span className="max-md:sr-only">{playing && !reduced ? "PAUSE" : "PLAY"}</span>
            </button>
            <button
              type="button"
              className={control}
              onClick={() => {
                setAnnounce(true);
                go(active + 1);
              }}
              aria-label="Next project"
            >
              <Glyph d="M9 5l7 7-7 7" />
            </button>
          </div>
        </div>

        {/* sheets: stacked in one grid cell, only the active one shown */}
        {/* polite announcement for visitor-initiated changes only */}
        <p className="sr-only" aria-live="polite">
          {announce ? `Showing ${current.code} ${current.name}, ${active + 1} of ${n}` : ""}
        </p>
        <div ref={sheets} className="grid">
          {items.map((it, i) => (
            <div
              key={it.slug}
              id={`prj-${it.slug}`}
              data-sheet={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${it.code} ${it.name} (${i + 1} of ${n})`}
              aria-hidden={i !== active}
              inert={i !== active}
              className={cn(
                "col-start-1 row-start-1 grid grid-cols-4 items-start gap-x-6 gap-y-8 md:grid-cols-12",
                i !== active && "invisible",
              )}
            >
              <TerminalPanel
                className="col-span-4 md:col-span-8"
                headingLevel={3}
                title={it.name.toUpperCase()}
                code={it.code}
                jp="works"
                specs={[
                  { label: "PURPOSE", value: it.purpose },
                  { label: "PERIOD", value: it.period },
                  { label: "TEAM", value: it.team },
                  { label: "STACK", value: it.stack.join(" · ") },
                ]}
                footer={[
                  it.platform.toUpperCase(),
                  `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`,
                  <a
                    key="repo"
                    href={it.repo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="-my-3 inline-flex min-h-tap items-center underline decoration-acid-screen decoration-2 underline-offset-4 hover:bg-acid-screen hover:text-sumi"
                  >
                    {it.repo.label.toUpperCase()} ↗
                  </a>,
                ]}
              >
                <ul className="grid gap-2">
                  {it.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden="true" className="text-acid-screen">
                        ■
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </TerminalPanel>
              <PhoneFrame
                className="col-span-4 justify-self-center max-md:max-w-40 md:col-span-3 md:col-start-10 md:justify-self-end"
                width={220}
                src={it.screenshot}
                alt={`${it.name} — app screenshot`}
                sizes="220px"
                placeholder={<PhonePoster code={it.code} name={it.name} platform={it.platform} stack={it.stack} />}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
