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
}> = [
  {
    icon: MapPin,
    tag: "Tracking",
    title: "Mapa tático em tempo real",
    body:
      "Veja a posição exata de cada operador do seu squad no campo, com refresh a cada poucos segundos. Heatmaps, zonas controladas, marcadores de inimigo confirmado e pontos de respawn — tudo georeferenciado no mapa de satélite.",
  },
  {
    icon: Headphones,
    tag: "Comunicação",
    title: "Voz por canais hierárquicos",
    body:
      "Squad, pelotão, comando. Push-to-talk ou always-on, com macros táticos pré-gravados. Funciona até em rede ruim — codec otimizado pra 8 kbps.",
  },
  {
    icon: Target,
    tag: "Gameplay",
    title: "Missões dinâmicas",
    body:
      "Organizadores criam missões geo-fenced que aparecem no mapa dos jogadores em tempo real. Captura de ponto, escolta de VIP, demolição, recon. Pontuação automática e relatório AAR no fim.",
  },
  {
    icon: Trophy,
    tag: "Progressão",
    title: "Patentes e ranking nacional",
    body:
      "Hierarquia militar real (Soldado → Cabo → Sargento → Tenente...). XP por participação, vitórias, missões cumpridas. Battle Pass sazonal com cosméticos e patches exclusivos.",
  },
  {
    icon: Shield,
    tag: "Anti-cheat",
    title: "Detecção automática de trapaça",
    body:
      "GPS spoofing, mock locations, velocidade impossível, root detectado. Heurísticas server-side analisam padrões e flagam suspeitas. Reputação afeta participação em eventos competitivos.",
  },
  {
    icon: Radio,
    tag: "Realtime",
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
            className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]"
          >
            Tudo que uma operação séria precisa.
            <br />
            <span className="text-[var(--color-text-muted)]">
              Num app só.
            </span>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
            O ORYX foi construído com quem joga airsoft tático no Brasil há
            mais de 10 anos. Cada feature resolve uma dor real de campo —
            não é tech por tech.
          </p>
        </Reveal>

        <Reveal
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] rounded-xl overflow-hidden border border-[var(--color-border)]"
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
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  tag: string;
}) {
  return (
    <article className="group bg-[var(--color-bg)] p-8 hover:bg-[var(--color-bg-elevated)] transition-colors">
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-lg bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/30 flex items-center justify-center text-[var(--color-brand)] group-hover:bg-[var(--color-brand)]/20 transition-colors">
          <Icon size={20} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-dim)]">
          {tag}
        </span>
      </div>
      <h3 className="mt-6 text-xl font-bold text-[var(--color-text)]">
        {title}
      </h3>
      <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
        {body}
      </p>
    </article>
  );
}
