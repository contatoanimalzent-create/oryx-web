import { Reveal } from "@/components/motion/Reveal";

/**
 * Modos de operação da plataforma, direto do escopo do sistema (cada modo
 * tem regras e lógica independentes). Warfare e Competitivo já aparecem
 * como filtros na lista de operações do app.
 */
const MODES = [
  {
    name: "Warfare",
    scale: "50v50 a 250v250 ou livre",
    desc: "Grande escala: de 2 a 8 exércitos, missões simultâneas e operações de 2h a 24h ou mais. A guerra que dura o evento inteiro.",
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
            Do treino de squad à <span className="volt-mark">guerra total</span>
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
 * Operador, ver escopo seção 6-8 e ranking seção 13). Explicado do jeito
 * mais simples possível, com caixas aninhadas mostrando visualmente que
 * o operador está dentro do squad, que está dentro da facção.
 */
function ScaleOfPlay() {
  return (
    <Reveal delay={0.2}>
      <div className="mt-14">
        <p className="text-center font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-dim)]">
          Você escolhe o tamanho do seu time
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-ink)] p-5 sm:p-7">
          <p className="font-display text-xl uppercase tracking-wide text-[var(--color-volt)]">
            Facção
          </p>
          <p className="mt-1 text-sm text-white/60">
            Seu exército. Uma cor, um nome, todo mundo do seu lado na
            operação.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Squad Alfa", "Squad Bravo"].map((squad) => (
              <div
                key={squad}
                className="rounded-xl border border-white/15 bg-white/[0.04] p-4"
              >
                <p className="font-display text-base uppercase tracking-wide text-white">
                  {squad}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  Seu grupo. Tem líder e um papel pra cada um.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["Líder", "Médico", "Atirador", "Operador"].map((role) => (
                    <span
                      key={role}
                      className="rounded-full bg-[var(--color-volt)]/15 px-2.5 py-1 text-[10px] font-semibold text-[var(--color-volt)]"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-[var(--color-text-muted)]">
          Ranking pra cada nível: o seu (individual), o do seu squad, e o da
          sua facção inteira. Todo mundo aparece em algum ranking.
        </p>
      </div>
    </Reveal>
  );
}
