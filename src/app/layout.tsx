import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono, Oswald } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f4f5ef",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}, ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "ORYX é o app de comando e controle para airsoft tático no Brasil. Tracking GPS em tempo real do seu squad, voz por squad, missões, zonas e patentes. Baixe na App Store ou no Google Play.",
  applicationName: SITE_NAME,
  authors: [{ name: "Animalz Group" }],
  generator: "Next.js",
  keywords: [
    "airsoft",
    "airsoft tatico",
    "app airsoft",
    "rastreamento gps airsoft",
    "evento airsoft",
    "operacao airsoft",
    "squad airsoft",
    "comando e controle airsoft",
    "airsoft brasil",
    "milsim airsoft",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME}, ${SITE_TAGLINE}`,
    description:
      "Tracking GPS, voz por squad, missões, zonas e patentes. Baixe na App Store ou no Google Play.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}, Comando e controle pra airsoft tático`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}, ${SITE_TAGLINE}`,
    description:
      "Tracking GPS, voz por squad, missões e ranking pra airsoft tático.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${geistMono.variable} ${oswald.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <StructuredData />
      </body>
    </html>
  );
}

// JSON-LD pra rich results no Google
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "ORYX",
    operatingSystem: "Android, iOS",
    applicationCategory: "GameApplication",
    description:
      "Comando e controle pra airsoft tático: GPS, voz por squad, missões, zonas e patentes.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    publisher: { "@type": "Organization", name: "Animalz Group", url: SITE_URL },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
