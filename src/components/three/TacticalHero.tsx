"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const TacticalScene = dynamic(() => import("./TacticalScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero WebGL. Como o hero está sempre no topo (visível no load), montamos
 * a cena assim que o cliente confirma que comporta, sem IntersectionObserver
 * (que falhava quando o container ainda media 0px). Reduced-motion, ausência
 * de WebGL ou device muito fraco caem num fundo atmosférico estático.
 */
export function TacticalHero({ className }: { className?: string }) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const lowEnd = mem != null && mem <= 2;

    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }

    if (reduce || lowEnd || !webgl) return;
    setMount(true);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      {mount ? <TacticalScene /> : <div className="h-full w-full tactical-fallback" />}
    </div>
  );
}
