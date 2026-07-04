import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const SITE_URL = "https://oryxcontrol.com";
export const SITE_NAME = "ORYX";
export const SITE_TAGLINE = "Comando e controle pra airsoft tático";

// O que está no ar HOJE: o app web em app.oryxcontrol.com (verificado).
// As lojas ainda não têm o app publicado, então o site não aponta pra
// elas até os links existirem de verdade.
export const WEB_APP_URL = "https://app.oryxcontrol.com";
export const STORES_LIVE = false;
