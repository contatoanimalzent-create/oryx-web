import type { Metadata } from "next";
import { Globe2, Apple, Play, Check, ArrowUpRight } from "lucide-react";
import { WEB_APP_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Acessar o ORYX — jogue agora no navegador",
  description:
    "O ORYX roda agora no navegador, em app.oryxcontrol.com. Crie sua conta, entre no squad e apareça no mapa. Os apps de iOS e Android chegam em breve nas lojas.",
  alternates: { canonical: "/baixar" },
};

const PERKS = [
  "Mapa do squad em tempo real",
  "Canais de voz por squad, facção e comando",
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
          No ar agora
        </p>
        <h1 className="display-xl mt-4 text-5xl md:text-7xl">
          Jogue <span className="volt-mark">agora</span>,<br />
          sem esperar loja
        </h1>
        <p className="mt-8 text-lg text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
          O ORYX roda direto no navegador do seu celular. Cria a conta, entra
          no squad e aparece no mapa. Sem cartão.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Web, ao vivo */}
          <a
            href={WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl ink-panel p-8 text-left transition-transform hover:-translate-y-0.5"
          >
            <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-[var(--color-volt)]">
              ● Ao vivo
            </div>
            <Globe2 size={28} className="text-[var(--color-volt)]" />
            <h2 className="mt-4 text-2xl font-bold text-white">Navegador</h2>
            <p className="mt-2 text-sm text-white/60">
              app.oryxcontrol.com · celular ou desktop
            </p>
            <span className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-volt)] text-[var(--color-ink)] h-12 font-semibold">
              Abrir o ORYX
              <ArrowUpRight size={17} />
            </span>
          </a>

          {/* Lojas, em breve (sem link falso) */}
          <div className="relative rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-8 text-left">
            <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-dim)]">
              ○ Em breve
            </div>
            <span className="flex items-center gap-3">
              <Apple size={26} className="text-[var(--color-text)]" />
              <Play size={22} className="text-[var(--color-text)]" />
            </span>
            <h2 className="mt-4 text-2xl font-bold">iPhone e Android</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Os apps nativos estão a caminho da App Store e do Google Play.
              Enquanto isso, a versão web é a oficial.
            </p>
          </div>
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
