"use client";

import { useRef, useEffect, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  /** dispara quando o topo do elemento cruza esse ponto da viewport */
  start?: string;
};

/**
 * Reveal coreografado por scroll (GSAP ScrollTrigger).
 * Usado em todas as seções pra entrada com peso e profundidade.
 * Sem JS / reduced-motion: o conteúdo já nasce visível (sem flash).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 36,
  stagger,
  start = "top 82%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const targets =
        stagger != null
          ? (Array.from(el.children) as HTMLElement[])
          : [el];

      gsap.set(targets, { opacity: 0, y, filter: "blur(8px)" });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger, start]);

  return (
    // @ts-expect-error — ref polimórfico é seguro aqui
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
