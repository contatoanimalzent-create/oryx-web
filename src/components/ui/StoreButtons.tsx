import { Globe2, Apple, Play } from "lucide-react";
import { WEB_APP_URL, cn } from "@/lib/utils";

type StoreButtonsProps = {
  className?: string;
  size?: "sm" | "lg";
};

/**
 * CTA de acesso ao ORYX. Hoje o que existe publicado é o app web
 * (app.oryxcontrol.com); as lojas entram quando os links forem reais.
 */
export function StoreButtons({ className, size = "lg" }: StoreButtonsProps) {
  const pad = size === "lg" ? "px-6 h-14" : "px-4 h-11";
  const sub = size === "lg" ? "text-[10px]" : "text-[9px]";
  const main = size === "lg" ? "text-base" : "text-sm";

  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center gap-3", className)}>
      <a
        href={WEB_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir o ORYX no navegador"
        className={cn(
          "group inline-flex items-center gap-3 rounded-xl bg-[var(--color-ink)] text-[var(--color-volt)]",
          "transition-transform hover:-translate-y-0.5",
          pad,
        )}
      >
        <Globe2 size={size === "lg" ? 24 : 20} className="shrink-0" />
        <span className="flex flex-col items-start leading-none">
          <span className={cn("uppercase tracking-wide opacity-70", sub)}>
            Jogar agora
          </span>
          <span className={cn("font-semibold", main)}>app.oryxcontrol.com</span>
        </span>
      </a>

      <div
        className={cn(
          "inline-flex items-center gap-3 rounded-xl border border-[var(--color-border-strong)] text-[var(--color-text-muted)]",
          pad,
        )}
      >
        <span className="flex items-center gap-2">
          <Apple size={size === "lg" ? 20 : 16} className="shrink-0" />
          <Play size={size === "lg" ? 17 : 14} className="shrink-0" />
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className={cn("uppercase tracking-wide opacity-70", sub)}>
            iOS e Android
          </span>
          <span className={cn("font-semibold", main)}>Em breve nas lojas</span>
        </span>
      </div>
    </div>
  );
}
