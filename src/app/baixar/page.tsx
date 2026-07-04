import type { Metadata } from "next";
import { Apple, Play, Check } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Baixar ORYX — iPhone e Android",
  description:
    "Baixe o ORYX na App Store ou no Google Play, crie sua conta com o callsign e entre no próximo jogo.",
  alternates: { canonical: "/baixar" },
};

const PERKS = [
  "Mapa do squad em tempo real",
  "Canais de voz por squad, facção e comando",
  "Missões, zonas e objetivos do organizador",
  "Patentes de Recruta a Marechal",
];

export default function BaixarPage() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 min-h-[80vh]">
      <div className="absolute inset-0 tactical-grid pointer-events-none" />
      <div className="absolute inset-0 tactical-vignette pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
          Nas lojas oficiais
        </p>
        <h1 className="display-xl mt-4 text-5xl md:text-7xl">
          ORYX no <span className="volt-mark">seu bolso</span>
        </h1>
        <p className="mt-8 text-lg text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
          Baixa na sua loja, cria a conta com o callsign e entra no próximo
          jogo. Sem cartão.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* iOS */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl ink-panel p-8 text-left transition-transform hover:-translate-y-0.5"
          >
            <Apple size={28} className="text-white" />
            <h2 className="mt-4 text-2xl font-bold text-white">iPhone</h2>
            <p className="mt-2 text-sm text-white/60">App Store · iOS 15.0+</p>
            <span className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-volt)] text-[var(--color-ink)] h-12 font-semibold">
              <Apple size={18} />
              Baixar na App Store
            </span>
          </a>

          {/* Android */}
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl ink-panel p-8 text-left transition-transform hover:-translate-y-0.5"
          >
            <Play size={26} className="fill-[var(--color-volt)] text-[var(--color-volt)]" />
            <h2 className="mt-4 text-2xl font-bold text-white">Android</h2>
            <p className="mt-2 text-sm text-white/60">Google Play · Android 7.0+</p>
            <span className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-volt)] text-[var(--color-ink)] h-12 font-semibold">
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
