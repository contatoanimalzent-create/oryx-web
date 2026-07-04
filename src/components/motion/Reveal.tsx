"use client";

import { useRef, useEffect, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** atraso em segundos */
  delay?: number;
  /** distância inicial em px (eixo Y) */
  y?: number;
  /** anima filhos diretos em cascata */
  stagger?: number;
  /** margem do IntersectionObserver (dispara um pouco antes) */
  rootMargin?: string;
};

/**
 * Reveal coreografado por entrada em viewport (IntersectionObserver + GSAP).
 *
 * Robusto por design: NÃO depende de ScrollTrigger/Lenis (que falhavam por
 * ordem de registro e deixavam seções inteiras invisíveis). Garante visível:
 *  - reduced-motion / sem JS → nasce visível, sem flash;
 *  - se já estiver na viewport no mount → revela na hora;
 *  - safety net: força visível após 1.4s mesmo se o IO não disparar.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 36,
  stagger,
  rootMargin = "0px 0px -12% 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const targets =
      stagger != null ? (Array.from(el.children) as HTMLElement[]) : [el];
    if (targets.length === 0) return;

    gsap.set(targets, { opacity: 0, y, filter: "blur(8px)" });

    let done = false;
    const play = () => {
      if (done) return;
      done = true;
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        overwrite: true,
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 },
    );
    io.observe(el);

    // safety net, nunca deixa conteúdo preso invisível
    const safety = window.setTimeout(play, 1400);

    return () => {
      io.disconnect();
      clearTimeout(safety);
      gsap.killTweensOf(targets);
    };
  }, [delay, y, stagger, rootMargin]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
