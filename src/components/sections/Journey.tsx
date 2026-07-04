import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A jornada do operador em 4 passos, clara o bastante pra qualquer pessoa
 * entender. Cada passo usa uma TELA REAL do app (nada de mockup inventado);
 * os textos usam os labels exatos que existem no ORYX hoje.
 */
const STEPS = [
  {
    n: "01",
    title: "Entre na operação",
    body: "Abra a lista de operações e escolha a sua: tem jogo grátis, Competitivo e Warfare. Quando a tag AO VIVO acende, é porque está acontecendo agora.",
    screen: "/screens/oryx_ops.webp",
    alt: "Tela real do ORYX: lista de operações com filtros Todos, Grátis, Competitivo e Warfare, e um evento ao vivo",
  },
  {
    n: "02",
    title: "Monte o squad e assuma seu papel",
    body: "No lobby você vê sua hierarquia (Comandante, Líder de Pelotão, Líder de Squad) e seu papel no time: Líder, Médico, Atirador ou Operador. Aceitou as regras? CHECK-IN GPS e pra dentro.",
    screen: "/screens/oryx_tacs.webp",
    alt: "Tela real do ORYX: lobby da operação com hierarquia, squad com papéis e botão de check-in GPS",
  },
  {
    n: "03",
    title: "Domine o mapa",
    body: "Seu squad aparece no mapa tático ao vivo, por GPS de verdade. Marque CONTATO, reporte BAIXA, chame o MÉDICO e fale no canal de voz do squad sem tirar a mão do equipamento.",
    screen: "/screens/oryx_maps.webp",
    alt: "Tela real do ORYX: mapa tático ao vivo em Brasília com botões de contato, baixa, voz e médico",
    wide: true,
  },
  {
    n: "04",
    title: "Suba no ranking",
    body: "Cada missão vale pontos. O sistema soma seu desempenho por evento e monta o ranking por operador, por squad e por facção, com MVP da partida e histórico acumulado.",
    screen: null,
    alt: "",
  },
] as const;

export function Journey() {
  return (
    <section id="como-funciona" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <p className="tactical-bracket font-mono text-xs uppercase tracking-widest text-[var(--color-brand)]">
            Como funciona
          </p>
          <h2 className="display-xl mt-4 max-w-3xl text-5xl sm:text-6xl">
            Do sofá ao campo em <span className="volt-mark">4 passos</span>
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {STEPS.map((step, i) => (
            <Reveal key={step.n}>
              <div
                className={`grid items-center gap-8 lg:gap-16 ${
                  step.screen && !("wide" in step && step.wide)
                    ? `lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`
                    : ""
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

                {step.screen && ("wide" in step && step.wide ? (
                  <div className="overflow-hidden rounded-2xl border border-[var(--color-border-strong)] shadow-[0_30px_70px_-40px_rgba(21,24,15,0.6)] lg:col-span-1">
                    <Image
                      src={step.screen}
                      alt={step.alt}
                      width={1400}
                      height={630}
                      unoptimized
                      className="w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mx-auto w-full max-w-[300px]">
                    <div className="device">
                      <div className="screen overflow-hidden">
                        <Image
                          src={step.screen}
                          alt={step.alt}
                          width={640}
                          height={1423}
                          unoptimized
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {!step.screen && (
                  <RankingPanel />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Painel do passo 04 (ranking). Não existe screenshot dessa tela ainda,
 * então mostramos as DIMENSÕES reais do sistema de pontuação (escopo do
 * produto), sem inventar placar nem nomes.
 */
function RankingPanel() {
  const rows = [
    ["Pontuação", "por missão e por evento"],
    ["Ranking", "por operador, squad e facção"],
    ["MVP", "destaque da partida nos modos competitivos"],
    ["Histórico", "desempenho acumulado, jogo após jogo"],
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
    </div>
  );
}
