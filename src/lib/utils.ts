import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const SITE_URL = "https://oryxcontrol.com";
export const SITE_NAME = "ORYX";
export const SITE_TAGLINE = "Comando e controle pra airsoft tático";

// Lojas oficiais — app já publicado pra iOS e Android.
export const APP_STORE_URL = "https://apps.apple.com/app/oryx-control/id6504000000";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.oryxcontrol.mobile";
