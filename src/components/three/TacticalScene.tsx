"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const BRAND = "#21f1a8";
const EMBER = "#21f1a8";
const HUD = "#21f1a8";
const ALLY = "#4aa8ff";
const ENEMY = "#ff9a4a";
const SELF = "#21f1a8";
const BG = "#121212";

/* ── Textura de MAPA real desenhada num canvas (ruas, rio, quarteirões) ──
 * É isso que tira o aspecto "planeta no espaço": o chão vira um mapa de
 * verdade vista de cima, estilo GPS tático. */
function useMapTexture() {
  return useMemo(() => {
    const S = 1024;
    const c = document.createElement("canvas");
    c.width = c.height = S;
    const g = c.getContext("2d")!;

    // base de terreno (verde tático, claro o suficiente pra ler como mapa)
    g.fillStyle = "#10231c";
    g.fillRect(0, 0, S, S);

    // manchas de terreno (parques / mata) pra não ficar chapado
    const patches = [
      [180, 240, 150], [780, 200, 120], [320, 760, 170], [840, 820, 140], [560, 480, 110],
    ];
    g.fillStyle = "#0c1b14";
    patches.forEach(([x, y, r]) => {
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    });

    // rio (curva azulada atravessando)
    g.strokeStyle = "#123445";
    g.lineWidth = 34;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(-20, 300);
    g.bezierCurveTo(250, 360, 420, 180, 620, 320);
    g.bezierCurveTo(820, 460, 900, 380, 1060, 460);
    g.stroke();
    g.strokeStyle = "#1b4a5e";
    g.lineWidth = 24;
    g.stroke();

    // quadra / grid de ruas menores (UTM-like)
    g.strokeStyle = "rgba(130,190,175,0.09)";
    g.lineWidth = 1;
    for (let i = 0; i <= S; i += 48) {
      g.beginPath(); g.moveTo(i, 0); g.lineTo(i, S); g.stroke();
      g.beginPath(); g.moveTo(0, i); g.lineTo(S, i); g.stroke();
    }

    // ruas principais (mais claras e grossas)
    const roads = [
      [[60, 120], [980, 200]],
      [[120, 60], [260, 980]],
      [[700, 40], [820, 1000]],
      [[40, 640], [1000, 720]],
      [[40, 860], [980, 900]],
    ];
    g.lineCap = "round";
    roads.forEach((pts) => {
      g.strokeStyle = "#2c4640";
      g.lineWidth = 14;
      g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); g.lineTo(pts[1][0], pts[1][1]); g.stroke();
      g.strokeStyle = "#3d6359";
      g.lineWidth = 8;
      g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); g.lineTo(pts[1][0], pts[1][1]); g.stroke();
    });

    // quarteirões / footprints de construção
    g.fillStyle = "#16271f";
    g.strokeStyle = "rgba(140,200,185,0.10)";
    g.lineWidth = 1;
    let seed = 7;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < 130; i++) {
      const x = rnd() * S;
      const y = rnd() * S;
      const w = 14 + rnd() * 40;
      const h = 14 + rnd() * 40;
      g.fillRect(x, y, w, h);
      g.strokeRect(x, y, w, h);
    }

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/* ── Chão = mapa ─────────────────────────────────────────────────────── */
function MapGround() {
  const tex = useMapTexture();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[34, 34]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

/* ── Construções 3D baixas (estilo Google Maps 3D) ───────────────────── */
function Buildings() {
  const blocks = useMemo(
    () =>
      [
        [-4.5, -2, 1.1, 0.8, 0.5],
        [4, -3, 1.4, 1.0, 0.7],
        [-3, 3.5, 0.9, 0.6, 0.4],
        [3.5, 3, 1.2, 0.9, 0.55],
        [0.5, -5, 1.0, 0.7, 0.45],
        [-6, 1, 0.8, 0.6, 0.35],
        [6.2, 1.5, 1.0, 0.8, 0.5],
        [-1.5, 5.5, 0.9, 0.7, 0.4],
        [2.2, 6, 0.7, 0.6, 0.3],
      ] as const,
    [],
  );
  return (
    <group>
      {blocks.map(([x, z, w, d, h], i) => (
        <mesh key={i} position={[x, h / 2, z]} castShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#13201b" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Marcador "VOCÊ" estilo GPS (chevron + círculo de precisão) ───────── */
function SelfMarker() {
  const accuracy = useRef<THREE.Mesh>(null);
  const accuracyMat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = 1 + Math.sin(t * 1.6) * 0.18;
    if (accuracy.current) accuracy.current.scale.setScalar(s);
    if (accuracyMat.current) accuracyMat.current.opacity = 0.16 - Math.sin(t * 1.6) * 0.06;
  });
  return (
    <group position={[0, 0.02, 0]}>
      {/* círculo de precisão (accuracy radius do GPS) */}
      <mesh ref={accuracy} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial ref={accuracyMat} color={SELF} transparent opacity={0.14} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.55, 1.62, 48]} />
        <meshBasicMaterial color={SELF} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* chevron de direção (igual seta do Google Maps) */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <coneGeometry args={[0.28, 0.55, 3]} />
        <meshStandardMaterial color={SELF} emissive={SELF} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      <pointLight color={SELF} intensity={3} distance={4} position={[0, 0.6, 0]} />
    </group>
  );
}

/* ── Marcador de operador/inimigo = pino chato no mapa (não esfera) ───── */
function Marker({
  color,
  phase,
  radius,
  speed,
  ratio = 1,
}: {
  color: string;
  phase: number;
  radius: number;
  speed: number;
  ratio?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    const x = Math.sin(t) * radius;
    const z = Math.cos(t * ratio) * radius * 0.7;
    if (ref.current) ref.current.position.set(x, 0.04, z);
    if (halo.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3 + phase) * 0.3;
      halo.current.scale.setScalar(s);
    }
  });
  return (
    <group ref={ref}>
      {/* halo no chão */}
      <mesh ref={halo} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.16, 0.26, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      {/* ponto chato (disco), não esfera */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.12, 20]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* haste curtinha pra dar leitura de "pino" sem virar planeta */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ── Objetivo capturável ─────────────────────────────────────────────── */
function Objective({ position, color = BRAND }: { position: [number, number, number]; color?: string }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ring.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
    ring.current.scale.setScalar(s);
    const m = ring.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.18;
  });
  return (
    <group position={position}>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.9, 1.0, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.9, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ── Rota GPS traçada (polyline tracejada do "você" até o objetivo) ───── */
function Route() {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.05, 0),
      new THREE.Vector3(0.8, 0.05, -1.2),
      new THREE.Vector3(0.4, 0.05, -2.6),
      new THREE.Vector3(1.5, 0.05, -3.4),
      new THREE.Vector3(1.5, 0.05, 0.5),
    ]);
    const pts = curve.getPoints(80);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  const mat = useMemo(
    () => new THREE.LineDashedMaterial({ color: HUD, dashSize: 0.18, gapSize: 0.12, transparent: true, opacity: 0.8 }),
    [],
  );
  const line = useMemo(() => {
    const l = new THREE.Line(geo, mat);
    l.computeLineDistances();
    return l;
  }, [geo, mat]);
  return <primitive object={line} />;
}

/* ── Sweep de radar sutil ────────────────────────────────────────────── */
function RadarSweep() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.5;
  });
  return (
    <group ref={ref} position={[0, 0.04, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[8, 48, 0, Math.PI / 3.5]} />
        <meshBasicMaterial color={HUD} transparent opacity={0.05} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── Anéis de range concêntricos ─────────────────────────────────────── */
function RangeRings() {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
      {[2.5, 5, 7.5].map((r) => (
        <mesh key={r}>
          <ringGeometry args={[r - 0.012, r + 0.012, 96]} />
          <meshBasicMaterial color={HUD} transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Câmera ângulo de GPS (mais de cima) com parallax suave ──────────── */
function Rig({ group }: { group: React.RefObject<THREE.Group | null> }) {
  const { camera } = useThree();
  const base = useRef(new THREE.Vector3(0, 9.2, 6.4));
  useFrame((state, delta) => {
    const px = state.pointer.x;
    const py = state.pointer.y;
    const tx = base.current.x + px * 1.6;
    const ty = base.current.y - py * 0.7;
    const k = Math.min(1, delta * 2.5);
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.lookAt(0, -0.4, -0.6);
    if (group.current) group.current.rotation.y += delta * 0.02;
  });
  return null;
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 16, 44]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 12, 4]} intensity={0.5} color={EMBER} castShadow />
      <directionalLight position={[-8, 6, -6]} intensity={0.3} color={HUD} />
      <pointLight position={[10, 6, 6]} intensity={26} distance={30} color={EMBER} />
      <pointLight position={[-10, 5, -4]} intensity={14} distance={28} color={BRAND} />

      <Rig group={group} />

      <group ref={group}>
        <MapGround />
        <Buildings />
        <RangeRings />
        <RadarSweep />
        <Route />

        <Objective position={[1.5, 0, 0.5]} color={BRAND} />
        <Objective position={[-4.2, 0, -2.6]} color={HUD} />

        <SelfMarker />
        <Marker color={ALLY} phase={0.5} radius={3} speed={0.35} ratio={1.3} />
        <Marker color={ALLY} phase={2.1} radius={4} speed={0.28} ratio={0.8} />
        <Marker color={ALLY} phase={4.0} radius={2.4} speed={0.42} ratio={1.6} />
        <Marker color={ENEMY} phase={1.2} radius={5.2} speed={0.22} ratio={1.1} />
        <Marker color={ENEMY} phase={3.6} radius={6} speed={0.18} ratio={0.9} />
      </group>

      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.35} luminanceSmoothing={0.9} mipmapBlur radius={0.6} />
        <Vignette eskil={false} offset={0.28} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export default function TacticalScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      camera={{ position: [0, 9.2, 6.4], fov: 46 }}
    >
      <Scene />
    </Canvas>
  );
}
