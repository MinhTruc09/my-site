"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PHONE_SCREENS } from "@/components/art/phone/phone-screens";
import still from "./phone-still.webp";

const PhoneCanvas = dynamic(() => import("@/components/art/phone/PhoneCanvas"), { ssr: false });

const REDUCED = "(prefers-reduced-motion: reduce)";

// Device capability is checked once per page load (each WebGL probe costs a context).
let capable: boolean | null = null;
function deviceCapable() {
  if (capable !== null) return capable;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData || (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4)) {
    return (capable = false);
  }
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    capable = !!gl;
  } catch {
    capable = false;
  }
  return capable;
}

/** Live 3D only with motion allowed, WebGL available, and no data-saver / low-memory hint. */
const canAnimate = () => !window.matchMedia(REDUCED).matches && deviceCapable();

const subscribe = (cb: () => void) => {
  const q = window.matchMedia(REDUCED);
  q.addEventListener("change", cb);
  return () => q.removeEventListener("change", cb);
};

/**
 * The hero subject. The printed still (PRJ-01 facing front) is always the first paint and
 * the reduced-motion / low-power fallback; the live phone loads on top and replaces it on its
 * first frame, in the same pose, so there is no blank frame and no fade.
 */
export function HeroPhone({ className }: { className?: string }) {
  const animate = useSyncExternalStore(subscribe, canAnimate, () => false);
  const box = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const [ready, setReady] = useState(false);
  const [showing, setShowing] = useState(0);
  const [running, setRunning] = useState(true);

  // Pause the clock off-screen or in a hidden tab.
  useEffect(() => {
    const el = box.current;
    if (!el || !animate) return;
    let visible = true;
    const sync = () => setRunning(visible && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [animate]);

  // Pointer tilt, normalised to the hero (−1…1), fine pointers only.
  useEffect(() => {
    const el = box.current;
    if (!el || !animate) return;
    const hero = el.closest("section") ?? el;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) {
        pointer.current = null;
        return;
      }
      pointer.current = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: ((e.clientY - r.top) / r.height) * 2 - 1,
      };
    };
    const onLeave = () => (pointer.current = null);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [animate]);

  const onReady = useCallback(() => setReady(true), []);
  const current = PHONE_SCREENS[showing];

  return (
    <div ref={box} aria-hidden="true" className={cn("pointer-events-none relative", className)}>
      <Image
        src={still}
        alt=""
        loading="eager"
        sizes="(min-width: 1024px) 34vw, 80vw"
        className={cn("absolute inset-y-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2", ready && "invisible")}
      />
      {animate && <PhoneCanvas running={running} pointer={pointer} onShowing={setShowing} onReady={onReady} />}
      <p className="type-label absolute right-0 bottom-[12%] bg-sumi px-2 py-1 text-cream max-md:bottom-[6%]">
        NOW SHOWING · <span className="text-amber">{current.code}</span>
        <span className="max-md:hidden"> · {current.name.toUpperCase()}</span>
      </p>
    </div>
  );
}
