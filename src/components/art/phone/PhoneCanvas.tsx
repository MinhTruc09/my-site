"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { PALETTE } from "@/lib/palette";
import { PHONE_SCREENS, SCREEN_ASPECT } from "./phone-screens";
import { roundedPanel, roundedSlab } from "./phone-geometry";
import { loadScreenTexture } from "./screen-texture";

/*
 * The hero subject: a realistic phone (owner feedback, 2026-10-10: the toon/halftone print
 * read as a flat, blurry blob). Physically based materials lit by a code-built studio
 * environment (no HDR download): a blue-titanium frame with rounded machined edges, frosted
 * navy back glass, a raised glossy camera plateau with metal-ringed lenses, and a front glass
 * whose reflections slide across the screen as it turns. The screen itself is emissive and
 * untone-mapped, so app screens keep their true colours under the glass.
 * Motion is smooth: hold facing front, one eased full turn (the app swaps while the back faces
 * the viewer), a slow float, and a damped tilt toward the pointer.
 */

const HOLD = 3.2; // s facing front
const TURN = 2.4; // s per full turn
const BASE_YAW = THREE.MathUtils.degToRad(-16);
const BASE_PITCH = THREE.MathUtils.degToRad(5);
const MAX_YAW = THREE.MathUtils.degToRad(12);
const MAX_PITCH = THREE.MathUtils.degToRad(7);

// Dimensions (units), outside in: frame → front glass → bezel → 9:19.5 screen.
const SCREEN_H = 1.4;
const SCREEN_W = SCREEN_H * SCREEN_ASPECT;
const BEZEL = 0.024;
const GLASS_W = SCREEN_W + BEZEL * 2;
const GLASS_H = SCREEN_H + BEZEL * 2;
const EDGE = 0.026; // rounded frame edge (bevel)
const BODY_W = GLASS_W + EDGE * 2;
const BODY_H = GLASS_H + EDGE * 2;
const BODY_D = 0.1;
const BODY_R = 0.12;
const GLASS_R = BODY_R - EDGE;
const SCREEN_R = GLASS_R - BEZEL * 0.8;
const FRONT = BODY_D / 2;

const ink = (k: keyof typeof PALETTE) => new THREE.Color(PALETTE[k].hex);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function useMaterials() {
  return useMemo(() => {
    // blue titanium: cobalt lifted toward paper grey so the metal reads under the studio lights
    const titanium = ink("cobalt").lerp(ink("paper-grey"), 0.45);
    return {
      frame: new THREE.MeshPhysicalMaterial({ color: titanium, metalness: 1, roughness: 0.24 }),
      // lens barrels: brighter, polished metal so the camera reads at hero size
      barrel: new THREE.MeshPhysicalMaterial({ color: ink("paper-grey"), metalness: 1, roughness: 0.18 }),
      back: new THREE.MeshPhysicalMaterial({
        color: ink("navy-ink").lerp(ink("cobalt"), 0.6),
        metalness: 0,
        roughness: 0.4,
        clearcoat: 1,
        clearcoatRoughness: 0.45,
      }),
      plateau: new THREE.MeshPhysicalMaterial({
        color: ink("navy-ink").lerp(ink("cobalt"), 0.7),
        metalness: 0,
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
      }),
      glass: new THREE.MeshPhysicalMaterial({ color: "#050506", metalness: 0, roughness: 0.06, clearcoat: 1 }),
      lens: new THREE.MeshPhysicalMaterial({ color: "#020203", metalness: 0.2, roughness: 0, clearcoat: 1 }),
      lensTint: new THREE.MeshPhysicalMaterial({ color: ink("cobalt").multiplyScalar(0.25), metalness: 0.6, roughness: 0.15 }),
      flash: new THREE.MeshPhysicalMaterial({ color: ink("cream"), roughness: 0.35, transmission: 0, clearcoat: 1 }),
      island: new THREE.MeshPhysicalMaterial({ color: "#000000", roughness: 0.15, clearcoat: 1 }),
      port: new THREE.MeshBasicMaterial({ color: "#000000" }),
    };
  }, []);
}

type SceneProps = {
  frozen: boolean;
  pointer: React.RefObject<{ x: number; y: number } | null>;
  onShowing: (index: number) => void;
  onReady: () => void;
};

function Phone({ frozen, pointer, onShowing, onReady }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const screenMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const gl = useThree((s) => s.gl);
  const invalidate = useThree((s) => s.invalidate);
  const [textures, setTextures] = useState<THREE.Texture[] | null>(null);
  const m = useMaterials();

  const bodyGeo = useMemo(() => roundedSlab(BODY_W, BODY_H, BODY_R, BODY_D, EDGE, 10), []);
  const glassGeo = useMemo(() => roundedPanel(GLASS_W, GLASS_H, GLASS_R), []);
  const screenGeo = useMemo(() => roundedPanel(SCREEN_W, SCREEN_H, SCREEN_R), []);
  const islandGeo = useMemo(() => roundedPanel(SCREEN_W * 0.3, 0.075, 0.0375), []);
  const plateauGeo = useMemo(() => roundedSlab(0.36, 0.36, 0.085, 0.022, 0.009, 6), []);

  const state = useRef({ t: 0, turning: false, swapped: false, index: 0, yaw: 0, pitch: 0, clock: 0 });

  useEffect(() => {
    let alive = true;
    const aniso = gl.capabilities.getMaxAnisotropy();
    Promise.all(PHONE_SCREENS.map(loadScreenTexture)).then((list) => {
      if (!alive) return;
      for (const t of list) t.anisotropy = aniso;
      setTextures(list);
    });
    return () => {
      alive = false;
    };
  }, [gl]);

  useEffect(() => {
    if (!textures) return;
    invalidate();
    // let the first frame paint before announcing readiness (seamless swap from the still)
    const id = requestAnimationFrame(() => requestAnimationFrame(onReady));
    return () => cancelAnimationFrame(id);
  }, [textures, invalidate, onReady]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const s = state.current;
    const dt = Math.min(delta, 1 / 20);

    if (!frozen && textures) {
      s.clock += dt;
      s.t += dt;
      if (!s.turning && s.t >= HOLD) {
        s.turning = true;
        s.swapped = false;
        s.t = 0;
      }
      if (s.turning) {
        const p = Math.min(1, s.t / TURN);
        if (!s.swapped && easeInOut(p) >= 0.5) {
          // the back faces the viewer: swap to the next app
          s.swapped = true;
          s.index = (s.index + 1) % textures.length;
          const mat = screenMat.current;
          if (mat) {
            mat.emissiveMap = textures[s.index];
            mat.needsUpdate = true;
          }
          onShowing(s.index);
        }
        if (p >= 1) {
          s.turning = false;
          s.t = 0;
        }
      }

      const ptr = pointer.current;
      const ty = ptr ? THREE.MathUtils.clamp(ptr.x, -1, 1) * MAX_YAW : 0;
      const tp = ptr ? -THREE.MathUtils.clamp(ptr.y, -1, 1) * MAX_PITCH : 0;
      s.yaw = THREE.MathUtils.damp(s.yaw, ty, 3, dt);
      s.pitch = THREE.MathUtils.damp(s.pitch, tp, 3, dt);
    }

    const turn = s.turning ? easeInOut(Math.min(1, s.t / TURN)) * Math.PI * 2 : 0;
    g.rotation.set(BASE_PITCH + s.pitch + Math.sin(s.clock * 0.9) * 0.015, BASE_YAW + s.yaw + turn, Math.sin(s.clock * 0.6) * 0.012);
    g.position.y = Math.sin(s.clock * 0.8) * 0.025;
  });

  if (!textures) return null;

  return (
    <group ref={group}>
      {/* frame: the slab's rounded edge is the visible titanium band */}
      <mesh geometry={bodyGeo} material={m.frame} />

      {/* front: glass, the screen under it, Dynamic Island */}
      <mesh geometry={glassGeo} material={m.glass} position={[0, 0, FRONT + 0.0006]} />
      <mesh geometry={screenGeo} position={[0, 0, FRONT + 0.0012]}>
        <meshPhysicalMaterial
          ref={screenMat}
          color="#000000"
          emissive="#ffffff"
          emissiveMap={textures[0]}
          emissiveIntensity={1}
          roughness={0.1}
          envMapIntensity={0.35}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={islandGeo} material={m.island} position={[0, SCREEN_H / 2 - 0.07, FRONT + 0.002]} />

      {/* back: frosted glass */}
      <mesh geometry={glassGeo} material={m.back} position={[0, 0, -FRONT - 0.0006]} rotation={[0, Math.PI, 0]} />

      {/* camera plateau, top-left as seen from the back */}
      <group position={[BODY_W / 2 - EDGE - 0.2, BODY_H / 2 - EDGE - 0.2, -FRONT - 0.011]}>
        <mesh geometry={plateauGeo} material={m.plateau} />
        {[0.08, -0.08].map((y) => (
          <group key={y} position={[0.075, y, -0.011]}>
            {/* metal barrel */}
            <mesh material={m.barrel} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.008]}>
              <cylinderGeometry args={[0.066, 0.066, 0.018, 48]} />
            </mesh>
            {/* cover glass and the lens element under it */}
            <mesh material={m.lens} rotation={[0, Math.PI, 0]} position={[0, 0, -0.0172]}>
              <circleGeometry args={[0.054, 48]} />
            </mesh>
            <mesh material={m.lensTint} rotation={[0, Math.PI, 0]} position={[0, 0, -0.0175]}>
              <ringGeometry args={[0.018, 0.032, 48]} />
            </mesh>
          </group>
        ))}
        <mesh material={m.flash} rotation={[0, Math.PI, 0]} position={[-0.085, 0.085, -0.0115]}>
          <circleGeometry args={[0.026, 32]} />
        </mesh>
        <mesh material={m.port} rotation={[0, Math.PI, 0]} position={[-0.085, -0.085, -0.0115]}>
          <circleGeometry args={[0.009, 20]} />
        </mesh>
      </group>

      {/* side buttons: action + volume (left), side button (right) */}
      {[
        { x: -1, y: 0.42, h: 0.08 },
        { x: -1, y: 0.26, h: 0.14 },
        { x: -1, y: 0.08, h: 0.14 },
        { x: 1, y: 0.3, h: 0.24 },
      ].map((b) => (
        <RoundedBox
          key={`${b.x}${b.y}`}
          args={[0.016, b.h, 0.03]}
          radius={0.006}
          smoothness={3}
          material={m.frame}
          position={[b.x * (BODY_W / 2 + 0.002), b.y, 0]}
        />
      ))}

      {/* USB-C port on the bottom edge */}
      <RoundedBox args={[0.1, 0.01, 0.032]} radius={0.0045} smoothness={3} material={m.port} position={[0, -BODY_H / 2 + 0.002, 0]} />
    </group>
  );
}

/** A studio built from light cards: a long key strip, a top softbox, warm fills echoing the oil. */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      {/* a dim grey room, so the metal never reflects pure black */}
      <color attach="background" args={["#4a4a52"]} />
      <Lightformer form="rect" intensity={3} position={[-4, 2, 4]} rotation={[0, -Math.PI / 4, 0]} scale={[1.2, 10, 1]} />
      <Lightformer form="rect" intensity={1.6} position={[0, 6, 2]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 4, 1]} />
      <Lightformer form="rect" intensity={1.4} color={PALETTE.amber.hex} position={[5, 0, 2]} rotation={[0, Math.PI / 2.4, 0]} scale={[2, 8, 1]} />
      <Lightformer form="rect" intensity={0.9} color={PALETTE["signal-red"].hex} position={[3, -4, -3]} rotation={[0, Math.PI, 0]} scale={[6, 3, 1]} />
      <Lightformer form="rect" intensity={1.2} color={PALETTE.cream.hex} position={[-3, 1, -5]} rotation={[0, Math.PI, 0]} scale={[4, 8, 1]} />
    </Environment>
  );
}

type Props = {
  /** Still-capture mode: render the first pose once, keep the drawing buffer. */
  frozen?: boolean;
  /** False when off-screen or the tab is hidden: the render loop stops. */
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
      frameloop={frozen ? "demand" : running ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ fov: 26, position: [0, 0, 4.4], near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: frozen, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Studio />
      <Phone frozen={frozen} pointer={pointer} onShowing={stableShowing} onReady={stableReady} />
    </Canvas>
  );
}
