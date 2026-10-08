"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";
import {
  createHeroSketch,
  DEFAULT_PARAMS,
  type HeroSketchHandle,
  type HeroSketchParams,
} from "./hero-sketch";

// Loaded only in the browser (next/dynamic, ssr: false) from HeroArt.
export default function HeroCanvas({ params }: { params?: Partial<HeroSketchParams> }) {
  const ref = useRef<HTMLDivElement>(null);
  const seed = params?.seed;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let handle: HeroSketchHandle | null = null;
    // p5 v2 runs setup asynchronously, so remove() can land before setup finishes
    // (React StrictMode mounts twice in dev). A late setup must tear itself down.
    let disposed = false;
    let visible = true;
    let pageVisible = !document.hidden;
    const sync = () => handle?.setRunning(visible && pageVisible);

    const instance = new p5(
      createHeroSketch(el, { ...DEFAULT_PARAMS, ...params }, (h) => {
        if (disposed) {
          queueMicrotask(() => instance.remove());
          return;
        }
        handle = h;
        sync();
      }),
      el,
    );

    // Pause when off-screen or when the tab is hidden.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    const onVisibility = () => {
      pageVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // The canvas sits behind content, so listen on the window and map into canvas space.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x < 0 || y < 0 || x > r.width || y > r.height) handle?.clearPointer();
      else handle?.setPointer(x, y);
    };
    const onLeave = () => handle?.clearPointer();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      disposed = true;
      handle = null;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      instance.remove();
    };
    // Re-create only when the seed changes; other params are read once per instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  return <div ref={ref} className="absolute inset-0" />;
}
