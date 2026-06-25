import { Download, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function CTA() {
  return (
    <section className="relative py-24 lg:py-32 border-t border-[var(--color-border)] overflow-hidden">
      <div className="absolute inset-0 tactical-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand)]/5 to-transparent pointer-events-none" />

      <Reveal className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
          Hora de operar
        </p>
        <h2 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
          Sua operação começa
          <br />
          <span className="text-[var(--color-brand)]">no próximo download.</span>
        </h2>
        <p className="mt-8 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
          APK assinado, baixado direto do nosso repositório oficial. São 64MB e
          instala em 30 segundos.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonLink href="/baixar" variant="primary" size="xl">
            <Download size={18} />
            Baixar agora pra Android
            <ArrowRight size={18} />
          </ButtonLink>
          <ButtonLink href="/eventos" variant="outline" size="xl">
            Ver eventos abertos
          </ButtonLink>
        </div>

        <p className="mt-8 text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
          iOS chegando · TestFlight beta em 2026
        </p>
      </Reveal>
    </section>
  );
}
