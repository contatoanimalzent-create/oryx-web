import type { Metadata } from "next";
import { Download, Smartphone, Apple, ExternalLink } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ANDROID_APK_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Baixar ORYX — Android grátis (iOS em breve)",
  description:
    "Baixe o ORYX pra Android grátis. APK assinado, 64MB, instala em 30 segundos. iOS chegando em 2026 via TestFlight.",
  alternates: { canonical: "/baixar" },
};

export default function BaixarPage() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 min-h-[80vh]">
      <div className="absolute inset-0 tactical-grid pointer-events-none" />
      <div className="absolute inset-0 tactical-vignette pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
          Download
        </p>
        <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
          ORYX no <br />
          <span className="text-[var(--color-brand)]">seu bolso.</span>
        </h1>
        <p className="mt-8 text-lg text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
          Grátis, sem propaganda, sem cartão. APK assinado direto do nosso
          repositório oficial.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Android — ativo */}
          <article className="relative rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-bg-elevated)] p-8 text-left hover:border-[var(--color-brand)]/60 transition-colors">
            <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-[var(--color-faction-self)]">
              ● Disponível
            </div>
            <Smartphone size={28} className="text-[var(--color-brand)]" />
            <h2 className="mt-4 text-2xl font-bold">Android</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              APK assinado · 64MB · Android 7.0+ (API 24+)
            </p>
            <div className="mt-6">
              <ButtonLink
                href={ANDROID_APK_URL}
                external
                variant="primary"
                size="lg"
                className="w-full justify-center"
              >
                <Download size={16} />
                Baixar APK
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs text-[var(--color-text-dim)] leading-relaxed">
              Após o download, abra o arquivo e permita instalação de fontes
              externas quando solicitado. Em breve no Google Play.
            </p>
          </article>

          {/* iOS — em breve */}
          <article className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-left opacity-70">
            <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-[var(--color-warning)]">
              Em breve
            </div>
            <Apple size={28} className="text-[var(--color-text-muted)]" />
            <h2 className="mt-4 text-2xl font-bold">iOS</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              TestFlight beta · 2026 · iOS 15.0+
            </p>
            <div className="mt-6">
              <ButtonLink
                href="mailto:contato@oryxcontrol.com?subject=Aviso%20ORYX%20iOS"
                variant="outline"
                size="lg"
                className="w-full justify-center"
              >
                Me avise
                <ExternalLink size={14} />
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs text-[var(--color-text-dim)]">
              Te mandamos um email no dia que sair pra TestFlight.
            </p>
          </article>
        </div>

        <div className="mt-16 pt-10 border-t border-[var(--color-border)] text-left max-w-2xl mx-auto">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-dim)]">
            Como instalar APK no Android
          </h3>
          <ol className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
            <li><strong className="text-[var(--color-text)]">1.</strong> Toque em &quot;Baixar APK&quot; acima</li>
            <li><strong className="text-[var(--color-text)]">2.</strong> Abra o arquivo baixado (notificação ou pasta Downloads)</li>
            <li><strong className="text-[var(--color-text)]">3.</strong> Se aparecer aviso de fonte desconhecida, toque em &quot;Permitir desta fonte&quot;</li>
            <li><strong className="text-[var(--color-text)]">4.</strong> Toque em &quot;Instalar&quot;. Pronto. Abra o app e crie sua conta.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
