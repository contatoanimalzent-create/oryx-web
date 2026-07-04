import { Reveal } from "@/components/motion/Reveal";

/**
 * A gamificação explicada: hierarquia, papéis e progressão. Seção escura
 * (corte de ritmo). Tudo aqui existe no produto: os cargos e papéis são os
 * que o app mostra no lobby; as dimensões de progressão são do sistema de
 * ranking e reputação.
 */
const CHAIN = [
  {
    role: "Comandante",
    tag: "Cap.",
    desc: "Comanda a operação inteira e o canal de voz de comando.",
  },
  {
    role: "Líder de Pelotão",
    tag: "Sgt.",
    desc: "Coordena os squads da sua facção em campo.",
  },
  {
    role: "Líder de Squad",
    tag: "Cb.",
    desc: "Lidera o time no terreno, missão a missão.",
  },
];

const ROLES = ["Líder", "Médico", "Atirador", "Operador"];

export function Hierarchy() {
  return (
    <section id="hierarquia" className="bg-[var(--color-ink)] py-20 text-[#f4f5ef] lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-volt)]">
            [ Hierarquia e progressão ]
          </p>
          <h2 className="display-xl mt-4 max-w-3xl text-5xl text-white sm:text-6xl">
            Aqui, patente se <span className="volt-mark">conquista</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Toda operação tem cadeia de comando de verdade, igual você vê no
            lobby do app. Seu desempenho vira pontuação, sua pontuação vira
            ranking, e o seu comportamento em campo constrói sua reputação.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {CHAIN.map((c, i) => (
            <Reveal key={c.role} delay={i * 0.08}>
              <div className="edge-glow-top relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[var(--color-volt)] px-2.5 py-1 font-mono text-xs font-bold uppercase text-[var(--color-ink)]">
                    {c.tag}
                  </span>
                  <span className="font-mono text-xs text-white/40">
                    N{3 - i}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-2xl uppercase text-white">
                  {c.role}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {c.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/10 p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-white/50">
              Seu papel no squad
            </p>
            {ROLES.map((r) => (
              <span
                key={r}
                className="font-display text-xl uppercase text-white sm:text-2xl"
              >
                {r}
                <span aria-hidden className="ml-6 text-[var(--color-volt)]">/</span>
              </span>
            ))}
            <p className="w-full pt-2 text-sm text-white/50">
              Cada papel muda o que você faz em campo, do líder que recebe a
              missão ao médico que responde quando alguém marca BAIXA.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
