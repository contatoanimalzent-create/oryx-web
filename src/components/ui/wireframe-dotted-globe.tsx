"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export interface GlobeMarker {
  id: string;
  label: string;
  lng: number;
  lat: number;
  /** marcador principal (maior, com etiqueta permanente) */
  featured?: boolean;
}

interface RotatingEarthProps {
  markers?: GlobeMarker[];
  onMarkerFocus?: (marker: GlobeMarker | null) => void;
  className?: string;
}

/**
 * Globo wireframe pontilhado do ORYX (base: componente do Walt, d3
 * ortográfico em canvas). Melhorias em cima do original:
 *  - GeoJSON 50m servido local (public/geo/land-50m.json), sem fetch de
 *    terceiro em runtime
 *  - malha de dots mais densa, gerada por amostragem de pixels num canvas
 *    equiretangular offscreen (rápido mesmo com costa 50m)
 *  - dots com atenuação de tamanho/alpha perto do limbo (volume da esfera)
 *  - marcadores de cidade clicáveis com ping e fly-to cinematográfico
 *  - pointer events (touch incluso), DPR, resize, reduced-motion
 */
export default function RotatingEarth({
  markers = [],
  onMarkerFocus,
  className = "",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const onFocusRef = useRef(onMarkerFocus);
  onFocusRef.current = onMarkerFocus;
  const markersRef = useRef(markers);
  markersRef.current = markers;
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let baseRadius = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const projection = d3.geoOrthographic().clipAngle(90);
    const path = d3.geoPath().projection(projection).context(context);
    const graticule = d3.geoGraticule10();

    const INK = "#15180f";
    const PAPER = "#f4f5ef";
    const VOLT = "#c6f221";

    interface Dot {
      lng: number;
      lat: number;
    }
    let dots: Dot[] = [];
    let land: GeoJSON.FeatureCollection | null = null;
    let disposed = false;

    const sizeToWrap = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(rect.width, 10);
      height = Math.max(rect.height, 10);
      baseRadius = (Math.min(width, height) / 2) * 0.86;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const zoom = projection.scale() && baseRadiusPrev
        ? projection.scale() / baseRadiusPrev
        : 1;
      projection.scale(baseRadius * zoom).translate([width / 2, height / 2]);
      baseRadiusPrev = baseRadius;
    };
    let baseRadiusPrev = 0;

    /**
     * Gera os dots de terra amostrando pixels de um canvas equiretangular
     * offscreen. Com costa 50m isso é ordens de grandeza mais rápido que
     * point-in-polygon por célula.
     */
    const generateDots = (fc: GeoJSON.FeatureCollection, stepDeg: number) => {
      const w = 1440;
      const h = 720;
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return [] as Dot[];
      const eq = d3
        .geoEquirectangular()
        .scale(w / (2 * Math.PI))
        .translate([w / 2, h / 2]);
      const eqPath = d3.geoPath().projection(eq).context(octx);
      octx.fillStyle = "#000";
      octx.beginPath();
      eqPath(fc as d3.GeoPermissibleObjects);
      octx.fill();
      const img = octx.getImageData(0, 0, w, h).data;

      const out: Dot[] = [];
      for (let lat = -90 + stepDeg / 2; lat < 90; lat += stepDeg) {
        // compensa a convergência dos meridianos pra densidade visual uniforme
        const lngStep = stepDeg / Math.max(Math.cos((lat * Math.PI) / 180), 0.12);
        for (let lng = -180 + lngStep / 2; lng < 180; lng += lngStep) {
          const p = eq([lng, lat]);
          if (!p) continue;
          const x = Math.round(p[0]);
          const y = Math.round(p[1]);
          if (x < 0 || x >= w || y < 0 || y >= h) continue;
          if (img[(y * w + x) * 4 + 3] > 0) out.push({ lng, lat });
        }
      }
      return out;
    };

    // ── estado de interação/câmera ──────────────────────────────────────
    const rotation: [number, number, number] = [12, -8, 0];
    let zoom = 1;
    let autoRotate = !prefersReduced;
    let rotationSpeed = 0.06; // graus por frame-ms normalizado abaixo
    let focused: GlobeMarker | null = null;
    let hoverMarker: GlobeMarker | null = null;
    let flight: {
      t0: number;
      dur: number;
      fromRot: [number, number, number];
      toRot: [number, number, number];
      fromZoom: number;
      toZoom: number;
      after?: () => void;
    } | null = null;
    let lastTime = 0;

    const centerOf = (): [number, number] => {
      const r = projection.rotate();
      return [-r[0], -r[1]];
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);
      const scale = projection.scale();
      const sf = scale / baseRadius;
      const cx = width / 2;
      const cy = height / 2;
      const center = centerOf();

      // esfera de tinta (o "objeto preto" sobre a página gelo)
      context.beginPath();
      context.arc(cx, cy, scale, 0, 2 * Math.PI);
      context.fillStyle = INK;
      context.fill();

      if (land) {
        // graticule fino
        context.beginPath();
        path(graticule);
        context.strokeStyle = PAPER;
        context.lineWidth = 0.5 * sf;
        context.globalAlpha = 0.22;
        context.stroke();
        context.globalAlpha = 1;

        // contorno das costas
        context.beginPath();
        path(land as d3.GeoPermissibleObjects);
        context.strokeStyle = PAPER;
        context.lineWidth = 0.7 * sf;
        context.globalAlpha = 0.85;
        context.stroke();
        context.globalAlpha = 1;

        // malha halftone dos continentes, com volume no limbo
        context.fillStyle = "#b9bdae";
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          const gd = d3.geoDistance([d.lng, d.lat], center);
          if (gd >= 1.5) continue; // atrás do horizonte
          const p = projection([d.lng, d.lat]);
          if (!p) continue;
          const vol = Math.cos(Math.min(gd, Math.PI / 2)); // 1 no centro, 0 no limbo
          const r = (0.55 + 1.05 * vol) * sf;
          context.globalAlpha = 0.35 + 0.65 * vol;
          context.beginPath();
          context.arc(p[0], p[1], r, 0, 2 * Math.PI);
          context.fill();
        }
        context.globalAlpha = 1;

        // marcadores (cidades da rede)
        for (const m of markersRef.current) {
          const gd = d3.geoDistance([m.lng, m.lat], center);
          if (gd >= Math.PI / 2) continue;
          const p = projection([m.lng, m.lat]);
          if (!p) continue;
          const isHover = hoverMarker?.id === m.id;
          const isFocused = focused?.id === m.id;
          const big = !!m.featured;
          const pulse = (((time + (big ? 0 : 700)) / 1500) % 1 + 1) % 1;

          // anel de ping
          context.beginPath();
          context.arc(p[0], p[1], ((big ? 6 : 3.5) + pulse * (big ? 16 : 10)) * sf, 0, 2 * Math.PI);
          context.strokeStyle = VOLT;
          context.globalAlpha = (1 - pulse) * (big ? 0.9 : 0.55);
          context.lineWidth = (big ? 1.6 : 1.1) * sf;
          context.stroke();
          context.globalAlpha = 1;

          // núcleo
          context.beginPath();
          context.arc(p[0], p[1], ((big ? 5 : 3.2) + (isHover ? 1.5 : 0)) * sf, 0, 2 * Math.PI);
          context.fillStyle = VOLT;
          context.fill();
          if (big) {
            context.beginPath();
            context.arc(p[0], p[1], 2.1 * sf, 0, 2 * Math.PI);
            context.fillStyle = INK;
            context.fill();
          }

          // etiqueta (permanente pro destaque; hover/foco pros demais)
          if (big || isHover || isFocused) {
            const label = m.label.toUpperCase();
            const fpx = (big ? 11 : 10) * Math.min(sf, 1.4);
            context.font = `600 ${fpx}px ui-monospace, SFMono-Regular, Menlo, monospace`;
            const tw = context.measureText(label).width;
            const lx = p[0] + 12 * sf;
            const ly = p[1] - 9 * sf;
            context.fillStyle = big ? VOLT : "rgba(198, 242, 33, 0.92)";
            context.fillRect(lx - 4, ly - fpx - 2, tw + 8, fpx + 6);
            context.fillStyle = INK;
            context.fillText(label, lx, ly);
          }
        }
      }
    };

    const easeInOut = d3.easeCubicInOut;

    const tick = (elapsed: number) => {
      if (disposed) return;
      const dt = lastTime ? Math.min(elapsed - lastTime, 64) : 16;
      lastTime = elapsed;

      if (flight) {
        const k = Math.min((elapsed - flight.t0) / flight.dur, 1);
        const e = easeInOut(k);
        const lerpAngle = (a: number, b: number) => {
          let delta = ((b - a + 540) % 360) - 180;
          return a + delta * e;
        };
        rotation[0] = lerpAngle(flight.fromRot[0], flight.toRot[0]);
        rotation[1] = flight.fromRot[1] + (flight.toRot[1] - flight.fromRot[1]) * e;
        zoom = flight.fromZoom + (flight.toZoom - flight.fromZoom) * e;
        projection.rotate(rotation).scale(baseRadius * zoom);
        if (k >= 1) {
          const after = flight.after;
          flight = null;
          after?.();
        }
      } else if (autoRotate && !focused) {
        rotation[0] += rotationSpeed * dt * 0.06;
        projection.rotate(rotation);
      }

      render(elapsed);
    };

    const timer = d3.timer(tick);

    // ── fly-to ──────────────────────────────────────────────────────────
    const flyTo = (m: GlobeMarker) => {
      focused = m;
      onFocusRef.current?.(m);
      flight = {
        t0: lastTime,
        dur: prefersReduced ? 10 : 1600,
        fromRot: [rotation[0], rotation[1], 0],
        toRot: [-m.lng, -m.lat, 0],
        fromZoom: zoom,
        toZoom: 2.05,
      };
    };

    const flyHome = () => {
      const wasFocused = focused;
      focused = null;
      if (wasFocused) onFocusRef.current?.(null);
      flight = {
        t0: lastTime,
        dur: prefersReduced ? 10 : 1200,
        fromRot: [rotation[0], rotation[1], 0],
        toRot: [rotation[0] + 24, -8, 0],
        fromZoom: zoom,
        toZoom: 1,
      };
    };

    // exposto pro wrapper (botão "voltar ao globo")
    (wrap as HTMLDivElement & { __flyHome?: () => void }).__flyHome = flyHome;

    // ── interação ───────────────────────────────────────────────────────
    const markerAt = (x: number, y: number): GlobeMarker | null => {
      const center = centerOf();
      for (const m of markersRef.current) {
        if (d3.geoDistance([m.lng, m.lat], center) >= Math.PI / 2) continue;
        const p = projection([m.lng, m.lat]);
        if (!p) continue;
        const dx = p[0] - x;
        const dy = p[1] - y;
        if (dx * dx + dy * dy < 20 * 20) return m;
      }
      return null;
    };

    const toLocal = (e: PointerEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top];
    };

    let dragging = false;
    let moved = false;
    let start: [number, number] = [0, 0];
    let startRot: [number, number, number] = [0, 0, 0];

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      start = toLocal(e);
      startRot = [rotation[0], rotation[1], 0];
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const [x, y] = toLocal(e);
      if (dragging && !flight) {
        const dx = x - start[0];
        const dy = y - start[1];
        if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
        if (moved) {
          autoRotate = false;
          const sens = 0.35 / zoom;
          rotation[0] = startRot[0] + dx * sens;
          rotation[1] = Math.max(-90, Math.min(90, startRot[1] - dy * sens));
          projection.rotate(rotation);
        }
      } else {
        const hit = markerAt(x, y);
        hoverMarker = hit;
        canvas.style.cursor = hit ? "pointer" : "grab";
        // desacelera perto do centro (mouse "segura" o globo de leve)
        const cx = width / 2;
        const cy = height / 2;
        const dist = Math.hypot(x - cx, y - cy);
        rotationSpeed = dist < projection.scale() ? 0.025 : 0.06;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (!moved) {
        const hit = markerAt(...toLocal(e));
        if (hit) {
          if (focused?.id === hit.id) flyHome();
          else flyTo(hit);
        } else if (focused) {
          flyHome();
        }
      } else {
        window.setTimeout(() => {
          if (!focused) autoRotate = !prefersReduced;
        }, 1400);
      }
    };

    const onPointerLeave = () => {
      hoverMarker = null;
      rotationSpeed = 0.06;
      if (!focused && !dragging) autoRotate = !prefersReduced;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const ro = new ResizeObserver(() => {
      sizeToWrap();
    });
    ro.observe(wrap);
    sizeToWrap();

    fetch("/geo/land-50m.json")
      .then((r) => {
        if (!r.ok) throw new Error("land geojson não carregou");
        return r.json();
      })
      .then((fc: GeoJSON.FeatureCollection) => {
        if (disposed) return;
        land = fc;
        dots = generateDots(fc, 1.05);
        setReady(true);
      })
      .catch(() => setError("Falha ao carregar o mapa do globo"));

    return () => {
      disposed = true;
      timer.stop();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <p className="text-sm text-[var(--color-text-muted)]">{error}</p>
      </div>
    );
  }

  return (
    <div ref={wrapRef} data-oryx-globe className={`relative h-full w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none select-none"
        style={{ cursor: "grab", opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}
        aria-label="Globo com as zonas de operação do ORYX. Clique em Brasília pra aproximar."
        role="img"
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-40 w-40 animate-pulse rounded-full border border-[var(--color-border-strong)]" />
        </div>
      )}
    </div>
  );
}

/** Dispara o fly-home do globo a partir de fora (botão "voltar"). */
export function flyGlobeHome(wrapEl: HTMLElement | null) {
  const el = wrapEl as (HTMLElement & { __flyHome?: () => void }) | null;
  el?.__flyHome?.();
}
