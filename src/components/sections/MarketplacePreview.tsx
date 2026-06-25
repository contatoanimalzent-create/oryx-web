import { ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

interface Listing {
  title: string;
  category: string;
  condition: "Como Novo" | "Bom Uso" | "Usado" | "Para Peças";
  priceCents: number;
  city: string;
  seller: string;
  badges?: string[];
}

const PREVIEW: Listing[] = [
  {
    title: "Rifle AEG M4A1 Custom, Madbull externo",
    category: "Réplica",
    condition: "Como Novo",
    priceCents: 285000,
    city: "Brasília-DF",
    seller: "GHOST",
    badges: ["Verificado"],
  },
  {
    title: "Plate Carrier Multicam + 4 magazine pouches",
    category: "Tactical Gear",
    condition: "Bom Uso",
    priceCents: 89000,
    city: "São Paulo-SP",
    seller: "VIPER",
  },
  {
    title: "Patch ORYX Operação Cerrado · Edição 1",
    category: "Patch",
    condition: "Como Novo",
    priceCents: 4500,
    city: "Brasília-DF",
    seller: "WOLF",
    badges: ["Edição Limitada"],
  },
  {
    title: "Sniper VSR-10 G-Spec Tokyo Marui + bipé",
    category: "Réplica",
    condition: "Bom Uso",
    priceCents: 420000,
    city: "Rio de Janeiro-RJ",
    seller: "RAVEN",
    badges: ["Verificado"],
  },
];

function formatBRL(cents: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

const CONDITION_COLOR: Record<Listing["condition"], string> = {
  "Como Novo": "text-[var(--color-faction-self)] border-[var(--color-faction-self)]/30 bg-[var(--color-faction-self)]/5",
  "Bom Uso": "text-[var(--color-warning)] border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5",
  "Usado": "text-[var(--color-text-muted)] border-[var(--color-border-strong)] bg-[var(--color-surface)]",
  "Para Peças": "text-[var(--color-text-dim)] border-[var(--color-border)] bg-transparent",
};

export function MarketplacePreview() {
  return (
    <section
      aria-labelledby="marketplace-title"
      className="relative py-24 lg:py-32 border-t border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end gap-6 justify-between">
          <div className="max-w-2xl">
            <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
              Marketplace
            </p>
            <h2
              id="marketplace-title"
              className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]"
            >
              Equipamento usado, <br />
              <span className="text-[var(--color-brand)]">entre operadores.</span>
            </h2>
            <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
              Réplicas, gear, ammo, patches. Comprador e vendedor são
              operadores verificados pelo ORYX. Você vê categoria, condição,
              cidade e reputação no perfil, tipo um Steam Market do airsoft.
            </p>
          </div>
          <ButtonLink href="/baixar" variant="outline" size="lg">
            Ver no app
            <ArrowRight size={14} />
          </ButtonLink>
        </div>

        <Reveal
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          stagger={0.07}
          y={28}
        >
          {PREVIEW.map((item) => (
            <article
              key={item.title}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden transition-all duration-300 hover:border-[var(--color-brand)]/50 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_var(--color-brand-glow)]"
            >
              {/* Photo placeholder */}
              <div className="aspect-square bg-[var(--color-surface)] relative overflow-hidden">
                <div className="absolute inset-0 tactical-grid opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingBag size={48} className="text-[var(--color-text-dim)] opacity-30" />
                </div>
                {item.badges?.map((b) => (
                  <span
                    key={b}
                    className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-widest bg-[var(--color-brand)] text-white"
                  >
                    <Tag size={10} />
                    {b}
                  </span>
                ))}
                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded-sm border text-[10px] font-mono uppercase tracking-widest ${CONDITION_COLOR[item.condition]}`}
                >
                  {item.condition}
                </span>
              </div>

              <div className="p-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-dim)]">
                  {item.category}
                </div>
                <h3 className="mt-2 text-sm font-bold text-[var(--color-text)] line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-muted)]">
                    {item.seller} · {item.city}
                  </span>
                  <span className="text-base font-black text-[var(--color-brand)] tabular-nums">
                    {formatBRL(item.priceCents)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </Reveal>

        <p className="mt-6 text-xs text-[var(--color-text-dim)]">
          Pré-visualização. Listings reais aparecem no app a partir da
          v0.1.0 (assim que primeiros operadores começarem a anunciar).
        </p>
      </div>
    </section>
  );
}
