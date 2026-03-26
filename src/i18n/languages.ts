// src/i18n/languages.ts
export interface Language {
  code: string;
  name: string;
  flag: string;
  /** BCP-47 tag for <html lang=""> */
  htmlLang: string;
}

export const LANGUAGES: Language[] = [
  { code: "en-US", name: "English (US)", flag: "🇺🇸", htmlLang: "en-US" },
  { code: "en-GB", name: "English (UK)", flag: "🇬🇧", htmlLang: "en-GB" },
  { code: "de",    name: "German",       flag: "🇩🇪", htmlLang: "de" },
  { code: "fr",    name: "French",       flag: "🇫🇷", htmlLang: "fr" },
  { code: "es",    name: "Spanish",      flag: "🇪🇸", htmlLang: "es" },
  { code: "it",    name: "Italian",      flag: "🇮🇹", htmlLang: "it" },
  { code: "nl",    name: "Dutch",        flag: "🇳🇱", htmlLang: "nl" },
  { code: "pt",    name: "Portuguese",   flag: "🇵🇹", htmlLang: "pt" },
  { code: "pl",    name: "Polish",       flag: "🇵🇱", htmlLang: "pl" },
  { code: "sv",    name: "Swedish",      flag: "🇸🇪", htmlLang: "sv" },
  { code: "da",    name: "Danish",       flag: "🇩🇰", htmlLang: "da" },
  { code: "no",    name: "Norwegian",    flag: "🇳🇴", htmlLang: "no" },
  { code: "fi",    name: "Finnish",      flag: "🇫🇮", htmlLang: "fi" },
  { code: "cs",    name: "Czech",        flag: "🇨🇿", htmlLang: "cs" },
  { code: "hu",    name: "Hungarian",    flag: "🇭🇺", htmlLang: "hu" },
  { code: "ro",    name: "Romanian",     flag: "🇷🇴", htmlLang: "ro" },
  { code: "el",    name: "Greek",        flag: "🇬🇷", htmlLang: "el" },
  { code: "tr",    name: "Turkish",      flag: "🇹🇷", htmlLang: "tr" },
  { code: "uk",    name: "Ukrainian",    flag: "🇺🇦", htmlLang: "uk" },
];

export const DEFAULT_LANG = "en-US";
export const STORAGE_KEY = "qm-language";

/** Detect language from browser, fall back to en-US */
export function detectLanguage(): string {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LANGUAGES.find((l) => l.code === stored)) return stored;

  const nav = navigator.language; // e.g. "en-US", "de-AT", "fr"
  const exact = LANGUAGES.find((l) => l.code === nav);
  if (exact) return exact.code;

  const prefix = nav.split("-")[0];
  const partial = LANGUAGES.find(
    (l) => l.code === prefix || l.code.startsWith(prefix + "-")
  );
  return partial ? partial.code : DEFAULT_LANG;
}
