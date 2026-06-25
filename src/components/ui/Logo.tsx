import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo ORYX, wordmark com mascote antelope tactical (SVG vetorizado).
 *
 * Tamanhos: sm (24px ícone + texto sm) / md (28px + base) / lg (40px + 2xl).
 * O ícone fica à esquerda. Em mobile podemos esconder o texto via
 * className="..." se o caller quiser só o mark.
 */
export function Logo({
  className,
  size = "md",
  iconOnly,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
}) {
  const dims = {
    sm: { icon: 24, text: "text-sm" },
    md: { icon: 28, text: "text-base" },
    lg: { icon: 40, text: "text-2xl" },
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-bold tracking-[0.22em] select-none text-[var(--color-text)]",
        dims.text,
        className,
      )}
    >
      <Image
        src="/oryx-logo.png"
        alt="ORYX"
        width={dims.icon}
        height={dims.icon}
        priority
        className="shrink-0"
      />
      {!iconOnly && <span>ORYX</span>}
    </span>
  );
}
