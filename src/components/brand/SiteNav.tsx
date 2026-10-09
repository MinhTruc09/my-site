"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

const SECTIONS = [
  { id: "works", label: "WORKS" },
  { id: "skills", label: "SKILLS" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
] as const;

/**
 * The index bar: once the hero has scrolled away, a thin printed strip pins to the top with the
 * pill mark (back to top) and the four sections, the current one marked ■ amber with
 * aria-current (critique 2026-10-09: no "you are here", and no way to jump on long phone scrolls).
 * Hidden while the hero's own corner nav is visible, so there is never a second nav on screen.
 */
export function SiteNav() {
  const [shown, setShown] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const hero = document.querySelector("main > section:first-of-type");
    const heroIo = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { threshold: 0.08 });
    if (hero) heroIo.observe(hero);

    // a section is current while it crosses the band just below the bar
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        // the deepest section crossing the band wins (at a boundary, the one being entered)
        setCurrent(SECTIONS.findLast((s) => visible.get(s.id))?.id ?? null);
      },
      { rootMargin: "-56px 0px -70% 0px" },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => {
      heroIo.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Sections"
      inert={!shown}
      className={cn(
        "fixed inset-x-0 top-0 z-(--z-header) border-b-2 border-sumi bg-cream text-sumi transition-transform duration-180 ease-[steps(3)] motion-reduce:transition-none",
        shown ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-gutter lg:px-gutter-desktop">
        <a href="#top" aria-label="Back to top" className="flex min-h-tap min-w-tap items-center">
          <Wordmark className="max-sm:hidden" />
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 sm:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M12 20V5M5 12l7-7 7 7" />
          </svg>
        </a>
        <ul className="type-label flex items-center overflow-x-auto max-md:tracking-[0.15em]">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={current === s.id ? "location" : undefined}
                className="flex min-h-tap items-center gap-1.5 px-2.5 whitespace-nowrap max-sm:px-1.5 hover:underline hover:decoration-signal-red hover:decoration-2 hover:underline-offset-[6px]"
              >
                {current === s.id && <span aria-hidden="true" className="size-2 bg-amber outline outline-1 outline-sumi" />}
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
