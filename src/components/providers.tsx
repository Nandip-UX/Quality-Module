// src/components/providers.tsx
"use client";

import { LanguageProvider } from "@/i18n/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
