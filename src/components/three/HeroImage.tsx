"use client";

/**
 * Hero WebGL de imagem (nivel FOLLOW.ART).
 * A foto do operador NAO e um <img>: e uma textura num plano que cobre a
 * viewport de uma camera ortografica, com shader proprio:
 *  - displacement liquido seguindo o mouse
 *  - chromatic aberration (cresce com velocidade do cursor e scroll)
 *  - grao animado (film grain)
 *  - object-fit: cover calculado no shader, com bias vertical
 *  - breathing/zoom continuo + zoom no scroll
 *  - vinheta + escurecimento pro texto respirar
 *
 * Render so no client (Canvas), montado via dynamic import ssr:false.
 */

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const IMG = "/hero-operator-clean.jpg";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uTex;
  uniform vec2  uRes;
  uniform vec2  uTexRes;
  uniform vec2  uMouse;
  uniform float uMouseVel;
  uniform float uTime;
  uniform float uScroll;

  // object-fit: cover, com bias vertical pra cima (mostra operador + ceu)
  vec2 cover(vec2 uv) {
    float planeA = uRes.x / uRes.y;
    float texA   = uTexRes.x / uTexRes.y;
    vec2 s = planeA > texA
      ? vec2(1.0, texA / planeA)
      : vec2(planeA / texA, 1.0);
    vec2 c = (uv - 0.5) * s + 0.5;
    c.y += (1.0 - s.y) * 0.30;
    return c;
  }

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.56);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = vUv;

    // zoom continuo (breathing) + zoom no scroll
    float zoom = 1.0 + 0.03 * sin(uTime * 0.25) + uScroll * 0.12;
    uv = (uv - 0.5) / zoom + 0.5;

    // displacement liquido em volta do mouse
    float d = distance(uv, uMouse);
    float infl = smoothstep(0.45, 0.0, d);
    vec2 dir = normalize(uv - uMouse + 1e-4);
    float ripple = sin(d * 26.0 - uTime * 3.0);
    uv += dir * infl * ripple * (0.012 + uMouseVel * 0.05);

    // chromatic aberration radial
    vec2 fromC = uv - 0.5;
    float ca = 0.0018 + uMouseVel * 0.014 + uScroll * 0.01;
    vec3 col;
    col.r = texture2D(uTex, cover(uv + fromC * ca)).r;
    col.g = texture2D(uTex, cover(uv)).g;
    col.b = texture2D(uTex, cover(uv - fromC * ca)).b;

    // exposicao + contraste + tint frio sutil
    col *= 1.5;
    col = (col - 0.5) * 1.1 + 0.5;
    col = mix(col, col * vec3(0.93, 1.02, 1.0), 0.2);

    // escurecimento embaixo + esquerda (legibilidade) em espaco de tela
    float bottom = smoothstep(0.0, 0.62, vUv.y);
    float left   = smoothstep(-0.15, 0.78, vUv.x);
    float shade  = mix(0.42, 1.0, min(bottom + 0.28, 1.0)) * mix(0.72, 1.0, left);
    col *= shade;

    // vinheta leve
    float vig = smoothstep(1.4, 0.4, length(vUv - 0.5));
    col *= mix(0.78, 1.0, vig);

    // film grain
    float g = hash(vUv * uRes * 0.5 + fract(uTime) * 100.0);
    col += (g - 0.5) * 0.06;

    // fade no fim do scroll
    col *= 1.0 - uScroll * 0.22;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const tex = useTexture(IMG);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const vel = useRef(0);

  // mouse global (o canvas fica atras do conteudo; listener de janela garante
  // que o efeito siga o cursor no hero inteiro, nao so na area sem texto)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // NoColorSpace = amostra o texel cru (brilho identico ao JPEG, ja que
  // escrevo gl_FragColor direto sem gerencia de cor).
  const uniforms = useMemo(() => {
    tex.colorSpace = THREE.NoColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return {
      uTex: { value: tex },
      uRes: { value: new THREE.Vector2(1, 1) },
      uTexRes: { value: new THREE.Vector2(1480, 1080) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVel: { value: 0 },
      uTime: { value: 0 },
      uScroll: { value: 0 },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tex]);

  useFrame((state, delta) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTex.value = tex;
    u.uRes.value.set(size.width, size.height);

    const prev = mouse.current.clone();
    mouse.current.lerp(target.current, Math.min(1, delta * 4));
    const moved = mouse.current.distanceTo(prev) / Math.max(delta, 0.0001);
    vel.current +=
      (Math.min(moved * 2.2, 1) - vel.current) * Math.min(1, delta * 6);

    u.uMouse.value.copy(mouse.current);
    u.uMouseVel.value = vel.current;
    u.uTime.value = state.clock.elapsedTime;

    const sc =
      typeof window !== "undefined"
        ? Math.min(1, window.scrollY / (window.innerHeight * 0.9))
        : 0;
    u.uScroll.value += (sc - u.uScroll.value) * Math.min(1, delta * 6);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroImage() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      }}
    >
      <Plane />
    </Canvas>
  );
}
