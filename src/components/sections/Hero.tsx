import { ArrowRight, Download, Play } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 tactical-grid pointer-events-none" />
      <div className="absolute inset-0 tactical-vignette pointer-events-none" />

      {/* Top crosshair marker — referência da logo */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none hidden md:block">
        <Crosshair />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/60 backdrop-blur text-xs font-mono uppercase tracking-widest">
            <span className="status-live">Em operação — sa-east-1</span>
          </div>

          <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]">
            Airsoft tático,
            <br />
            <span className="text-[var(--color-brand)]">comando real.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
            Posição em tempo real do seu squad. Comunicação por voz com canais
            hierárquicos. Missões dinâmicas. Ranking nacional. Tudo num único
            app — <strong className="text-[var(--color-text)]">grátis</strong>{" "}
            pra operadores e organizadores.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <ButtonLink href="/baixar" variant="primary" size="xl">
              <Download size={18} />
              Baixar pra Android
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="/operadores" variant="outline" size="xl">
              <Play size={16} />
              Ver como funciona
            </ButtonLink>
          </div>

          {/* Trust line */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
            <span>✓ Grátis sem propaganda</span>
            <span>✓ Open beta Android</span>
            <span>✓ iOS em breve</span>
            <span>✓ Servidores no Brasil</span>
          </div>
        </div>
      </div>

      {/* Bottom fade pra próxima seção */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[var(--color-bg)] pointer-events-none" />
    </section>
  );
}

function Crosshair() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <circle
        cx="110"
        cy="110"
        r="80"
        stroke="var(--color-brand)"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle
        cx="110"
        cy="110"
        r="100"
        stroke="var(--color-brand-dim)"
        strokeWidth="1"
        opacity="0.4"
      />
      <line x1="110" y1="10" x2="110" y2="40" stroke="var(--color-brand)" strokeWidth="2" />
      <line x1="110" y1="180" x2="110" y2="210" stroke="var(--color-brand)" strokeWidth="2" />
      <line x1="10" y1="110" x2="40" y2="110" stroke="var(--color-brand)" strokeWidth="2" />
      <line x1="180" y1="110" x2="210" y2="110" stroke="var(--color-brand)" strokeWidth="2" />
      <circle cx="110" cy="110" r="6" fill="var(--color-brand)" />
    </svg>
  );
}
