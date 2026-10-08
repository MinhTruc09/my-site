"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@/lib/palette";
import { PHONE_SCREENS, SCREEN_ASPECT } from "./phone-screens";
import { roundedPanel, roundedSlab } from "./phone-geometry";
import { loadScreenTexture } from "./screen-texture";

/*
 * The hero subject: a phone printed in palette inks. Rounded like the real device
 * (owner decision, 2026-10-08, overriding the 0-radius rule for this object only) but never
 * photoreal: three-step toon (cobalt catch-light on the bevel / navy / sumi shade), a cobalt
 * halftone screen in the shade, and a cream rim line on the silhouette like manga linework.
 * The screen is unlit, so screenshots keep their true colours.
 * Motion is counted, not smooth: one step every TICK ms.
 */

const TICK = 150; // ms per mechanical step
const HOLD_TICKS = 16; // ≈2.4s facing front
const TURN_STEPS = 12; // 12 × 30° = one full turn (≈1.8s); the app swaps at step 6 (back facing)
const BASE_YAW = THREE.MathUtils.degToRad(-14);
const BASE_PITCH = THREE.MathUtils.degToRad(4);
const TILT_STEP = THREE.MathUtils.degToRad(2);
const MAX_YAW = THREE.MathUtils.degToRad(8);
const MAX_PITCH = THREE.MathUtils.degToRad(5);

// Body proportions (units): 9:19.5 screen inside a thin bezel, iPhone-like corner radii.
const BEZEL = 0.036;
const SCREEN_H = 1.42;
const SCREEN_W = SCREEN_H * SCREEN_ASPECT;
const BODY_W = SCREEN_W + BEZEL * 2;
const BODY_H = SCREEN_H + BEZEL * 2;
const BODY_D = 0.09;
const BODY_R = 0.12;
const SCREEN_R = BODY_R - BEZEL * 0.85;

// The body shader writes palette sRGB straight to the (flat, untone-mapped) output: exact inks.
const hex = (k: keyof typeof PALETTE) => new THREE.Color().setStyle(PALETTE[k].hex, THREE.LinearSRGBColorSpace);

const bodyVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const bodyFragment = /* glsl */ `
  uniform vec3 uLit;
  uniform vec3 uShade;
  uniform vec3 uDot;
  uniform vec3 uCatch;
  uniform vec3 uRim;
  uniform vec3 uLight;
  uniform float uCell;
  uniform float uDpr;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 n = normalize(vNormal);
    float ndl = dot(n, normalize(uLight));
    vec3 col = ndl > 0.82 ? uCatch : (ndl > 0.2 ? uLit : uShade);
    // cobalt halftone in the shade: screen-space dots at 15°, area carries the tone
    if (ndl <= 0.2) {
      float tone = clamp((0.2 - ndl) * 1.6, 0.0, 0.85);
      vec2 p = gl_FragCoord.xy / uDpr;
      float a = radians(15.0);
      p = mat2(cos(a), -sin(a), sin(a), cos(a)) * p;
      vec2 c = mod(p, uCell) - 0.5 * uCell;
      float r = 0.5 * uCell * sqrt(tone) * 1.08;
      if (length(c) < r) col = uDot;
    }
    // silhouette line: where the surface turns away from the viewer
    float facing = abs(dot(n, normalize(vView)));
    if (facing < 0.22) col = uRim;
    gl_FragColor = vec4(col, 1.0);
  }
`;

type SceneProps = {
  frozen: boolean;
  running: boolean;
  pointer: React.RefObject<{ x: number; y: number } | null>;
  onShowing: (index: number) => void;
  onReady: () => void;
};

function Phone({ frozen, running, pointer, onShowing, onReady }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const slip = useRef<THREE.Mesh>(null);
  const invalidate = useThree((s) => s.invalidate);
  const dpr = useThree((s) => s.viewport.dpr);
  const [textures, setTextures] = useState<THREE.Texture[] | null>(null);
  const screenMat = useRef<THREE.MeshBasicMaterial>(null);

  const bodyMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: bodyVertex,
        fragmentShader: bodyFragment,
        uniforms: {
          uLit: { value: hex("navy-ink") },
          uShade: { value: hex("sumi") },
          uDot: { value: hex("cobalt") },
          uCatch: { value: hex("cobalt") },
          uRim: { value: hex("cream") },
          uLight: { value: new THREE.Vector3(-0.6, 0.7, 0.9) },
          uCell: { value: 5 },
          // halftone cells are sized in CSS px, so the screen pattern stays 5px on retina
          uDpr: { value: dpr },
        },
      }),
    [dpr],
  );

  const bodyGeo = useMemo(() => roundedSlab(BODY_W, BODY_H, BODY_R, BODY_D, 0.018), []);
  const screenGeo = useMemo(() => roundedPanel(SCREEN_W, SCREEN_H, SCREEN_R), []);
  const islandGeo = useMemo(() => roundedPanel(SCREEN_W * 0.3, 0.07, 0.035), []);
  const bumpGeo = useMemo(() => roundedSlab(0.36, 0.36, 0.08, 0.03, 0.008), []);

  // Mechanical state, advanced only on ticks.
  const state = useRef({ tick: 0, step: -1, index: 0, yaw: 0, pitch: 0, slipTicks: 0 });

  useEffect(() => {
    let alive = true;
    Promise.all(PHONE_SCREENS.map(loadScreenTexture)).then((t) => {
      if (!alive) return;
      setTextures(t);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!textures) return;
    invalidate();
    // let the first frame paint before announcing readiness (seamless swap from the still)
    const id = requestAnimationFrame(() => requestAnimationFrame(onReady));
    return () => cancelAnimationFrame(id);
  }, [textures, invalidate, onReady]);

  // The clock: one step per TICK, nothing in between.
  useEffect(() => {
    if (frozen || !running || !textures) return;
    const id = window.setInterval(() => {
      const s = state.current;
      s.tick++;

      // pointer tilt, one TILT_STEP per tick toward the target
      const p = pointer.current;
      const ty = p ? THREE.MathUtils.clamp(p.x * MAX_YAW, -MAX_YAW, MAX_YAW) : 0;
      const tp = p ? THREE.MathUtils.clamp(-p.y * MAX_PITCH, -MAX_PITCH, MAX_PITCH) : 0;
      s.yaw += Math.abs(ty - s.yaw) < TILT_STEP ? ty - s.yaw : Math.sign(ty - s.yaw) * TILT_STEP;
      s.pitch += Math.abs(tp - s.pitch) < TILT_STEP ? tp - s.pitch : Math.sign(tp - s.pitch) * TILT_STEP;

      // hold → turn (12 steps) → hold
      if (s.step < 0) {
        if (s.tick % HOLD_TICKS === 0) s.step = 0;
      } else {
        s.step++;
        if (s.step === TURN_STEPS / 2) {
          // back faces the viewer: swap to the next app, and slip the red drum for 2 ticks
          s.index = (s.index + 1) % textures.length;
          const mat = screenMat.current;
          if (mat) {
            mat.map = textures[s.index];
            mat.needsUpdate = true;
          }
          s.slipTicks = 2;
          onShowing(s.index);
        }
        if (s.step >= TURN_STEPS) {
          s.step = -1;
          s.tick = 0;
        }
      }
      if (s.slipTicks > 0) s.slipTicks--;
      invalidate();
    }, TICK);
    return () => window.clearInterval(id);
  }, [frozen, running, textures, pointer, onShowing, invalidate]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const s = state.current;
    const turn = s.step < 0 ? 0 : (s.step / TURN_STEPS) * Math.PI * 2;
    g.rotation.set(BASE_PITCH + s.pitch, BASE_YAW + s.yaw + turn, 0);
    if (slip.current) slip.current.visible = s.slipTicks > 0;
  });

  if (!textures) return null;

  return (
    <group ref={group}>
      <mesh geometry={bodyGeo} material={bodyMat} />

      {/* screen (front), rounded to follow the body */}
      <mesh geometry={screenGeo} position={[0, 0, BODY_D / 2 + 0.001]}>
        <meshBasicMaterial ref={screenMat} map={textures[0]} toneMapped={false} />
      </mesh>
      {/* Dynamic Island */}
      <mesh geometry={islandGeo} position={[0, SCREEN_H / 2 - 0.075, BODY_D / 2 + 0.002]}>
        <meshBasicMaterial color={PALETTE.sumi.hex} toneMapped={false} />
      </mesh>
      {/* misregistered red drum, shown for 2 ticks on each app swap */}
      <mesh ref={slip} geometry={screenGeo} position={[0.022, -0.016, BODY_D / 2 + 0.0005]} visible={false}>
        <meshBasicMaterial color={PALETTE["signal-red"].hex} toneMapped={false} />
      </mesh>

      {/* back: rounded camera plateau with two lenses and a flash (1-bit) */}
      <group position={[-BODY_W / 2 + 0.25, BODY_H / 2 - 0.25, -BODY_D / 2 - 0.012]}>
        <mesh geometry={bumpGeo} material={bodyMat} />
        {[
          [-0.075, 0.075],
          [-0.075, -0.075],
        ].map(([x, y]) => (
          <group key={`${y}`} position={[x, y, -0.017]} rotation={[0, Math.PI, 0]}>
            <mesh>
              <circleGeometry args={[0.058, 40]} />
              <meshBasicMaterial color={PALETTE.sumi.hex} toneMapped={false} />
            </mesh>
            <mesh position={[0, 0, 0.001]}>
              <ringGeometry args={[0.03, 0.044, 40]} />
              <meshBasicMaterial color={PALETTE.cream.hex} toneMapped={false} />
            </mesh>
          </group>
        ))}
        <mesh position={[0.085, 0.075, -0.017]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.022, 24]} />
          <meshBasicMaterial color={PALETTE.amber.hex} toneMapped={false} />
        </mesh>
      </group>

      {/* side buttons */}
      <mesh position={[BODY_W / 2 + 0.004, 0.3, 0]}>
        <boxGeometry args={[0.012, 0.26, 0.036]} />
        <meshBasicMaterial color={PALETTE.cobalt.hex} toneMapped={false} />
      </mesh>
      {[0.42, 0.25, 0.08].map((y, i) => (
        <mesh key={y} position={[-BODY_W / 2 - 0.004, y, 0]}>
          <boxGeometry args={[0.012, i === 0 ? 0.08 : 0.14, 0.036]} />
          <meshBasicMaterial color={PALETTE.cobalt.hex} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

type Props = {
  /** Still-capture mode: render the first pose once, keep the drawing buffer. */
  frozen?: boolean;
  /** False when off-screen or the tab is hidden: the clock stops. */
  running?: boolean;
  pointer: React.RefObject<{ x: number; y: number } | null>;
  onShowing?: (index: number) => void;
  onReady?: () => void;
};

export default function PhoneCanvas({ frozen = false, running = true, pointer, onShowing, onReady }: Props) {
  const showing = useRef(onShowing);
  const ready = useRef(onReady);
  useEffect(() => {
    showing.current = onShowing;
    ready.current = onReady;
  });
  const stableShowing = useMemo(() => (i: number) => showing.current?.(i), []);
  const stableReady = useMemo(() => () => ready.current?.(), []);

  return (
    <Canvas
      aria-hidden="true"
      frameloop="demand"
      dpr={[1, 2]}
      flat
      camera={{ fov: 28, position: [0, 0, 4.2], near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: frozen, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Phone frozen={frozen} running={running} pointer={pointer} onShowing={stableShowing} onReady={stableReady} />
    </Canvas>
  );
}
