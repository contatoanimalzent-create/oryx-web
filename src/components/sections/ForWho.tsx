import { ArrowRight, Users, Crosshair as CrosshairIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function ForWho() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
            Pra quem é
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
            Operador ou organizador. <span className="text-[var(--color-text-muted)]">Sempre grátis.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-muted)]">
            ORYX não cobra de ninguém pra usar. Nossa receita vem do{" "}
            <strong className="text-[var(--color-text)]">Battle Pass premium</strong>,{" "}
            <strong className="text-[var(--color-text)]">marketplace</strong> e{" "}
            <strong className="text-[var(--color-text)]">cosméticos digitais</strong>{" "}
            opcionais.
          </p>
        </Reveal>

        <Reveal
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6"
          stagger={0.12}
          y={28}
        >
          <Card
            icon={CrosshairIcon}
            tag="Operador"
            title="Pra quem joga"
            highlights={[
              "Tracking do seu squad em tempo real",
              "Voz integrada com canais hierárquicos",
              "Missões, ranking e progressão de patente",
              "AAR com replay e estatísticas pessoais",
            ]}
            cta="Como funciona pra mim"
            href="/operadores"
          />
          <Card
            icon={Users}
            tag="Organizador"
            title="Pra quem produz operação"
            highlights={[
              "Criar evento + missões em minutos",
              "Dashboard de comando ao vivo",
              "Anti-cheat automático no campo",
              "Marketplace pra divulgar e vender ingresso",
            ]}
            cta="Quero organizar"
            href="/organizadores"
          />
        </Reveal>
      </div>
    </section>
  );
}

function Card({
  icon: Icon,
  tag,
  title,
  highlights,
  cta,
  href,
}: {
  icon: React.ComponentType<{ size?: number }>;
  tag: string;
  title: string;
  highlights: string[];
  cta: string;
  href: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 lg:p-10 hover:border-[var(--color-brand)]/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/30 flex items-center justify-center text-[var(--color-brand)]">
          <Icon size={18} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-dim)]">
          {tag}
        </span>
      </div>

      <h3 className="mt-6 text-3xl font-black tracking-tight">{title}</h3>

      <ul className="mt-6 space-y-3">
        {highlights.map((h) => (
          <li key={h} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-brand)] shrink-0" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <ButtonLink href={href} variant="outline" size="md">
          {cta}
          <ArrowRight size={14} />
        </ButtonLink>
      </div>

      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[var(--color-brand)]/5 blur-3xl pointer-events-none" />
    </div>
  );
}
