import { Apple, Play } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL, cn } from "@/lib/utils";

type StoreButtonsProps = {
  className?: string;
  size?: "sm" | "lg";
};

/**
 * Botões das lojas oficiais. Distribuição do ORYX é SOMENTE via
 * App Store e Google Play.
 */
export function StoreButtons({ className, size = "lg" }: StoreButtonsProps) {
  const pad = size === "lg" ? "px-6 h-14" : "px-4 h-11";
  const sub = size === "lg" ? "text-[10px]" : "text-[9px]";
  const main = size === "lg" ? "text-base" : "text-sm";

  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center gap-3", className)}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Baixar ORYX na App Store"
        className={cn(
          "group inline-flex items-center gap-3 rounded-xl bg-[var(--color-ink)] text-[var(--color-volt)]",
          "transition-transform hover:-translate-y-0.5",
          pad,
        )}
      >
        <Apple size={size === "lg" ? 24 : 20} className="shrink-0" />
        <span className="flex flex-col items-start leading-none">
          <span className={cn("uppercase tracking-wide opacity-70", sub)}>
            Baixar na
          </span>
          <span className={cn("font-semibold", main)}>App Store</span>
        </span>
      </a>

      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Baixar ORYX no Google Play"
        className={cn(
          "group inline-flex items-center gap-3 rounded-xl bg-[var(--color-ink)] text-[var(--color-volt)]",
          "transition-transform hover:-translate-y-0.5",
          pad,
        )}
      >
        <Play
          size={size === "lg" ? 21 : 17}
          className="shrink-0 fill-[var(--color-volt)]"
        />
        <span className="flex flex-col items-start leading-none">
          <span className={cn("uppercase tracking-wide opacity-70", sub)}>
            Disponível no
          </span>
          <span className={cn("font-semibold", main)}>Google Play</span>
        </span>
      </a>
    </div>
  );
}
