import type { Metadata } from "next";
import { ArrowRight, Calendar, ShieldCheck, BarChart3, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Para Organizadores, Produza operações táticas como profissional",
  description:
    "Dashboard de comando ao vivo, criação de missões em minutos, anti-cheat automático e marketplace de divulgação. Sem custo nenhum.",
  alternates: { canonical: "/organizadores" },
};

export default function OrganizadoresPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="absolute inset-0 tactical-grid pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
            Para Organizadores
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[0.95] max-w-4xl">
            Produza operações <br />
            <span className="text-[var(--color-brand)]">como profissional.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[var(--color-text-muted)] leading-relaxed">
            ORYX te dá o painel que estúdios de milsim usam: criar evento em
            minutos, mapa de comando ao vivo com cada operador, missões com
            briefing visual, anti-cheat automático e divulgação direta pro
            público.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <ButtonLink href="mailto:contato@oryxcontrol.com?subject=Quero%20organizar%20com%20ORYX" variant="primary" size="xl">
              Falar com a gente
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="/eventos" variant="outline" size="xl">
              Ver eventos hoje
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl">
            Tudo que produzir uma operação séria precisa
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Item
              icon={Calendar}
              title="Criação de evento em minutos"
              body="Setup completo (mapa, briefing, regras, lotes de ingresso, atribuição de squads) em menos de 30min. Modelos prontos pra CQB, Warfare e Sniper-only."
            />
            <Item
              icon={Users}
              title="Comando ao vivo do dashboard"
              body="Veja todos os operadores no mapa, em qual zona estão, quantos vivos por squad, missões em andamento. WebSocket realtime, sem refresh, sem delay."
            />
            <Item
              icon={ShieldCheck}
              title="Anti-cheat automático"
              body="Detecção de GPS fake, mock location, emulador, velocidade impossível. Suspeitos aparecem no seu dashboard com evidência, você decide banir."
            />
            <Item
              icon={BarChart3}
              title="AAR + estatísticas pós-evento"
              body="Replay 2D top-down da partida, MVP automático, clipes de momentos chave, ranking final. Compartilhe com seus participantes pra retenção."
            />
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[var(--color-bg-elevated)]/40 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            Zero custo. Zero risco.
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
            Você não paga nada pra usar a plataforma. Pagamentos de ingresso
            quando você vender pelo ORYX têm taxa padrão de gateway (Stripe/PIX).
            Sem mensalidade, sem fidelidade, sem letra miúda.
          </p>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="mailto:contato@oryxcontrol.com?subject=Quero%20organizar%20com%20ORYX" variant="primary" size="xl">
              Começar onboarding
              <ArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function Item({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  body: string;
}) {
  return (
    <article>
      <div className="w-10 h-10 rounded-md bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/30 flex items-center justify-center text-[var(--color-brand)]">
        <Icon size={18} />
      </div>
      <h3 className="mt-4 text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-base text-[var(--color-text-muted)] leading-relaxed">
        {body}
      </p>
    </article>
  );
}
