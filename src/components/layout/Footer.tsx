import Link from "next/link";
import { Github, Instagram, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const COLS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Produto",
    links: [
      { label: "Baixar app", href: "/baixar" },
      { label: "Para operadores", href: "/operadores" },
      { label: "Para organizadores", href: "/organizadores" },
      { label: "Eventos ativos", href: "/eventos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: "/blog" },
      { label: "Funciona offline", href: "/#offline-title" },
      { label: "Contato", href: "mailto:contato@oryxcontrol.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de uso", href: "/termos" },
      { label: "Política de privacidade", href: "/privacidade" },
      { label: "LGPD", href: "/lgpd" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-sm text-[var(--color-text-muted)] max-w-sm leading-relaxed">
              Comando e controle para airsoft tático no Brasil. Posição em
              tempo real, voz por squad, missões e ranking nacional — tudo
              num único app.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink
                href="https://www.instagram.com/oryxcontrol"
                aria-label="ORYX no Instagram"
              >
                <Instagram size={16} />
              </SocialLink>
              <SocialLink
                href="https://github.com/contatoanimalzent-create"
                aria-label="ORYX no GitHub"
              >
                <Github size={16} />
              </SocialLink>
              <SocialLink
                href="mailto:contato@oryxcontrol.com"
                aria-label="Email"
              >
                <Mail size={16} />
              </SocialLink>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-dim)] mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="text-xs text-[var(--color-text-dim)]">
            © {new Date().getFullYear()} ORYX Control · Animalz Group · Brasília, DF
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-dim)]">
            <MapPin size={12} />
            Operando em sa-east-1 — feito no Brasil
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  children,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  "aria-label": string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
      {...rest}
    >
      {children}
    </a>
  );
}
