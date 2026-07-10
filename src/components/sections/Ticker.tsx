/**
 * Faixa viva estilo letreiro (o "marquee" do landonorris.com), bloco de
 * cor chapada volt. Só termos reais do produto.
 */
const ITEMS = [
  "GPS ao vivo",
  "Missões",
  "Exércitos",
  "Zonas",
  "Patentes",
  "Ranking",
  "Guerra Total",
  "Competitivo 5x5",
  "Voz por squad",
  "Offline-first",
];

export function Ticker() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-[var(--color-ink)] bg-[var(--color-volt)] py-3">
      <div className="ticker-track flex w-max items-center gap-8">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap font-display text-lg uppercase tracking-wide text-[var(--color-ink)]"
          >
            {item}
            <span aria-hidden className="text-[var(--color-ink)]/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
