import { Reveal } from "@/components/motion/Reveal";

/**
 * Vitrine de PATENTES: a tabela oficial do ORYX (18 níveis, de Recruta a
 * Marechal), direto do documento de progressão. Pontuação e tempo mínimo
 * são os valores reais do sistema.
 */
type Rank = { name: string; pts: number; time: string };

const PRACAS: Rank[] = [
  { name: "Recruta", pts: 0, time: "imediato" },
  { name: "Soldado", pts: 1_500, time: "1 semana" },
  { name: "Cabo", pts: 6_000, time: "1 mês" },
  { name: "3º Sargento", pts: 18_000, time: "2 meses" },
  { name: "2º Sargento", pts: 42_000, time: "4 meses" },
  { name: "1º Sargento", pts: 85_000, time: "6 meses" },
  { name: "Subtenente", pts: 155_000, time: "9 meses" },
];

const OFICIAIS: Rank[] = [
  { name: "Aspirante a Oficial", pts: 260_000, time: "1 ano" },
  { name: "2º Tenente", pts: 410_000, time: "1,5 ano" },
  { name: "1º Tenente", pts: 610_000, time: "2 anos" },
  { name: "Capitão", pts: 880_000, time: "2,5 anos" },
  { name: "Major", pts: 1_230_000, time: "3 anos" },
  { name: "Tenente-Coronel", pts: 1_680_000, time: "3,5 anos" },
  { name: "Coronel", pts: 2_250_000, time: "4 anos" },
];

const GENERAIS: Rank[] = [
  { name: "General de Brigada", pts: 3_000_000, time: "4,3 anos" },
  { name: "General de Divisão", pts: 4_000_000, time: "4,6 anos" },
  { name: "General de Exército", pts: 5_300_000, time: "4,8 anos" },
  { name: "Marechal", pts: 7_000_000, time: "5 anos" },
];

const fmt = (n: number) => n.toLocaleString("pt-BR");

export function Hierarchy() {
  return (
    <section id="patentes" className="bg-[var(--color-ink)] py-20 text-[#f4f5ef] lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-volt)]">
            [ Patentes ]
          </p>
          <h2 className="display-xl mt-4 max-w-4xl text-5xl text-white sm:text-6xl">
            De recruta a <span className="volt-mark">marechal</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Cada ponto que você faz em campo conta pra tabela oficial de
            patentes do ORYX. São 18 níveis: o Recruta nasce no dia do
            cadastro; o Marechal leva anos de operação e 7 milhões de pontos.
            Não tem atalho, tem campo.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <Stat value="18" label="patentes" />
            <Stat value="7.000.000" label="pontos até Marechal" />
            <Stat value="0" label="pontos pra começar" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <RankColumn title="Praças" ranks={PRACAS} delay={0} />
          <RankColumn title="Oficiais" ranks={OFICIAIS} delay={0.08} />
          <RankColumn title="Generalato" ranks={GENERAIS} delay={0.16} highlightLast />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl uppercase text-[var(--color-volt)] sm:text-5xl">
        {value}
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-white/50">
        {label}
      </p>
    </div>
  );
}

function RankColumn({
  title,
  ranks,
  delay,
  highlightLast,
}: {
  title: string;
  ranks: Rank[];
  delay: number;
  highlightLast?: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <div className="edge-glow-top h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-white/50">
          {title}
        </p>
        <ul className="mt-3 divide-y divide-white/[0.07]">
          {ranks.map((r, i) => {
            const isTop = highlightLast && i === ranks.length - 1;
            return (
              <li
                key={r.name}
                className={`flex items-baseline justify-between gap-3 py-2.5 ${
                  isTop ? "-mx-3 mt-2 rounded-xl bg-[var(--color-volt)] px-3" : ""
                }`}
              >
                <span
                  className={`font-display text-lg uppercase leading-tight ${
                    isTop ? "text-[var(--color-ink)]" : "text-white"
                  }`}
                >
                  {r.name}
                </span>
                <span
                  className={`whitespace-nowrap text-right font-mono text-[11px] ${
                    isTop ? "text-[var(--color-ink)]/80" : "text-white/45"
                  }`}
                >
                  {fmt(r.pts)} pts · {r.time}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}
