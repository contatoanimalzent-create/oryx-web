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

/* ── Tela: tracking em campo (mapa REAL do app + HUD real) ─────────── */
export function ScreenTracking() {
  return (
    <div className="relative h-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* mapa real de Brasília (recorte limpo do screenshot HD do app) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-95"
        style={{
          backgroundImage: "url(/screens/oryx_map_clean.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center 62%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/75" />

      {/* HUD superior (elementos da tela real: bateria, alvos, timer, placar) */}
      <div className="absolute inset-x-[5%] top-[11%] flex items-center justify-between rounded-lg bg-black/70 px-2 py-1.5 text-[8.5px] font-semibold backdrop-blur-sm">
        <span className="flex items-center gap-2">
          <span>▮ 100%</span>
          <span style={{ color: ORANGE }}>◎ 2/5</span>
          <span className="text-white/70">☁ on</span>
          <span className="text-white/70">◷ 00:26</span>
        </span>
        <span className="rounded px-1.5 py-0.5 font-bold text-black" style={{ background: ORANGE }}>
          2 : 1
        </span>
      </div>

      {/* pings do squad */}
      <span className="app-ping absolute left-[38%] top-[42%] h-2.5 w-2.5 rounded-full" style={{ background: ORANGE }} />
      <span className="app-ping absolute left-[56%] top-[55%] h-2.5 w-2.5 rounded-full" style={{ background: "#3b82f6", animationDelay: "0.5s" }} />
      <span className="app-ping absolute left-[47%] top-[63%] h-2.5 w-2.5 rounded-full" style={{ background: "#3b82f6", animationDelay: "1s" }} />

      {/* zona */}
      <span className="absolute left-[30%] top-[34%] h-[26%] w-[38%] rounded-full border-2 border-dashed" style={{ borderColor: "rgba(255,122,0,0.7)" }} />
      <span className="absolute left-[33%] top-[31%] rounded bg-black/70 px-1.5 py-0.5 text-[7.5px] font-bold" style={{ color: ORANGE }}>
        ZONA ALFA · 00:41
      </span>

      {/* botões reais: CONTATO / BAIXA + COMS/FEED/MÉDICO */}
      <div className="absolute inset-x-[5%] bottom-[9%]">
        <div className="flex gap-1.5">
          <span className="flex-1 rounded-lg border py-2 text-center text-[9px] font-bold tracking-widest" style={{ borderColor: "#d4a017", color: "#ffd76a", background: "rgba(90,70,0,0.55)" }}>
            ⚡ CONTATO
          </span>
          <span className="flex-1 rounded-lg border py-2 text-center text-[9px] font-bold tracking-widest" style={{ borderColor: "#c0392b", color: "#ff8a80", background: "rgba(80,10,10,0.55)" }}>
            ✕ BAIXA
          </span>
        </div>
        <div className="mt-1.5 flex justify-center gap-2 text-[7px] text-white/75">
          <MiniAction bg="#2456c9" label="COMS" icon="🎧" />
          <MiniAction bg="#c05a17" label="FEED" icon="🎥" />
          <MiniAction bg="#1e9e4a" label="MÉDICO" icon="✚" />
        </div>
      </div>
    </div>
  );
}

function MiniAction({ bg, label, icon }: { bg: string; label: string; icon: string }) {
  return (
    <span className="flex flex-col items-center gap-0.5">
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full text-[9px]"
        style={{ background: bg }}
      >
        {icon}
      </span>
      {label}
    </span>
  );
}
