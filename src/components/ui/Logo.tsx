import { cn } from "@/lib/utils";

/**
 * Wordmark provisório enquanto SVG vetorizado da logo não está disponível.
 *
 * Quando user fornecer a SVG da logo (oryx antelope tactical), substituir
 * por <Image src="/logo.svg" /> mantendo as mesmas dimensões.
 */
export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims = {
    sm: { wordmark: "text-base", height: "h-6" },
    md: { wordmark: "text-lg", height: "h-7" },
    lg: { wordmark: "text-2xl", height: "h-9" },
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-bold tracking-[0.25em] select-none",
        dims.wordmark,
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center aspect-square rounded-sm",
          "bg-[var(--color-brand)] text-white font-black",
          dims.height,
        )}
        aria-hidden
      >
        <span className="text-[0.65em] leading-none">▲</span>
      </span>
      <span>ORYX</span>
    </span>
  );
}
