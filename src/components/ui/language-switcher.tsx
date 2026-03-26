"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LANGUAGES } from "@/i18n/languages";
import { useLanguage } from "@/i18n/context";

interface LanguageSwitcherProps {
  /** "desktop" = compact flag+code in header; "mobile" = full-width with name in drawer */
  variant?: "desktop" | "mobile";
}

export function LanguageSwitcher({ variant = "desktop" }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Escape closes
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Arrow key navigation inside open list
  const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const items = listRef.current?.querySelectorAll<HTMLButtonElement>("button[role='menuitem']");
    if (!items || items.length === 0) return;
    const focused = document.activeElement;
    const idx = Array.from(items).indexOf(focused as HTMLButtonElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[idx < items.length - 1 ? idx + 1 : 0].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[idx > 0 ? idx - 1 : items.length - 1].focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0].focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[items.length - 1].focus();
    }
  };

  // Focus first item when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const first = listRef.current?.querySelector<HTMLButtonElement>("button[role='menuitem']");
        first?.focus();
      }, 50);
    }
  }, [open]);

  const selectLanguage = (code: string) => {
    setLang(code);
    setOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div ref={ref} className="w-full">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 hover:border-primary/40 hover:bg-primary/5 transition-colors"
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={`Language: ${current.name}`}
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
              ref={listRef}
              role="menu"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="mt-1 w-full bg-white border border-stone-200 rounded-xl shadow-lg overflow-y-auto max-h-64 z-[80]"
              onKeyDown={handleListKeyDown}
            >
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button
                    role="menuitem"
                    aria-current={l.code === lang ? "true" : undefined}
                    onClick={() => selectLanguage(l.code)}
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
        aria-haspopup="menu"
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
            ref={listRef}
            role="menu"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-stone-200 rounded-xl shadow-xl overflow-y-auto max-h-80 z-[200] origin-top-right"
            onKeyDown={handleListKeyDown}
          >
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  role="menuitem"
                  aria-current={l.code === lang ? "true" : undefined}
                  onClick={() => selectLanguage(l.code)}
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
