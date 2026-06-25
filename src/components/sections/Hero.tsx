"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;
const WORDS = ["Airsoft", "tático."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Parallax de scroll: cada camada se move numa velocidade -> profundidade.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-42%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-6">
      {/* Card editorial full-bleed com foto real */}
      <div className="relative isolate overflow-hidden rounded-[1.75rem] lg:rounded-[2.25rem] min-h-[82svh] lg:min-h-[86svh] ring-1 ring-white/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]">
        {/* Foto com parallax + zoom lento contínuo (Ken Burns) */}
        <motion.div
          style={{ y: photoY, scale: photoScale }}
          className="absolute inset-0 -z-10"
        >
          <motion.div
            initial={{ scale: 1.04 }}
            animate={{ scale: 1.12 }}
            transition={{
              duration: 18,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
          >
            <Image
              src="/hero-operator-clean.jpg"
              alt="Operador de airsoft tático em campo com névoa ao amanhecer"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[60%_center]"
            />
          </motion.div>
        </motion.div>

        {/* Legibilidade: escurece a base e o canto inferior esquerdo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(140%_120%_at_0%_100%,rgba(0,0,0,0.92),transparent_58%)]" />

        {/* Barra superior dentro do card: só o contador */}
        <motion.div
          style={{ opacity: fade }}
          className="absolute inset-x-0 top-0 z-10 flex items-center justify-end px-6 lg:px-9 pt-6 lg:pt-7"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.05 }}
            className="font-mono text-[11px] tracking-[0.28em] text-white/70"
          >
            <span className="text-white">01</span> / 04
          </motion.span>
        </motion.div>

        {/* Conteúdo principal: palavra gigante embaixo à esquerda */}
        <motion.div
          style={{ y: contentY }}
          className="absolute inset-x-0 bottom-0 z-10 px-6 lg:px-9 pb-7 lg:pb-9"
        >
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.28em] text-white/75"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] shadow-[0_0_10px_var(--color-brand)] animate-pulse" />
              Comando &amp; controle
            </motion.span>

            {/* Headline cinética: palavra por palavra, com clip-mask */}
            <h1 className="display-xl mt-3 text-[3.2rem] leading-[0.86] sm:text-6xl lg:text-[7.25rem] text-white">
              {WORDS.map((w, i) => (
                <span
                  key={w}
                  className="inline-block overflow-hidden align-bottom pr-[0.18em]"
                >
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      ease,
                      delay: 0.12 + i * 0.12,
                    }}
                    className="inline-block"
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="mt-5 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed"
            >
              Você vê o squad inteiro no mapa em tempo real, fala por canais de
              voz e cumpre missão. O comando de campo na palma da mão.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
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
                <span className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/30 backdrop-blur-sm transition group-hover:ring-white/60 group-hover:scale-105">
                  <Play size={15} className="translate-x-px fill-white" />
                </span>
                Ver em ação
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Card flutuante com movimento contínuo + parallax */}
        <motion.div
          style={{ y: cardY }}
          className="absolute right-6 lg:right-9 top-1/2 z-10 hidden lg:block w-64"
        >
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.5 }}
            className="-translate-y-1/2"
          >
            <motion.div
              animate={{ y: [0, -12, 0], rotateZ: [0, -0.6, 0] }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="rounded-2xl bg-white/10 backdrop-blur-xl ring-1 ring-white/20 p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
                  Squad Alpha
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-brand)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] animate-pulse" />
                  ao vivo
                </span>
              </div>
              <p className="mt-3 text-3xl font-black tracking-tight text-white">
                4{" "}
                <span className="text-base font-medium text-white/60">
                  operadores
                </span>
              </p>
              <div className="mt-4 h-px w-full bg-white/15" />
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-white/70">Objetivo Alpha</span>
                <span className="font-mono text-[var(--color-brand)]">78%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.4, ease, delay: 0.9 }}
                  className="h-full rounded-full bg-[var(--color-brand)]"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Dots do carrossel */}
        <motion.div
          style={{ opacity: fade }}
          className="absolute bottom-7 lg:bottom-9 right-6 lg:right-9 z-10 hidden sm:flex items-center gap-2"
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
