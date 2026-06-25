"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Mapa ao vivo",
  "Voz por squad",
  "Missões em tempo real",
  "Check-in por GPS",
  "Ranking nacional",
  "Funciona offline",
  "Replay e debrief",
];

/**
 * Faixa cinética infinita (estilo editorial). Dois trilhos idênticos
 * deslizando lado a lado dão o loop sem costura. Pausa no hover.
 */
export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg-deep)]/40 py-5">
      <div className="group flex">
        {[0, 1].map((track) => (
          <motion.ul
            key={track}
            aria-hidden={track === 1}
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 26, ease: "linear", repeat: Infinity }}
            className="flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
          >
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex shrink-0 items-center gap-8 text-2xl md:text-3xl font-black uppercase tracking-tight text-[var(--color-text-muted)]"
              >
                <span className="transition-colors hover:text-[var(--color-text)]">
                  {item}
                </span>
                <span className="text-[var(--color-brand)]">✦</span>
              </li>
            ))}
          </motion.ul>
        ))}
      </div>
    </div>
  );
}
