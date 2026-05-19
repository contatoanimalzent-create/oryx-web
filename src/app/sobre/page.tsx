import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre o ORYX — Comando e controle de airsoft no Brasil",
  description:
    "Construído por quem joga airsoft tático há mais de uma década. ORYX é uma plataforma da Animalz Group, sediada em Brasília.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24">
        <div className="absolute inset-0 tactical-grid pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
            Sobre
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
            Construído por quem <br />
            <span className="text-[var(--color-brand)]">joga.</span>
          </h1>
          <div className="mt-10 prose prose-invert max-w-none">
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
              ORYX nasceu da nossa frustração jogando airsoft tático sem
              ferramentas decentes. Rádio com bateria fraca. Mapa de papel
              molhado. Squad espalhado sem coordenação. Eliminações na base do
              &quot;eu jurei&quot;. Briefing sem padrão. Ranking? Inexistente.
            </p>
            <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Aí decidimos construir o que a gente queria usar.
            </p>
            <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
              ORYX é desenvolvido pela <strong className="text-[var(--color-text)]">Animalz Group</strong>{" "}
              em Brasília. A primeira versão saiu em 2026 e roda sobre AWS
              em São Paulo, com a mesma stack que apps de delivery e mobilidade
              brasileiros usam — porque infraestrutura é o que faz GPS
              funcionar sem travar quando 100 operadores tão no campo.
            </p>
            <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Não cobramos de operador. Não cobramos de organizador. Receita
              vem do Battle Pass premium, da loja de cosméticos e da taxa
              do marketplace de equipamento usado entre operadores. Modelo
              que cresce com o tamanho da comunidade, não com a sua mensalidade.
            </p>
          </div>

          <div className="mt-10 inline-flex items-center gap-2 text-sm text-[var(--color-text-dim)]">
            <MapPin size={14} />
            Brasília, DF · Operando em sa-east-1 (São Paulo)
          </div>

          <div className="mt-10">
            <ButtonLink href="/baixar" variant="primary" size="lg">
              Baixar o app
              <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
