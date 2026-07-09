import { Reveal } from "@/components/motion/Reveal";
import { IPhoneFrame } from "@/components/ui/IPhoneFrame";
import { ScreenOps, ScreenLobby, ScreenTrackingWide } from "@/components/ui/AppScreens";

/**
 * A jornada do operador em 4 passos. As telas são recriações fiéis das
 * telas reais do app (mesmos títulos, filtros, hierarquia, papéis e
 * botões), apresentadas vivas num iPhone de marketing; o passo 03 usa o
 * screenshot real do mapa tático em Brasília.
 */
const STEPS = [
  {
    n: "01",
    title: "Escolha sua operação",
    body: "Abra a lista e escolha: tem jogo grátis, Competitivo, Warfare. A tag AO VIVO acende quando tá rolando agora, na hora.",
    screen: "ops",
  },
  {
    n: "02",
    title: "Assuma seu posto",
    body: "No lobby aparece sua hierarquia (Comandante, Líder de Pelotão, Líder de Squad) e você escolhe seu papel: Líder, Médico, Atirador ou Operador. Aceitou as regras? CHECK-IN GPS e pra dentro.",
    screen: "lobby",
  },
  {
    n: "03",
    title: "Domine o mapa",
    body: "Seu squad aparece no mapa tático ao vivo, por GPS de verdade. Marque CONTATO, reporte BAIXA, chame o MÉDICO e fale no canal de voz do squad sem tirar a mão do equipamento.",
    screen: "map",
  },
  {
    n: "04",
    title: "Suba de patente",
    body: "Cada missão vale pontos, e ponto vira patente na tabela oficial: são 18 níveis, de Recruta a Marechal. No caminho, ranking por operador, squad e facção, com MVP da partida.",
    screen: "ranking",
  },
] as const;

export function Journey() {
  return (
    <section id="como-funciona" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="tactical-bracket font-mono text-xs uppercase tracking-widest text-[var(--color-brand)]">
            Como funciona
          </p>
          <h2 className="display-xl mt-4 max-w-3xl text-5xl sm:text-6xl">
            Do sofá ao campo em <span className="volt-mark">4 passos</span>
          </h2>
        </Reveal>

        <div className="mt-10 space-y-12 lg:space-y-16">
          {STEPS.map((step, i) => (
            <Reveal key={step.n}>
              <div
                className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-12 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <p className="font-display text-7xl font-bold text-[var(--color-volt)] [-webkit-text-stroke:2px_var(--color-ink)] sm:text-8xl">
                    {step.n}
                  </p>
                  <h3 className="display-xl mt-2 text-3xl sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)]">
                    {step.body}
                  </p>
                </div>

                <StepVisual screen={step.screen} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepVisual({ screen }: { screen: (typeof STEPS)[number]["screen"] }) {
  if (screen === "map") {
    return (
      <div className="phone-scene p-4 sm:p-6">
        <div className="overflow-hidden rounded-2xl shadow-[0_30px_70px_-40px_rgba(21,24,15,0.6)]">
          <ScreenTrackingWide />
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-white/40">
          Mapa tático ao vivo · Eixo Monumental, Brasília
        </p>
      </div>
    );
  }

  if (screen === "ranking") {
    return <RankingPanel />;
  }

  return (
    <div className="phone-scene flex justify-center px-8 py-8 sm:py-10">
      <IPhoneFrame className="w-full max-w-[270px] -rotate-2 transition-transform duration-500 hover:rotate-0">
        {screen === "ops" ? <ScreenOps /> : <ScreenLobby />}
      </IPhoneFrame>
    </div>
  );
}

/**
 * Painel do passo 04 (progressão). Dimensões reais do sistema de
 * pontuação, sem placar inventado.
 */
function RankingPanel() {
  const rows = [
    ["Pontuação", "por missão e por evento"],
    ["Patente", "18 níveis, de Recruta a Marechal"],
    ["Ranking", "por operador, squad e facção"],
    ["MVP", "destaque da partida nos modos competitivos"],
  ];
  return (
    <div className="ink-panel rounded-2xl p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-volt)]">
        Sistema de pontuação
      </p>
      <div className="mt-4 divide-y divide-white/10">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-6 py-3">
            <span className="font-display text-xl uppercase text-white">{k}</span>
            <span className="text-right text-sm text-white/60">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="app-live-bar h-full w-2/3 rounded-full bg-[var(--color-volt)]" />
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
        progressão pra próxima patente
      </p>
    </div>
  );
}
