import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const SITE_URL = "https://oryxcontrol.com";
export const SITE_NAME = "ORYX";
export const SITE_TAGLINE = "Comando e controle pra airsoft tático";
export const ANDROID_APK_URL = "https://github.com/contatoanimalzent-create/oryx-mobile1/releases/latest/download/ORYX-release.apk";
