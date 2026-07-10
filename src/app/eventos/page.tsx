import type { Metadata } from "next";
import { Calendar, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Eventos de airsoft tático no Brasil",
  description:
    "Operações de airsoft tático abertas pra inscrição no Brasil. Veja eventos por região, modo (CQB/Guerra Total/Sniper) e nível.",
  alternates: { canonical: "/eventos" },
};

export default function EventosPage() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-44 min-h-[80vh]">
      <div className="absolute inset-0 tactical-grid pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
          Eventos
        </p>
        <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
          Operações abertas <br />
          <span className="text-[var(--color-brand)]">no Brasil.</span>
        </h1>

        <div className="mt-16 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-12 text-center">
          <Calendar size={36} className="mx-auto text-[var(--color-text-dim)]" />
          <h2 className="mt-6 text-2xl font-bold">Em breve</h2>
          <p className="mt-3 max-w-md mx-auto text-[var(--color-text-muted)]">
            A lista pública de eventos vai aparecer aqui assim que
            organizadores começarem a cadastrar operações no app. Quer ser
            o primeiro?
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--color-text-dim)]">
            <MapPin size={14} />
            <a
              className="text-[var(--color-brand)] hover:underline"
              href="mailto:contato@oryxcontrol.com?subject=Quero%20cadastrar%20evento"
            >
              Cadastrar minha operação
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
