import type { Metadata } from "next";
import { ArrowRight, Download, Headphones, MapPin, Target, Trophy } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Para Operadores, Squad GPS, voz e ranking",
  description:
    "ORYX pra quem joga: veja seu squad no mapa em tempo real, fale por canais hierárquicos, suba de patente e dispute ranking nacional. Grátis no Android.",
  alternates: { canonical: "/operadores" },
};

export default function OperadoresPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="absolute inset-0 tactical-grid pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
            Para Operadores
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[0.95] max-w-4xl">
            Toda operação <br />
            <span className="text-[var(--color-brand)]">tem um líder.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[var(--color-text-muted)] leading-relaxed">
            ORYX te dá as ferramentas que comandantes reais usam: posição do
            squad em tempo real, comunicação clara por canal, missões com
            objetivo definido e ranking nacional pra medir progresso.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <ButtonLink href="/baixar" variant="primary" size="xl">
              <Download size={18} />
              Baixar grátis
              <ArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl">
            O que muda no campo
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Item
              icon={MapPin}
              title="Pare de gritar 'Onde você tá?'"
              body="Mapa tático com posição GPS de cada membro do squad atualizando em segundos. Marcadores próprios (ping) pra apontar inimigo, ponto de encontro ou objetivo."
            />
            <Item
              icon={Headphones}
              title="Voz que funciona com luva"
              body="Canais separados pra squad, pelotão e comando. Push-to-talk com botão grande na tela ou always-on. Macros pré-gravados ('Recuar!', 'Cobertura!')."
            />
            <Item
              icon={Target}
              title="Missões com prazo e pontuação"
              body="Organizador cria objetivos geo-fenced que aparecem no seu mapa. Captura, escolta, demolição. Cumpriu = XP + posição no ranking sobe."
            />
            <Item
              icon={Trophy}
              title="Patente que vale algo"
              body="Hierarquia militar real: Soldado → Cabo → Sargento → Tenente. XP por evento. Battle Pass sazonal com patches e cosméticos exclusivos."
            />
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-[var(--color-bg-elevated)]/40 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            Grátis. Sempre.
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
            Não cobramos nada pra você jogar. Receita vem do{" "}
            <strong className="text-[var(--color-text)]">Battle Pass premium</strong>{" "}
            opcional, marketplace de equipamento usado entre operadores
            (taxa só pra vendedor) e loja de cosméticos digitais.
          </p>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/baixar" variant="primary" size="xl">
              <Download size={18} />
              Quero entrar em ação
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
