import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, Check } from "lucide-react";

/**
 * Seção do organizador (o segundo público). As capacidades listadas são as
 * do painel de comando real: eventos, facções, squads, missões, zonas,
 * mapa em tempo real com filtros, alertas automáticos e replay.
 */
const PANEL = [
  "Crie a operação: evento, facções, squads e área de jogo",
  "Desenhe missões e zonas direto no mapa (captura, defesa, checkpoint)",
  "Veja todo mundo em tempo real, com filtro por facção, squad e status",
  "Alertas automáticos de inatividade e perda de sinal",
  "Replay completo do evento pra debrief e transmissão",
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
              Você no <span className="volt-mark">comando</span> de tudo
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Enquanto os operadores jogam, o organizador enxerga a operação
              inteira no painel de comando: cada squad no mapa, cada missão,
              cada zona contestada.
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
