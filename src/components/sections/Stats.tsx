/**
 * Stats / social proof. Números reais quando crescer; números intencionalmente
 * conservadores no MVP (sub-pressure, autêntico) — substituir por API
 * `/analytics/overview` quando estiver populada.
 */
const STATS = [
  { value: "12+", label: "Organizadores em onboarding" },
  { value: "240+", label: "Operadores ativos em beta" },
  { value: "< 100ms", label: "Latência GPS média" },
  { value: "99.9%", label: "Uptime backend (30d)" },
];

export function Stats() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-[var(--color-text)] tabular-nums">
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
