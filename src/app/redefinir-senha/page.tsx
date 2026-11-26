import type { Metadata } from "next";

import { ResetForm } from "./ResetForm";

export const metadata: Metadata = {
  title: "Redefinir senha",
  robots: { index: false, follow: false },
  // O token vai na URL: não vazar para outros sites pelo Referer.
  referrer: "no-referrer",
};

export default async function RedefinirSenhaPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return (
    <section className="relative min-h-[80vh] pt-32 pb-24 lg:pt-44">
      <div className="absolute inset-0 tactical-grid pointer-events-none" />
      <div className="relative mx-auto max-w-md px-6">
        <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand-text)]">
          Conta ORYX
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight leading-[1.14]">
          Criar senha nova
        </h1>
        <ResetForm token={typeof token === "string" ? token : ""} />
      </div>
    </section>
  );
}
