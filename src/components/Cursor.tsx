"use client";

import { useEffect, useRef, useState } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const pad = (n: number) => String(Math.round(n)).padStart(4, "0");

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

    const show = (visible: boolean) => {
      cross.dataset.visible = readout.dataset.visible = String(visible);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const t = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cross.style.transform = t;
        readout.style.transform = t;
        label.textContent = `X ${pad(e.clientX)} · Y ${pad(e.clientY)}`;
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
      {/* Lines invert against whatever ink is underneath, so they read on cream and navy alike */}
      <div ref={crossRef} aria-hidden="true" data-visible="false" className={`${layer} mix-blend-difference`}>
        <span className="absolute -top-3 left-0 h-6 w-px bg-cream" />
        <span className="absolute top-0 -left-3 h-px w-6 bg-cream" />
      </div>
      <div
        ref={readoutRef}
        aria-hidden="true"
        data-visible="false"
        className={`${layer} type-label pt-3 pl-3 whitespace-nowrap`}
      >
        <span ref={labelRef} className="bg-sumi px-1.5 py-0.5 text-cream">X 0000 · Y 0000</span>
      </div>
    </>
  );
}
