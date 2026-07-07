import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do ORYX (Animalz Group).",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <section className="pt-32 pb-24 lg:pt-44 mx-auto max-w-3xl px-6 lg:px-8 prose prose-invert">
      <h1 className="text-4xl font-black">Termos de Uso</h1>
      <p className="text-sm text-[var(--color-text-dim)]">Última atualização: 2026</p>

      <h2 className="text-2xl font-bold mt-10">1. Aceitação</h2>
      <p className="text-[var(--color-text-muted)]">
        Ao usar o ORYX (app móvel, site oryxcontrol.com e serviços relacionados),
        você concorda com estes Termos. Se não concordar, não use.
      </p>

      <h2 className="text-2xl font-bold mt-10">2. Cadastro</h2>
      <p className="text-[var(--color-text-muted)]">
        Você precisa ter 18 anos ou mais. Dados fornecidos devem ser
        verdadeiros. Você é responsável pela segurança da sua senha e por
        toda atividade na sua conta.
      </p>

      <h2 className="text-2xl font-bold mt-10">3. Conduta</h2>
      <p className="text-[var(--color-text-muted)]">
        Trapaças, localização falsa ou manipulação de integridade levam a banimento.
        Comportamento abusivo em chat ou voz idem. Comunique violações
        a contato@oryxcontrol.com.
      </p>

      <h2 className="text-2xl font-bold mt-10">4. Marketplace</h2>
      <p className="text-[var(--color-text-muted)]">
        Transações entre operadores no marketplace são facilitadas pelo
        ORYX mas a relação contratual é entre comprador e vendedor.
        Não nos responsabilizamos por defeitos ou descumprimento.
      </p>

      <h2 className="text-2xl font-bold mt-10">5. Limitação de responsabilidade</h2>
      <p className="text-[var(--color-text-muted)]">
        ORYX é uma ferramenta de coordenação. Não somos responsáveis por
        acidentes em eventos de airsoft. Sempre siga as regras do
        organizador, EPI obrigatório e legislação local.
      </p>

      <h2 className="text-2xl font-bold mt-10">6. Contato</h2>
      <p className="text-[var(--color-text-muted)]">
        contato@oryxcontrol.com, Animalz Group, Brasília-DF, Brasil.
      </p>
    </section>
  );
}
