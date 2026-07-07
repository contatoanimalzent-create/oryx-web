# oryx-web

Site institucional + marketing do ORYX em [oryxcontrol.com](https://oryxcontrol.com).

## Stack

- **Next.js 16** (App Router, server components)
- **Tailwind CSS v4** (design tokens via @theme)
- **TypeScript strict**
- **Radix UI** primitives (a11y by default)
- **GSAP + Lenis** (animações cinemáticas + smooth scroll)
- **Vercel** hosting (region gru1 São Paulo)

## Setup local

```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy

Auto-deploy via Vercel team `juniors-projects-f6805f3a`. `vercel.json` define region `gru1`.

```bash
npx vercel --prod --scope juniors-projects-f6805f3a
```

## Estrutura

```
src/
├── app/                  rotas Next.js (App Router)
│   ├── page.tsx          landing
│   ├── operadores/       B2C funnel
│   ├── organizadores/    B2B funnel
│   ├── baixar/           download APK + iOS soon
│   ├── eventos/          public events list (fetch /events do backend)
│   ├── sobre/            company
│   ├── termos/           legal
│   ├── privacidade/      LGPD
│   ├── sitemap.ts        gerado dinamicamente
│   └── robots.ts         gerado dinamicamente
├── components/
│   ├── layout/           Nav + Footer
│   ├── sections/         seções da landing
│   └── ui/               Button, Logo, primitives
└── lib/                  helpers (utils.ts)
```

## SEO

- Metadata API do Next.js em cada rota
- Open Graph + Twitter Card configurados em layout.tsx
- JSON-LD structured data (MobileApplication schema)
- sitemap.xml + robots.txt dinâmicos
- pt-BR como linguagem primária
- Keywords mapeados em metadata.keywords

## Design tokens

Cores extraídas da logo:

```
--color-bg: #0A0A0A       base
--color-brand: #C8202C    accent (vermelho tático)
--color-text: #F5F5F5     off-white
```
