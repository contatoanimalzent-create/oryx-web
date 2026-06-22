import { ArrowRight, Download, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { TiltPhone } from "@/components/ui/TiltPhone";
import { TacticalHero } from "@/components/three/TacticalHero";

export function Hero() {
  return (
    <section className="relative isolate min-h-[92vh] flex items-center pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Cena WebGL 3D — mesa tática viva ao fundo */}
      <TacticalHero className="absolute inset-0 z-0" />

      {/* Overlays pra legibilidade da copy sobre o 3D */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/65 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/50 pointer-events-none" />
      <div className="absolute inset-0 z-[1] tactical-vignette pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Copy column */}
          <div className="hero-copy">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/60 backdrop-blur text-xs font-mono uppercase tracking-widest">
              <span className="status-live">Em operação — sa-east-1</span>
            </div>

            <h1 className="mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.92]">
              Airsoft tático,
              <br />
              <span className="text-[var(--color-brand)]">comando real.</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-[var(--color-text-muted)] max-w-xl leading-relaxed">
              Posição do squad em tempo real. Voz por canais hierárquicos.
              Missões dinâmicas. Marketplace de equipamento usado. Ranking
              nacional.{" "}
              <strong className="text-[var(--color-text)]">
                Tudo num app só.
              </strong>{" "}
              Sempre grátis.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <ButtonLink href="/baixar" variant="primary" size="xl">
                <Download size={18} />
                Baixar pra Android
                <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="#features" variant="outline" size="xl">
                <Play size={16} />
                Ver capacidades
              </ButtonLink>
            </div>

            {/* Trust line */}
            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
              {[
                "Grátis sem propaganda",
                "Funciona offline",
                "Servidores no Brasil",
                "Open beta Android",
              ].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[var(--color-faction-self)]" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Mockup column */}
          <div className="relative mx-auto lg:mx-0 max-w-sm lg:max-w-md w-full">
            <div className="absolute inset-0 -m-8 bg-[var(--color-brand)]/10 rounded-full blur-3xl" />
            <TiltPhone className="relative w-full" />

            <div className="absolute -top-2 -left-4 px-3 py-1.5 rounded-md border border-[var(--color-brand)]/40 bg-[var(--color-bg)]/90 backdrop-blur text-[10px] font-mono uppercase tracking-widest text-[var(--color-brand)] hidden md:block">
              ▲ Squad Alpha · 4 vivos
            </div>
            <div className="absolute -bottom-3 -right-2 px-3 py-1.5 rounded-md border border-[var(--color-faction-self)]/40 bg-[var(--color-bg)]/90 backdrop-blur text-[10px] font-mono uppercase tracking-widest text-[var(--color-faction-self)] hidden md:block">
              ● Ping recebido · 100m W
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[var(--color-text-dim)] scroll-cue">
        <span className="text-[10px] font-mono uppercase tracking-widest">
          Role pra operar
        </span>
        <span className="w-px h-8 bg-gradient-to-b from-[var(--color-brand)] to-transparent" />
      </div>
    </section>
  );
}
