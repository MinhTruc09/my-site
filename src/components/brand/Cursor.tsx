"use client";

import { useEffect, useRef, useState } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const INTERACTIVE = 'a[href], button:not(:disabled), [role="button"]:not([aria-disabled="true"])';
const pad = (n: number) => String(Math.round(n)).padStart(4, "0");

type Hover = "none" | "link" | "button";
const hoverOf = (target: EventTarget | null): Hover => {
  const el = target instanceof Element ? target.closest(INTERACTIVE) : null;
  if (!el) return "none";
  return el.tagName === "A" ? "link" : "button";
};

// Crosshair + mono coordinate readout. Desktop (fine pointer) only.
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const crossRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const query = window.matchMedia(FINE_POINTER);
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const cross = crossRef.current;
    const readout = readoutRef.current;
    const label = labelRef.current;
    if (!cross || !readout || !label) return;

    const html = document.documentElement;
    html.dataset.cursor = "custom";
    let frame = 0;
    let hover: Hover = "none";

    const show = (visible: boolean) => {
      cross.dataset.visible = readout.dataset.visible = String(visible);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const t = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cross.style.transform = t;
        // flip the readout to the left of the crosshair when it would run off the right edge
        const flip = e.clientX > window.innerWidth - 220;
        readout.style.transform = flip ? `translate3d(${e.clientX}px, ${e.clientY}px, 0) translateX(-100%)` : t;
        readout.style.paddingLeft = flip ? "0" : "";
        readout.style.paddingRight = flip ? "12px" : "";
        const next = hoverOf(e.target);
        if (next !== hover) {
          hover = next;
          cross.dataset.hover = readout.dataset.hover = next;
        }
        label.textContent =
          hover === "none"
            ? `X ${pad(e.clientX)} · Y ${pad(e.clientY)}`
            : `[ ${hover === "link" ? "LINK" : "PRESS"} ] ${pad(e.clientX)}·${pad(e.clientY)}`;
        show(true);
      });
    };
    const onLeave = () => show(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    html.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      html.removeEventListener("pointerleave", onLeave);
      delete html.dataset.cursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  const layer =
    "pointer-events-none fixed top-0 left-0 z-(--z-cursor) data-[visible=false]:invisible";

  return (
    <>
      {/* Lines invert against whatever ink is underneath, so they read on cream and navy alike.
          Hover on a link/button: arms extend and a target-lock square stamps in (stepped, no easing). */}
      <div
        ref={crossRef}
        aria-hidden="true"
        data-visible="false"
        data-hover="none"
        className={`${layer} group mix-blend-difference`}
      >
        <span className="absolute -top-3 left-0 h-6 w-px bg-cream transition-transform duration-120 ease-[steps(2)] group-data-[hover=button]:scale-y-[1.75] group-data-[hover=link]:scale-y-[1.75]" />
        <span className="absolute top-0 -left-3 h-px w-6 bg-cream transition-transform duration-120 ease-[steps(2)] group-data-[hover=button]:scale-x-[1.75] group-data-[hover=link]:scale-x-[1.75]" />
        <span className="absolute -top-3 -left-3 hidden size-6 border border-cream group-data-[hover=button]:block group-data-[hover=link]:block" />
      </div>
      <div
        ref={readoutRef}
        aria-hidden="true"
        data-visible="false"
        data-hover="none"
        className={`${layer} group type-label pt-4 pl-4 whitespace-nowrap`}
      >
        <span
          ref={labelRef}
          className="bg-sumi px-1.5 py-0.5 text-cream group-data-[hover=button]:text-amber group-data-[hover=link]:text-amber"
        >
          X 0000 · Y 0000
        </span>
      </div>
    </>
  );
}
