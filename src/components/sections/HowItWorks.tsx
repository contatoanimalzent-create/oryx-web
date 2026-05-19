const STEPS = [
  {
    n: "01",
    title: "Baixe o app",
    body:
      "Grátis na Play Store ou via APK direto. Instala em 30 segundos. Cadastro com email + callsign (apelido em campo). iOS chegando em 2026.",
  },
  {
    n: "02",
    title: "Entre na operação",
    body:
      "Escolha um evento na lista pública ou escaneie o QR code do organizador. Check-in via GPS confirma sua presença no local. Squad atribuído automaticamente.",
  },
  {
    n: "03",
    title: "Domine o campo",
    body:
      "Mapa tático, voz com o squad, missões aparecendo em tempo real. Reporta eliminações com 1 toque. Tudo o que aconteceu vira AAR com replay, stats e MVP.",
  },
];

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-title"
      className="relative py-24 lg:py-32 border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]/30"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
            Fluxo operacional
          </p>
          <h2
            id="how-title"
            className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]"
          >
            Três passos pra estar em ação.
          </h2>
        </div>

        <ol className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)] border border-[var(--color-border)] rounded-xl overflow-hidden">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="bg-[var(--color-bg)] p-8 lg:p-10 relative"
            >
              <div className="text-6xl font-black text-[var(--color-brand)]/20 leading-none font-mono tabular-nums">
                {s.n}
              </div>
              <h3 className="mt-6 text-2xl font-bold text-[var(--color-text)]">
                {s.title}
              </h3>
              <p className="mt-4 text-base text-[var(--color-text-muted)] leading-relaxed">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
