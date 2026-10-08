import * as THREE from "three";
import { PALETTE } from "@/lib/palette";
import { SCREEN_ASPECT, type PhoneScreen } from "./phone-screens";

const W = 1080;
const H = Math.round(W / SCREEN_ASPECT); // 2340

type Ctx = CanvasRenderingContext2D & { fontStretch?: string; letterSpacing?: string };

/** Greedy word wrap to a max width. */
function wrap(g: Ctx, text: string, max: number) {
  const lines: string[] = [];
  let line = "";
  for (const w of text.split(" ")) {
    const t = line ? `${line} ${w}` : w;
    if (g.measureText(t).width > max && line) {
      lines.push(line);
      line = w;
    } else line = t;
  }
  lines.push(line);
  return lines;
}

/**
 * Placeholder screen as a mini poster of the app (owner decision, 2026-10-08): cream stock,
 * catalog code, the app name in heavy red type, its stack, a red sun crossing a cobalt
 * halftone slab, a swatch band, and `[ SCREENSHOT PENDING ]`. Honest (no fake app UI) and
 * on-brand. Text only ever sits on stock or on a solid plate.
 */
function placeholderCanvas(screen: PhoneScreen) {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d") as Ctx;
  const P = (k: keyof typeof PALETTE) => PALETTE[k].hex;
  const M = 84; // margin

  g.fillStyle = P("cream");
  g.fillRect(0, 0, W, H);

  // cobalt halftone slab, lower half (dots grow toward the bottom)
  const slabTop = H * 0.52;
  const slabBottom = H - 200;
  const cell = 26;
  const ang = (15 * Math.PI) / 180;
  g.save();
  g.beginPath();
  g.rect(0, slabTop, W, slabBottom - slabTop);
  g.clip();
  g.fillStyle = P("cobalt");
  for (let v = -H; v < H * 2; v += cell) {
    for (let u = -W; u < W * 2; u += cell) {
      const x = u * Math.cos(ang) - v * Math.sin(ang);
      const y = u * Math.sin(ang) + v * Math.cos(ang);
      if (y < slabTop - cell || y > slabBottom + cell || x < -cell || x > W + cell) continue;
      const t = Math.min(0.9, 0.18 + ((y - slabTop) / (slabBottom - slabTop)) * 0.75);
      g.beginPath();
      g.arc(x, y, 0.5 * cell * Math.sqrt(t) * 1.06, 0, Math.PI * 2);
      g.fill();
    }
  }
  g.restore();

  // the red sun, crossing the slab edge (red meets blue), multiplied like ink
  g.save();
  g.globalCompositeOperation = "multiply";
  g.fillStyle = P("signal-red");
  g.beginPath();
  g.arc(W * 0.66, slabTop + 40, 250, 0, Math.PI * 2);
  g.fill();
  g.restore();
  // stripe cuts through the sun
  g.fillStyle = P("cream");
  [-120, -40, 40].forEach((dy, i) => g.fillRect(W * 0.66 - 300, slabTop + 40 + dy, 330 + i * 70, 16));

  // top bar: code tab + platform
  g.textBaseline = "middle";
  g.font = `500 40px "IBM Plex Mono", ui-monospace, monospace`;
  g.letterSpacing = "8px";
  const code = screen.code;
  const codeW = g.measureText(code).width;
  g.fillStyle = P("sumi");
  g.fillRect(M, 150, codeW + 56, 84);
  g.fillStyle = P("cream");
  g.fillText(code, M + 28, 193);
  g.fillStyle = P("cobalt");
  g.textAlign = "right";
  g.fillText(screen.platform.toUpperCase(), W - M, 193);
  g.textAlign = "left";

  // app name: heavy condensed red, stacked
  g.fillStyle = P("signal-red");
  g.letterSpacing = "0px";
  g.fontStretch = "extra-condensed";
  let size = 210;
  g.font = `900 ${size}px "Archivo", sans-serif`;
  let lines = wrap(g, screen.name.toUpperCase(), W - M * 2);
  // shrink until it fits: at most 3 lines, and no single word wider than the screen
  const fits = () => lines.length <= 3 && lines.every((l) => g.measureText(l).width <= W - M * 2);
  while (!fits() && size > 96) {
    size -= 14;
    g.font = `900 ${size}px "Archivo", sans-serif`;
    lines = wrap(g, screen.name.toUpperCase(), W - M * 2);
  }
  g.textBaseline = "alphabetic";
  lines.forEach((l, i) => g.fillText(l, M - 6, 330 + size * 0.86 * (i + 1)));
  g.fontStretch = "normal";

  // stack, mono on stock
  const stackY = 330 + size * 0.86 * lines.length + 90;
  g.fillStyle = P("sumi");
  g.font = `500 34px "IBM Plex Mono", ui-monospace, monospace`;
  g.letterSpacing = "6px";
  screen.stack.forEach((item, i) => g.fillText(`■ ${item.toUpperCase()}`, M, stackY + i * 58));

  // pending label on a sumi plate, above the band
  g.font = `500 32px "IBM Plex Mono", ui-monospace, monospace`;
  g.letterSpacing = "6px";
  const label = "[ SCREENSHOT PENDING ]";
  const lw = g.measureText(label).width;
  g.fillStyle = P("sumi");
  g.fillRect((W - lw) / 2 - 28, slabBottom - 120, lw + 56, 72);
  g.fillStyle = P("amber");
  g.textBaseline = "middle";
  g.fillText(label, (W - lw) / 2, slabBottom - 84);

  // swatch band
  const band = ["cobalt", "navy-ink", "signal-red", "cream", "amber"] as const;
  band.forEach((k, i) => {
    g.fillStyle = P(k);
    g.fillRect((W / band.length) * i, H - 200, W / band.length + 1, 200);
  });

  return c;
}

function configure(t: THREE.Texture) {
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.needsUpdate = true;
  return t;
}

/** Real screenshot (cropped from the top) or the placeholder canvas. */
export async function loadScreenTexture(screen: PhoneScreen): Promise<THREE.Texture> {
  if (screen.src) {
    const tex = await new THREE.TextureLoader().loadAsync(screen.src);
    const img = tex.image as HTMLImageElement;
    // cover-fit the 9:19.5 screen, anchored to the top of the screenshot
    const imgAspect = img.width / img.height;
    if (imgAspect > SCREEN_ASPECT) {
      tex.repeat.set(SCREEN_ASPECT / imgAspect, 1);
      tex.offset.set((1 - tex.repeat.x) / 2, 0);
    } else {
      tex.repeat.set(1, imgAspect / SCREEN_ASPECT);
      tex.offset.set(0, 1 - tex.repeat.y);
    }
    return configure(tex);
  }
  await Promise.all([
    document.fonts.load(`500 40px "IBM Plex Mono"`),
    document.fonts.load(`900 200px "Archivo"`),
  ]).catch(() => undefined);
  return configure(new THREE.CanvasTexture(placeholderCanvas(screen)));
}
