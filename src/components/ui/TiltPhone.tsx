"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { PhoneMockup } from "./PhoneMockup";

/**
 * Envolve o PhoneMockup com tilt 3D reativo ao ponteiro + flutuação
 * idle contínua. Perspectiva real (rotateX/Y) com easing via gsap.quickTo.
 */
export function TiltPhone({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w = wrap.current;
    const c = card.current;
    if (!w || !c || reduce) return;

    const rotX = gsap.quickTo(c, "rotationX", { duration: 0.6, ease: "power3" });
    const rotY = gsap.quickTo(c, "rotationY", { duration: 0.6, ease: "power3" });

    // flutuação idle
    const floaty = gsap.to(c, {
      y: "-=14",
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const onMove = (e: PointerEvent) => {
      const r = w.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotY(px * 18);
      rotX(-py * 14);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
    };

    w.addEventListener("pointermove", onMove);
    w.addEventListener("pointerleave", onLeave);
    return () => {
      w.removeEventListener("pointermove", onMove);
      w.removeEventListener("pointerleave", onLeave);
      floaty.kill();
    };
  }, []);

  return (
    <div
      ref={wrap}
      className={className}
      style={{ perspective: "1200px" }}
    >
      <div ref={card} style={{ transformStyle: "preserve-3d" }}>
        <PhoneMockup className="w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]" />
      </div>
    </div>
  );
}
