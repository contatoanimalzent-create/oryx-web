import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, Check } from "lucide-react";

/**
 * Seção do organizador (o segundo público). As capacidades listadas são as
 * do painel de comando real: eventos, facções, squads, missões, zonas,
 * mapa em tempo real com filtros, alertas automáticos e replay.
 */
const PANEL = [
  "Custo do evento: gratuito, pago, com doação ou misto",
  "Exércitos do seu jeito: 2 a 8, cores e nomes livres",
  "Tamanho e duração: de 50v50 a 250v250 ou livre, de 2h a 24h+",
  "Missões e zonas direto no mapa, próprias ou da biblioteca",
  "Pontuação e respawn: padrão ORYX ou regras customizadas",
  "Tempo real com filtros, alertas automáticos e replay pra debrief",
];

export function Organizer() {
  return (
    <section id="organizadores" className="bg-[var(--color-ink)] py-20 text-[#f4f5ef] lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-volt)]">
              [ Pra quem organiza ]
            </p>
            <h2 className="display-xl mt-4 text-5xl text-white sm:text-6xl">
              O organizador <span className="volt-mark">decide tudo</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Cada evento é do jeito que o organizador quiser, e o painel de
              comando mostra a operação inteira ao vivo: cada squad no mapa,
              cada missão, cada zona contestada.
            </p>
            <Link
              href="/organizadores"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--color-volt)] px-6 py-3.5 font-semibold text-[var(--color-ink)] transition-transform hover:-translate-y-0.5"
            >
              Quero organizar uma operação
              <ArrowRight size={17} />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-3">
              {PANEL.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4"
                >
                  <Check className="mt-0.5 shrink-0 text-[var(--color-volt)]" size={18} />
                  <span className="text-sm leading-relaxed text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
