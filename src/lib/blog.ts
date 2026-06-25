/**
 * Inventário de posts do blog. Cada post vive em src/app/blog/[slug]/page.tsx
 * (server component), esse arquivo só agrega metadata.
 *
 * Quando o blog crescer pra ~20 posts, migramos pra MDX em /content/blog/*.mdx
 * com leitura via fs no build time. Até lá, hard-coded resolve.
 */

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  keywords?: string[];
}

export const ALL_POSTS: BlogPostMeta[] = [
  {
    slug: "melhor-app-airsoft-tatico-2026",
    title:
      "Melhor app pra airsoft tático em 2026: ORYX vs Ares Alpha vs WarCamp",
    excerpt:
      "Comparativo direto entre as 3 plataformas de comando e controle pra airsoft tático disponíveis no Brasil. Tracking GPS, voz, anti-cheat, marketplace e preço, quem ganha em cada categoria.",
    category: "Comparativo",
    publishedAt: "2026-05-20",
    readingMinutes: 9,
    keywords: [
      "app airsoft",
      "ares alpha vs",
      "warcamp",
      "comparativo app airsoft",
      "melhor app airsoft tatico",
    ],
  },
];
