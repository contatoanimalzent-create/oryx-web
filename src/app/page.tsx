import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ForWho } from "@/components/sections/ForWho";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "ORYX — Comando e controle pra airsoft tático",
  description:
    "App grátis pra operadores e organizadores. Tracking GPS em tempo real do seu squad, comunicação por voz, missões dinâmicas e ranking nacional. Baixe agora.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <ForWho />
      <CTA />
    </>
  );
}
