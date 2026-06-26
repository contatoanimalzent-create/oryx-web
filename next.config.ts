import type { NextConfig } from "next";

const config: NextConfig = {
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
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
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
