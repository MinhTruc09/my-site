import { PALETTE } from "@/lib/palette";

/**
 * "Saigon, looking up" — an original code print for the Contact stamp (owner request,
 * 2026-10-09), made in the spirit of the moodboard's halftone megastructure poster without
 * using it: towers converge toward the sky, a flyover cuts across, a pale sun sits behind,
 * cables run overhead. The scene is drawn in greys, then re-printed as two halftone screens
 * (cobalt at 15°, navy at 75° for the deep shadows) on cream stock, inside a perforated
 * stamp frame whose holes are cut to transparency.
 */

type Rng = () => number;
function mulberry(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const grey = (t: number) => {
  const v = Math.round(255 * (1 - t));
  return `rgb(${v},${v},${v})`;
};

/** Paint the scene as tone (0 = paper, 1 = full ink) into a greyscale canvas. */
function paintScene(g: CanvasRenderingContext2D, W: number, H: number, rnd: Rng) {
  // sky: darker at the zenith, lighter toward the horizon glow
  const sky = g.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, grey(0.22));
  sky.addColorStop(0.45, grey(0.04));
  sky.addColorStop(1, grey(0.12));
  g.fillStyle = sky;
  g.fillRect(0, 0, W, H);

  // the pale sun, with a soft ring
  const sx = W * 0.5;
  const sy = H * 0.36;
  const sr = W * 0.15;
  const halo = g.createRadialGradient(sx, sy, sr * 0.9, sx, sy, sr * 1.6);
  halo.addColorStop(0, grey(0.02));
  halo.addColorStop(1, grey(0.1));
  g.fillStyle = halo;
  g.beginPath();
  g.arc(sx, sy, sr * 1.6, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = grey(0);
  g.beginPath();
  g.arc(sx, sy, sr, 0, Math.PI * 2);
  g.fill();

  // towers converging toward a vanishing point high above (worm's-eye view)
  const vp = { x: W * 0.5, y: -H * 1.6 };
  const at = (x: number, y: number) => {
    // point on the line from (x, H) toward the vanishing point, at height y
    const t = (H - y) / (H - vp.y);
    return x + (vp.x - x) * t;
  };
  // a canyon of towers framing the sun: two walls left, two right, one short block in front
  const towers = [
    { x0: -W * 0.24, x1: W * 0.1, top: -H * 0.05, side: 1 },
    { x0: W * 0.12, x1: W * 0.26, top: H * 0.2, side: 1 },
    { x0: W * 0.74, x1: W * 0.88, top: H * 0.14, side: -1 },
    { x0: W * 0.9, x1: W * 1.24, top: -H * 0.05, side: -1 },
  ];
  for (const tw of towers) {
    const depth = (tw.x1 - tw.x0) * 0.28;
    const fx0 = tw.x0;
    const fx1 = tw.x1;
    // side face (darker), on the side facing the centre
    const sx0 = tw.side > 0 ? fx1 : fx0 - depth * 0;
    const sx1 = tw.side > 0 ? fx1 + depth : fx0 - depth;
    g.fillStyle = grey(0.92);
    g.beginPath();
    g.moveTo(sx0, H);
    g.lineTo(sx1, H);
    g.lineTo(at(sx1, tw.top), tw.top);
    g.lineTo(at(sx0, tw.top), tw.top);
    g.closePath();
    g.fill();
    // front face
    g.fillStyle = grey(0.64);
    g.beginPath();
    g.moveTo(fx0, H);
    g.lineTo(fx1, H);
    g.lineTo(at(fx1, tw.top), tw.top);
    g.lineTo(at(fx0, tw.top), tw.top);
    g.closePath();
    g.fill();
    // window bands: lighter rows, spacing shrinking with height (perspective)
    g.save();
    g.clip();
    for (let y = H; y > tw.top; ) {
      const step = 10 + (y / H) * 26;
      const lit = rnd() > 0.35;
      g.fillStyle = grey(lit ? 0.18 : 0.46);
      g.fillRect(at(fx0, y) - 2, y - step * 0.45, at(fx1, y) - at(fx0, y) + 4, step * 0.4);
      y -= step;
    }
    g.restore();
    // roof edge
    g.strokeStyle = grey(1);
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(at(fx0, tw.top), tw.top);
    g.lineTo(at(fx1, tw.top), tw.top);
    g.stroke();
  }

  // the flyover: a thick band cutting across, with its lit top edge and piers
  g.save();
  g.translate(0, H * 0.8);
  g.rotate(-0.16);
  g.fillStyle = grey(0.97);
  g.fillRect(-W * 0.2, -H * 0.055, W * 1.5, H * 0.11);
  g.fillStyle = grey(0.1);
  g.fillRect(-W * 0.2, -H * 0.055, W * 1.5, H * 0.012);
  g.fillStyle = grey(0.9);
  for (let x = -W * 0.1; x < W * 1.3; x += W * 0.22) g.fillRect(x, H * 0.055, W * 0.05, H * 0.4);
  g.restore();

  // cables overhead
  g.strokeStyle = grey(0.95);
  for (let i = 0; i < 4; i++) {
    g.lineWidth = 2 + rnd() * 2;
    const y0 = H * (0.05 + rnd() * 0.3);
    const y1 = H * (0.1 + rnd() * 0.35);
    g.beginPath();
    g.moveTo(-10, y0);
    g.quadraticCurveTo(W * 0.5, Math.max(y0, y1) + H * (0.04 + rnd() * 0.06), W + 10, y1);
    g.stroke();
  }
}

/** Print the scene as two halftone screens on stock, framed as a perforated stamp. */
export function drawStamp(out: HTMLCanvasElement, W: number, H: number, seed = 909) {
  const rnd = mulberry(seed);
  const tone = document.createElement("canvas");
  tone.width = W;
  tone.height = H;
  const tg = tone.getContext("2d", { willReadFrequently: true })!;
  paintScene(tg, W, H, rnd);
  const data = tg.getImageData(0, 0, W, H).data;
  const toneAt = (x: number, y: number) => {
    const xi = Math.max(0, Math.min(W - 1, Math.round(x)));
    const yi = Math.max(0, Math.min(H - 1, Math.round(y)));
    return 1 - data[(yi * W + xi) * 4] / 255;
  };

  out.width = W;
  out.height = H;
  const g = out.getContext("2d")!;
  const frame = Math.round(W * 0.06);
  g.fillStyle = PALETTE.cream.hex;
  g.fillRect(0, 0, W, H);

  // the print area inside the stamp frame
  g.save();
  g.beginPath();
  g.rect(frame, frame, W - frame * 2, H - frame * 2);
  g.clip();

  const screen = (angleDeg: number, cell: number, colour: string, map: (t: number) => number) => {
    const a = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const reach = Math.ceil(Math.hypot(W, H) / cell) + 2;
    g.fillStyle = colour;
    for (let j = -reach; j <= reach; j++) {
      for (let i = -reach; i <= reach; i++) {
        const u = i * cell;
        const v = j * cell;
        const x = W / 2 + u * cos - v * sin;
        const y = H / 2 + u * sin + v * cos;
        if (x < frame - cell || y < frame - cell || x > W - frame + cell || y > H - frame + cell) continue;
        const t = map(toneAt(x, y));
        if (t < 0.03) continue;
        g.beginPath();
        g.arc(x, y, 0.5 * cell * Math.sqrt(t) * 1.08, 0, Math.PI * 2);
        g.fill();
      }
    }
  };
  const cell = W / 105;
  screen(15, cell, PALETTE.cobalt.hex, (t) => t);
  screen(75, cell * 1.1, PALETTE["navy-ink"].hex, (t) => Math.max(0, (t - 0.62) / 0.38) * 0.9);
  g.restore();

  // inner keyline
  g.strokeStyle = PALETTE["navy-ink"].hex;
  g.lineWidth = Math.max(2, W * 0.004);
  g.strokeRect(frame, frame, W - frame * 2, H - frame * 2);

  // perforations: holes punched along every edge
  g.globalCompositeOperation = "destination-out";
  const r = frame * 0.32;
  const gap = r * 3.1;
  const holes = (len: number, place: (s: number) => [number, number]) => {
    const n = Math.floor(len / gap);
    const start = (len - (n - 1) * gap) / 2;
    for (let k = 0; k < n; k++) {
      const [x, y] = place(start + k * gap);
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }
  };
  holes(W, (s) => [s, 0]);
  holes(W, (s) => [s, H]);
  holes(H, (s) => [0, s]);
  holes(H, (s) => [W, s]);
  g.globalCompositeOperation = "source-over";
}
