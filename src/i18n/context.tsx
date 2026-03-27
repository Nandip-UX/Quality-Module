// src/i18n/context.tsx
"use client";

// ALL imports first, before any type declarations
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { LANGUAGES, STORAGE_KEY, detectLanguage } from "./languages";

// Translation JSON imports (all at top)
import enUS from "./translations/en-US.json";
import enGB from "./translations/en-GB.json";
import de from "./translations/de.json";
import fr from "./translations/fr.json";
import es from "./translations/es.json";
import it from "./translations/it.json";
import nl from "./translations/nl.json";
import pt from "./translations/pt.json";
import pl from "./translations/pl.json";
import sv from "./translations/sv.json";
import da from "./translations/da.json";
import no from "./translations/no.json";
import fi from "./translations/fi.json";
import cs from "./translations/cs.json";
import hu from "./translations/hu.json";
import ro from "./translations/ro.json";
import el from "./translations/el.json";
import tr from "./translations/tr.json";
import uk from "./translations/uk.json";

// Type declarations after imports
export type Translations = {
  nav: {
    problem: string; howItWorks: string; features: string;
    impact: string; faq: string; requestDemo: string;
  };
  banner: { text: string; cta: string };
  hero: {
    badge: string; headline1: string; headline2: string;
    subtext: string; typewriter: string[]; cta: string;
  };
  quote: { text: string };
  problem: {
    label: string; heading: string; headingHighlight: string; subtext: string;
    items: { title: string; description: string; stat: string; statLabel: string }[];
  };
  timeline: {
    label: string; heading1: string; heading2: string; subtext: string;
    creator: { title: string; description: string; roleLabel: string; points: string[] };
    filler:  { title: string; description: string; roleLabel: string; points: string[] };
    approver:{ title: string; description: string; roleLabel: string; points: string[] };
  };
  features: {
    label: string; heading1: string; heading2: string; subtext: string;
    pdf:      { title: string; description: string };
    snag:     { title: string; description: string };
    rules:    { title: string; description: string };
    template: { title: string; description: string };
    visual: {
      pdfLabels: string[];
      snagItems: { label: string; status: string }[];
      rulesItems: { trigger: string; action: string }[];
      templateItems: string[];
    };
  };
  impact: {
    label: string; heading1: string; heading2: string;
    stats: { label: string }[];
  };
  demo: {
    title: string; description: string;
    success: { title: string; text: string };
    form: {
      name: string; namePlaceholder: string; nameRequired: string;
      email: string; emailPlaceholder: string; emailRequired: string; emailInvalid: string;
      phone: string; phonePlaceholder: string; phoneRequired: string;
      message: string; messagePlaceholder: string; messageRequired: string;
      submit: string;
    };
  };
  faq: {
    title: string; subtitle: string;
    categories: { creator: string; filler: string; approver: string };
    creator:  { question: string; answer: string }[];
    filler:   { question: string; answer: string }[];
    approver: { question: string; answer: string }[];
  };
  footer: {
    description: string;
    product: { title: string; links: { problem: string; features: string; howItWorks: string; impact: string; faq: string } };
    legal:   { title: string; links: { privacy: string; terms: string } };
    copyright: string; tagline: string;
  };
};

interface LanguageContextValue {
  lang: string;
  setLang: (code: string) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const allTranslations: Record<string, Translations> = {
  "en-US": enUS as Translations,
  "en-GB": enGB as Translations,
  de:   de  as Translations,
  fr:   fr  as Translations,
  es:   es  as Translations,
  it:   it  as Translations,
  nl:   nl  as Translations,
  pt:   pt  as Translations,
  pl:   pl  as Translations,
  sv:   sv  as Translations,
  da:   da  as Translations,
  no:   no  as Translations,
  fi:   fi  as Translations,
  cs:   cs  as Translations,
  hu:   hu  as Translations,
  ro:   ro  as Translations,
  el:   el  as Translations,
  tr:   tr  as Translations,
  uk:   uk  as Translations,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<string>("en-US");
  // Guard: only persist to localStorage after detection has run
  const mounted = useRef(false);

  // Detect language on mount
  useEffect(() => {
    const detected = detectLanguage();
    setLangState(detected);
    mounted.current = true;
  }, []);

  // Update <html lang> and persist — only after mount detection
  useEffect(() => {
    if (!mounted.current) return;
    const langMeta = LANGUAGES.find((l) => l.code === lang);
    if (langMeta) document.documentElement.lang = langMeta.htmlLang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (code: string) => {
    if (allTranslations[code]) {
      setLangState(code);
      // Direct persist + html update on manual switch (mounted is always true here)
      const langMeta = LANGUAGES.find((l) => l.code === code);
      if (langMeta) document.documentElement.lang = langMeta.htmlLang;
      localStorage.setItem(STORAGE_KEY, code);
    }
  };

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: allTranslations[lang] ?? allTranslations["en-US"],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
