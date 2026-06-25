import type { Metadata } from "next";
import { Apple, Play, Check } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Baixar ORYX — iPhone e Android",
  description:
    "O ORYX já está na App Store e no Google Play. Baixe pra iPhone ou Android, crie sua conta com o callsign e entre no próximo jogo.",
  alternates: { canonical: "/baixar" },
};

const PERKS = [
  "Mapa do squad em tempo real",
  "Canais de voz por equipe e esquadrão",
  "Missões, zonas e objetivos do organizador",
  "Replay e debrief depois do jogo",
];

export default function BaixarPage() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 min-h-[80vh]">
      <div className="absolute inset-0 tactical-grid pointer-events-none" />
      <div className="absolute inset-0 tactical-vignette pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
          Disponível agora
        </p>
        <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
          ORYX no <br />
          <span className="text-[var(--color-brand)]">seu bolso.</span>
        </h1>
        <p className="mt-8 text-lg text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
          Já está no ar pra iPhone e Android. Baixa na sua loja, cria a conta com
          o callsign e entra no próximo jogo. Sem cartão.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* iOS, ativo */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 text-left transition-colors hover:border-[var(--color-brand)]/60"
          >
            <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-[var(--color-faction-self)]">
              ● Disponível
            </div>
            <Apple size={28} className="text-[var(--color-text)]" />
            <h2 className="mt-4 text-2xl font-bold">iPhone</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              App Store · iOS 15.0+
            </p>
            <span className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-text)] text-[var(--color-bg)] h-12 font-semibold transition-transform group-hover:-translate-y-0.5">
              <Apple size={18} />
              Baixar na App Store
            </span>
          </a>

          {/* Android, ativo */}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-bg-elevated)] p-8 text-left transition-colors hover:border-[var(--color-brand)]/60"
          >
            <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-[var(--color-faction-self)]">
              ● Disponível
            </div>
            <Play
              size={28}
              className="fill-[var(--color-brand)] text-[var(--color-brand)]"
            />
            <h2 className="mt-4 text-2xl font-bold">Android</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Google Play · Android 7.0+
            </p>
            <span className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] text-[#0c100e] h-12 font-semibold transition-transform group-hover:-translate-y-0.5">
              <Play size={16} className="fill-current" />
              Baixar no Google Play
            </span>
          </a>
        </div>

        <div className="mt-16 pt-10 border-t border-[var(--color-border)] text-left max-w-2xl mx-auto">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-dim)]">
            O que vem no app
          </h3>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {PERKS.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]"
              >
                <Check size={16} className="text-[var(--color-brand)] shrink-0" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
