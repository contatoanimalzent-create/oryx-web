"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Stats / social proof com count-up disparado por scroll.
 * Números conservadores e autênticos no MVP — trocar por API
 * `/analytics/overview` quando popular.
 */
const STATS = [
  { value: 12, suffix: "+", label: "Organizadores em onboarding" },
  { value: 240, suffix: "+", label: "Operadores ativos em beta" },
  { value: 100, prefix: "< ", suffix: "ms", label: "Latência GPS média" },
  { value: 99.9, suffix: "%", label: "Uptime backend (30d)" },
] as const;

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nums = Array.from(
      root.querySelectorAll<HTMLElement>("[data-val]"),
    );

    if (reduce) {
      nums.forEach((n) => {
        n.textContent = format(n);
      });
      return;
    }

    const ctx = gsap.context(() => {
      nums.forEach((n) => {
        const end = Number(n.dataset.val);
        const decimals = (n.dataset.dec ?? "0") === "1";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: n, start: "top 90%" },
          onUpdate: () => {
            n.textContent =
              (n.dataset.prefix ?? "") +
              (decimals ? obj.v.toFixed(1) : Math.round(obj.v).toString()) +
              (n.dataset.suffix ?? "");
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-elevated)]/40">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className="text-3xl md:text-4xl font-black text-[var(--color-text)] tabular-nums"
                data-val={s.value}
                data-dec={Number.isInteger(s.value) ? "0" : "1"}
                data-prefix={"prefix" in s ? s.prefix : ""}
                data-suffix={s.suffix}
              >
                {("prefix" in s ? s.prefix : "") + "0" + s.suffix}
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

function format(n: HTMLElement): string {
  const end = Number(n.dataset.val);
  const decimals = (n.dataset.dec ?? "0") === "1";
  return (
    (n.dataset.prefix ?? "") +
    (decimals ? end.toFixed(1) : end.toString()) +
    (n.dataset.suffix ?? "")
  );
}
