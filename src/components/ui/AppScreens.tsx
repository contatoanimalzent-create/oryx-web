/**
 * Telas do app recriadas em HTML pra apresentação no site, FIÉIS ao app
 * real (mesmos títulos, filtros, hierarquia, papéis, botões e cores dos
 * screenshots reais), mas vivas: pings, timers e status pulsando.
 * Paleta do app: fundo #0A0A0A, cards #161616, laranja #FF7A00,
 * verde de status #2BC258.
 */
const ORANGE = "#ff7a00";
const GREEN = "#2bc258";

/* ── Tela: lista de OPERAÇÕES (igual à tela real, cheia de jogo) ────── */
export function ScreenOps() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0a] px-[6%] pt-[14%] text-white">
      <div className="flex items-center justify-between">
        <p className="text-[15px] font-bold tracking-[0.18em]">OPERAÇÕES</p>
        <span className="text-[10px] text-white/50">⌕</span>
      </div>

      <div className="mt-3 flex gap-1.5 text-[9px] font-medium">
        <span className="rounded-full px-2.5 py-1 text-black" style={{ background: ORANGE }}>
          Todos
        </span>
        <span className="rounded-full border border-white/20 px-2.5 py-1 text-white/70">Grátis</span>
        <span className="rounded-full border border-white/20 px-2.5 py-1 text-white/70">Competitivo</span>
        <span className="rounded-full border border-white/20 px-2.5 py-1 text-white/70">Warfare</span>
      </div>

      <div className="mt-3 space-y-2">
        <OpCard
          live
          mode="WARFARE"
          name="Operação Cerrado"
          info="Hoje · 14:00 · 96/200 operadores"
          price="GRÁTIS"
        />
        <OpCard
          mode="COMPETITIVO"
          name="Confronto 5x5 · Setor Sul"
          info="Sáb · 09:30 · 8/10 operadores"
          price="R$ 25"
        />
        <OpCard
          mode="WARFARE"
          name="Domínio do Eixo"
          info="Dom · 08:00 · 143/300 operadores"
          price="GRÁTIS"
        />
        <OpCard
          mode="SNIPER"
          name="Precisão Noturna"
          info="Sex · 20:00 · 12/24 operadores"
          price="R$ 15"
        />
      </div>

      <p className="mt-auto mb-[9%] text-center text-[8.5px] font-semibold text-white/40">
        + 9 operações essa semana ↓
      </p>
    </div>
  );
}

function OpCard({
  live,
  mode,
  name,
  info,
  price,
}: {
  live?: boolean;
  mode: string;
  name: string;
  info: string;
  price: string;
}) {
  return (
    <div
      className="rounded-xl border p-2.5"
      style={{
        borderColor: live ? GREEN : "rgba(255,255,255,0.12)",
        background: "#161616",
      }}
    >
      <div className="flex items-center justify-between">
        {live ? (
          <span
            className="app-ping-green flex items-center gap-1 rounded px-1.5 py-0.5 text-[8px] font-bold text-black"
            style={{ background: GREEN }}
          >
            ● AO VIVO
          </span>
        ) : (
          <span className="text-[8px] font-semibold text-white/45">AGENDADA</span>
        )}
        <span className="text-[8px] font-bold" style={{ color: ORANGE }}>
          {mode}
        </span>
      </div>
      <p className="mt-1.5 text-[12px] font-semibold leading-tight">{name}</p>
      <div className="mt-1.5 flex items-center justify-between text-[8.5px] text-white/55">
        <span>{info}</span>
        <span className="font-bold" style={{ color: price === "GRÁTIS" ? GREEN : "#fff" }}>
          {price}
        </span>
      </div>
    </div>
  );
}

/* ── Tela: Lobby (hierarquia e squad reais do app) ──────────────────── */
export function ScreenLobby() {
  return (
    <div className="flex h-full flex-col bg-[#0a0a0a] px-[6%] pt-[14%] text-white">
      <p className="text-[13px] font-semibold">Lobby</p>
      <p className="mt-1 text-[11px] font-semibold leading-tight">Operação Cerrado</p>
      <p className="text-[8.5px]" style={{ color: GREEN }}>
        ● Operação ativa · 00:26:14
      </p>

      <div className="mt-2.5 rounded-xl bg-[#161616] p-2.5">
        <p className="text-[7.5px] tracking-[0.2em] text-white/40">SUA HIERARQUIA</p>
        <div className="mt-1.5 space-y-1 text-[9.5px]">
          <p className="text-white/60">
            Comandante: <span className="font-semibold text-white">Cap. THUNDER</span>
          </p>
          <p className="text-white/60">
            Líder de Pelotão: <span className="font-semibold text-white">Sgt. WOLF</span>
          </p>
          <p className="text-white/60">
            Líder de Squad: <span className="font-semibold text-white">Cb. RAVEN</span>
          </p>
        </div>
      </div>

      <div className="mt-2 rounded-xl bg-[#161616] p-2.5">
        <p className="text-[7.5px] tracking-[0.2em] text-white/40">SEU SQUAD</p>
        <div className="mt-1.5 space-y-1.5">
          <SquadRow tag="R" name="RAVEN" role="Líder" />
          <SquadRow tag="G" name="GHOST" role="Médico" />
          <SquadRow tag="V" name="VIPER" role="Atirador" />
          <SquadRow tag="V" name="VOCÊ" role="Operador" you />
        </div>
      </div>

      <div className="mt-2 rounded-xl bg-[#161616] p-2.5">
        <p className="text-[7.5px] tracking-[0.2em] text-white/40">
          BRIEFING DO ORGANIZADOR
        </p>
        <p className="mt-1 text-[9px] leading-snug text-white/75">
          Duas facções disputam as zonas do setor central. Squad Bravo
          responde ao Sgt. WOLF no canal 2.
        </p>
      </div>

      <div className="mt-2 flex items-start gap-1.5 rounded-xl bg-[#161616] p-2.5">
        <span
          className="mt-0.5 flex h-3 w-3 items-center justify-center rounded-[3px] text-[7px] font-bold text-black"
          style={{ background: ORANGE }}
        >
          ✓
        </span>
        <span className="text-[8.5px] leading-snug text-white/75">
          Aceito as regras desta operação
          <span className="block text-[7.5px] text-white/40">
            Confirmando, autorizo o tracking GPS e voz pelo squad.
          </span>
        </span>
      </div>

      <div
        className="app-ping-green mt-auto mb-[10%] flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[10px] font-bold text-black"
        style={{ background: GREEN }}
      >
        ◎ CHECK-IN GPS — ENTRAR EM CAMPO
      </div>
    </div>
  );
}

function SquadRow({
  tag,
  name,
  role,
  you,
}: {
  tag: string;
  name: string;
  role: string;
  you?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5">
        <span
          className="flex h-4.5 w-4.5 items-center justify-center rounded-full text-[8px] font-bold"
          style={{
            width: 18,
            height: 18,
            background: you ? ORANGE : "#2a2a2a",
            color: you ? "#000" : "#fff",
          }}
        >
          {tag}
        </span>
        <span
          className="text-[9.5px] font-semibold"
          style={{ color: you ? ORANGE : "#fff" }}
        >
          {name}
        </span>
      </span>
      <span className="text-[8.5px] text-white/45">{role}</span>
    </div>
  );
}

/* ── Tela: tracking em campo ────────────────────────────────────────
 * Recriação densa no nível Ares Alpha / WarCamp: fita de bússola, timer
 * de operação, chips de marcação coloridos com seta, avatares de squad
 * com anel de facção, nome de zona em tipografia militar, coluna de voz
 * (chat + PTT) e dock CONTATO/BAIXA. Sobre o satélite real de Brasília.
 */
const DEG_CARDINALS: [number, string][] = [
  [300, "NO"], [330, "N"], [0, "N"], [30, "NE"], [60, "NE"],
  [90, "L"], [120, "SE"], [150, "SE"], [180, "S"],
];

export function ScreenTracking() {
  return (
    <div className="relative h-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* satélite real de Brasília */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/screens/oryx_map_clean.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center 58%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70" />

      {/* ── Fita de bússola (abaixo da status bar do iPhone) ── */}
      <div className="absolute inset-x-0 top-[6%] h-[6%] overflow-hidden bg-gradient-to-b from-black/75 to-transparent">
        <div className="relative flex h-full items-start justify-between px-[3%] pt-[3px]">
          {DEG_CARDINALS.map(([deg, card], i) => (
            <span key={i} className="flex flex-col items-center">
              <span className="h-1.5 w-px bg-white/50" />
              <span
                className="mt-0.5 text-[6px] font-bold leading-none"
                style={{ color: card === "N" ? "#ff5a5a" : "rgba(255,255,255,0.7)" }}
              >
                {deg.toString().padStart(3, "0")}
              </span>
              <span className="text-[5px] font-semibold leading-none text-white/50">{card}</span>
            </span>
          ))}
        </div>
        {/* janela central com o rumo atual */}
        <div
          className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center rounded-b px-1.5 pb-0.5 pt-[2px]"
          style={{ background: ORANGE }}
        >
          <span className="text-[8px] font-black leading-none text-black">104</span>
          <span className="text-[5px] font-bold leading-none text-black/80">LESTE</span>
        </div>
      </div>

      {/* ── Timer da operação + botão colapsar (canto sup. esq.) ── */}
      <div className="absolute left-[4%] top-[14%] flex items-center gap-1.5">
        <span className="rounded bg-black/65 px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider backdrop-blur-sm">
          00:24:18
        </span>
      </div>

      {/* ── Placar + efetivo (canto sup. dir.) ── */}
      <div className="absolute right-[4%] top-[14%] flex items-center gap-1">
        <span className="rounded bg-black/65 px-1.5 py-0.5 font-mono text-[8px] font-semibold backdrop-blur-sm">
          <span className="text-[#4a9eff]">12</span>
          <span className="mx-0.5 text-white/40">/</span>
          <span style={{ color: ORANGE }}>10</span>
        </span>
        <span className="rounded px-1.5 py-0.5 font-mono text-[9px] font-black text-black" style={{ background: ORANGE }}>
          2:1
        </span>
      </div>

      {/* ── Kill feed (abaixo do placar) ── */}
      <div className="absolute right-[4%] top-[20%] flex flex-col items-end gap-1">
        <FeedRow shooter="WOLF" victim="ECHO-3" />
        <FeedRow shooter="RAVEN" victim="KILO-1" />
      </div>

      {/* ── Zona objetivo + chips de marcação ── */}
      <span
        className="app-ping absolute left-[26%] top-[30%] h-[30%] w-[42%] rounded-full border-2 border-dashed"
        style={{ borderColor: "rgba(255,122,0,0.75)" }}
      />

      {/* chip: contato inimigo */}
      <MapChip className="left-[9%] top-[24%]" color="#c62828" icon="⚠" label="Contato inimigo" ttl="0:38" />
      {/* chip: armar carga */}
      <MapChip className="left-[12%] top-[40%]" color="#e2691a" icon="✸" label="Armar carga" />
      {/* chip: extração */}
      <MapChip className="left-[58%] top-[34%]" color="#2456c9" icon="⛑" label="Extração" />

      {/* avatares do squad (aliados) */}
      <SquadDot className="left-[48%] top-[52%]" ally />
      <SquadDot className="left-[62%] top-[60%]" ally />
      <SquadDot className="left-[38%] top-[64%]" enemy />

      {/* operador local (self) — anel verde pulsante + callsign */}
      <div className="absolute left-[45%] top-[46%] flex flex-col items-center">
        <span className="app-ping-green flex h-7 w-7 items-center justify-center rounded-full border-2 border-white" style={{ background: "#12331c" }}>
          <span className="h-3.5 w-3.5 rounded-full" style={{ background: GREEN }} />
        </span>
        <span className="mt-0.5 rounded bg-black/70 px-1 text-[6px] font-bold" style={{ color: GREEN }}>
          RAVEN
        </span>
      </div>

      {/* nome de zona (tipografia militar) */}
      <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2 text-center">
        <p className="oryx-stroke text-[15px] font-black leading-none tracking-[3px]">
          EIXO MONUMENTAL
        </p>
        <p className="oryx-stroke text-[8px] font-black leading-tight tracking-[4px] text-white/70">
          SETOR CENTRAL
        </p>
      </div>

      {/* ── Coluna de voz (direita) ── */}
      <div className="absolute right-[4%] top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/70 text-[11px]" style={{ background: "#c62828" }}>
          💬
        </span>
        <span className="app-ping-green flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[15px]" style={{ background: GREEN }}>
          🎙
        </span>
      </div>

      {/* ── Dock inferior: CONTATO / BAIXA ── */}
      <div className="absolute inset-x-[5%] bottom-[7%] flex gap-1.5">
        <span className="flex-1 rounded-lg border py-2 text-center text-[9px] font-black tracking-widest" style={{ borderColor: "#d4a017", color: "#ffd76a", background: "rgba(70,54,0,0.6)" }}>
          ⚡ CONTATO
        </span>
        <span className="flex-1 rounded-lg border py-2 text-center text-[9px] font-black tracking-widest" style={{ borderColor: "#c0392b", color: "#ff8a80", background: "rgba(70,10,10,0.6)" }}>
          ✕ BAIXA
        </span>
      </div>
    </div>
  );
}

function FeedRow({ shooter, victim }: { shooter: string; victim: string }) {
  return (
    <span className="flex items-center gap-1 rounded bg-black/65 px-1.5 py-0.5 text-[7px] font-bold backdrop-blur-sm">
      <span className="text-[#4a9eff]">{shooter}</span>
      <span style={{ color: ORANGE }}>›</span>
      <span className="text-white/60 line-through">{victim}</span>
    </span>
  );
}

function MapChip({
  className,
  color,
  icon,
  label,
  ttl,
}: {
  className: string;
  color: string;
  icon: string;
  label: string;
  ttl?: string;
}) {
  return (
    <div className={`absolute flex flex-col items-center ${className}`}>
      <div
        className="flex items-center gap-1 rounded-md border border-white/80 px-1.5 py-1 shadow-lg"
        style={{ background: color }}
      >
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black/25 text-[7px]">
          {icon}
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[7.5px] font-bold text-white">{label}</span>
          {ttl && <span className="font-mono text-[6px] text-white/75">confirmar · {ttl}</span>}
        </span>
      </div>
      <span
        className="h-0 w-0"
        style={{
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: `5px solid ${color}`,
        }}
      />
    </div>
  );
}

function SquadDot({ className, ally, enemy }: { className: string; ally?: boolean; enemy?: boolean }) {
  const color = ally ? "#2456c9" : enemy ? ORANGE : "#888";
  return (
    <span
      className={`absolute flex h-4 w-4 items-center justify-center rounded-full border border-white/90 text-[6px] font-black text-white ${className}`}
      style={{ background: color }}
    >
      {enemy ? "▲" : "A"}
    </span>
  );
}
