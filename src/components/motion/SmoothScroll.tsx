"use client";

import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, REDUCED_MOTION, EASE_CUT } from "@/lib/gsap";

type ScrollTarget = number | string | HTMLElement;
type ScrollOptions = { offset?: number; immediate?: boolean };

type SmoothScrollApi = {
  /**
   * Scroll the page. Goes through Lenis when it is running, so it never fights
   * Lenis's own animation; falls back to native scrolling under reduced motion.
   */
  scrollTo: (target: ScrollTarget, options?: ScrollOptions) => void;
  /** The live Lenis instance, or null (reduced motion, or not mounted yet). */
  getLenis: () => Lenis | null;
};

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);

/** Programmatic scrolling for any client component ("back to top", section jumps). */
export function useSmoothScroll(): SmoothScrollApi {
  const api = useContext(SmoothScrollContext);
  if (!api) throw new Error("useSmoothScroll must be used inside <SmoothScroll>");
  return api;
}

const resolve = (target: ScrollTarget): number | HTMLElement | null =>
  typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      getLenis: () => lenisRef.current,
      scrollTo: (target, { offset = 0, immediate = false } = {}) => {
        const lenis = lenisRef.current;
        if (lenis) {
          // Same curve as --ease-press, so scripted scrolls match the rest of the motion.
          const easing = gsap.parseEase(EASE_CUT);
          lenis.scrollTo(target, { offset, immediate, force: true, duration: 1, easing });
          return;
        }
        const el = resolve(target);
        if (el === null) return;
        const top =
          typeof el === "number" ? el : el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + offset, behavior: "auto" });
      },
    }),
    [],
  );

  useEffect(() => {
    // The browser must not restore old scroll positions under pinned triggers;
    // routes always start at the top (see the pathname effect below).
    ScrollTrigger.clearScrollMemory("manual");

    const query = window.matchMedia(REDUCED_MOTION);
    const raf = (time: number) => lenisRef.current?.raf(time * 1000);

    const start = () => {
      if (lenisRef.current || query.matches) return;
      const lenis = new Lenis({
        autoRaf: false,
        // A click that navigates cancels any momentum still running.
        stopInertiaOnNavigate: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      lenisRef.current = lenis;
      // Dev-only handle for browser checks (Playwright); never shipped.
      if (process.env.NODE_ENV !== "production") Object.assign(window, { __lenis: lenis });
    };

    const stop = () => {
      if (!lenisRef.current) return;
      gsap.ticker.remove(raf);
      lenisRef.current.destroy();
      lenisRef.current = null;
    };

    const onChange = () => (query.matches ? stop() : start());

    // Same-page anchors (href="#works") scroll through the API, so they never jump natively
    // first and then get dragged back by Lenis. Lenis's own `anchors` option flashes here.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href*='#']") : null;
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
      const target = url.hash.length > 1 ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      // Lenis already honours the target's CSS scroll-margin-top (clears the fixed index bar)
      api.scrollTo(target);
      // Move focus for keyboard and screen-reader users, without a second native scroll.
      // next frame: a listener (e.g. the Works carousel) may first make the target focusable
      requestAnimationFrame(() => {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    };

    start();
    query.addEventListener("change", onChange);
    document.addEventListener("click", onClick);

    // Webfonts change line heights and therefore every trigger's start/end: re-measure once they land.
    let alive = true;
    document.fonts.ready.then(() => alive && ScrollTrigger.refresh());

    return () => {
      alive = false;
      query.removeEventListener("change", onChange);
      document.removeEventListener("click", onClick);
      stop();
    };
  }, [api]);

  // New route: jump to the top without smoothing, then re-measure the new page's triggers.
  useEffect(() => {
    api.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, api]);

  return <SmoothScrollContext value={api}>{children}</SmoothScrollContext>;
}
