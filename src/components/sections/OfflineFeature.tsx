import { CloudOff, MapPin, RadioTower, Activity } from "lucide-react";

const POINTS = [
  {
    icon: MapPin,
    title: "Tiles pré-cacheados por evento",
    body: "Quando você faz check-in num evento, o app baixa a área do mapa em alta resolução. Trabalha em modo nativo offline até o evento acabar.",
  },
  {
    icon: Activity,
    title: "GPS sem pausa, mesmo sem sinal",
    body: "Posição continua sendo gravada e fica em fila local. Quando volta a ter rede, sincroniza com timestamps reais — o ranking nunca te penaliza por área remota.",
  },
  {
    icon: RadioTower,
    title: "Voz P2P em rede local",
    body: "Sem cobertura? Operadores em raio Wi-Fi/Bluetooth montam mesh entre si. Voz continua funcionando entre quem tá próximo — sem depender de servidor externo.",
  },
  {
    icon: Activity,
    title: "Heatmap de tráfego de pessoas",
    body: "Backend agrega posições anonimizadas em grid de 50m × 50m. Você vê onde concentrou movimento na operação — útil pra organizador planejar a próxima.",
  },
];

export function OfflineFeature() {
  return (
    <section
      aria-labelledby="offline-title"
      className="relative py-24 lg:py-32 border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40"
    >
      <div className="absolute inset-0 tactical-grid opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
            Offline-first
          </p>
          <h2
            id="offline-title"
            className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]"
          >
            Ambiente remoto?
            <br />
            <span className="text-[var(--color-brand)]">Continua operando.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
            Airsoft tático sério rola em mata fechada, fazenda, campo
            descampado. Sem 4G. Sem Wi-Fi do organizador. ORYX foi desenhado
            pra operar nessas condições — não pra travar numa tela de
            &quot;sem conexão&quot;.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {POINTS.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-8 hover:border-[var(--color-brand)]/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-[var(--color-brand)]/10 border border-[var(--color-brand)]/30 flex items-center justify-center text-[var(--color-brand)]">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-text)]">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
          <CloudOff size={14} className="text-[var(--color-warning)]" />
          Disponível na v0.1 · Heatmap chega na v0.2 (jul/2026)
        </div>
      </div>
    </section>
  );
}
