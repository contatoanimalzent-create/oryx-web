import { Reveal } from "@/components/motion/Reveal";

/**
 * Modos de operação da plataforma, direto do escopo do sistema (cada modo
 * tem regras e lógica independentes). Guerra Total e Competitivo já
 * aparecem como filtros na lista de operações do app.
 *
 * Escala sem teto: já rodamos operação real com 600 operadores de cada
 * lado, e o próximo passo é maior ainda. Não colocamos número de cima
 * (2 a 8 exércitos, 250v250 etc.) porque isso já foi superado em campo.
 */
const MODES = [
  {
    name: "Guerra Total",
    scale: "Sem limite de operadores",
    desc: "Já rodamos 600 de cada lado numa operação real, e o próximo é maior. Quantos exércitos você quiser, do tamanho que você quiser, de 2h a 24h ou mais.",
    featured: true,
  },
  {
    name: "Competitivo 5x5",
    scale: "Rounds cronometrados",
    desc: "Sistema de rounds com eliminação, scoreboard em tempo real e MVP da partida.",
  },
  {
    name: "Sniper",
    scale: "Precisão pura",
    desc: "Pontuação por eliminação, tempo e precisão.",
  },
  {
    name: "Especial",
    scale: "Modo do organizador",
    desc: "Regras, pontuação e respawn customizados: o organizador desenha o jogo do jeito que quiser.",
  },
];

export function Modes() {
  return (
    <section id="modos" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="tactical-bracket font-mono text-xs uppercase tracking-widest text-[var(--color-brand)]">
            Modos de operação
          </p>
          <h2 className="display-xl mt-4 max-w-3xl text-5xl sm:text-6xl">
            Sua guerra, <span className="volt-mark">sem teto</span>
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODES.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <div
                className={`group flex h-full flex-col rounded-2xl border p-5 transition-colors ${
                  m.featured
                    ? "ink-panel border-transparent"
                    : "holo-panel border-[var(--color-border)] hover:border-[var(--color-brand-dim)]"
                }`}
              >
                <p
                  className={`font-mono text-[11px] uppercase tracking-widest ${
                    m.featured ? "text-[var(--color-volt)]" : "text-[var(--color-brand)]"
                  }`}
                >
                  {m.scale}
                </p>
                <h3
                  className={`font-display mt-3 text-3xl uppercase leading-none ${
                    m.featured ? "text-white" : "text-[var(--color-text)]"
                  }`}
                >
                  {m.name}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    m.featured ? "text-white/65" : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {m.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <ScaleOfPlay />
      </div>
    </section>
  );
}

/**
 * Escala de participação (estrutura real do sistema: Facção → Squad →
 * Operador, ver escopo seção 6-8 e ranking seção 13). O EXÉRCITO é a
 * estrela (é o que dá a sensação de escala: já rodamos 600 de cada lado,
 * sem teto pra crescer). O squad é só a subdivisão tática fixa de 5
 * pessoas dentro dele — uma linha, não o destaque.
 */
function ScaleOfPlay() {
  return (
    <Reveal delay={0.2}>
      <div className="mt-14">
        <p className="text-center font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-dim)]">
          Sem teto pro tamanho do seu exército
        </p>

        <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-ink)] p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-display text-2xl uppercase tracking-wide text-[var(--color-volt)]">
              Exército
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50">
              já testado: 600 de cada lado
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Uma cor, um nome, todo mundo do seu lado na operação. Sem limite
            de operadores — o tamanho é o que a sua operação aguentar.
          </p>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
            <span className="mt-0.5 shrink-0 rounded-full bg-[var(--color-volt)]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-volt)]">
              Squad
            </span>
            <p className="text-sm leading-relaxed text-white/70">
              Dentro do exército, cada squad tem 5 operadores: Líder, Médico,
              Atirador e mais dois na função que a operação pedir.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-[var(--color-text-muted)]">
          Ranking pra cada nível: o seu (individual), o do seu squad, e o do
          seu exército inteiro. Todo mundo aparece em algum ranking.
        </p>
      </div>
    </Reveal>
  );
}
