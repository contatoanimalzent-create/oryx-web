import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Manifesto } from "@/components/sections/Manifesto";
import { Journey } from "@/components/sections/Journey";
import { Hierarchy } from "@/components/sections/Hierarchy";
import { Modes } from "@/components/sections/Modes";
import { FieldTech } from "@/components/sections/FieldTech";
import { Organizer } from "@/components/sections/Organizer";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "ORYX, Comando e controle pra airsoft tático",
  description:
    "O ORYX transforma o airsoft em operação de verdade: squad no mapa ao vivo por GPS, missões, zonas, hierarquia e ranking. Jogue agora no navegador em app.oryxcontrol.com.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Manifesto />
      <Journey />
      <Hierarchy />
      <Modes />
      <FieldTech />
      <Organizer />
      <FinalCTA />
    </>
  );
}
