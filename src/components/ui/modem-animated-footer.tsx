"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

export const AnimatedFooter = ({
  brandName = "QualityModule",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer className="border-t border-stone-200 bg-white mt-0 relative">
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              {/* Brand */}
              <div className="space-y-2 flex flex-col items-center flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="3" y="3" width="18" height="18" rx="4" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                  <span className="font-display font-bold text-2xl text-stone-900">
                    Quality<span className="text-primary">Module</span>
                  </span>
                </div>
                <p className="text-stone-500 font-medium text-center w-full max-w-sm sm:w-96 px-4 sm:px-0 text-sm leading-relaxed">
                  {brandDescription}
                </p>
              </div>

              {/* Social links */}
              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-5 gap-5">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-stone-400 hover:text-primary transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-5 h-5 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Nav links */}
              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-stone-400 max-w-full px-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="hover:text-primary duration-200"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
            <p className="text-sm text-stone-400 text-center md:text-left">
              &copy;{new Date().getFullYear()} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl ? (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-sm text-stone-400 hover:text-stone-600 transition-colors duration-300"
                >
                  Crafted by {creatorName}
                </Link>
              </nav>
            ) : (
              <p className="text-sm text-stone-400">
                Built for teams who build things.
              </p>
            )}
          </div>
        </div>

        {/* Large background watermark text */}
        <div
          className="bg-gradient-to-b from-stone-200 via-stone-100 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4"
          style={{
            fontSize: "clamp(3rem, 12vw, 10rem)",
            maxWidth: "95vw",
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Bottom floating logo */}
        <div className="absolute hover:border-primary/40 duration-300 drop-shadow-[0_0px_24px_rgba(0,131,68,0.2)] bottom-24 md:bottom-20 backdrop-blur-sm rounded-3xl bg-white left-1/2 border-2 border-stone-200 flex items-center justify-center p-3 -translate-x-1/2 z-10">
          <div className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 flex items-center justify-center">
            {brandIcon || (
              <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                {/* Document body */}
                <rect x="6" y="4" width="54" height="68" rx="7" fill="url(#docGrad)" />
                {/* Folded corner highlight */}
                <path d="M42 4 L60 22 L42 22 Z" fill="white" fillOpacity="0.18" />
                <path d="M42 4 L60 22" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
                {/* Text lines */}
                <rect x="16" y="34" width="28" height="4" rx="2" fill="white" fillOpacity="0.85" />
                <rect x="16" y="43" width="22" height="4" rx="2" fill="white" fillOpacity="0.65" />
                <rect x="16" y="52" width="26" height="4" rx="2" fill="white" fillOpacity="0.65" />
                {/* Badge circle shadow */}
                <circle cx="55" cy="66" r="17" fill="white" fillOpacity="0.6" />
                {/* Badge circle */}
                <circle cx="55" cy="66" r="14" fill="url(#badgeGrad)" />
                {/* Checkmark */}
                <path d="M47 66 L52.5 71.5 L63 60" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="docGrad" x1="6" y1="4" x2="60" y2="72" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#5bbf7a" />
                    <stop offset="100%" stopColor="#2d8c4e" />
                  </linearGradient>
                  <linearGradient id="badgeGrad" x1="41" y1="52" x2="69" y2="80" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4caf6e" />
                    <stop offset="100%" stopColor="#1e7a3c" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </div>
        </div>

        {/* Divider line above logo */}
        <div className="absolute bottom-32 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent w-full left-1/2 -translate-x-1/2" />

        {/* Bottom fade */}
        <div className="bg-gradient-to-t from-white via-white/80 to-white/0 absolute bottom-28 w-full h-24 pointer-events-none" />
      </footer>
    </section>
  );
};
