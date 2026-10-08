import type p5 from "p5";

/**
 * "Registration Drift": a two-drum risograph that never stops printing.
 * See PHILOSOPHY.md. Cobalt screen at 15°, signal-red sun at 75°, multiplied
 * where they overlap, cut by stepped speed stripes, advanced in discrete ticks.
 */

export type HeroSketchParams = {
  seed: number;
  /** Halftone cell size in CSS px. */
  cell: number;
  /** Press ticks per second; nothing interpolates between ticks. */
  tickRate: number;
  /** Sun radius as a fraction of min(width, height). */
  sunRadius: number;
  /** Sun center as fractions of width / height. */
  sunX: number;
  sunY: number;
  /** Number of speed stripes cutting the sun. */
  stripes: number;
  /** Ticks between red-drum slips. */
  slipEvery: number;
  /** Max cells the sun leans toward the pointer. */
  lean: number;
  /**
   * Clean stock for type: the screens fade to bare paper before this fraction of the width
   * (clearX) or height (clearY), dots shrinking to nothing, so text never sits on halftone
   * (DESIGN.md › The Readable-Over-Texture Rule). 0 = no clear zone.
   */
  clearX?: number;
  clearY?: number;
};

export const DEFAULT_PARAMS: HeroSketchParams = {
  seed: 909,
  cell: 13,
  tickRate: 12,
  sunRadius: 0.36,
  sunX: 0.7,
  sunY: 0.46,
  stripes: 5,
  slipEvery: 46,
  lean: 2,
};

export type HeroSketchHandle = {
  setRunning: (running: boolean) => void;
  setPointer: (x: number, y: number) => void;
  clearPointer: () => void;
};

type Inks = { stock: string; blue: string; red: string; cut: string };

function readInks(el: Element): Inks {
  const cs = getComputedStyle(el);
  const v = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
  return {
    stock: v("--art-stock", "#fff3e1"),
    blue: v("--art-ink-blue", "#2a4c9e"),
    red: v("--art-ink-red", "#bd1b1f"),
    cut: v("--art-cut", "#fff3e1"),
  };
}

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function createHeroSketch(
  container: HTMLElement,
  params: HeroSketchParams,
  onReady: (handle: HeroSketchHandle) => void,
) {
  return (p: p5) => {
    const P = params;
    let inks: Inks;
    let tick = 0;
    let acc = 0;
    let w = 0;
    let h = 0;

    // Pointer, quantised to the screen grid. null = no pointer on the page.
    let pointer: { x: number; y: number } | null = null;
    // Sun lean, in whole cells, moving at most one cell per tick (a carriage, not a cursor).
    const lean = { x: 0, y: 0 };

    // Per-stripe rhythm, fixed by the seed.
    let stripeRows: { row: number; phase: number; period: number }[] = [];

    const size = () => {
      const r = container.getBoundingClientRect();
      return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
    };

    const seedStripes = () => {
      p.randomSeed(P.seed);
      const rows = Math.round((P.sunRadius * 2 * Math.min(w, h)) / P.cell);
      stripeRows = Array.from({ length: P.stripes }, (_, i) => ({
        // spread across the sun's height, then nudge by a seeded cell offset
        row: Math.round(((i + 0.5) / P.stripes) * rows - rows / 2 + p.random(-1, 1)),
        phase: Math.floor(p.random(0, 24)),
        period: 18 + 6 * Math.floor(p.random(0, 4)),
      }));
    };

    // Area-proportional halftone: dot radius carries sqrt(tone).
    const screen = (
      angleDeg: number,
      offX: number,
      offY: number,
      tone: (x: number, y: number) => number,
    ) => {
      const c = P.cell;
      const a = (angleDeg * Math.PI) / 180;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      const reach = Math.ceil(Math.hypot(w, h) / c) + 2;
      const cx = w / 2;
      const cy = h / 2;
      for (let j = -reach; j <= reach; j++) {
        for (let i = -reach; i <= reach; i++) {
          const u = i * c;
          const v = j * c;
          const x = cx + u * cos - v * sin + offX;
          const y = cy + u * sin + v * cos + offY;
          if (x < -c || y < -c || x > w + c || y > h + c) continue;
          const t = tone(x, y);
          if (t < 0.02) continue;
          const d = c * 1.08 * Math.sqrt(t); // slight dot gain, like real ink
          p.circle(x, y, d);
        }
      }
    };

    const sunCenter = () => ({
      x: w * P.sunX + lean.x * P.cell,
      y: h * P.sunY + lean.y * P.cell,
    });

    // 0 inside the clear zone, 1 past it, with a ~12% band where the dots shrink away.
    const clearMask = (x: number, y: number) => {
      const fx = P.clearX ? smoothstep(P.clearX, P.clearX + 0.12, x / w) : 1;
      const fy = P.clearY ? smoothstep(P.clearY, P.clearY + 0.12, y / h) : 1;
      return fx * fy;
    };

    const drawSheet = () => {
      const T = tick;
      const R = P.sunRadius * Math.min(w, h);
      const sun = sunCenter();
      const field = T * 0.035; // the ink field steps with the press, never between ticks

      p.blendMode(p.BLEND);
      p.background(inks.stock);
      p.noStroke();

      // 1 · Cobalt screen at 15°: diagonal ramp toward bottom-right + breathing ink noise.
      p.fill(inks.blue);
      screen(15, 0, 0, (x, y) => {
        const ramp = (x / w) * 0.55 + (y / h) * 0.45;
        const n = p.noise(x * 0.0022, y * 0.0022, field) - 0.5;
        let t = (0.06 + 0.78 * smoothstep(0.2, 1.05, ramp + n * 0.55)) * clearMask(x, y);
        if (pointer) {
          // a thumb on the paper: the screen lifts slightly around the pointer
          const dp = Math.hypot(x - pointer.x, y - pointer.y);
          t *= 0.55 + 0.45 * smoothstep(0, 140, dp);
        }
        return t;
      });

      // 2 · Red drum at 75°, multiplied over blue. Slips out of register every so often.
      const slipping = T % P.slipEvery < 2;
      p.randomSeed(P.seed + Math.floor(T / P.slipEvery));
      const offX = 2 + (slipping ? Math.round(p.random(-3, 3)) : 0);
      const offY = 1 + (slipping ? Math.round(p.random(-2, 2)) : 0);
      p.blendMode(p.MULTIPLY);
      p.fill(inks.red);
      screen(75, offX, offY, (x, y) => {
        const d = Math.hypot(x - sun.x, y - sun.y);
        const edge = smoothstep(R, R * 0.72, d); // the edge dissolves into dots
        const n = p.noise(x * 0.004 + 40, y * 0.004, field * 0.6);
        return edge * (0.62 + 0.38 * n) * clearMask(x, y);
      });

      // 3 · Speed stripes: stock-coloured cuts through the sun, extending in whole cells.
      p.blendMode(p.BLEND);
      p.fill(inks.cut);
      const c = P.cell;
      for (const s of stripeRows) {
        const y = Math.round((sun.y + s.row * c) / c) * c;
        const k = (T + s.phase) % s.period;
        const half = s.period / 2;
        const extent = k < half ? k / half : (s.period - k) / half; // sawtooth out and back
        const cells = Math.round(extent * ((R * 2.2) / c));
        if (cells <= 0) continue;
        const x0 = Math.round((sun.x - R * 1.1) / c) * c;
        p.rect(x0, y - c * 0.6, cells * c, c * 1.2);
      }
    };

    const advanceLean = () => {
      let tx = 0;
      let ty = 0;
      if (pointer) {
        const sun = { x: w * P.sunX, y: h * P.sunY };
        tx = Math.max(-P.lean, Math.min(P.lean, Math.round((pointer.x - sun.x) / (w * 0.25))));
        ty = Math.max(-P.lean, Math.min(P.lean, Math.round((pointer.y - sun.y) / (h * 0.25))));
      }
      lean.x += Math.sign(tx - lean.x);
      lean.y += Math.sign(ty - lean.y);
    };

    p.setup = () => {
      ({ w, h } = size());
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
      const canvas = p.createCanvas(w, h);
      canvas.elt.setAttribute("aria-hidden", "true");
      canvas.elt.style.display = "block";
      inks = readInks(container);
      p.noiseSeed(P.seed);
      seedStripes();
      drawSheet();

      onReady({
        setRunning: (running) => (running ? p.loop() : p.noLoop()),
        setPointer: (x, y) => {
          pointer = { x: Math.round(x / P.cell) * P.cell, y: Math.round(y / P.cell) * P.cell };
        },
        clearPointer: () => (pointer = null),
      });
    };

    p.draw = () => {
      // Discrete ticks: accumulate real time, print a new sheet only on a tick boundary.
      acc += p.deltaTime;
      const step = 1000 / P.tickRate;
      if (acc < step) return;
      acc %= step;
      tick++;
      advanceLean();
      drawSheet();
    };

    p.windowResized = () => {
      const next = size();
      if (next.w === w && next.h === h) return;
      ({ w, h } = next);
      p.resizeCanvas(w, h);
      seedStripes();
      drawSheet();
    };
  };
}
