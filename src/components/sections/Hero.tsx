"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { X, MapPin, ArrowUpRight } from "lucide-react";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { WEB_APP_URL } from "@/lib/utils";
import { flyGlobeHome, type GlobeMarker } from "@/components/ui/wireframe-dotted-globe";

const RotatingEarth = dynamic(
  () => import("@/components/ui/wireframe-dotted-globe"),
  { ssr: false },
);

/**
 * Zonas de operação REAIS. Hoje o ORYX roda em Brasília (o mapa tático do
 * app é literalmente o Eixo Monumental). Novas cidades entram aqui quando
 * existirem de verdade.
 */
const OPERATION_ZONES: GlobeMarker[] = [
  { id: "bsb", label: "Brasília", lng: -47.8828, lat: -15.7939 },
];

export function Hero() {
  const [focused, setFocused] = useState<GlobeMarker | null>(null);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-16 pt-28 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pb-24 lg:pt-36">
        {/* ── Texto ─────────────────────────────────────────────────── */}
        <div className="relative z-10">
          <p className="status-live font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-brand)]">
            Comando e controle pra airsoft tático
          </p>

          <h1 className="display-xl mt-6 text-[13vw] sm:text-7xl lg:text-[5.2rem]">
            O mundo é o seu
            <br />
            <span className="volt-mark">campo de jogo</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)] md:text-xl">
            O ORYX transforma o airsoft em operação de verdade: seu squad no
            mapa ao vivo por GPS, missões pra cumprir, zonas pra dominar e
            ranking pra subir.
          </p>

          <StoreButtons className="mt-8" />

          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
            <MapPin className="mr-1.5 inline-block" size={13} />
            Primeira zona de operação: Brasília · DF
          </p>
        </div>

        {/* ── Globo ─────────────────────────────────────────────────── */}
        <div className="relative -mx-6 h-[420px] sm:h-[520px] lg:mx-0 lg:h-[640px]">
          <RotatingEarth markers={OPERATION_ZONES} onMarkerFocus={setFocused} />

          <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-dim)]">
            {focused ? "clique fora pra voltar" : "gire o globo · clique em Brasília"}
          </p>

          {/* Card da zona (aparece no fly-to) */}
          <div
            className={`absolute left-1/2 top-4 w-[92%] max-w-sm -translate-x-1/2 transition-all duration-500 sm:left-auto sm:right-2 sm:translate-x-0 ${
              focused
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-3 opacity-0"
            }`}
          >
            <div className="ink-panel overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between px-4 py-3">
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-volt)]">
                  <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--color-volt)]" />
                  Zona de operação
                </p>
                <button
                  type="button"
                  aria-label="Voltar ao globo"
                  onClick={() =>
                    flyGlobeHome(
                      document.querySelector<HTMLElement>("[data-oryx-globe]"),
                    )
                  }
                  className="rounded-md p-1 text-white/60 transition-colors hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="relative mx-4 overflow-hidden rounded-lg">
                <Image
                  src="/screens/oryx_maps.webp"
                  alt="Mapa tático real do ORYX rodando em Brasília, sobre o Eixo Monumental"
                  width={1400}
                  height={630}
                  unoptimized
                  loading="eager"
                  className="h-32 w-full object-cover object-center"
                />
              </div>

              <div className="px-4 py-4">
                <p className="font-display text-2xl uppercase leading-none text-white">
                  Brasília · DF
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  O mapa tático do ORYX rodando de verdade sobre o Eixo
                  Monumental: squad no mapa, zonas e missões ao vivo.
                </p>
                <a
                  href={WEB_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-volt)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
                >
                  Abrir o app
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
