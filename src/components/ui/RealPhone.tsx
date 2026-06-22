/**
 * iPhone realista (estilo Apple marketing) com mapa de SATÉLITE REAL dentro
 * e HUD tático sobreposto. Moldura em titânio via CSS (gradientes + sombras),
 * Dynamic Island, botões laterais. A "tela" é uma imagem de satélite real
 * (public/tactical-map.jpg) com marcadores de squad/inimigo/objetivo por cima.
 */
export function RealPhone({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* DEVICE */}
      <div className="device relative w-full" style={{ aspectRatio: "300 / 612" }}>
        {/* botões laterais */}
        <span className="absolute left-[-2px] top-[22%] h-[5%] w-[3px] rounded-l bg-[#2a2a2e]" />
        <span className="absolute left-[-2px] top-[30%] h-[8%] w-[3px] rounded-l bg-[#2a2a2e]" />
        <span className="absolute left-[-2px] top-[40%] h-[8%] w-[3px] rounded-l bg-[#2a2a2e]" />
        <span className="absolute right-[-2px] top-[34%] h-[11%] w-[3px] rounded-r bg-[#2a2a2e]" />

        {/* tela */}
        <div className="screen absolute inset-0 overflow-hidden">
          {/* MAPA REAL */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tactical-map.jpg"
            alt="Mapa de satélite real da operação"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          {/* leve correção de cor pra integrar ao tema */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

          {/* ── HUD topo ── */}
          <div className="absolute left-[5%] right-[5%] top-[3.2%] flex items-center justify-between rounded-xl border border-white/10 bg-black/55 px-2.5 py-1.5 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-faction-self)] shadow-[0_0_8px_var(--color-faction-self)] phone-blink" />
              <span className="font-mono text-[7px] tracking-widest text-white/85">
                AO VIVO
              </span>
            </div>
            <span className="font-mono text-[7px] text-white/60">BAT 87% · GPS 5/5</span>
            <span className="rounded bg-[var(--color-brand)] px-1.5 py-0.5 font-mono text-[7px] font-bold text-white">
              24:18
            </span>
          </div>

          {/* ── Objetivo (anel pulsante) ── */}
          <div
            className="absolute"
            style={{ left: "58%", top: "30%", transform: "translate(-50%,-50%)" }}
          >
            <div className="phone-obj h-16 w-16 rounded-full border-2 border-dashed border-[var(--color-brand)]" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[7px] font-bold text-[var(--color-brand)] drop-shadow">
              OBJ ALPHA
            </span>
          </div>

          {/* ── Inimigos ── */}
          <Marker x="30%" y="22%" color="var(--color-faction-enemy)" small label="" />
          <Marker x="74%" y="18%" color="var(--color-faction-enemy)" small />

          {/* ── Aliados ── */}
          <Marker x="38%" y="52%" color="var(--color-faction-ally)" />
          <Marker x="64%" y="56%" color="var(--color-faction-ally)" />
          <Marker x="46%" y="66%" color="var(--color-faction-ally)" />

          {/* ── Self (centro, verde pulsante) ── */}
          <div
            className="absolute"
            style={{ left: "50%", top: "60%", transform: "translate(-50%,-50%)" }}
          >
            <div className="phone-ping absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-faction-self)]/30" />
            <div className="relative h-3.5 w-3.5 rounded-full border-2 border-white bg-[var(--color-faction-self)] shadow-[0_0_12px_var(--color-faction-self)]" />
          </div>

          {/* ── Ping inimigo avistado ── */}
          <div
            className="absolute"
            style={{ left: "26%", top: "78%", transform: "translate(-50%,-50%)" }}
          >
            <div className="phone-ping h-8 w-8 rounded-full border border-[var(--color-brand)]" />
          </div>

          {/* ── Barra de ação inferior ── */}
          <div className="absolute bottom-[4.5%] left-[5%] right-[5%] flex gap-2">
            <button className="flex-1 rounded-lg bg-[var(--color-brand)] py-2 text-center font-sans text-[8px] font-extrabold uppercase tracking-wider text-white shadow-lg">
              Fui eliminado
            </button>
            <button className="flex-1 rounded-lg bg-[var(--color-warning)] py-2 text-center font-sans text-[8px] font-extrabold uppercase tracking-wider text-black shadow-lg">
              Vi inimigo
            </button>
          </div>

          {/* home indicator */}
          <span className="absolute bottom-[1.4%] left-1/2 h-1 w-1/4 -translate-x-1/2 rounded-full bg-white/70" />

          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[2.2%] h-[3.2%] w-[28%] -translate-x-1/2 rounded-full bg-black" />

          {/* reflexo de vidro */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.10]" />
        </div>
      </div>
    </div>
  );
}

function Marker({
  x,
  y,
  color,
  small,
  label,
}: {
  x: string;
  y: string;
  color: string;
  small?: boolean;
  label?: string;
}) {
  const size = small ? "h-2.5 w-2.5" : "h-3 w-3";
  return (
    <div
      className="absolute"
      style={{ left: x, top: y, transform: "translate(-50%,-50%)" }}
    >
      <div
        className={`${size} rounded-full border-2 border-white`}
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      {label ? (
        <span className="absolute left-1/2 top-[120%] -translate-x-1/2 font-mono text-[6px] text-white/80">
          {label}
        </span>
      ) : null}
    </div>
  );
}
