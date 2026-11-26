import type { Metadata } from "next";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pagamento",
  robots: { index: false, follow: false },
};

type Status = "aprovado" | "pendente" | "recusado";

const COPY: Record<Status, { title: string; body: string; tone: string }> = {
  aprovado: {
    title: "Pagamento aprovado.",
    body: "Pode voltar para o app ORYX. A confirmação aparece lá em alguns segundos.",
    tone: "text-[var(--color-brand-text)]",
  },
  pendente: {
    title: "Pagamento em análise.",
    body: "Assim que o Mercado Pago aprovar, a confirmação aparece no app ORYX. Não precisa pagar de novo.",
    tone: "text-[var(--color-text)]",
  },
  recusado: {
    title: "Pagamento não aprovado.",
    body: "Nada foi cobrado. Volte para o app ORYX e tente de novo, com PIX ou outro cartão.",
    tone: "text-[var(--color-text)]",
  },
};

export default async function PagamentoPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: raw } = await searchParams;
  const status: Status =
    raw === "aprovado" || raw === "recusado" ? raw : "pendente";
  const copy = COPY[status];
  const Icon =
    status === "aprovado" ? CheckCircle2 : status === "recusado" ? XCircle : Clock;

  return (
    <section className="relative min-h-[80vh] pt-32 pb-24 lg:pt-44">
      <div className="absolute inset-0 tactical-grid pointer-events-none" />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <Icon size={56} className={`mx-auto ${copy.tone}`} aria-hidden />
        <h1 className="mt-8 text-4xl md:text-6xl font-black tracking-tight leading-[1.14]">
          {copy.title}
        </h1>
        <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
          {copy.body}
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="oryx://pagamento" variant="primary" size="xl">
            Voltar para o app
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
