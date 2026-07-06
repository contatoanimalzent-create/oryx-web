import { Reveal } from "@/components/motion/Reveal";
import { IPhoneFrame } from "@/components/ui/IPhoneFrame";
import { ScreenTracking } from "@/components/ui/AppScreens";
import { Satellite, WifiOff, ShieldCheck, Radio } from "lucide-react";

/**
 * Engenharia de campo: os 4 compromissos técnicos reais do produto
 * (onboarding do app + escopo do sistema). É o que separa o ORYX de um
 * app de mapinha.
 */
const TECH = [
  {
    icon: Satellite,
    title: "Tracking em segundo plano",
    desc: "Sua posição e a do seu squad atualizadas no mapa tático, mesmo com a tela bloqueada e o celular no bolso.",
  },
  {
    icon: WifiOff,
    title: "Offline-first",
    desc: "Sinal caiu? O app guarda posições e eventos numa fila local e sincroniza tudo sozinho quando a internet volta.",
  },
  {
    icon: ShieldCheck,
    title: "Anti-cheat de servidor",
    desc: "Velocidade impossível, salto de GPS e inconsistência de localização são detectados e validados no servidor, não no seu celular.",
  },
  {
    icon: Radio,
    title: "Voz integrada",
    desc: "Canal de voz por squad, por facção e de comando, com controle de permissão de áudio pela organização.",
  },
];

export function FieldTech() {
  return (
    <section id="tecnologia" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <Reveal>
              <p className="tactical-bracket font-mono text-xs uppercase tracking-widest text-[var(--color-brand)]">
                Engenharia de campo
              </p>
              <h2 className="display-xl mt-4 max-w-2xl text-5xl sm:text-6xl">
                Feito pra funcionar <span className="volt-mark">no mato</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)]">
                Campo aberto, internet instável, bateria contada. O ORYX foi
                desenhado pra esse cenário, rodando em infraestrutura AWS na
                região de São Paulo.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {TECH.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.06}>
                  <div className="holo-panel h-full rounded-2xl p-6">
                    <t.icon className="text-[var(--color-brand)]" size={22} />
                    <h3 className="mt-3 font-semibold">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {t.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="phone-scene flex justify-center px-8 py-10">
              <IPhoneFrame className="w-full max-w-[260px] rotate-2 transition-transform duration-500 hover:rotate-0">
                <ScreenTracking />
              </IPhoneFrame>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
