"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { X, MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { flyGlobeHome, type GlobeMarker } from "@/components/ui/wireframe-dotted-globe";

const RotatingEarth = dynamic(
  () => import("@/components/ui/wireframe-dotted-globe"),
  { ssr: false },
);

/**
 * Cidades no globo. Brasília é a base (destaque, com o mapa real do app);
 * as demais são a rede onde o ORYX quer acender as próximas zonas.
 */
const CITIES: GlobeMarker[] = [
  // Base de operações (destaque)
  { id: "bsb", label: "Brasília", lng: -47.8828, lat: -15.7939, featured: true },
  // Brasil
  { id: "sp", label: "São Paulo", lng: -46.6333, lat: -23.5505 },
  { id: "rio", label: "Rio de Janeiro", lng: -43.1729, lat: -22.9068 },
  { id: "gyn", label: "Goiânia", lng: -49.2648, lat: -16.6869 },
  { id: "rec", label: "Recife", lng: -34.877, lat: -8.0476 },
  { id: "bh", label: "Belo Horizonte", lng: -43.9345, lat: -19.9167 },
  { id: "poa", label: "Porto Alegre", lng: -51.2177, lat: -30.0346 },
  { id: "mao", label: "Manaus", lng: -60.0217, lat: -3.1019 },
  // Américas
  { id: "bsas", label: "Buenos Aires", lng: -58.3816, lat: -34.6037 },
  { id: "scl", label: "Santiago", lng: -70.6693, lat: -33.4489 },
  { id: "bog", label: "Bogotá", lng: -74.0721, lat: 4.711 },
  { id: "mia", label: "Miami", lng: -80.1918, lat: 25.7617 },
  { id: "cdmx", label: "Cidade do México", lng: -99.1332, lat: 19.4326 },
  { id: "nyc", label: "Nova York", lng: -74.006, lat: 40.7128 },
  { id: "yto", label: "Toronto", lng: -79.3832, lat: 43.6532 },
  // Europa
  { id: "lis", label: "Lisboa", lng: -9.1393, lat: 38.7223 },
  { id: "mad", label: "Madri", lng: -3.7038, lat: 40.4168 },
  { id: "lon", label: "Londres", lng: -0.1276, lat: 51.5072 },
  { id: "par", label: "Paris", lng: 2.3522, lat: 48.8566 },
  { id: "ber", label: "Berlim", lng: 13.405, lat: 52.52 },
  { id: "rom", label: "Roma", lng: 12.4964, lat: 41.9028 },
  // África / Oriente Médio
  { id: "lad", label: "Lagos", lng: 3.3792, lat: 6.5244 },
  { id: "cai", label: "Cairo", lng: 31.2357, lat: 30.0444 },
  { id: "jnb", label: "Joanesburgo", lng: 28.0473, lat: -26.2041 },
  { id: "ist", label: "Istambul", lng: 28.9784, lat: 41.0082 },
  { id: "dxb", label: "Dubai", lng: 55.2708, lat: 25.2048 },
  // Ásia / Oceania
  { id: "bom", label: "Mumbai", lng: 72.8777, lat: 19.076 },
  { id: "sin", label: "Singapura", lng: 103.8198, lat: 1.3521 },
  { id: "bkk", label: "Bangkok", lng: 100.5018, lat: 13.7563 },
  { id: "sel", label: "Seul", lng: 126.978, lat: 37.5665 },
  { id: "tyo", label: "Tóquio", lng: 139.6917, lat: 35.6895 },
  { id: "syd", label: "Sydney", lng: 151.2093, lat: -33.8688 },
];

export function Hero() {
  const [focused, setFocused] = useState<GlobeMarker | null>(null);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-6 pb-10 pt-20 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pb-14 lg:pt-28">
        {/* ── Texto ─────────────────────────────────────────────────── */}
        <div className="relative z-10">
          <p className="status-live font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-brand)]">
            Comando e controle pra airsoft tático
          </p>

          <h1 className="display-xl mt-5 text-[13vw] sm:text-7xl lg:text-[5.2rem]">
            O mundo é o seu
            <br />
            <span className="volt-mark">campo de jogo</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)] md:text-xl">
            O ORYX transforma o airsoft em operação de verdade: seu squad no
            mapa ao vivo por GPS, missões pra cumprir, zonas pra dominar e
            patente pra conquistar.
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
            {focused ? "clique fora pra voltar" : "gire o globo · clique numa cidade"}
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
                  {focused?.id === "bsb" ? "Base de operações" : "Rede ORYX"}
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
              ) : (
                <div className="px-4 pb-4 pt-1">
                  <p className="font-display text-2xl uppercase leading-none text-white">
                    {focused?.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Próxima zona da rede ORYX. Toda cidade do mapa pode acender:
                    basta um organizador criar a primeira operação.
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
