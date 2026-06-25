import { forwardRef, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg" | "xl";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-[var(--color-brand)] text-[#0c100e] hover:bg-[var(--color-brand-hover)] " +
    "shadow-[0_8px_24px_-8px_var(--color-brand-glow)] " +
    "active:translate-y-px",
  secondary:
    "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border-strong)] " +
    "hover:bg-[var(--color-bg-elevated)] hover:border-[var(--color-brand)]",
  ghost:
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)]",
  outline:
    "bg-transparent text-[var(--color-text)] border border-[var(--color-border-strong)] " +
    "hover:border-[var(--color-brand)] hover:text-[var(--color-brand-hover)]",
};

const SIZE: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold " +
  "uppercase tracking-wider transition-all duration-150 " +
  "disabled:opacity-50 disabled:cursor-not-allowed " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

// Button (as <button>)
type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(BASE, VARIANT[variant], SIZE[size], className)}
      {...rest}
    />
  );
});

// ButtonLink (as <Link>), usado pra CTAs internas e externas
interface ButtonLinkProps extends BaseProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}
export function ButtonLink({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(BASE, VARIANT[variant], SIZE[size], className);
  if (external || /^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
