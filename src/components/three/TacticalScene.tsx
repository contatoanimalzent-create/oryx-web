"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";

const BRAND = "#c8202c";
const ALLY = "#2962ff";
const ENEMY = "#f59e0b";
const SELF = "#00e676";

/* ── Um blip que percorre uma trajetória Lissajous no plano ──────────── */
function Blip({
  color,
  phase,
  radius,
  speed,
  ratio = 1,
  size = 0.13,
}: {
  color: string;
  phase: number;
  radius: number;
  speed: number;
  ratio?: number;
  size?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const trail = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    const x = Math.sin(t) * radius;
    const z = Math.cos(t * ratio) * radius * 0.7;
    if (ref.current) {
      ref.current.position.set(x, 0.12, z);
    }
    if (trail.current) {
      // pulso do halo
      const s = 1 + Math.sin(state.clock.elapsedTime * 3 + phase) * 0.25;
      trail.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={ref}>
      <mesh ref={trail} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 1.6, size * 2.4, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
      <pointLight color={color} intensity={2} distance={2.5} />
    </group>
  );
}

/* ── Objetivo capturável: anel duplo pulsante ───────────────────────── */
function Objective({ position }: { position: [number, number, number] }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ring.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
    ring.current.scale.setScalar(s);
    const m = ring.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });
  return (
    <group position={position}>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.4, 1.55, 48]} />
        <meshBasicMaterial color={BRAND} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[1.4, 48]} />
        <meshBasicMaterial color={BRAND} transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color={BRAND} intensity={6} distance={6} position={[0, 1, 0]} />
    </group>
  );
}

/* ── Cobertura / terreno low-poly (cilindros escuros) ───────────────── */
function Terrain() {
  const blocks = useMemo(
    () =>
      [
        [-4.5, 0.4, -2, 1.1, 0.8],
        [4, 0.5, -3, 1.4, 1.0],
        [-3, 0.3, 3.5, 0.9, 0.6],
        [3.5, 0.45, 3, 1.2, 0.9],
        [0.5, 0.35, -5, 1.0, 0.7],
        [-6, 0.3, 1, 0.8, 0.6],
      ] as const,
    [],
  );
  return (
    <group>
      {blocks.map(([x, y, z, r, h], i) => (
        <mesh key={i} position={[x, y * h, z]}>
          <cylinderGeometry args={[r, r * 1.15, h, 6]} />
          <meshStandardMaterial color="#161b18" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Câmera com parallax suave seguindo o ponteiro ──────────────────── */
function Rig({ group }: { group: React.RefObject<THREE.Group | null> }) {
  const { camera } = useThree();
  const base = useRef(new THREE.Vector3(0, 5.4, 8.2));
  useFrame((state, delta) => {
    const px = state.pointer.x;
    const py = state.pointer.y;
    const tx = base.current.x + px * 1.8;
    const ty = base.current.y - py * 0.7;
    camera.position.x += (tx - camera.position.x) * Math.min(1, delta * 2.5);
    camera.position.y += (ty - camera.position.y) * Math.min(1, delta * 2.5);
    camera.lookAt(0, -1.4, -0.5);
    if (group.current) {
      group.current.rotation.y += delta * 0.04; // deriva lenta
    }
  });
  return null;
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  return (
    <>
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 20, 52]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />

      <Rig group={group} />

      <group ref={group}>
        <Grid
          args={[40, 40]}
          cellSize={0.6}
          cellThickness={0.7}
          cellColor="#2b3a31"
          sectionSize={3}
          sectionThickness={1.4}
          sectionColor={BRAND}
          fadeDistance={55}
          fadeStrength={1}
          infiniteGrid
          position={[0, 0, 0]}
        />

        <Terrain />
        <Objective position={[1.5, 0, 0.5]} />

        {/* self */}
        <Blip color={SELF} phase={0} radius={0} speed={0} size={0.2} />
        {/* squad */}
        <Blip color={ALLY} phase={0.5} radius={3} speed={0.35} ratio={1.3} />
        <Blip color={ALLY} phase={2.1} radius={4} speed={0.28} ratio={0.8} />
        <Blip color={ALLY} phase={4.0} radius={2.4} speed={0.42} ratio={1.6} />
        {/* inimigos */}
        <Blip color={ENEMY} phase={1.2} radius={5.2} speed={0.22} ratio={1.1} size={0.11} />
        <Blip color={ENEMY} phase={3.6} radius={6} speed={0.18} ratio={0.9} size={0.11} />
      </group>
    </>
  );
}

export default function TacticalScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      camera={{ position: [0, 5.4, 8.2], fov: 46 }}
    >
      <Scene />
    </Canvas>
  );
}
