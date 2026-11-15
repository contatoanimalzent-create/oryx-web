import type { ReactNode } from "react";
import Link from "next/link";
import { COMPANY } from "@/lib/company";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

/**
 * Página jurídica: índice clicável, seções numeradas e o rodapé com quem
 * responde. Texto em linguagem simples; o que é lei aparece citado.
 */
export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <article className="pt-32 pb-24 lg:pt-44 mx-auto max-w-3xl px-6 lg:px-8">
      <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-brand-text)]">
        Versão {COMPANY.legalVersion} · atualizada em {COMPANY.legalUpdated}
      </p>
      <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-tight leading-[1.16]">{title}</h1>
      <div className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)] space-y-4">{intro}</div>

      <nav aria-label="Nesta página" className="mt-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-dim)]">Nesta página</h2>
        <ol className="mt-3 grid gap-1.5 sm:grid-cols-2 text-sm">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-[var(--color-text-muted)] underline-offset-4 hover:underline focus-visible:underline">
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {sections.map((s, i) => (
        <section key={s.id} id={s.id} className="scroll-mt-28 mt-12">
          <h2 className="text-2xl font-bold">
            {i + 1}. {s.title}
          </h2>
          <div className="legal-body mt-4 space-y-4 leading-relaxed text-[var(--color-text-muted)]">{s.body}</div>
        </section>
      ))}

      <footer className="mt-16 rounded-xl border border-[var(--color-border)] p-6 text-sm text-[var(--color-text-muted)] space-y-1">
        <p className="font-semibold text-[var(--color-text)]">
          {COMPANY.product} · {COMPANY.legalName}
        </p>
        {COMPANY.cnpj ? <p>CNPJ {COMPANY.cnpj}</p> : null}
        <p>{COMPANY.address ? `${COMPANY.address}, ${COMPANY.city}` : COMPANY.city}</p>
        <p>
          Contato e encarregado de dados:{" "}
          <a className="underline" href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>
        </p>
        <p className="pt-2">
          Veja também: <Link className="underline" href="/termos">Termos de uso</Link> ·{" "}
          <Link className="underline" href="/privacidade">Privacidade</Link> ·{" "}
          <Link className="underline" href="/reembolso">Reembolso</Link>
        </p>
      </footer>
    </article>
  );
}
