import { Reveal } from "@/components/motion/Reveal";
import { StoreButtons } from "@/components/ui/StoreButtons";

/**
 * Fechamento: bloco de cor chapada volt (o "amarelo do Lando" do ORYX).
 * CTA: App Store e Google Play (única distribuição oficial).
 */
export function FinalCTA() {
  return (
    <section className="bg-[var(--color-volt)] py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <Reveal>
          <h2 className="display-xl text-[11vw] text-[var(--color-ink)] sm:text-7xl">
            Entre na próxima
            <br />
            operação
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--color-ink)]/70">
            Baixe o ORYX, crie sua conta, entre no squad e apareça no mapa.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <StoreButtons className="mt-8 justify-center" />
        </Reveal>
      </div>
    </section>
  );
}
