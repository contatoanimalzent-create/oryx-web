import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ForWho } from "@/components/sections/ForWho";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";
import { OfflineFeature } from "@/components/sections/OfflineFeature";
import { MarketplacePreview } from "@/components/sections/MarketplacePreview";

export const metadata: Metadata = {
  title: "ORYX, Comando e controle pra airsoft tático",
  description:
    "Comando e controle pra airsoft tático. Você vê a posição do seu squad no mapa em tempo real, fala por canais de voz, cumpre missões e sobe no ranking nacional. Baixe e leve pro próximo jogo.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Features />
      <OfflineFeature />
      <HowItWorks />
      <MarketplacePreview />
      <ForWho />
      <CTA />
    </>
  );
}
