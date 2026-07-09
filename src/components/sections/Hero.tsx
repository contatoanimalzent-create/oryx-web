"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { X, MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { flyGlobeHome, type GlobeMarker } from "@/components/ui/wireframe-dotted-globe";
import { COUNTRIES } from "@/lib/countries";

const RotatingEarth = dynamic(
  () => import("@/components/ui/wireframe-dotted-globe"),
  { ssr: false },
);

/**
 * O globo representa alcance mundial: um ponto discreto por país (ver
 * src/lib/countries.ts), mais 3 marcadores em destaque — a base de
 * operações e as duas praças-âncora fora do Brasil.
 */
const FEATURED: GlobeMarker[] = [
  { id: "bsb", label: "Brasília", lng: -47.8828, lat: -15.7939, featured: true },
  { id: "mia", label: "Miami", lng: -80.1918, lat: 25.7617, featured: true },
  { id: "dxb", label: "Dubai", lng: 55.2708, lat: 25.2048, featured: true },
];
const CITIES: GlobeMarker[] = [...FEATURED, ...COUNTRIES];

export function Hero() {
  const [focused, setFocused] = useState<GlobeMarker | null>(null);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-start gap-6 px-6 pb-10 pt-8 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pb-14 lg:pt-12">
        {/* ── Texto ─────────────────────────────────────────────────── */}
        <div className="relative z-10">
          <p className="status-live font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-brand)]">
            Comando tático pro seu airsoft
          </p>

          <h1 className="display-xl mt-5 text-[13vw] sm:text-7xl lg:text-[5.2rem]">
            O mundo é o seu
            <br />
            <span className="volt-mark">campo de jogo</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)] md:text-xl">
            Rádio que falha, mapa de papel, ranking que não existe: fica pra
            trás. No ORYX seu squad aparece no mapa ao vivo por GPS, cada
            missão vale ponto, cada zona se conquista e cada patente se ganha
            em campo.
          </p>

          <StoreButtons className="mt-7" />

          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
            <MapPin className="mr-1.5 inline-block" size={13} />
            Base de operações: Brasília · DF
          </p>
        </div>

        {/* ── Globo ─────────────────────────────────────────────────── */}
        <div className="relative -mx-6 h-[390px] sm:h-[500px] lg:mx-0 lg:h-[600px]">
          <RotatingEarth markers={CITIES} onMarkerFocus={setFocused} />

          <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-dim)]">
            {focused ? "clique fora pra voltar" : "gire o globo · clique num país"}
          </p>

          {/* Card da cidade (aparece no fly-to) */}
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
                  {focused?.id === "bsb"
                    ? "Base de operações"
                    : focused?.featured
                      ? "Praça-âncora"
                      : "Rede ORYX"}
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

              {focused?.id === "bsb" ? (
                <>
                  <div className="relative mx-4 overflow-hidden rounded-lg">
                    <Image
                      src="/screens/oryx_map_wide.webp"
                      alt="Mapa tático do ORYX rodando em Brasília, sobre o Eixo Monumental"
                      width={1010}
                      height={680}
                      unoptimized
                      loading="eager"
                      className="h-32 w-full object-cover object-[center_40%]"
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
                    <Link
                      href="/baixar"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-volt)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
                    >
                      Baixar o ORYX
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </>
              ) : focused?.featured ? (
                <div className="px-4 pb-4 pt-1">
                  <p className="font-display text-2xl uppercase leading-none text-white">
                    {focused.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Próxima praça-âncora da rede ORYX, ao lado de Brasília.
                    Fala com a gente pra levar a primeira operação até lá.
                  </p>
                  <Link
                    href="/organizadores"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-volt)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
                  >
                    Levar o ORYX pra {focused.label}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              ) : (
                <div className="px-4 pb-4 pt-1">
                  <p className="font-display text-2xl uppercase leading-none text-white">
                    {focused?.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Todo país do mapa pode virar a próxima zona ORYX: basta um
                    organizador criar a primeira operação por lá.
                  </p>
                  <Link
                    href="/organizadores"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-volt)] px-4 py-2 text-sm font-semibold text-[var(--color-volt)] transition-colors hover:bg-[var(--color-volt)] hover:text-[var(--color-ink)]"
                  >
                    Levar o ORYX pra {focused?.label}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
