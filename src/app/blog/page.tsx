import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { ALL_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog ORYX, Airsoft tático, estratégia e equipamento",
  description:
    "Guias, análises e estratégia pra airsoft tático no Brasil. Comparativos de equipamento, regras de modos (CQB, Warfare, Sniper), comportamento em campo e fair play.",
  alternates: { canonical: "/blog" },
  keywords: [
    "blog airsoft",
    "airsoft tatico brasil",
    "estrategia airsoft",
    "milsim brasil",
    "guia airsoft iniciante",
  ],
};

export default function BlogIndex() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32">
      <div className="absolute inset-0 tactical-grid pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <p className="tactical-bracket text-xs font-mono uppercase tracking-widest text-[var(--color-brand)]">
          Blog ORYX
        </p>
        <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
          Inteligência tática <br />
          <span className="text-[var(--color-brand)]">pra airsoft sério.</span>
        </h1>
        <p className="mt-8 text-lg text-[var(--color-text-muted)] max-w-2xl">
          Guias, análises e estratégia escritos por quem joga há mais de
          uma década. Sem listicle preguiçoso, só material que ajuda você
          a render melhor em campo.
        </p>

        <div className="mt-16 grid gap-4">
          {ALL_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 hover:border-[var(--color-brand)]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[var(--color-text-dim)]">
                    <span className="text-[var(--color-brand)]">{post.category}</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(post.publishedAt).toLocaleDateString("pt-BR", { dateStyle: "long" })}
                    </span>
                    <span>{post.readingMinutes}min</span>
                  </div>
                  <h2 className="mt-3 text-2xl md:text-3xl font-black tracking-tight group-hover:text-[var(--color-brand)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-base text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowUpRight
                  size={22}
                  className="text-[var(--color-text-dim)] group-hover:text-[var(--color-brand)] transition-colors shrink-0"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
