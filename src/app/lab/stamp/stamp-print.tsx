"use client";

import { useEffect, useRef } from "react";
import { drawStamp } from "@/components/art/stamp/stamp-art";

export function StampPrint() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    drawStamp(ref.current, 900, 1200);
    document.body.setAttribute("data-stamp-ready", "");
  }, []);
  return <canvas ref={ref} className="block h-auto w-[450px]" />;
}
