import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  // R3F/WebGL: o double-mount do Strict Mode em dev descarta o contexto GL
  // e o canvas fica em branco. Desligado pra o WebGL pintar tambem em dev.
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "media.oryxcontrol.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; form-action 'self' mailto:; img-src 'self' data: blob: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; connect-src 'self' https:; upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Vanity URLs → deeplinks
      { source: "/app", destination: "/baixar", permanent: false },
      { source: "/download", destination: "/baixar", permanent: false },
      { source: "/jogar", destination: "/baixar", permanent: false },
    ];
  },
};

export default config;
