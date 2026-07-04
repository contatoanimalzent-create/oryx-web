import { Reveal } from "@/components/motion/Reveal";
import { StoreButtons } from "@/components/ui/StoreButtons";

/**
 * Fechamento: bloco de cor chapada volt (o "amarelo do Lando" do ORYX).
 * CTA honesto: o app web está no ar agora; as lojas entram quando os
 * links forem reais.
 */
export function FinalCTA() {
  return (
    <section className="bg-[var(--color-volt)] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <Reveal>
          <h2 className="display-xl text-[11vw] text-[var(--color-ink)] sm:text-7xl">
            Entre na próxima
            <br />
            operação
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--color-ink)]/70">
            O ORYX roda no navegador agora mesmo. Crie sua conta, entre no
            squad e apareça no mapa.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <StoreButtons className="mt-10 justify-center" />
        </Reveal>
      </div>
    </section>
  );
}
