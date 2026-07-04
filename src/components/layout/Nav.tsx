"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/operadores", label: "Operadores" },
  { href: "/organizadores", label: "Organizadores" },
  { href: "/eventos", label: "Eventos" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-[var(--color-bg)]/85 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="ORYX, página inicial"
          className="hover:opacity-90 transition-opacity"
        >
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium text-[var(--color-text-muted)]",
                "hover:text-[var(--color-text)] transition-colors",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ButtonLink href="/baixar" variant="primary" size="sm">
            Baixar app
            <ArrowUpRight size={14} />
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-[var(--color-surface)]"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[var(--color-bg)] border-t border-[var(--color-border)]">
          <nav className="px-6 py-6 flex flex-col gap-1" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href="/baixar"
              variant="primary"
              size="lg"
              className="mt-4 justify-center"
            >
              Baixar app
              <ArrowUpRight size={16} />
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
