"use client";

import { useEffect, useRef, useState } from "react";
import { PALETTE } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { fragmentSource, MAX_RECTS, vertexSource } from "./halftone-shader";

type Props = {
  /** Elements whose boxes the screens knock out (the hero's type). */
  knockoutSelector?: string;
  /** Element the oil band wraps (the name); falls back to a poster position. */
  sunSelector?: string;
  /** Rendered when WebGL2 is unavailable. */
  fallback?: React.ReactNode;
  className?: string;
};

const REDUCED = "(prefers-reduced-motion: reduce)";
const INTRO_MS = 1600;
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}

/**
 * The hero's printed sky: a full-bleed, continuously moving two-ink halftone (GPU),
 * with the sun behind the phone and the type knocked out to bare stock.
 * Owner decision (2026-10-08): smooth motion for this background, overriding the
 * site's counted/stepped motion rule.
 */
export function HalftoneField({
  knockoutSelector = "[data-knockout]",
  sunSelector = "[data-oil-anchor]",
  fallback,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement!;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      console.warn("HalftoneField: WebGL2 unavailable (disabled or blocked by the browser), using the still.");
      setFailed(true);
      return;
    }

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexSource));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "link");
    } catch (err) {
      // the print fallback takes over; keep the reason visible for debugging
      console.warn("HalftoneField: WebGL program failed, using the still.", err);
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(program, n);
    const U = {
      res: u("uRes"), dpr: u("uDpr"), time: u("uTime"), intro: u("uIntro"),
      sun: u("uSun"), sunR: u("uSunR"), half: u("uHalf"), pointer: u("uPointer"),
      rects: u("uRects"), rectCount: u("uRectCount"),
    };
    gl.uniform3fv(u("uStock"), rgb(PALETTE.cream.hex));
    gl.uniform3fv(u("uBlue"), rgb(PALETTE.cobalt.hex));
    gl.uniform3fv(u("uRed"), rgb(PALETTE["signal-red"].hex));
    gl.uniform3fv(u("uFlame"), rgb(PALETTE.flame.hex));
    gl.uniform3fv(u("uAmber"), rgb(PALETTE.amber.hex));
    // the cover's pale core (#FCF5AF): amber thinned toward cream stock
    gl.uniform3fv(u("uButter"), rgb(PALETTE.amber.hex).map((v, i) => v * 0.25 + rgb(PALETTE.cream.hex)[i] * 0.75));

    // Async callbacks (fonts, resize) can land after cleanup: never draw with a deleted program.
    let alive = true;
    const reduced = window.matchMedia(REDUCED).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    const sunTarget = { x: 0, y: 0, r: 0, hx: 0, hy: 0 };
    const sun = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0, on: 0 };
    const rects = new Float32Array(MAX_RECTS * 4);
    let rectCount = 0;

    // Layout: canvas size, knockout boxes and the sun, all in canvas CSS px.
    const measure = () => {
      const box = host.getBoundingClientRect();
      W = Math.max(1, Math.round(box.width));
      H = Math.max(1, Math.round(box.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);

      rectCount = 0;
      host.parentElement?.querySelectorAll<HTMLElement>(knockoutSelector).forEach((el) => {
        if (rectCount >= MAX_RECTS) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        rects.set([r.left - box.left, r.top - box.top, r.width, r.height], rectCount * 4);
        rectCount++;
      });

      const anchor = host.parentElement?.querySelector<HTMLElement>(sunSelector)?.getBoundingClientRect();
      if (anchor && anchor.width > 0) {
        // band centred on the name block, running the full width; the pale core covers the letters
        sunTarget.r = Math.max(110, Math.min(170, anchor.height * 0.36)); // falloff
        sunTarget.x = W / 2;
        sunTarget.y = anchor.top - box.top + anchor.height / 2;
        sunTarget.hx = W / 2 + sunTarget.r * 2;
        sunTarget.hy = anchor.height / 2 + sunTarget.r * 0.2;
      } else {
        sunTarget.r = 220;
        sunTarget.x = W / 2;
        sunTarget.y = H * 0.4;
        sunTarget.hx = W / 2 + 440;
        sunTarget.hy = H * 0.22;
      }
      if (sun.x === 0 && sun.y === 0) Object.assign(sun, { x: sunTarget.x, y: sunTarget.y });
    };

    const draw = (time: number, intro: number) => {
      if (!alive) return;
      gl.uniform2f(U.res, W, H);
      gl.uniform1f(U.dpr, dpr);
      gl.uniform1f(U.time, time);
      gl.uniform1f(U.intro, intro);
      gl.uniform2f(U.sun, sun.x, sun.y);
      gl.uniform1f(U.sunR, sunTarget.r);
      gl.uniform2f(U.half, sunTarget.hx, sunTarget.hy);
      gl.uniform3f(U.pointer, pointer.x, pointer.y, pointer.on);
      gl.uniform4fv(U.rects, rects);
      gl.uniform1i(U.rectCount, rectCount);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    measure();
    const ro = new ResizeObserver(() => {
      if (!alive) return;
      measure();
      if (reduced) draw(8, 1);
    });
    ro.observe(host);
    host.parentElement?.querySelectorAll(knockoutSelector).forEach((el) => ro.observe(el));
    document.fonts?.ready.then(() => {
      if (!alive) return;
      measure();
      if (reduced) draw(8, 1);
    });

    // Reduced motion: one finished print, no loop.
    if (reduced) {
      draw(8, 1);
      return () => {
        alive = false;
        ro.disconnect();
        gl.deleteBuffer(buf);
        gl.deleteProgram(program);
      };
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = host.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      pointer.on = x >= 0 && y >= 0 && x <= W && y <= H ? 1 : 0;
      pointer.x = x;
      pointer.y = y;
    };
    const onLeave = () => (pointer.on = 0);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let visible = true;
    let start = -1;
    let last = 0;
    let clock = 0;

    const frame = (now: number) => {
      raf = 0;
      if (start < 0) start = now;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      clock += dt;
      // the sun leans gently toward the pointer (≤ 36px), eased
      const lx = pointer.on ? Math.max(-36, Math.min(36, (pointer.x - sunTarget.x) * 0.06)) : 0;
      const ly = pointer.on ? Math.max(-36, Math.min(36, (pointer.y - sunTarget.y) * 0.06)) : 0;
      sun.x += (sunTarget.x + lx - sun.x) * Math.min(1, dt * 3);
      sun.y += (sunTarget.y + ly - sun.y) * Math.min(1, dt * 3);
      draw(clock, easeOutExpo((now - start) / INTRO_MS));
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const resume = () => {
      if (!raf && visible && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      resume();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", resume);
    resume();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      // Free GPU objects but keep the context: React StrictMode remounts on the same canvas,
      // and a lost context there would make the second mount fall back to the print.
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, [knockoutSelector, sunSelector]);

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 bg-cream", className)}>
      {failed ? fallback : <canvas ref={canvasRef} className="block size-full" />}
    </div>
  );
}
