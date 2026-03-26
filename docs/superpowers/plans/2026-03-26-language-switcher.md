# Language Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a language dropdown to the header that dynamically translates all website content across 19 languages, persisting the selection in localStorage.

**Architecture:** Custom React Context (`LanguageProvider`) wraps the entire app. A `useLanguage()` hook exposes `{ lang, setLang, t }`. Translation strings live in per-language JSON files under `src/i18n/translations/`. The language switcher component renders in both the desktop header and mobile drawer.

**Tech Stack:** React Context API, localStorage, `navigator.language` for auto-detect, Framer Motion (already installed) for dropdown animation, Tailwind CSS v4, TypeScript.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/i18n/languages.ts` | Language list: code, name, flag emoji |
| Create | `src/i18n/context.tsx` | LanguageContext, LanguageProvider, useLanguage hook |
| Create | `src/i18n/translations/en-US.json` | English (US) — the canonical/complete key set |
| Create | `src/i18n/translations/en-GB.json` | English (UK) |
| Create | `src/i18n/translations/de.json` | German |
| Create | `src/i18n/translations/fr.json` | French |
| Create | `src/i18n/translations/es.json` | Spanish |
| Create | `src/i18n/translations/it.json` | Italian |
| Create | `src/i18n/translations/nl.json` | Dutch |
| Create | `src/i18n/translations/pt.json` | Portuguese |
| Create | `src/i18n/translations/pl.json` | Polish |
| Create | `src/i18n/translations/sv.json` | Swedish |
| Create | `src/i18n/translations/da.json` | Danish |
| Create | `src/i18n/translations/no.json` | Norwegian |
| Create | `src/i18n/translations/fi.json` | Finnish |
| Create | `src/i18n/translations/cs.json` | Czech |
| Create | `src/i18n/translations/hu.json` | Hungarian |
| Create | `src/i18n/translations/ro.json` | Romanian |
| Create | `src/i18n/translations/el.json` | Greek |
| Create | `src/i18n/translations/tr.json` | Turkish |
| Create | `src/i18n/translations/uk.json` | Ukrainian |
| Create | `src/components/ui/language-switcher.tsx` | Dropdown UI: flag + name, highlights current |
| Create | `src/components/providers.tsx` | Client-side wrapper so layout.tsx stays a server component |
| Modify | `src/app/layout.tsx` | Wrap children in `<Providers>` |
| Modify | `src/app/page.tsx` | Replace all hardcoded strings with `t('key')` calls |
| Modify | `src/components/ui/features-section.tsx` | Replace hardcoded strings |
| Modify | `src/components/ui/flickering-footer.tsx` | Replace hardcoded strings |

---

## Task 1: Create language list and types

**Files:**
- Create: `src/i18n/languages.ts`

- [ ] **Step 1: Create the languages file**

```typescript
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
```

- [ ] **Step 2: Commit**
```bash
git add src/i18n/languages.ts
git commit -m "feat(i18n): add language list and browser detection"
```

---

## Task 2: Create LanguageContext and translations type

**Files:**
- Create: `src/i18n/context.tsx`

- [ ] **Step 1: Create context file**

```typescript
// src/i18n/context.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { LANGUAGES, STORAGE_KEY, detectLanguage } from "./languages";

// ── Translation type ─────────────────────────────────────────────────────────
// Keep this flat-ish for easy access in components.
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
    creator: { title: string; description: string; roleLabel: string; points: string[] };
    filler: { title: string; description: string; roleLabel: string; points: string[] };
    approver: { title: string; description: string; roleLabel: string; points: string[] };
  };
  features: {
    label: string; heading1: string; heading2: string; subtext: string;
    pdf: { title: string; description: string };
    snag: { title: string; description: string };
    rules: { title: string; description: string };
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
    creator: { question: string; answer: string }[];
    filler: { question: string; answer: string }[];
    approver: { question: string; answer: string }[];
  };
  footer: {
    description: string;
    product: { title: string; links: { features: string; howItWorks: string; impact: string; faq: string } };
    legal: { title: string; links: { privacy: string; terms: string } };
    copyright: string; tagline: string;
  };
};

// ── Context ───────────────────────────────────────────────────────────────────
interface LanguageContextValue {
  lang: string;
  setLang: (code: string) => void;
  translations: Record<string, Translations>;
  t: Translations; // shorthand: current language's translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────
// Translations are loaded lazily — imported statically here for simplicity.
// To add a new language: import its JSON and add it to the map below.
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

const allTranslations: Record<string, Translations> = {
  "en-US": enUS as Translations,
  "en-GB": enGB as Translations,
  de: de as Translations,
  fr: fr as Translations,
  es: es as Translations,
  it: it as Translations,
  nl: nl as Translations,
  pt: pt as Translations,
  pl: pl as Translations,
  sv: sv as Translations,
  da: da as Translations,
  no: no as Translations,
  fi: fi as Translations,
  cs: cs as Translations,
  hu: hu as Translations,
  ro: ro as Translations,
  el: el as Translations,
  tr: tr as Translations,
  uk: uk as Translations,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<string>("en-US");

  // Detect on mount (client-only)
  useEffect(() => {
    setLangState(detectLanguage());
  }, []);

  // Update <html lang=""> and persist to localStorage
  useEffect(() => {
    const langMeta = LANGUAGES.find((l) => l.code === lang);
    if (langMeta) document.documentElement.lang = langMeta.htmlLang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (code: string) => {
    if (allTranslations[code]) setLangState(code);
  };

  const value: LanguageContextValue = {
    lang,
    setLang,
    translations: allTranslations,
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
```

- [ ] **Step 2: Commit**
```bash
git add src/i18n/context.tsx
git commit -m "feat(i18n): add LanguageContext, Provider and useLanguage hook"
```

---

## Task 3: Create English (US) translation file — the canonical key set

**Files:**
- Create: `src/i18n/translations/en-US.json`

- [ ] **Step 1: Create en-US.json**

```json
{
  "nav": {
    "problem": "Problem",
    "howItWorks": "How It Works",
    "features": "Features",
    "impact": "Impact",
    "faq": "FAQ",
    "requestDemo": "Request Demo"
  },
  "banner": {
    "text": "PDF Audit Export is now live — send clients a signed inspection report in one click.",
    "cta": "Book a Demo"
  },
  "hero": {
    "badge": "Built for Construction & Manufacturing",
    "headline1": "Zero Unchecked",
    "headline2": "Inspections.",
    "subtext": "Mandatory evidence. Multi-level sign-off. Complete audit trail. Built for",
    "typewriter": ["construction teams.", "manufacturing teams.", "QC managers.", "field inspectors."],
    "cta": "Request a Demo"
  },
  "quote": {
    "text": "In industries where one missed check can cost more than the entire project — accountability can't be an afterthought."
  },
  "problem": {
    "label": "The Problem",
    "heading": "Quality failures cost ",
    "headingHighlight": "more than money.",
    "subtext": "The cost isn't just financial — it's structural, legal, and reputational.",
    "items": [
      {
        "title": "Paper Checklists",
        "description": "No timestamps. No ownership. No traceability. Evidence disappears the moment it's filed.",
        "stat": "73%",
        "statLabel": "of field errors go unrecorded"
      },
      {
        "title": "Construction Failures",
        "description": "Unverified materials or alignment create legal exposure — and in the worst cases, structural failure.",
        "stat": "2.4x",
        "statLabel": "higher risk without digital QC"
      },
      {
        "title": "Manufacturing Defects",
        "description": "One unchecked batch. No trail. Zero accountability. Recalls start exactly like this.",
        "stat": "$4.2M",
        "statLabel": "avg. cost per quality failure"
      },
      {
        "title": "Reactive Quality",
        "description": "Catching failures after they happen costs 5x more. Prevention has to happen before the job is done.",
        "stat": "5x",
        "statLabel": "more expensive to fix later"
      }
    ]
  },
  "timeline": {
    "creator": {
      "title": "Creator",
      "roleLabel": "Creator",
      "description": "builds the checklist, configures approval chains, assigns roles, and activates.",
      "points": [
        "Build from scratch or templates",
        "Configure L1 → L2 → L3 approval chain",
        "Assign Fillers & Approvers, then activate"
      ]
    },
    "filler": {
      "title": "Fill & Submit",
      "roleLabel": "Filler",
      "description": "opens assigned checklists, fills each item with evidence, and submits for approval.",
      "points": [
        "Fill checklist items with photo, GPS & notes",
        "Track status: Draft, In Progress, Approved, Rejected",
        "Submit responses on web or mobile app"
      ]
    },
    "approver": {
      "title": "Approve & Reject",
      "roleLabel": "Approver",
      "description": "reviews submissions, signs off or rejects with reason, and raises snags for issues.",
      "points": [
        "Approve with signature or reject with notes",
        "Raise snags for minor issues without full rejection",
        "Multi-level sign-off with timestamped audit trail"
      ]
    }
  },
  "features": {
    "label": "Platform Capabilities",
    "heading1": "From first inspection",
    "heading2": "to final sign-off.",
    "subtext": "Template to audit trail — every step of the inspection lifecycle tracked, enforced, and ready to export.",
    "pdf": {
      "title": "PDF Export & Full Audit Trail",
      "description": "Export any checklist as a structured PDF — all responses, sign-offs, snag logs, and a timestamped audit trail in one document."
    },
    "snag": {
      "title": "Snag-to-Checklist Workflow",
      "description": "Raise, assign, and resolve defects without leaving the checklist. Every snag stays linked to the inspection it came from."
    },
    "rules": {
      "title": "Rule-Based Checklists",
      "description": "Set rules at creation time. Tasks auto-assign by trade, zone, or schedule — no manual delegation, no missed assignments."
    },
    "template": {
      "title": "Template Library",
      "description": "Build once, deploy everywhere. Reusable templates with custom fields and approval chains — ready to launch across any site in seconds."
    },
    "visual": {
      "pdfLabels": ["Site Inspection — Block A", "Electrical Sign-off", "Concrete Pour Check"],
      "snagItems": [
        { "label": "Ceiling crack — Level 3", "status": "Open" },
        { "label": "Door misaligned — Block B", "status": "Resolved" },
        { "label": "Tile gap — Bathroom 2", "status": "Reopened" }
      ],
      "rulesItems": [
        { "trigger": "Zone: Block A", "action": "Assign → Civil Team" },
        { "trigger": "Trade: Electrical", "action": "Link → Gantt Task #42" },
        { "trigger": "Stage: Handover", "action": "Require L2 Approval" }
      ],
      "templateItems": ["Structural Inspection", "MEP Checklist", "Handover QC", "Safety Audit", "Concrete Pour", "Fire Safety"]
    }
  },
  "impact": {
    "label": "Measurable Impact",
    "heading1": "Results teams",
    "heading2": "actually measure.",
    "stats": [
      { "label": "Reduction in field errors" },
      { "label": "Faster inspection cycles" },
      { "label": "Team accountability" },
      { "label": "Missed checklists" }
    ]
  },
  "demo": {
    "title": "Book a Demo",
    "description": "See QualityModule in action. Fill in your details and we'll set up a live walkthrough for your team. Powered by VisiLean.",
    "success": {
      "title": "Message sent!",
      "text": "Our team will reach out within 1 business day."
    },
    "form": {
      "name": "Name",
      "namePlaceholder": "Your name",
      "nameRequired": "Name is required",
      "email": "Email",
      "emailPlaceholder": "you@company.com",
      "emailRequired": "Email is required",
      "emailInvalid": "Enter a valid email address",
      "phone": "Phone",
      "phonePlaceholder": "00000 00000",
      "phoneRequired": "Phone number is required",
      "message": "Message",
      "messagePlaceholder": "Describe your team, site locations, and current inspection process...",
      "messageRequired": "Message is required",
      "submit": "Request a Demo"
    }
  },
  "faq": {
    "title": "Questions, answered.",
    "subtitle": "FAQ",
    "categories": {
      "creator": "Creator",
      "filler": "Filler",
      "approver": "Approver"
    },
    "creator": [
      {
        "question": "What does the Creator role control?",
        "answer": "The Creator (QC Manager / Supervisor) builds checklists from scratch or templates, configures L1→L2→L3 approval chains, assigns Fillers and Approvers, sets trades and task tags, and activates the checklist — instantly notifying the assigned team."
      },
      {
        "question": "Can we use our own checklist templates?",
        "answer": "Absolutely. Build checklists from scratch or import your existing ones. Configure custom fields, trades, tasks, and approval chains to match your exact workflow. Templates can be reused across projects and sites."
      },
      {
        "question": "How do I assign roles and approval levels?",
        "answer": "During checklist creation, you select team members for the Filler and Approver roles. You configure up to 3 approval levels — each level must explicitly sign off before the checklist progresses to the next."
      },
      {
        "question": "Which industries use QualityModule?",
        "answer": "Primarily construction and manufacturing, but any industry with field inspections — infrastructure, energy, oil & gas, pharma — benefits from structured quality workflows."
      }
    ],
    "filler": [
      {
        "question": "What evidence is required for submissions?",
        "answer": "Every submission mandates a photo, GPS location, and detailed notes. The system won't accept submissions without this evidence — zero exceptions. This ensures complete traceability for every checklist item."
      },
      {
        "question": "Does QualityModule work offline on mobile?",
        "answer": "Yes. The mobile app is designed for harsh field conditions with limited connectivity. You can capture evidence and fill checklists offline — everything syncs automatically when connection is restored."
      },
      {
        "question": "Can multiple Fillers work on the same checklist?",
        "answer": "Each checklist item is assigned to a single Filler for clear accountability. However, different items within the same checklist can be assigned to different team members based on their trade or task."
      },
      {
        "question": "What happens after I submit a checklist?",
        "answer": "Once submitted, the checklist moves to the approval queue. The assigned L1 Approver is notified instantly. You can track the approval status in real-time from your Filler dashboard."
      }
    ],
    "approver": [
      {
        "question": "How does multi-level approval prevent errors?",
        "answer": "You configure up to 3 approval levels (L1, L2, L3). Each level must explicitly approve or reject before the checklist progresses. Every action is timestamped with the approver's identity — building a complete audit trail."
      },
      {
        "question": "How does snag tracking work?",
        "answer": "Approvers can raise Snags — minor issues that don't warrant full rejection. Each snag is tracked with a description, supporting media, and resolution status. Snags let you flag problems without blocking the entire workflow."
      },
      {
        "question": "What's included in the PDF audit export?",
        "answer": "Full checklist with all responses, the complete L1/L2/L3 approval chain with timestamps, rejection reasons, snag logs, and media references — a single document ready for clients and auditors."
      },
      {
        "question": "How is QualityModule licensed?",
        "answer": "We offer license-based enterprise pricing — not per-user SaaS. Contact our sales team for a custom quote based on your team size and deployment needs."
      }
    ]
  },
  "footer": {
    "description": "Built for field teams where a missed inspection has real consequences.",
    "product": {
      "title": "Product",
      "links": {
        "features": "Features",
        "howItWorks": "How It Works",
        "impact": "Impact",
        "faq": "FAQ"
      }
    },
    "legal": {
      "title": "Legal",
      "links": {
        "privacy": "Privacy Policy",
        "terms": "Terms & Conditions"
      }
    },
    "copyright": "All rights reserved.",
    "tagline": "Built for industries where quality isn't optional."
  }
}
```

- [ ] **Step 2: Commit**
```bash
git add src/i18n/translations/en-US.json
git commit -m "feat(i18n): add English (US) canonical translation file"
```

---

## Task 4: Create English (UK) translation file

**Files:**
- Create: `src/i18n/translations/en-GB.json`

- [ ] **Step 1: Create en-GB.json**

Same structure as en-US with British English differences (e.g., "organisation" instead of "organization", "licence" instead of "license", etc.). Most keys are identical to en-US — copy en-US.json and apply these changes:
- `demo.form.submit`: "Request a Demo" → keep same
- `footer.tagline`: keep same
- The content is already British-neutral, so en-GB.json can be identical to en-US.json for this project. Create it as a copy.

```bash
cp src/i18n/translations/en-US.json src/i18n/translations/en-GB.json
```

- [ ] **Step 2: Commit**
```bash
git add src/i18n/translations/en-GB.json
git commit -m "feat(i18n): add English (UK) translation file"
```

---

## Task 5: Create all remaining 17 language translation files

**Files:**
- Create: `src/i18n/translations/de.json` through `src/i18n/translations/uk.json`

For each language, translate all user-visible strings. The JSON structure must be identical to en-US.json — only values change, never keys.

- [ ] **Step 1: Create de.json (German)**

```json
{
  "nav": {
    "problem": "Problem",
    "howItWorks": "So funktioniert es",
    "features": "Funktionen",
    "impact": "Wirkung",
    "faq": "FAQ",
    "requestDemo": "Demo anfragen"
  },
  "banner": {
    "text": "PDF-Prüfexport ist jetzt live — senden Sie Kunden mit einem Klick einen signierten Prüfbericht.",
    "cta": "Demo buchen"
  },
  "hero": {
    "badge": "Entwickelt für Bau & Fertigung",
    "headline1": "Null ungeprüfte",
    "headline2": "Inspektionen.",
    "subtext": "Obligatorische Nachweise. Mehrstufige Freigabe. Vollständiger Prüfpfad. Entwickelt für",
    "typewriter": ["Bauteams.", "Fertigungsteams.", "QC-Manager.", "Feldinspektoren."],
    "cta": "Demo anfragen"
  },
  "quote": {
    "text": "In Branchen, in denen eine verpasste Kontrolle mehr kosten kann als das gesamte Projekt — kann Verantwortlichkeit kein Nachgedanke sein."
  },
  "problem": {
    "label": "Das Problem",
    "heading": "Qualitätsfehler kosten ",
    "headingHighlight": "mehr als Geld.",
    "subtext": "Die Kosten sind nicht nur finanziell — sie sind strukturell, rechtlich und reputationsbezogen.",
    "items": [
      {
        "title": "Papierlisten",
        "description": "Keine Zeitstempel. Keine Eigentümerschaft. Keine Rückverfolgbarkeit. Beweise verschwinden, sobald sie abgelegt werden.",
        "stat": "73%",
        "statLabel": "der Fehler im Feld werden nicht erfasst"
      },
      {
        "title": "Baufehler",
        "description": "Nicht verifizierte Materialien oder Ausrichtungen schaffen rechtliche Risiken — und im schlimmsten Fall strukturelles Versagen.",
        "stat": "2,4x",
        "statLabel": "höheres Risiko ohne digitale QK"
      },
      {
        "title": "Fertigungsmängel",
        "description": "Eine ungeprüfte Charge. Kein Protokoll. Keine Verantwortlichkeit. Rückrufaktionen beginnen genau so.",
        "stat": "4,2 Mio. $",
        "statLabel": "durchschn. Kosten pro Qualitätsausfall"
      },
      {
        "title": "Reaktive Qualität",
        "description": "Fehler nachträglich zu beheben kostet 5-mal mehr. Prävention muss vor dem Abschluss der Arbeit stattfinden.",
        "stat": "5x",
        "statLabel": "teurer, wenn später behoben"
      }
    ]
  },
  "timeline": {
    "creator": {
      "title": "Ersteller",
      "roleLabel": "Ersteller",
      "description": "erstellt die Checkliste, konfiguriert Freigabeketten, weist Rollen zu und aktiviert.",
      "points": [
        "Von Grund auf oder aus Vorlagen erstellen",
        "L1 → L2 → L3 Freigabekette konfigurieren",
        "Ausfüller & Genehmiger zuweisen, dann aktivieren"
      ]
    },
    "filler": {
      "title": "Ausfüllen & Einreichen",
      "roleLabel": "Ausfüller",
      "description": "öffnet zugewiesene Checklisten, füllt jeden Punkt mit Belegen aus und reicht zur Genehmigung ein.",
      "points": [
        "Checklistenpunkte mit Foto, GPS & Notizen ausfüllen",
        "Status verfolgen: Entwurf, In Bearbeitung, Genehmigt, Abgelehnt",
        "Antworten über Web oder mobile App einreichen"
      ]
    },
    "approver": {
      "title": "Genehmigen & Ablehnen",
      "roleLabel": "Genehmiger",
      "description": "prüft Einreichungen, gibt frei oder lehnt mit Begründung ab und meldet Mängel.",
      "points": [
        "Mit Unterschrift genehmigen oder mit Notizen ablehnen",
        "Mängel melden ohne vollständige Ablehnung",
        "Mehrstufige Freigabe mit Zeitstempel-Prüfpfad"
      ]
    }
  },
  "features": {
    "label": "Plattformfähigkeiten",
    "heading1": "Von der ersten Inspektion",
    "heading2": "bis zur finalen Freigabe.",
    "subtext": "Von der Vorlage bis zum Prüfpfad — jeder Schritt des Inspektionslebenszyklus verfolgt, durchgesetzt und exportbereit.",
    "pdf": {
      "title": "PDF-Export & vollständiger Prüfpfad",
      "description": "Exportieren Sie jede Checkliste als strukturiertes PDF — alle Antworten, Freigaben, Mängelprotokolle und ein Zeitstempel-Prüfpfad in einem Dokument."
    },
    "snag": {
      "title": "Mangel-zu-Checkliste-Workflow",
      "description": "Mängel melden, zuweisen und beheben, ohne die Checkliste zu verlassen. Jeder Mangel bleibt mit der Inspektion verknüpft, aus der er stammt."
    },
    "rules": {
      "title": "Regelbasierte Checklisten",
      "description": "Regeln bei der Erstellung festlegen. Aufgaben werden automatisch nach Gewerk, Zone oder Zeitplan zugewiesen — keine manuelle Delegation, keine verpassten Zuweisungen."
    },
    "template": {
      "title": "Vorlagenbibliothek",
      "description": "Einmal erstellen, überall einsetzen. Wiederverwendbare Vorlagen mit benutzerdefinierten Feldern und Freigabeketten — in Sekunden auf jeder Baustelle einsatzbereit."
    },
    "visual": {
      "pdfLabels": ["Baustelleninspektion — Block A", "Elektro-Freigabe", "Betonierprüfung"],
      "snagItems": [
        { "label": "Deckenriss — Etage 3", "status": "Offen" },
        { "label": "Tür falsch ausgerichtet — Block B", "status": "Behoben" },
        { "label": "Fliesenlücke — Bad 2", "status": "Wiedereröffnet" }
      ],
      "rulesItems": [
        { "trigger": "Zone: Block A", "action": "Zuweisen → Hochbauteam" },
        { "trigger": "Gewerk: Elektro", "action": "Verknüpfen → Gantt-Aufgabe #42" },
        { "trigger": "Phase: Übergabe", "action": "L2-Genehmigung erforderlich" }
      ],
      "templateItems": ["Tragwerksinspektion", "TGA-Checkliste", "Übergabe-QK", "Sicherheitsaudit", "Betonierung", "Brandschutz"]
    }
  },
  "impact": {
    "label": "Messbarer Einfluss",
    "heading1": "Ergebnisse, die Teams",
    "heading2": "tatsächlich messen.",
    "stats": [
      { "label": "Reduzierung von Feldfehlern" },
      { "label": "Schnellere Inspektionszyklen" },
      { "label": "Teamverantwortlichkeit" },
      { "label": "Verpasste Checklisten" }
    ]
  },
  "demo": {
    "title": "Demo buchen",
    "description": "Sehen Sie QualityModule in Aktion. Füllen Sie Ihre Daten aus und wir richten eine Live-Demo für Ihr Team ein. Powered by VisiLean.",
    "success": {
      "title": "Nachricht gesendet!",
      "text": "Unser Team meldet sich innerhalb von 1 Werktag."
    },
    "form": {
      "name": "Name",
      "namePlaceholder": "Ihr Name",
      "nameRequired": "Name ist erforderlich",
      "email": "E-Mail",
      "emailPlaceholder": "sie@unternehmen.com",
      "emailRequired": "E-Mail ist erforderlich",
      "emailInvalid": "Gültige E-Mail-Adresse eingeben",
      "phone": "Telefon",
      "phonePlaceholder": "00000 00000",
      "phoneRequired": "Telefonnummer ist erforderlich",
      "message": "Nachricht",
      "messagePlaceholder": "Beschreiben Sie Ihr Team, Standorte und den aktuellen Inspektionsprozess...",
      "messageRequired": "Nachricht ist erforderlich",
      "submit": "Demo anfragen"
    }
  },
  "faq": {
    "title": "Fragen, beantwortet.",
    "subtitle": "FAQ",
    "categories": {
      "creator": "Ersteller",
      "filler": "Ausfüller",
      "approver": "Genehmiger"
    },
    "creator": [
      {
        "question": "Was kontrolliert die Ersteller-Rolle?",
        "answer": "Der Ersteller (QK-Manager / Supervisor) erstellt Checklisten von Grund auf oder aus Vorlagen, konfiguriert L1→L2→L3-Freigabeketten, weist Ausfüller und Genehmiger zu, legt Gewerke und Aufgaben-Tags fest und aktiviert die Checkliste — benachrichtigt das zugewiesene Team sofort."
      },
      {
        "question": "Können wir eigene Vorlagen verwenden?",
        "answer": "Absolut. Erstellen Sie Checklisten von Grund auf oder importieren Sie vorhandene. Konfigurieren Sie benutzerdefinierte Felder, Gewerke, Aufgaben und Freigabeketten für Ihren genauen Workflow. Vorlagen können projektübergreifend wiederverwendet werden."
      },
      {
        "question": "Wie weise ich Rollen und Genehmigungsstufen zu?",
        "answer": "Bei der Checklisten-Erstellung wählen Sie Teammitglieder für Ausfüller- und Genehmiger-Rollen. Sie konfigurieren bis zu 3 Genehmigungsstufen — jede Stufe muss explizit freigeben, bevor die Checkliste weiterrückt."
      },
      {
        "question": "Welche Branchen nutzen QualityModule?",
        "answer": "Hauptsächlich Bau und Fertigung, aber jede Branche mit Feldinspektionen — Infrastruktur, Energie, Öl & Gas, Pharma — profitiert von strukturierten Qualitäts-Workflows."
      }
    ],
    "filler": [
      {
        "question": "Welche Belege sind für Einreichungen erforderlich?",
        "answer": "Jede Einreichung erfordert ein Foto, GPS-Standort und detaillierte Notizen. Das System akzeptiert keine Einreichungen ohne diese Belege — keine Ausnahmen. Dies gewährleistet vollständige Rückverfolgbarkeit für jeden Checklistenpunkt."
      },
      {
        "question": "Funktioniert QualityModule offline auf Mobilgeräten?",
        "answer": "Ja. Die mobile App ist für raue Feldbedingungen mit eingeschränkter Konnektivität ausgelegt. Sie können Belege erfassen und Checklisten offline ausfüllen — alles synchronisiert sich automatisch, wenn die Verbindung wiederhergestellt ist."
      },
      {
        "question": "Können mehrere Ausfüller an derselben Checkliste arbeiten?",
        "answer": "Jeder Checklistenpunkt wird einem einzelnen Ausfüller zugewiesen für klare Verantwortlichkeit. Verschiedene Punkte innerhalb derselben Checkliste können jedoch verschiedenen Teammitgliedern zugewiesen werden."
      },
      {
        "question": "Was passiert nach dem Einreichen einer Checkliste?",
        "answer": "Nach der Einreichung gelangt die Checkliste in die Genehmigungswarteschlange. Der zugewiesene L1-Genehmiger wird sofort benachrichtigt. Sie können den Genehmigungsstatus in Echtzeit verfolgen."
      }
    ],
    "approver": [
      {
        "question": "Wie verhindert mehrstufige Genehmigung Fehler?",
        "answer": "Sie konfigurieren bis zu 3 Genehmigungsstufen (L1, L2, L3). Jede Stufe muss explizit genehmigen oder ablehnen, bevor die Checkliste weiterrückt. Jede Aktion wird mit der Identität des Genehmigers zeitgestempelt."
      },
      {
        "question": "Wie funktioniert die Mängelverfolgung?",
        "answer": "Genehmiger können Mängel melden — kleinere Probleme, die keine vollständige Ablehnung rechtfertigen. Jeder Mangel wird mit Beschreibung, Medien und Lösungsstatus verfolgt."
      },
      {
        "question": "Was enthält der PDF-Prüfexport?",
        "answer": "Vollständige Checkliste mit allen Antworten, die vollständige L1/L2/L3-Freigabekette mit Zeitstempeln, Ablehnungsgründen, Mängelprotokollen und Medienreferenzen."
      },
      {
        "question": "Wie wird QualityModule lizenziert?",
        "answer": "Wir bieten lizenzbasierte Unternehmenspreise — kein Benutzer-SaaS. Kontaktieren Sie unser Vertriebsteam für ein individuelles Angebot basierend auf Ihrer Teamgröße."
      }
    ]
  },
  "footer": {
    "description": "Entwickelt für Feldteams, bei denen eine verpasste Inspektion echte Konsequenzen hat.",
    "product": {
      "title": "Produkt",
      "links": {
        "features": "Funktionen",
        "howItWorks": "So funktioniert es",
        "impact": "Wirkung",
        "faq": "FAQ"
      }
    },
    "legal": {
      "title": "Rechtliches",
      "links": {
        "privacy": "Datenschutzrichtlinie",
        "terms": "Allgemeine Geschäftsbedingungen"
      }
    },
    "copyright": "Alle Rechte vorbehalten.",
    "tagline": "Entwickelt für Branchen, in denen Qualität keine Option ist."
  }
}
```

- [ ] **Step 2: Create fr.json (French)**

Translate all strings into French following the same JSON structure. Key translations:
- nav: Problème / Fonctionnement / Fonctionnalités / Impact / FAQ / Demander une démo
- hero.headline1: "Zéro inspection", hero.headline2: "non vérifiée."
- demo.title: "Réserver une démo"
- faq.title: "Questions, répondues."

- [ ] **Step 3: Create es.json (Spanish)**

Key translations:
- nav: Problema / Cómo funciona / Características / Impacto / FAQ / Solicitar demo
- hero.headline1: "Cero inspecciones", hero.headline2: "sin verificar."
- demo.title: "Reservar una demo"

- [ ] **Step 4: Create it.json (Italian)**

Key translations:
- nav: Problema / Come funziona / Funzionalità / Impatto / FAQ / Richiedi demo
- demo.title: "Prenota una demo"

- [ ] **Step 5: Create nl.json (Dutch)**

Key translations:
- nav: Probleem / Hoe het werkt / Functies / Impact / FAQ / Demo aanvragen
- demo.title: "Demo boeken"

- [ ] **Step 6: Create pt.json (Portuguese)**

Key translations:
- nav: Problema / Como funciona / Funcionalidades / Impacto / FAQ / Solicitar demo
- demo.title: "Reservar uma demo"

- [ ] **Step 7: Create pl.json (Polish)**

Key translations:
- nav: Problem / Jak to działa / Funkcje / Wpływ / FAQ / Zamów demo
- demo.title: "Zarezerwuj demo"

- [ ] **Step 8: Create sv.json (Swedish)**

Key translations:
- nav: Problem / Hur det fungerar / Funktioner / Effekt / FAQ / Begär demo
- demo.title: "Boka en demo"

- [ ] **Step 9: Create da.json (Danish)**

Key translations:
- nav: Problem / Sådan fungerer det / Funktioner / Effekt / FAQ / Anmod om demo
- demo.title: "Book en demo"

- [ ] **Step 10: Create no.json (Norwegian)**

Key translations:
- nav: Problem / Slik fungerer det / Funksjoner / Innvirkning / FAQ / Be om demo
- demo.title: "Book en demo"

- [ ] **Step 11: Create fi.json (Finnish)**

Key translations:
- nav: Ongelma / Näin se toimii / Ominaisuudet / Vaikutus / FAQ / Pyydä demo
- demo.title: "Varaa demo"

- [ ] **Step 12: Create cs.json (Czech)**

Key translations:
- nav: Problém / Jak to funguje / Funkce / Dopad / FAQ / Požádat o demo
- demo.title: "Rezervovat demo"

- [ ] **Step 13: Create hu.json (Hungarian)**

Key translations:
- nav: Probléma / Hogyan működik / Funkciók / Hatás / FAQ / Demo kérése
- demo.title: "Demo foglalása"

- [ ] **Step 14: Create ro.json (Romanian)**

Key translations:
- nav: Problemă / Cum funcționează / Funcționalități / Impact / FAQ / Solicită demo
- demo.title: "Rezervați o demonstrație"

- [ ] **Step 15: Create el.json (Greek)**

Key translations:
- nav: Πρόβλημα / Πώς λειτουργεί / Χαρακτηριστικά / Επίδραση / FAQ / Αίτηση επίδειξης
- demo.title: "Κλείστε μια επίδειξη"

- [ ] **Step 16: Create tr.json (Turkish)**

Key translations:
- nav: Sorun / Nasıl Çalışır / Özellikler / Etki / SSS / Demo İste
- demo.title: "Demo Rezervasyonu"

- [ ] **Step 17: Create uk.json (Ukrainian)**

Key translations:
- nav: Проблема / Як це працює / Функції / Вплив / FAQ / Запросити демо
- demo.title: "Замовити демо"

> **Note for each language file**: Use the exact same JSON key structure as en-US.json. Translate all string values. Keep numeric stats (73%, 2.4x, $4.2M, 5x) as-is or localize number format appropriately. The `typewriter` array must have exactly 4 items.

- [ ] **Step 18: Commit all language files**
```bash
git add src/i18n/translations/
git commit -m "feat(i18n): add translations for 17 languages (de, fr, es, it, nl, pt, pl, sv, da, no, fi, cs, hu, ro, el, tr, uk)"
```

---

## Task 6: Create LanguageSwitcher component

**Files:**
- Create: `src/components/ui/language-switcher.tsx`

- [ ] **Step 1: Create the component**

```typescript
// src/components/ui/language-switcher.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LANGUAGES } from "@/i18n/languages";
import { useLanguage } from "@/i18n/context";

interface LanguageSwitcherProps {
  /** "desktop" renders compact icon+code; "mobile" renders full width with name */
  variant?: "desktop" | "mobile";
}

export function LanguageSwitcher({ variant = "desktop" }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  if (variant === "mobile") {
    return (
      <div ref={ref} className="w-full">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 hover:border-primary/40 hover:bg-primary/5 transition-colors"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className="flex items-center gap-2">
            <span className="text-lg leading-none">{current.flag}</span>
            <span>{current.name}</span>
          </span>
          <motion.svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="mt-1 w-full bg-white border border-stone-200 rounded-xl shadow-lg overflow-y-auto max-h-64 z-[80]"
            >
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button
                    role="option"
                    aria-selected={l.code === lang}
                    onClick={() => { setLang(l.code); setOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      l.code === lang
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span>{l.name}</span>
                    {l.code === lang && (
                      <svg className="ml-auto w-3.5 h-3.5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop variant
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors select-none"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.name}`}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden lg:inline text-xs font-semibold text-stone-500 uppercase tracking-wide">
          {current.code.split("-")[0].toUpperCase()}
        </span>
        <motion.svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-stone-200 rounded-xl shadow-xl overflow-y-auto max-h-80 z-[200] origin-top-right"
          >
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  role="option"
                  aria-selected={l.code === lang}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                    l.code === lang
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <span className="text-base leading-none w-5 text-center flex-shrink-0">{l.flag}</span>
                  <span className="flex-1 text-left">{l.name}</span>
                  {l.code === lang && (
                    <svg className="w-3 h-3 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/language-switcher.tsx
git commit -m "feat(i18n): add LanguageSwitcher dropdown component"
```

---

## Task 7: Create Providers wrapper and update layout.tsx

**Files:**
- Create: `src/components/providers.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create providers.tsx**

This keeps layout.tsx as a server component (needed for `export const metadata`).

```typescript
// src/components/providers.tsx
"use client";

import { LanguageProvider } from "@/i18n/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
```

- [ ] **Step 2: Update layout.tsx**

Replace the body content to wrap children with Providers:

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/ui/page-loader";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QualityModule — Digital Quality Enforcement for Field Teams",
  description:
    "Replace paper checklists with a structured, multi-role digital approval workflow. Built for construction and manufacturing teams.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-stone-900 antialiased font-[family-name:var(--font-inter)]">
        <Providers>
          <PageLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add src/components/providers.tsx src/app/layout.tsx
git commit -m "feat(i18n): wrap app in LanguageProvider via Providers client component"
```

---

## Task 8: Update page.tsx — Header, MobileDrawer, Banner, Hero

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add import at top of page.tsx**

After existing imports, add:
```typescript
import { useLanguage } from "@/i18n/context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
```

- [ ] **Step 2: Update `navLinks` — make it a function that uses translations**

Remove the static `navLinks` constant at the top. Instead, create a hook:

```typescript
// Replace the static navLinks constant with this function (used inside components):
function useNavLinks() {
  const { t } = useLanguage();
  return [
    { href: "#problem", label: t.nav.problem },
    { href: "#how-it-works", label: t.nav.howItWorks },
    { href: "#features", label: t.nav.features },
    { href: "#impact", label: t.nav.impact },
    { href: "#faq", label: t.nav.faq },
  ];
}
```

- [ ] **Step 3: Update `Header` component**

```typescript
function Header({ setMobileOpen }: { setMobileOpen: (v: boolean) => void }) {
  const { t } = useLanguage();
  const navLinks = useNavLinks();

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="border-b border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — unchanged */}
        <a href="#" className="flex items-center gap-1">
          <div id="nav-brand-icon" style={{ opacity: 0, width: 44, height: 44, transition: "opacity 0.25s ease", flexShrink: 0 }}>
            <Image src="/loader-icon.png" alt="QualityModule" width={44} height={44} className="w-full h-full object-contain" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-dark">
            Quality<span className="text-primary">Module</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-body font-medium text-stone-600">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
          ))}
        </nav>

        {/* Desktop CTA + Language Switcher */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher variant="desktop" />
          <a href="#demo">
            <ShinyButton className="h-10 px-6 text-sm">{t.nav.requestDemo}</ShinyButton>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          aria-label="Open menu"
        >
          <span className="w-5 h-0.5 bg-stone-800 block rounded-full" />
          <span className="w-5 h-0.5 bg-stone-800 block rounded-full" />
          <span className="w-3 h-0.5 bg-stone-800 block rounded-full self-start ml-1" />
        </button>
      </div>
    </motion.header>
  );
}
```

- [ ] **Step 4: Update `MobileDrawer` component**

```typescript
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const navLinks = useNavLinks();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — unchanged */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          <motion.div
            key="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-[78vw] max-w-xs z-[70] bg-white shadow-2xl flex flex-col md:hidden"
          >
            {/* Drawer header — unchanged */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-stone-100">
              <a href="#" className="flex items-center gap-2" onClick={onClose}>
                <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="3" y="3" width="18" height="18" rx="4" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
                <span className="font-display font-bold text-base tracking-tight text-dark">
                  Quality<span className="text-primary">Module</span>
                </span>
              </a>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-4 pt-4 pb-2 gap-1 flex-1">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-4 rounded-xl text-xl font-bold text-stone-800 hover:bg-primary-50 hover:text-primary active:scale-95 transition-all"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>

            {/* Language switcher + CTA at bottom */}
            <div className="px-6 pb-8 pt-4 border-t border-stone-100 flex flex-col gap-3">
              <LanguageSwitcher variant="mobile" />
              <a href="#demo" onClick={onClose}>
                <ShinyButton className="w-full text-sm">{t.nav.requestDemo}</ShinyButton>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 5: Update `Hero` component**

```typescript
function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      {/* background orbs — unchanged */}
      ...
      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <>
              <motion.div ...>
                <span className="text-sm font-body font-semibold text-primary-dark">
                  {t.hero.badge}
                </span>
              </motion.div>

              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-stone-900">
                <CharStagger text={t.hero.headline1} delay={0.4} />
                <br />
                <span className="text-primary">
                  <CharStagger text={t.hero.headline2} delay={0.9} />
                </span>
              </h1>

              <div className="max-w-2xl mx-auto mb-4">
                <BlurReveal delay={1.2}>
                  <p className="font-body text-lg md:text-xl text-stone-600 leading-relaxed">
                    {t.hero.subtext}{" "}
                    <Typewriter
                      words={t.hero.typewriter}
                      className="text-primary font-semibold"
                    />
                  </p>
                </BlurReveal>
              </div>

              <BlurReveal delay={1.5}>
                <div className="flex items-center justify-center mt-10">
                  <a href="#demo">
                    <ShinyButton className="h-12 px-10 text-base">
                      {t.hero.cta}
                    </ShinyButton>
                  </a>
                </div>
              </BlurReveal>
            </>
          }
        >
          {/* Images — unchanged */}
          ...
        </ContainerScroll>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Update Banner in `Home` component**

In the `Home` component's JSX, replace the Banner title and action label:
```typescript
<Banner
  show={showBanner}
  onHide={() => setShowBanner(false)}
  icon={<FileText className="m-px h-4 w-4 text-green-800" />}
  title={
    <>
      {t.banner.text}
    </>
  }
  action={{
    label: t.banner.cta,
    onClick: () => { document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" }); },
  }}
/>
```

To use `t` in `Home`, add `const { t } = useLanguage();` at the top of the `Home` function.

- [ ] **Step 7: Commit**
```bash
git add src/app/page.tsx
git commit -m "feat(i18n): wire translations into Header, MobileDrawer, Hero, Banner"
```

---

## Task 9: Update page.tsx — Problem, Quote, HowItWorks, Impact

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update `ProblemSection`**

```typescript
function ProblemSection() {
  const { t } = useLanguage();
  const problems = t.problem.items.map((item, i) => ({
    ...item,
    icon: [ClipboardCheck, AlertTriangle, Factory, Clock][i],
  }));

  return (
    <section id="problem" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-primary mb-4">
            {t.problem.label}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl xl:font-extrabold text-stone-900">
            {t.problem.heading}
            <span className="text-primary">{t.problem.headingHighlight}</span>
          </h2>
          <p className="text-stone-500 mt-4 text-sm tracking-wide text-balance md:text-base">
            {t.problem.subtext}
          </p>
        </AnimatedContainer>
        <AnimatedContainer delay={0.4} className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed divide-stone-200 border-stone-200 sm:grid-cols-2">
          {problems.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update the inline quote (TextGradientScroll)**

In the `Home` JSX, update the quote section:
```typescript
<TextGradientScroll
  text={t.quote.text}
  type="letter"
  textOpacity="medium"
  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug lg:leading-tight text-stone-900"
/>
```

- [ ] **Step 3: Update `HowItWorksTimeline`**

```typescript
function HowItWorksTimeline() {
  const { t } = useLanguage();
  const shadowClass = "shadow-[0_0_24px_rgba(34,42,53,0.06),...]";

  const data = [
    {
      title: t.timeline.creator.title,
      content: (
        <div>
          <p className="text-stone-300 text-xs md:text-sm font-normal mb-4">
            The <span className="text-primary-light font-semibold">{t.timeline.creator.roleLabel}</span> {t.timeline.creator.description}
          </p>
          <div className="mb-8">
            {t.timeline.creator.points.map((point, i) => (
              <div key={i} className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
                <span className="text-primary-light">&#10003;</span> {point}
              </div>
            ))}
          </div>
          <Image src="/Creator.png" alt="Creator role" width={800} height={600} className={`rounded-lg object-cover h-auto w-full ${shadowClass}`} />
        </div>
      ),
    },
    {
      title: t.timeline.filler.title,
      content: (
        <div>
          <p className="text-stone-300 text-xs md:text-sm font-normal mb-4">
            The <span className="text-primary-light font-semibold">{t.timeline.filler.roleLabel}</span> {t.timeline.filler.description}
          </p>
          <div className="mb-8">
            {t.timeline.filler.points.map((point, i) => (
              <div key={i} className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
                <span className="text-primary-light">&#10003;</span> {point}
              </div>
            ))}
          </div>
          <Image src="/Filler.png" alt="Filler role" width={800} height={600} className={`rounded-lg object-cover h-auto w-full ${shadowClass}`} />
        </div>
      ),
    },
    {
      title: t.timeline.approver.title,
      content: (
        <div>
          <p className="text-stone-300 text-xs md:text-sm font-normal mb-4">
            The <span className="text-primary-light font-semibold">{t.timeline.approver.roleLabel}</span> {t.timeline.approver.description}
          </p>
          <div className="mb-8">
            {t.timeline.approver.points.map((point, i) => (
              <div key={i} className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
                <span className="text-primary-light">&#10003;</span> {point}
              </div>
            ))}
          </div>
          <Image src="/Approver.png" alt="Approver role" width={800} height={600} className={`rounded-lg object-cover h-auto w-full ${shadowClass}`} />
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works">
      <Timeline data={data} />
    </section>
  );
}
```

- [ ] **Step 4: Update `ImpactSection`**

```typescript
function ImpactSection() {
  const { t } = useLanguage();
  const stats = [
    { target: 85, suffix: "%", label: t.impact.stats[0].label, colors: ["#008344", "#00a856", "#00c853"], delay: 0.2 },
    { target: 3, suffix: "x", label: t.impact.stats[1].label, colors: ["#00a856", "#008344", "#006633"], delay: 0.4 },
    { target: 100, suffix: "%", label: t.impact.stats[2].label, colors: ["#006633", "#00c853", "#008344"], delay: 0.6 },
    { target: 0, suffix: "", label: t.impact.stats[3].label, colors: ["#008344", "#006633", "#00a856"], delay: 0.8 },
  ];

  return (
    <section id="impact">
      <SmoothScrollHero ...>
        <div className="max-w-7xl mx-auto px-6 text-white w-full">
          <div className="text-center mb-16">
            <span className="inline-block font-body text-sm font-bold uppercase tracking-widest text-primary-light mb-4">
              {t.impact.label}
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight">
              {t.impact.heading1}{" "}
              <span className="text-primary-light">{t.impact.heading2}</span>
            </h2>
          </div>
          {/* stats grid — unchanged structure, use s.label from above */}
          ...
        </div>
      </SmoothScrollHero>
    </section>
  );
}
```

- [ ] **Step 5: Commit**
```bash
git add src/app/page.tsx
git commit -m "feat(i18n): wire translations into Problem, Quote, Timeline, Impact"
```

---

## Task 10: Update page.tsx — FinalCTA and FAQSection

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update `FinalCTA`**

```typescript
function FinalCTA() {
  const { t } = useLanguage();
  const [fields, setFields] = React.useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = t.demo.form.nameRequired;
    if (!fields.email.trim()) e.email = t.demo.form.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = t.demo.form.emailInvalid;
    if (!fields.phone.trim()) e.phone = t.demo.form.phoneRequired;
    if (!fields.message.trim()) e.message = t.demo.form.messageRequired;
    return e;
  };

  // ... rest of submit handler unchanged ...

  return (
    <section id="demo" ...>
      <ContactCard
        title={t.demo.title}
        description={t.demo.description}
        contactInfo={[/* office data — addresses/phones unchanged */]}
      >
        {submitted ? (
          <motion.div ...>
            ...
            <p className="text-white font-semibold text-lg">{t.demo.success.title}</p>
            <p className="text-stone-400 text-sm">{t.demo.success.text}</p>
          </motion.div>
        ) : (
          <form ...>
            <div className="flex flex-col gap-1">
              <Label className="text-stone-300">{t.demo.form.name} <span className="text-red-400">*</span></Label>
              <Input type="text" placeholder={t.demo.form.namePlaceholder} ... />
              <FieldError message={errors.name} />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-stone-300">{t.demo.form.email} <span className="text-red-400">*</span></Label>
              <Input type="email" placeholder={t.demo.form.emailPlaceholder} ... />
              <FieldError message={errors.email} />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-stone-300">{t.demo.form.phone} <span className="text-red-400">*</span></Label>
              <PhoneInput placeholder={t.demo.form.phonePlaceholder} ... />
              <FieldError message={errors.phone} />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-stone-300">{t.demo.form.message} <span className="text-red-400">*</span></Label>
              <Textarea placeholder={t.demo.form.messagePlaceholder} ... />
              <FieldError message={errors.message} />
            </div>
            <ShinyButton className="w-full" type="submit">{t.demo.form.submit}</ShinyButton>
          </form>
        )}
      </ContactCard>
    </section>
  );
}
```

- [ ] **Step 2: Update `FAQSection`**

```typescript
function FAQSection() {
  const { t } = useLanguage();

  const faqCategories: Record<string, string> = {
    creator: t.faq.categories.creator,
    filler: t.faq.categories.filler,
    approver: t.faq.categories.approver,
  };

  const faqData: Record<string, { question: string; answer: string }[]> = {
    creator: t.faq.creator,
    filler: t.faq.filler,
    approver: t.faq.approver,
  };

  return (
    <div id="faq">
      <FAQ
        title={t.faq.title}
        subtitle={t.faq.subtitle}
        categories={faqCategories}
        faqData={faqData}
      />
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add src/app/page.tsx
git commit -m "feat(i18n): wire translations into FinalCTA form and FAQ section"
```

---

## Task 11: Update features-section.tsx

**Files:**
- Modify: `src/components/ui/features-section.tsx`

- [ ] **Step 1: Wire translations into FeaturesSection**

```typescript
// src/components/ui/features-section.tsx
"use client";
import { useLanguage } from "@/i18n/context";
// ... existing imports ...

export function FeaturesSection() {
  const { t } = useLanguage();
  const f = t.features;
  const v = f.visual;

  // Rebuild features array from translations
  const features = [
    { icon: FileText,     title: f.pdf.title,      description: f.pdf.description,      visual: "pdf",      span: "sm:col-span-3", corner: "sm:rounded-tl-xl" },
    { icon: AlertOctagon, title: f.snag.title,     description: f.snag.description,     visual: "snag",     span: "sm:col-span-2", corner: "sm:rounded-tr-xl" },
    { icon: GitBranch,    title: f.rules.title,    description: f.rules.description,    visual: "rules",    span: "sm:col-span-2", corner: "sm:rounded-bl-xl" },
    { icon: LayoutTemplate, title: f.template.title, description: f.template.description, visual: "template", span: "sm:col-span-3", corner: "sm:rounded-br-xl" },
  ];

  // Update VisualPDF, VisualSnag, VisualRules, VisualTemplate to use v.* data
  // These are defined inline in the component — update them to receive the visual data as props
  // or access `t` from context directly inside them.
  ...

  return (
    <section id="features" className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-primary mb-4">
            {f.label}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4">
            {f.heading1}{" "}
            <span className="text-primary">{f.heading2}</span>
          </h2>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto">
            {f.subtext}
          </p>
        </div>
        {/* Bento grid — same structure, use features[i].title and .description */}
        ...
      </div>
    </section>
  );
}
```

For the visual sub-components (VisualPDF, VisualSnag, VisualRules, VisualTemplate), pass the visual data down from `FeaturesSection` — or have each call `useLanguage()` directly:

```typescript
function VisualPDF() {
  const { t } = useLanguage();
  return (
    <div className="relative mt-6 h-36 overflow-hidden pl-6">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
      <div className="flex flex-col gap-2">
        {t.features.visual.pdfLabels.map((label, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-stone-200 bg-stone-50 px-4 py-2.5">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-3 h-3 text-primary" />
            </div>
            <span className="text-xs text-stone-600 font-medium">{label}</span>
            <span className="ml-auto text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">PDF</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualSnag() {
  const { t } = useLanguage();
  const statusColors: Record<string, string> = {
    Open: "text-red-500 bg-red-50", Offen: "text-red-500 bg-red-50",
    Resolved: "text-green-600 bg-green-50", Behoben: "text-green-600 bg-green-50",
    Reopened: "text-amber-600 bg-amber-50", Wiedereröffnet: "text-amber-600 bg-amber-50",
  };
  // Fallback: use index-based colors
  const indexColors = ["text-red-500 bg-red-50", "text-green-600 bg-green-50", "text-amber-600 bg-amber-50"];
  return (
    <div className="mt-6 flex flex-col gap-2 px-2">
      {t.features.visual.snagItems.map((s, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2">
          <AlertOctagon className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <span className="text-xs text-stone-600 truncate flex-1">{s.label}</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[s.status] ?? indexColors[i]}`}>{s.status}</span>
        </div>
      ))}
    </div>
  );
}

function VisualRules() {
  const { t } = useLanguage();
  return (
    <div className="mt-4 flex flex-col gap-2">
      {t.features.visual.rulesItems.map((r, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="bg-primary/10 text-primary font-medium px-2 py-1 rounded">{r.trigger}</span>
          <span className="text-stone-400">→</span>
          <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded">{r.action}</span>
        </div>
      ))}
    </div>
  );
}

function VisualTemplate() {
  const { t } = useLanguage();
  return (
    <div className="relative mt-6 h-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
      <div className="grid grid-cols-3 gap-2">
        {t.features.visual.templateItems.map((name, i) => (
          <div key={i} className="flex flex-col gap-1 rounded-lg border border-stone-200 bg-stone-50 p-3">
            <LayoutTemplate className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-medium text-stone-600 leading-tight">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/features-section.tsx
git commit -m "feat(i18n): wire translations into FeaturesSection and visual sub-components"
```

---

## Task 12: Update flickering-footer.tsx

**Files:**
- Modify: `src/components/ui/flickering-footer.tsx`

- [ ] **Step 1: Wire translations**

```typescript
// At top of flickering-footer.tsx, add:
import { useLanguage } from "@/i18n/context";

// Inside QualityModuleFooter:
export const QualityModuleFooter = () => {
  const { t } = useLanguage();
  const tablet = useMediaQuery("(max-width: 1024px)");

  const footerColumns = [
    {
      title: t.footer.product.title,
      links: [
        { label: t.footer.product.links.features,   href: "#features" },
        { label: t.footer.product.links.howItWorks, href: "#how-it-works" },
        { label: t.footer.product.links.impact,     href: "#impact" },
        { label: t.footer.product.links.faq,        href: "#faq" },
      ],
    },
    {
      title: t.footer.legal.title,
      links: [
        { label: t.footer.legal.links.privacy, href: "#" },
        { label: t.footer.legal.links.terms,   href: "#" },
      ],
    },
  ];

  return (
    <footer id="footer" ...>
      {/* Left brand section */}
      <p className="text-stone-500 font-medium text-sm leading-relaxed mb-6">
        {t.footer.description}
      </p>
      {/* ... social icons unchanged ... */}

      {/* Footer columns — use footerColumns from above */}
      ...

      {/* Bottom bar */}
      <p className="text-xs text-stone-400">
        &copy;{new Date().getFullYear()} QualityModule. {t.footer.copyright}
      </p>
      <p className="text-xs text-stone-400">
        {t.footer.tagline}
      </p>
    </footer>
  );
};
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/flickering-footer.tsx
git commit -m "feat(i18n): wire translations into Footer"
```

---

## Task 13: Final check — verify build and visual test

- [ ] **Step 1: Run the dev server**
```bash
cd /Users/nandip.vaghasiya/Desktop/Checklist\ 1.0/quality-landing
npm run dev
```
Expected: Server starts on localhost:3000 with no TypeScript errors.

- [ ] **Step 2: Check for TypeScript errors**
```bash
npm run build
```
Expected: Build completes with 0 errors. Fix any type errors before proceeding.

- [ ] **Step 3: Manual smoke test**
- Open http://localhost:3000
- Verify language dropdown appears in header (flag + code)
- Switch to German (🇩🇪) — all nav labels, hero, FAQ should update
- Switch to Greek (🇬🇷) — verify non-Latin characters render correctly
- Reload the page — verify the selected language persists (localStorage)
- Test on mobile viewport — verify language switcher appears in mobile drawer

- [ ] **Step 4: Final commit**
```bash
git add .
git commit -m "feat: complete language switcher implementation — 19 languages with auto-detection and localStorage persistence"
```

---

## Adding a New Language in the Future

1. Add entry to `src/i18n/languages.ts` LANGUAGES array
2. Create `src/i18n/translations/[code].json` with same key structure as en-US.json
3. Import and register in `src/i18n/context.tsx` (two lines: import + add to `allTranslations`)

That's it. No other files need to change.
