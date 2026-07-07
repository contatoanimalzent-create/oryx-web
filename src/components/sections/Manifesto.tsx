import { Reveal } from "@/components/motion/Reveal";

/**
 * Bloco manifesto tipográfico (o "REDEFINING LIMITS" do Lando, versão
 * ORYX). Afirmações que o produto sustenta: o jogo acontece no mundo
 * físico, com GPS real e squad de verdade.
 */
export function Manifesto() {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal stagger={0.08}>
          <p className="display-xl text-center text-[9.5vw] sm:text-6xl lg:text-7xl">
            Saia do sofá.
          </p>
          <p className="display-xl text-center text-[9.5vw] sm:text-6xl lg:text-7xl">
            Entre na <span className="volt-mark">operação</span>.
          </p>
          <p className="display-xl text-center text-[9.5vw] sm:text-6xl lg:text-7xl">
            Jogue no mundo <span className="volt-mark">real</span>.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-2xl text-center text-lg leading-relaxed text-[var(--color-text-muted)]">
            Sem mapa de videogame: o campo é a cidade, o terreno, o clube de
            airsoft. O ORYX coloca a camada de jogo por cima do mundo físico,
            com posição real, zonas reais e um squad de verdade do seu lado.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
