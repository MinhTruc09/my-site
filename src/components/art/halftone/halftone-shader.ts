/**
 * Hero background, drawn per pixel on the GPU (WebGL2).
 *
 * CURRENT LOOK — "oil" (owner decision, 2026-10-08): a smooth, flowing heat gradient after the
 * ATEEZ *Fever* cover (art/font-chu-va-mau.jpg): a wide horizontal band with wavy edges, a
 * pale-butter core, amber → flame → red, and a thin cobalt fringe, on cream stock. This
 * overrides DESIGN.md's "no gradients / no blur" rule for the hero background only.
 * The type is still knocked out (the oil thins to bare stock around it), the band spreads out
 * from the sun on load, and leans toward the pointer.
 *
 * The notes below describe the earlier two-ink halftone print, kept for reference:
 * Same print as the p5 "Registration Drift" press, but continuous and full-bleed:
 * - cobalt screen at 15°: a slow ink field (diagonal ramp + drifting fbm noise);
 * - signal-red screen at 75°: the sun, breathing, multiplied over the blue (riso overprint);
 * - stock-coloured speed stripes sliding across the sun;
 * - KNOCKOUT: up to 12 rectangles (the hero's type) where both screens shrink to bare stock,
 *   so text never sits on halftone (DESIGN.md › The Readable-Over-Texture Rule);
 * - intro: the screens spread outward from the sun until they cover the whole hero.
 * Every dot samples its tone at its own cell centre, so dots stay round at any size.
 */

export const MAX_RECTS = 12;

export const vertexSource = /* glsl */ `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const fragmentSource = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 uRes;        // canvas size, CSS px
uniform float uDpr;
uniform float uTime;      // seconds
uniform float uIntro;     // 0 → 1, the spread from the sun
uniform vec2 uSun;        // band centre, CSS px (top-left origin) — the name block's centre
uniform float uSunR;      // falloff: how far the hot band bleeds past its box, CSS px
uniform vec2 uHalf;       // half size of the band's hot core box, CSS px
uniform vec3 uPointer;    // xy CSS px, z = 1 when a fine pointer is over the hero
uniform vec4 uRects[${MAX_RECTS}]; // knockout boxes: x, y, w, h (CSS px)
uniform int uRectCount;
uniform vec3 uStock;      // cream
uniform vec3 uBlue;       // cobalt fringe
uniform vec3 uRed;        // signal red
uniform vec3 uFlame;      // orange
uniform vec3 uAmber;      // yellow
uniform vec3 uButter;     // pale core

out vec4 outColor;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { v += a * vnoise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

// 0 inside / near the small type, 1 away from it: the oil thins to stock over ~46px.
float knockout(vec2 p) {
  float k = 1.0;
  for (int i = 0; i < ${MAX_RECTS}; i++) {
    if (i >= uRectCount) break;
    vec4 r = uRects[i];
    float d = sdBox(p - (r.xy + r.zw * 0.5), r.zw * 0.5);
    k *= smoothstep(2.0, 48.0, d);
  }
  return k;
}

// Heat ramp, outside → in: stock, cobalt fringe, red, flame, amber, butter core.
vec3 ramp(float h) {
  vec3 c = uStock;
  c = mix(c, uBlue,   smoothstep(0.0, 0.2, h));
  c = mix(c, uRed,    smoothstep(0.14, 0.42, h));
  c = mix(c, uFlame,  smoothstep(0.38, 0.64, h));
  c = mix(c, uAmber,  smoothstep(0.58, 0.82, h));
  c = mix(c, uButter, smoothstep(0.78, 1.0, h));
  return c;
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y * uDpr - gl_FragCoord.y) / uDpr;
  float t = uTime * 0.09;

  // centre, nudged toward the pointer
  vec2 c = uSun;
  if (uPointer.z > 0.5) c += clamp((uPointer.xy - uSun) * 0.05, vec2(-36.0), vec2(36.0));

  // domain warping: the field flows like oil
  float F = max(uSunR, 1.0);
  vec2 q = p / F;
  vec2 w1 = vec2(fbm(q * 0.55 + vec2(0.0, t)), fbm(q * 0.55 + vec2(5.2, -t)));
  vec2 w2 = vec2(fbm(q * 0.8 + 2.0 * w1 + vec2(1.7, t * 1.3)), fbm(q * 0.8 + 2.0 * w1 + vec2(8.3, -t)));
  vec2 warp = (w2 - 0.5) * F * 0.7;

  // The Fever silhouette: a full-width band behind the name, wavy along its top and bottom.
  vec2 d = p + warp - c;
  float waves = sin(d.x / F * 1.7 + uTime * 0.55) * 0.28 + sin(d.x / F * 3.9 - uTime * 0.4) * 0.12;
  vec2 halfSize = uHalf * vec2(1.0, mix(0.02, 1.0, uIntro));   // the band opens out on load
  float box = sdBox(d - vec2(0.0, waves * F * 0.35), halfSize);

  // core plateau inside the box (pale butter behind the letters), bleeding out over F
  float h = 1.0 - smoothstep(-F * 0.45, F, box);
  // a touch hotter toward the centre-right, redder toward the far left, like the cover
  h *= 0.9 + 0.12 * smoothstep(-uRes.x * 0.5, uRes.x * 0.2, d.x);
  h = clamp(h, 0.0, 1.0);

  // The oil is a thin wash, not solid ink: 45% strength over the stock. At this strength sumi
  // type reads ≥ 6.8:1 on every colour of the ramp, so text simply sits on top — no knockout boxes
  // (owner feedback, 2026-10-08). knockout() stays available for any element that opts in.
  vec3 col = mix(uStock, ramp(h), 0.45 * knockout(p));
  // dither to keep the 8-bit gradient from banding
  col += (hash(p + fract(uTime)) - 0.5) / 255.0;
  outColor = vec4(col, 1.0);
}
`;
