"use client";

import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/components/motion/SmoothScroll";
import { gsap, useGSAP, motion } from "@/lib/gsap";

const control =
  "type-label inline-flex min-h-tap items-center justify-center gap-2 border-2 border-cream px-4 text-cream transition-colors duration-120 ease-[steps(2)] hover:bg-cream hover:text-navy-ink";

/**
 * Copies the email; the label confirms for 1.6s and is announced politely. If the clipboard is
 * blocked, the address on the page is selected instead so the visitor can copy it themselves.
 */
export function CopyEmail({ email, targetId }: { email: string; targetId: string }) {
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      const el = document.getElementById(targetId);
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setState("selected");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1600);
  };

  return (
    <button type="button" onClick={copy} className={control} aria-label="Copy email address">
      <span aria-live="polite">{state === "copied" ? "COPIED ■" : state === "selected" ? "SELECTED · ⌘C" : "COPY"}</span>
    </button>
  );
}

/** Live Ho Chi Minh City time (GMT+7), ticking once a minute. Empty until mounted. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <time suppressHydrationWarning>{now ?? "--:--"}</time>;
}

export function BackToTop() {
  const { scrollTo } = useSmoothScroll();
  return (
    <button type="button" onClick={() => scrollTo(0)} className={control}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M12 20V5M5 12l7-7 7 7" />
      </svg>
      BACK TO TOP
    </button>
  );
}

/**
 * Contact entrance (once): the ✂ runs along the cut line while the dashes print behind it,
 * then the stub rows stamp in and the Saigon stamp is slapped on. Reduced motion runs nothing.
 */
export function ContactMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(scope);
        const tl = gsap.timeline({ scrollTrigger: { trigger: q("[data-cut]")[0], start: "top 85%", once: true } });
        tl.from(q("[data-cut-line]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.9, ease: "steps(12)" })
          .from(q("[data-scissors]"), { x: () => -(q("[data-cut]")[0] as HTMLElement).offsetWidth + 40, duration: 0.9, ease: "steps(12)" }, 0)
          .from(q("[data-row]"), { x: -12, autoAlpha: 0, duration: motion.durUi, ease: "steps(3)", stagger: motion.staggerChorus }, 0.4)
          // the stamp is slapped on: oversize → size, with a small turn, in three steps
          .from(q("[data-stamp]"), { scale: 1.35, rotate: "+=8", duration: motion.durUi, ease: "steps(3)" }, 0.55);
      });
      return () => mm.revert();
    },
    { scope },
  );
  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  );
}
