"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-6">
      {/* Card editorial full-bleed com foto real */}
      <div className="relative isolate overflow-hidden rounded-[1.75rem] lg:rounded-[2.25rem] min-h-[82svh] lg:min-h-[86svh] ring-1 ring-white/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]">
        <Image
          src="/hero-operator.jpg"
          alt="Operador de airsoft tático em campo com névoa ao amanhecer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center]"
        />

        {/* Legibilidade: escurece a base e o canto inferior esquerdo (cobre tbm artefato da foto) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(140%_120%_at_0%_100%,rgba(0,0,0,0.92),transparent_58%)]" />

        {/* Barra superior dentro do card: só o contador, estilo editorial */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-end px-6 lg:px-9 pt-6 lg:pt-7">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="font-mono text-[11px] tracking-[0.28em] text-white/70"
          >
            <span className="text-white">01</span> / 04
          </motion.span>
        </div>

        {/* Conteúdo principal: palavra gigante embaixo à esquerda */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 lg:px-9 pb-7 lg:pb-9">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.28em] text-white/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] shadow-[0_0_10px_var(--color-brand)]" />
              Comando &amp; controle
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="display-xl mt-3 text-[3.2rem] leading-[0.86] sm:text-6xl lg:text-[7.25rem] text-white"
            >
              Airsoft tático.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.22 }}
              className="mt-5 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed"
            >
              Você vê o squad inteiro no mapa em tempo real, fala por canais de
              voz e cumpre missão. O comando de campo na palma da mão.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.32 }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <ButtonLink href="/baixar" variant="primary" size="xl">
                Baixar pra iPhone e Android
                <ArrowRight size={18} />
              </ButtonLink>
              <button
                type="button"
                className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-white/90"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/30 backdrop-blur-sm transition group-hover:ring-white/60">
                  <Play size={15} className="translate-x-px fill-white" />
                </span>
                Ver em ação
              </button>
            </motion.div>
          </div>
        </div>

        {/* Card flutuante limpo (igual aos cards de produto das referências) */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.45 }}
          className="absolute right-6 lg:right-9 top-1/2 -translate-y-1/2 z-10 hidden lg:block w-64 rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/20 p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
              Squad Alpha
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
              ao vivo
            </span>
          </div>
          <p className="mt-3 text-3xl font-black tracking-tight text-white">
            4 <span className="text-base font-medium text-white/60">operadores</span>
          </p>
          <div className="mt-4 h-px w-full bg-white/15" />
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-white/70">Objetivo Alpha</span>
            <span className="font-mono text-[var(--color-brand)]">78%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[78%] rounded-full bg-[var(--color-brand)]" />
          </div>
        </motion.div>

        {/* Dots do carrossel */}
        <div className="absolute bottom-7 lg:bottom-9 right-6 lg:right-9 z-10 hidden sm:flex items-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
