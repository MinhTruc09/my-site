"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HeroSketchParams } from "./hero-sketch";
import still from "./hero-still.webp";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const subscribe = (cb: () => void) => {
  const q = window.matchMedia(REDUCED_MOTION);
  q.addEventListener("change", cb);
  return () => q.removeEventListener("change", cb);
};

/**
 * Hero background: a static print of the sketch (seed 909) is always rendered first,
 * so there is no blank frame and nothing to download for reduced-motion visitors.
 * When motion is allowed, the live p5 press loads on top of it, client-only.
 */
export function HeroArt({
  className,
  params,
  priority = true,
}: {
  className?: string;
  params?: Partial<HeroSketchParams>;
  /** Keep true when the hero is above the fold (it is the LCP image). */
  priority?: boolean;
}) {
  const animate = useSyncExternalStore(
    subscribe,
    () => !window.matchMedia(REDUCED_MOTION).matches,
    () => false, // server: render the still only
  );

  return (
    <div aria-hidden="true" className={cn("pointer-events-none relative overflow-hidden", className)}>
      <Image
        src={still}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-[70%_46%]"
      />
      {animate && <HeroCanvas params={params} />}
    </div>
  );
}
