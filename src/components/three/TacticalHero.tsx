"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const TacticalScene = dynamic(() => import("./TacticalScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Carrega a cena WebGL só quando o hero entra em viewport e só se o
 * device/usuário comporta. Caso contrário mostra um fundo estático
 * elegante (gradiente tático) — zero custo, sem flash de tela preta.
 */
export function TacticalHero({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // heurística simples de capacidade: memória do device + largura
    const lowEnd =
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory != null &&
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 4;
    if (reduce || lowEnd) return;

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {mount ? (
        <TacticalScene />
      ) : (
        <div className="h-full w-full tactical-fallback" />
      )}
    </div>
  );
}
