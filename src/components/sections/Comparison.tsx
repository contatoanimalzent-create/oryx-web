import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type Cell = true | false | "partial" | string;

interface Row {
  feature: string;
  oryx: Cell;
  ares: Cell;
  warcamp: Cell;
}

const ROWS: Row[] = [
  { feature: "App grátis pra operador", oryx: true, ares: true, warcamp: true },
  { feature: "App grátis pra organizador", oryx: true, ares: false, warcamp: false },
  { feature: "Tracking GPS realtime do squad", oryx: true, ares: true, warcamp: "partial" },
  { feature: "Voz integrada por canal hierárquico", oryx: true, ares: false, warcamp: false },
  { feature: "Funciona offline em ambientes remotos", oryx: true, ares: "partial", warcamp: false },
  { feature: "Heatmap de tráfego de pessoas", oryx: true, ares: false, warcamp: false },
  { feature: "Marketplace de equipamento usado", oryx: true, ares: false, warcamp: false },
  { feature: "Anti-cheat (GPS spoof, emulador, root)", oryx: true, ares: true, warcamp: "partial" },
  { feature: "AAR com replay 2D + clipes automáticos", oryx: true, ares: true, warcamp: false },
  { feature: "Battle Pass sazonal", oryx: true, ares: false, warcamp: false },
  { feature: "Idioma: PT-BR nativo", oryx: true, ares: "partial", warcamp: true },
  { feature: "Servidores hospedados no Brasil", oryx: true, ares: false, warcamp: "partial" },
  { feature: "Open source dashboard / Auditável", oryx: true, ares: false, warcamp: false },
];

export function Comparison() {
  return (
    <section
      aria-labelledby="comparison-title"
      className="relative py-24 lg:py-32 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
            Posicionamento
          </p>
          <h2
            id="comparison-title"
            className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]"
          >
            Como o ORYX se compara.
          </h2>
          <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
            Avaliamos as principais plataformas de tracking pra airsoft tático
            disponíveis hoje. Comparação atualizada em maio/2026, baseada em
            sites e blog dos respectivos produtos.
          </p>
        </Reveal>

        <Reveal
          as="div"
          className="mt-16 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden"
          y={28}
        >
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-surface)]/60">
              <tr className="text-left">
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest text-[var(--color-text-dim)]">
                  Capacidade
                </th>
                <th className="px-6 py-5 font-black text-[var(--color-brand)] text-base">
                  ORYX
                </th>
                <th className="px-6 py-5 font-bold text-[var(--color-text-muted)] text-sm">
                  Ares Alpha
                </th>
                <th className="px-6 py-5 font-bold text-[var(--color-text-muted)] text-sm">
                  WarCamp
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(
                    "border-t border-[var(--color-border)]",
                    i % 2 === 1 && "bg-[var(--color-surface)]/20",
                  )}
                >
                  <td className="px-6 py-4 text-[var(--color-text)]">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4">
                    <CellIcon value={row.oryx} highlight />
                  </td>
                  <td className="px-6 py-4">
                    <CellIcon value={row.ares} />
                  </td>
                  <td className="px-6 py-4">
                    <CellIcon value={row.warcamp} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <p className="mt-6 text-xs text-[var(--color-text-dim)]">
          Sem afiliação. Fontes: ares-alpha.com e warcamp.app/blog (acesso em
          mai/2026). Capacidades de concorrentes podem mudar — abra issue no
          GitHub se notou algo desatualizado.
        </p>
      </div>
    </section>
  );
}

function CellIcon({ value, highlight }: { value: Cell; highlight?: boolean }) {
  if (value === true) {
    return (
      <Check
        size={20}
        className={cn(
          highlight ? "text-[var(--color-brand)]" : "text-[var(--color-faction-self)]",
        )}
        strokeWidth={3}
      />
    );
  }
  if (value === false) {
    return <X size={20} className="text-[var(--color-text-dim)] opacity-50" strokeWidth={2.5} />;
  }
  if (value === "partial") {
    return <Minus size={20} className="text-[var(--color-warning)]" strokeWidth={3} />;
  }
  return <span className="text-xs text-[var(--color-text-muted)]">{value}</span>;
}
