import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Download } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ALL_POSTS } from "@/lib/blog";

const POST = ALL_POSTS.find((p) => p.slug === "melhor-app-airsoft-tatico-2026")!;

export const metadata: Metadata = {
  title: POST.title,
  description: POST.excerpt,
  alternates: { canonical: `/blog/${POST.slug}` },
  keywords: POST.keywords,
  openGraph: {
    title: POST.title,
    description: POST.excerpt,
    type: "article",
    publishedTime: POST.publishedAt,
  },
};

export default function Post() {
  return (
    <article className="relative pt-32 pb-24 lg:pt-44 mx-auto max-w-3xl px-6 lg:px-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-brand)]"
      >
        <ArrowLeft size={14} />
        Voltar pro blog
      </Link>

      <div className="mt-8 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[var(--color-text-dim)]">
        <span className="text-[var(--color-brand)]">{POST.category}</span>
        <span className="inline-flex items-center gap-1">
          <Calendar size={11} />
          {new Date(POST.publishedAt).toLocaleDateString("pt-BR", { dateStyle: "long" })}
        </span>
        <span>{POST.readingMinutes}min</span>
      </div>

      <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
        {POST.title}
      </h1>

      <div className="prose prose-invert max-w-none mt-12">
        <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
          Apps de comando e controle pra airsoft tático saíram da curiosidade
          de nicho pra ferramenta padrão em operações brasileiras a partir de
          2024. Hoje, três plataformas dividem o cenário nacional: <strong className="text-[var(--color-text)]">ORYX</strong> (lançada em 2026 pela Animalz Group), <strong className="text-[var(--color-text)]">Ares Alpha</strong> (origem europeia, foco em AR overlay) e <strong className="text-[var(--color-text)]">WarCamp</strong> (app comunitário focado em milsim).
        </p>

        <p className="text-base text-[var(--color-text-muted)] mt-6 leading-relaxed">
          Este comparativo avalia as três em 6 critérios objetivos: tracking GPS,
          voz, missões, anti-cheat, marketplace e preço. Avaliação feita em
          maio/2026, baseada em documentação pública de cada produto.
        </p>

        <h2 className="text-3xl font-black mt-12 mb-4">1. Tracking GPS em tempo real</h2>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
          <strong className="text-[var(--color-text)]">ORYX</strong> oferece tracking GPS contínuo do squad com latência sub-100ms, plotado em mapa Mapbox satellite-streets. Diferencial: <strong className="text-[var(--color-text)]">tiles offline pré-cacheados por evento</strong> — funciona em mata fechada sem sinal 4G, requisito real pra operações fora de centros urbanos.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mt-4 leading-relaxed">
          <strong className="text-[var(--color-text)]">Ares Alpha</strong> também faz tracking GPS realtime, mas depende de conexão constante com servidores na Europa — latência média de 250-400ms pro Brasil, e funcionalidade limitada quando o sinal cai.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mt-4 leading-relaxed">
          <strong className="text-[var(--color-text)]">WarCamp</strong> tem tracking básico mas sem renderização em tempo real consistente — atualiza a cada ~30 segundos, o que limita uso em modos de jogo rápidos como CQB.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mt-4 leading-relaxed">
          <strong className="text-[var(--color-brand)]">Vencedor: ORYX</strong> — pela combinação de baixa latência, infraestrutura brasileira (AWS sa-east-1) e suporte offline.
        </p>

        <h2 className="text-3xl font-black mt-12 mb-4">2. Comunicação por voz</h2>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
          ORYX inclui voz integrada com 4 canais hierárquicos (Squad, Pelotão, Comando, Geral) via LiveKit, com push-to-talk ou always-on. Macros pré-gravados (&quot;Cobertura!&quot;, &quot;Recuar!&quot;) com 1 toque. Ares Alpha e WarCamp não incluem voz nativa — exigem app externo (Discord/Zello).
        </p>
        <p className="text-base text-[var(--color-text-muted)] mt-4 leading-relaxed">
          <strong className="text-[var(--color-brand)]">Vencedor: ORYX</strong> — única que entrega voz junto com tracking no mesmo app.
        </p>

        <h2 className="text-3xl font-black mt-12 mb-4">3. Missões e gameplay dinâmico</h2>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
          As três suportam missões geo-fenced criadas pelo organizador. ORYX tem ainda um <strong className="text-[var(--color-text)]">mission engine BullMQ</strong> que processa progresso em background — missão complexa com múltiplas etapas não trava o app. Ares Alpha tem AR overlay (interessante, mas drena bateria rapidamente). WarCamp limita-se a captura simples de pontos.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mt-4 leading-relaxed">
          <strong className="text-[var(--color-brand)]">Vencedor: ORYX</strong> (gameplay) e <strong>Ares Alpha</strong> (AR, se você aceita custo de bateria).
        </p>

        <h2 className="text-3xl font-black mt-12 mb-4">4. Anti-cheat</h2>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
          ORYX faz detecção client-side (mock location, emulador, root) +
          servidor-side (velocidade impossível, jitter excessivo via BullMQ
          processor). Ares Alpha tem detecção básica de mock location.
          WarCamp não documenta nenhuma medida anti-cheat ativa.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mt-4 leading-relaxed">
          <strong className="text-[var(--color-brand)]">Vencedor: ORYX</strong>, com camada dupla (cliente + servidor).
        </p>

        <h2 className="text-3xl font-black mt-12 mb-4">5. Marketplace de equipamento</h2>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
          ORYX é a única das três que inclui <strong className="text-[var(--color-text)]">marketplace nativo</strong> de
          equipamento usado entre operadores. Categorias de réplica, gear,
          patches, com filtro por cidade, condição (Como Novo / Bom Uso /
          Usado) e reputação do vendedor. Modelo inspirado no Steam Market.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mt-4 leading-relaxed">
          <strong className="text-[var(--color-brand)]">Vencedor: ORYX</strong> (único com marketplace).
        </p>

        <h2 className="text-3xl font-black mt-12 mb-4">6. Preço</h2>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
          <strong className="text-[var(--color-text)]">ORYX</strong>: grátis pra operador e organizador. Receita vem de Battle Pass premium opcional (R$ 39,90/temporada), marketplace fee (10% só pro vendedor) e loja de cosméticos.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mt-4 leading-relaxed">
          <strong className="text-[var(--color-text)]">Ares Alpha</strong>: grátis pra operador. Organizadores pagam taxa por evento.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mt-4 leading-relaxed">
          <strong className="text-[var(--color-text)]">WarCamp</strong>: grátis pra ambos com features básicas; tier premium ~US$10/mês.
        </p>
        <p className="text-base text-[var(--color-text-muted)] mt-4 leading-relaxed">
          <strong className="text-[var(--color-brand)]">Vencedor: ORYX</strong> — única realmente grátis sem cobrar de organizador, modelo monetização não-coercitivo.
        </p>

        <h2 className="text-3xl font-black mt-12 mb-4">Conclusão</h2>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
          O ORYX vence em <strong className="text-[var(--color-text)]">5 dos 6 critérios</strong>{" "}
          analisados — perdendo apenas em AR overlay (feature do Ares Alpha
          que tem trade-off real em bateria). Pra airsoft tático sério no
          Brasil em 2026, o ORYX é a recomendação. Servidor nacional,
          marketplace integrado, anti-cheat de duas camadas, grátis
          sem amarras — entrega o pacote mais completo.
        </p>

        <div className="mt-12 p-8 rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5">
          <h3 className="text-2xl font-black">Quer testar?</h3>
          <p className="mt-3 text-[var(--color-text-muted)]">
            APK Android disponível, instala em 30 segundos, grátis sem cadastrar cartão.
          </p>
          <div className="mt-6">
            <ButtonLink href="/baixar" variant="primary" size="lg">
              <Download size={16} />
              Baixar ORYX
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}
