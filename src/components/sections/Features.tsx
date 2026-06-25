import {
  MapPin,
  Headphones,
  Target,
  Trophy,
  Shield,
  Radio,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const FEATURES: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
  tag: string;
  accent: string;
}> = [
  {
    icon: MapPin,
    tag: "Tracking",
    accent: "var(--color-brand)",
    title: "Mapa tático em tempo real",
    body:
      "Você vê a posição exata de cada operador do seu squad no campo, com refresh a cada poucos segundos. Tem heatmap, zona controlada, marcador de inimigo confirmado e ponto de respawn, tudo em cima do mapa de satélite.",
  },
  {
    icon: Headphones,
    tag: "Comunicação",
    accent: "var(--color-hud)",
    title: "Voz por canais hierárquicos",
    body:
      "Squad, pelotão, comando. Push-to-talk ou always-on, com macros táticos pré-gravados. Funciona até em rede ruim, porque o codec foi otimizado pra 8 kbps.",
  },
  {
    icon: Target,
    tag: "Gameplay",
    accent: "var(--color-ember)",
    title: "Missões dinâmicas",
    body:
      "Organizadores criam missões geo-fenced que aparecem no mapa dos jogadores em tempo real. Captura de ponto, escolta de VIP, demolição, recon. Pontuação automática e relatório AAR no fim.",
  },
  {
    icon: Trophy,
    tag: "Progressão",
    accent: "var(--color-ember-soft)",
    title: "Patentes e ranking nacional",
    body:
      "Hierarquia militar real (Soldado → Cabo → Sargento → Tenente...). XP por participação, vitórias, missões cumpridas. Battle Pass sazonal com cosméticos e patches exclusivos.",
  },
  {
    icon: Shield,
    tag: "Anti-cheat",
    accent: "var(--color-brand)",
    title: "Detecção automática de trapaça",
    body:
      "GPS spoofing, mock locations, velocidade impossível, root detectado. Heurísticas server-side analisam padrões e flagam suspeitas. Reputação afeta participação em eventos competitivos.",
  },
  {
    icon: Radio,
    tag: "Realtime",
    accent: "var(--color-hud)",
    title: "Sincronização instantânea",
    body:
      "MQTT sobre AWS IoT Core garante latência sub-100ms entre operador e comando. Eventos críticos (eliminação, captura, SOS médico) propagam em milissegundos pra todos os envolvidos.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
            Capacidades
          </p>
          <h2
            id="features-title"
            className="display-xl mt-4 text-4xl md:text-6xl leading-[1.02]"
          >
            Tudo que uma operação séria precisa.
            <br />
            <span className="text-ember-grad">Num app só.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
            A gente construiu o ORYX junto com quem joga airsoft tático no Brasil
            há mais de 10 anos. Cada recurso resolve uma dor real de campo, não é
            tecnologia por tecnologia.
          </p>
        </Reveal>

        <Reveal
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          stagger={0.08}
          y={24}
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
  tag,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  tag: string;
  accent: string;
}) {
  return (
    <article
      className="group holo-panel edge-glow-top relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
      style={{ ["--accent" as string]: accent }}
    >
      {/* glow de acento que acende no hover */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: accent }}
      />
      <div className="relative flex items-center justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border transition-colors"
          style={{
            color: accent,
            borderColor: "color-mix(in srgb, var(--accent) 40%, transparent)",
            background: "color-mix(in srgb, var(--accent) 12%, transparent)",
            boxShadow: "0 0 24px -8px var(--accent)",
          }}
        >
          <Icon size={22} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-dim)]">
          {tag}
        </span>
      </div>
      <h3 className="relative mt-6 text-xl font-bold text-[var(--color-text)]">
        {title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
        {body}
      </p>
    </article>
  );
}
