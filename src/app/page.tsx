"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { FileText, ClipboardCheck, AlertTriangle, Factory, Clock } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Banner } from "@/components/ui/banner";
import { Timeline } from "@/components/ui/timeline";
import { QualityFeaturesBentoGrid } from "@/components/ui/feature-bento-grid";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { FAQ } from "@/components/ui/faq-tabs";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { ContactCard } from "@/components/ui/contact-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ShinyButton from "@/components/ui/shiny-button";
import { PhoneInput } from "@/components/ui/phone-input";
import { QualityModuleFooter } from "@/components/ui/flickering-footer";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import {
  BlurReveal,
  CharStagger,
  AnimatedCounter,
  FadeUp,
  SlideIn,
  ScaleUp,
  MagneticButton,
  StaggerContainer,
  staggerChild,
  GlowCard,
  Typewriter,
} from "@/components/animations";

/* ════════════════════════════════════════════════════════
   SECTION 1 — HEADER / NAV
   ════════════════════════════════════════════════════════ */
const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#impact", label: "Impact" },
  { href: "#faq", label: "FAQ" },
];

function Header({ setMobileOpen }: { setMobileOpen: (v: boolean) => void }) {

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="border-b border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1.5">
          <div id="nav-brand-icon" style={{ opacity: 0, width: 44, height: 44, transition: "opacity 0.2s ease", flexShrink: 0 }}>
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

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <a href="#demo">
            <ShinyButton className="h-10 px-6 text-sm">Request Demo</ShinyButton>
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

/* Drawer + backdrop — rendered outside the transformed nav wrapper in Home */
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Slide-in drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-[78vw] max-w-xs z-[70] bg-white shadow-2xl flex flex-col md:hidden"
          >
            {/* Drawer header */}
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

            {/* CTA at bottom */}
            <div className="px-6 pb-8 pt-4 border-t border-stone-100">
              <a href="#demo" onClick={onClose}>
                <ShinyButton className="w-full text-sm">Request Demo</ShinyButton>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 2 — HERO (Container Scroll Animation)
   ════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-28">
      {/* Background mesh orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="mesh-orb absolute top-20 -left-16 w-[300px] h-[300px] md:w-[500px] md:h-[500px] md:-left-32 rounded-full bg-primary/5 blur-[100px]" />
        <div className="mesh-orb-2 absolute top-40 -right-16 w-[300px] h-[300px] md:w-[600px] md:h-[600px] md:right-0 rounded-full bg-primary/8 blur-[120px]" />
        <div className="mesh-orb-3 absolute bottom-20 left-1/3 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-accent/5 blur-[80px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10">
        <ContainerScroll
          titleComponent={
            <>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-1.5 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-sm font-body font-semibold text-primary-dark">
                  Enterprise Quality Platform
                </span>
              </motion.div>

              {/* Main headline */}
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6 text-stone-900">
                <CharStagger text="Zero Unchecked" delay={0.4} />
                <br />
                <span className="text-primary">
                  <CharStagger text="Inspections." delay={0.9} />
                </span>
              </h1>

              {/* Subheadline */}
              <div className="max-w-2xl mx-auto mb-4">
                <BlurReveal delay={1.2}>
                  <p className="font-body text-lg md:text-xl text-stone-600 leading-relaxed">
                    Replace paper checklists with a structured, multi-role digital
                    approval workflow. Built for{" "}
                    <Typewriter
                      words={[
                        "construction teams.",
                        "manufacturing teams.",
                        "QC managers.",
                        "field inspectors.",
                      ]}
                      className="text-primary font-semibold"
                    />
                  </p>
                </BlurReveal>
              </div>

              {/* CTA */}
              <BlurReveal delay={1.5}>
                <div className="flex items-center justify-center mt-10">
                  <a href="#demo">
                    <ShinyButton className="h-12 px-10 text-base">
                      Request a Demo
                    </ShinyButton>
                  </a>
                </div>
              </BlurReveal>
            </>
          }
        >
          {/* Mobile only (<768px): portrait screenshot in iPhone frame */}
          <Image
            src="/dashboard-mobile.png"
            alt="QualityModule Dashboard — mobile view"
            width={390}
            height={844}
            className="block md:hidden mx-auto rounded-2xl object-cover h-full object-top w-full"
            draggable={false}
            priority
          />
          {/* Tablet only (768–1023px): landscape screenshot in iPad frame */}
          <Image
            src="/dashboard-tablet.png"
            alt="QualityModule Dashboard — tablet view"
            width={1280}
            height={960}
            className="hidden md:block lg:hidden mx-auto rounded-2xl object-cover h-full object-top w-full"
            draggable={false}
            priority
          />
          {/* Desktop only (1024px+): full dashboard in monitor frame */}
          <Image
            src="/dashboard.png"
            alt="QualityModule Dashboard — Creator, Filler, and Approver workflow"
            width={1920}
            height={1080}
            className="hidden lg:block mx-auto rounded-2xl object-cover h-full object-left-top w-full"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 3 — MARQUEE TRUST BAR
   ════════════════════════════════════════════════════════ */
const trustLogos = [
  { src: "/logo-digital-realty-2.png", alt: "Digital Realty" },
  { src: "/logo-m3m-2.png", alt: "M3M" },
  { src: "/logo-galliford-try-2.png", alt: "Galliford Try" },
  { src: "/logo-implenia-2.png", alt: "Implenia" },
  { src: "/logo-pyramid.png", alt: "Pyramid Infratech" },
];

function TrustBar() {
  const logoSet = (
    <>
      {trustLogos.map((logo, i) => (
        <div key={i} className="flex items-center justify-center mx-12 shrink-0">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={200}
            height={70}
            className="h-14 w-auto object-contain"
            draggable={false}
          />
        </div>
      ))}
    </>
  );

  return (
    <section className="py-6 border-y border-stone-200 bg-stone-50/50 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {logoSet}{logoSet}{logoSet}{logoSet}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 4 — PROBLEM (Grid Feature Cards)
   ════════════════════════════════════════════════════════ */
function ProblemSection() {
  const problems = [
    {
      title: "Paper Checklists",
      icon: ClipboardCheck,
      description: "No timestamps, no ownership, no traceability. Evidence vanishes the moment paper gets filed away.",
      stat: "73%",
      statLabel: "of field errors go unrecorded",
    },
    {
      title: "Construction Failures",
      icon: AlertTriangle,
      description: "Unverified reinforcement, alignment, or material leads to legal risk — or structural collapse.",
      stat: "2.4x",
      statLabel: "higher risk without digital QC",
    },
    {
      title: "Manufacturing Defects",
      icon: Factory,
      description: "Batch failure with no audit trail equals zero accountability. Recalls cost millions.",
      stat: "$4.2M",
      statLabel: "avg. cost per quality failure",
    },
    {
      title: "Reactive Quality",
      icon: Clock,
      description: "Problems discovered after the fact instead of prevented at the gate. By then, the damage is done.",
      stat: "5x",
      statLabel: "more expensive to fix later",
    },
  ];

  return (
    <section id="problem" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-primary mb-4">
            The Problem
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl xl:font-extrabold text-stone-900">
            Quality failures cost{" "}
            <span className="text-primary">more than money.</span>
          </h2>
          <p className="text-stone-500 mt-4 text-sm tracking-wide text-balance md:text-base">
            Every unchecked inspection is a liability waiting to happen.
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed divide-stone-200 border-stone-200 sm:grid-cols-2"
        >
          {problems.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 5+6 — HOW IT WORKS + ROLES (Timeline)
   ════════════════════════════════════════════════════════ */
function HowItWorksTimeline() {
  const shadowClass =
    "shadow-[0_0_24px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]";

  const data = [
    {
      title: "Creator",
      content: (
        <div>
          <p className="text-stone-300 text-xs md:text-sm font-normal mb-4">
            The <span className="text-primary-light font-semibold">Creator</span> builds the checklist, configures approval chains, assigns roles, and activates.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
              <span className="text-primary-light">&#10003;</span> Build from scratch or templates
            </div>
            <div className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
              <span className="text-primary-light">&#10003;</span> Configure L1 → L2 → L3 approval chain
            </div>
            <div className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
              <span className="text-primary-light">&#10003;</span> Assign Fillers & Approvers, then activate
            </div>
          </div>
          <Image
            src="/Creator.png"
            alt="Creator role — build and configure checklists"
            width={800}
            height={600}
            className={`rounded-lg object-cover h-auto w-full ${shadowClass}`}
          />
        </div>
      ),
    },
    {
      title: "Fill & Submit",
      content: (
        <div>
          <p className="text-stone-300 text-xs md:text-sm font-normal mb-4">
            The <span className="text-primary-light font-semibold">Filler</span> opens assigned checklists, fills each item with evidence, and submits for approval.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
              <span className="text-primary-light">&#10003;</span> Fill checklist items with photo, GPS & notes
            </div>
            <div className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
              <span className="text-primary-light">&#10003;</span> Track status: Draft, In Progress, Approved, Rejected
            </div>
            <div className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
              <span className="text-primary-light">&#10003;</span> Submit responses on web or mobile app
            </div>
          </div>
          <Image
            src="/Filler.png"
            alt="Filler role — submit inspections with evidence"
            width={800}
            height={600}
            className={`rounded-lg object-cover h-auto w-full ${shadowClass}`}
          />
        </div>
      ),
    },
    {
      title: "Approve & Reject",
      content: (
        <div>
          <p className="text-stone-300 text-xs md:text-sm font-normal mb-4">
            The <span className="text-primary-light font-semibold">Approver</span> reviews submissions, signs off or rejects with reason, and raises snags for issues.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
              <span className="text-primary-light">&#10003;</span> Approve with signature or reject with notes
            </div>
            <div className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
              <span className="text-primary-light">&#10003;</span> Raise snags for minor issues without full rejection
            </div>
            <div className="flex gap-2 items-center text-stone-400 text-xs md:text-sm py-1">
              <span className="text-primary-light">&#10003;</span> Multi-level sign-off with timestamped audit trail
            </div>
          </div>
          <Image
            src="/Approver.png"
            alt="Approver role — review and approve checklists"
            width={800}
            height={600}
            className={`rounded-lg object-cover h-auto w-full ${shadowClass}`}
          />
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

/* ════════════════════════════════════════════════════════
   SECTION 7 — FEATURES (Bento Grid - Aceternity style)
   ════════════════════════════════════════════════════════ */
// Imported from external component file

/* ════════════════════════════════════════════════════════
   SECTION 9 — IMPACT / STATS (Animated Gradient Bento)
   ════════════════════════════════════════════════════════ */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (started) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          const dur = 1800;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (el.current) observer.observe(el.current);
    return () => observer.disconnect();
  }, [target, started]);

  return <span ref={el}>{count}{suffix}</span>;
}

function ImpactSection() {
  const stats = [
    { target: 85, suffix: "%", label: "Reduction in field errors", colors: ["#008344", "#00a856", "#00c853"], delay: 0.2 },
    { target: 3, suffix: "x", label: "Faster inspection speed", colors: ["#00a856", "#008344", "#006633"], delay: 0.4 },
    { target: 100, suffix: "%", label: "Action accountability", colors: ["#006633", "#00c853", "#008344"], delay: 0.6 },
    { target: 0, suffix: "", label: "Untraced approvals", colors: ["#008344", "#006633", "#00a856"], delay: 0.8 },
  ];

  return (
    <section id="impact">
      <SmoothScrollHero
        scrollHeight={1200}
        desktopImage="/construction-worker.jpg"
        mobileImage="/construction-worker.jpg"
        initialClipPercentage={30}
        finalClipPercentage={70}
      >
        <div className="max-w-7xl mx-auto px-6 text-white w-full">
          <div className="text-center mb-16">
            <span className="inline-block font-body text-sm font-bold uppercase tracking-widest text-primary-light mb-4">
              Measurable Impact
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight">
              Numbers that{" "}
              <span className="text-primary-light">speak.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-xl border border-white/15 bg-black/50 backdrop-blur-lg shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: s.delay }}
              >
                <AnimatedGradient colors={s.colors} speed={0.05} blur="medium" />
                <div className="relative z-10 p-6 md:p-8 text-center">
                  <div className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-primary-light counter-glow mb-2">
                    <CountUp target={s.target} suffix={s.suffix} />
                  </div>
                  <div className="font-body text-sm text-white/80">
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SmoothScrollHero>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 11 — FINAL CTA (Contact Card)
   ════════════════════════════════════════════════════════ */
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-1.5 text-xs text-red-400 mt-1"
    >
      <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-red-400/20 text-red-400 shrink-0 text-[9px] font-bold">!</span>
      {message}
    </motion.p>
  );
}

function FinalCTA() {
  const [fields, setFields] = React.useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email address";
    if (!fields.phone.trim()) e.phone = "Phone number is required";
    if (!fields.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length === 0) setSubmitted(true);
  };

  const fieldClass = (name: string) =>
    `bg-white/5 border-white/10 text-white placeholder:text-stone-500 focus-visible:ring-primary/40 focus-visible:border-primary${errors[name] ? " border-red-400/60 focus-visible:ring-red-400/30" : ""}`;

  return (
    <section id="demo" className="relative w-full py-24 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScaleUp>
          <ContactCard
            title="Get in touch"
            description="Have questions about QualityModule? Need a demo for your team? Fill out the form and we'll get back to you within 1 business day. QualityModule is powered by VisiLean."
            contactInfo={[
              {
                flag: "🇫🇮",
                label: "Finland",
                value: "VisiLean Ltd, Maria01 Campus, Lapinlahdenkatu 16, 00180 Helsinki, Finland.",
                phone: "+358 407 339 659",
                bgImage: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=600&q=80",
              },
              {
                flag: "🇬🇧",
                label: "United Kingdom",
                value: "One West Point, North Acton W3 6RU, United Kingdom.",
                phone: "+44 7879558751",
                bgImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
              },
              {
                flag: "🇮🇳",
                label: "India",
                value: "1307, Shilp Epitome, Rajpath Rangoli Road, Behind Rajpath Club, Near Infostretch, Bodakdev, Ahmedabad, India. 380054",
                phone: "+91 9099 777 001",
                email: "info@visilean.com",
                bgImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
              },
            ]}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#00a856" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg">Message sent!</p>
                <p className="text-stone-400 text-sm">We'll get back to you within 1 business day.</p>
              </motion.div>
            ) : (
              <form className="w-full space-y-4" noValidate onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                  <Label className="text-stone-300">Name <span className="text-red-400">*</span></Label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={fields.name}
                    onChange={(e) => { setFields(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: "" })); }}
                    className={fieldClass("name")}
                  />
                  <FieldError message={errors.name} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-stone-300">Email <span className="text-red-400">*</span></Label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={fields.email}
                    onChange={(e) => { setFields(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: "" })); }}
                    className={fieldClass("email")}
                  />
                  <FieldError message={errors.email} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-stone-300">Phone <span className="text-red-400">*</span></Label>
                  <PhoneInput
                    placeholder="00000 00000"
                    value={fields.phone}
                    onChange={(e) => { setFields(f => ({ ...f, phone: (e.target as HTMLInputElement).value })); setErrors(er => ({ ...er, phone: "" })); }}
                    className={fieldClass("phone")}
                  />
                  <FieldError message={errors.phone} />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-stone-300">Message <span className="text-red-400">*</span></Label>
                  <Textarea
                    placeholder="Tell us about your quality workflow needs..."
                    value={fields.message}
                    onChange={(e) => { setFields(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: "" })); }}
                    className={fieldClass("message")}
                  />
                  <FieldError message={errors.message} />
                </div>
                <ShinyButton className="w-full" type="submit">
                  Request a Demo
                </ShinyButton>
              </form>
            )}
          </ContactCard>
        </ScaleUp>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 12 — FAQ (Tabbed by role)
   ════════════════════════════════════════════════════════ */
const faqCategories: Record<string, string> = {
  creator: "Creator",
  filler: "Filler",
  approver: "Approver",
};

const faqData: Record<string, { question: string; answer: string }[]> = {
  creator: [
    {
      question: "What can a Creator do in QualityModule?",
      answer:
        "The Creator (QC Manager / Supervisor) builds checklists from scratch or templates, configures L1→L2→L3 approval chains, assigns Fillers and Approvers, sets trades and task tags, and activates the checklist — instantly notifying the assigned team.",
    },
    {
      question: "Can we use our own checklist templates?",
      answer:
        "Absolutely. Build checklists from scratch or import your existing ones. Configure custom fields, trades, tasks, and approval chains to match your exact workflow. Templates can be reused across projects and sites.",
    },
    {
      question: "How do I assign roles and approval levels?",
      answer:
        "During checklist creation, you select team members for the Filler and Approver roles. You configure up to 3 approval levels — each level must explicitly sign off before the checklist progresses to the next.",
    },
    {
      question: "What industries is QualityModule designed for?",
      answer:
        "Primarily construction and manufacturing, but any industry with field inspections — infrastructure, energy, oil & gas, pharma — benefits from structured quality workflows.",
    },
  ],
  filler: [
    {
      question: "What evidence is required for submissions?",
      answer:
        "Every submission mandates a photo, GPS location, and detailed notes. The system won't accept submissions without this evidence — zero exceptions. This ensures complete traceability for every checklist item.",
    },
    {
      question: "Does QualityModule work offline on mobile?",
      answer:
        "Yes. The mobile app is designed for harsh field conditions with limited connectivity. You can capture evidence and fill checklists offline — everything syncs automatically when connection is restored.",
    },
    {
      question: "Can multiple Fillers work on the same checklist?",
      answer:
        "Each checklist item is assigned to a single Filler for clear accountability. However, different items within the same checklist can be assigned to different team members based on their trade or task.",
    },
    {
      question: "What happens after I submit a checklist?",
      answer:
        "Once submitted, the checklist moves to the approval queue. The assigned L1 Approver is notified instantly. You can track the approval status in real-time from your Filler dashboard.",
    },
  ],
  approver: [
    {
      question: "How does the multi-level approval work?",
      answer:
        "You configure up to 3 approval levels (L1, L2, L3). Each level must explicitly approve or reject before the checklist progresses. Every action is timestamped with the approver's identity — building a complete audit trail.",
    },
    {
      question: "What is the Snag system?",
      answer:
        "Approvers can raise Snags — minor issues that don't warrant full rejection. Each snag is tracked with a description, supporting media, and resolution status. Snags let you flag problems without blocking the entire workflow.",
    },
    {
      question: "What's included in the PDF audit export?",
      answer:
        "Full checklist with all responses, the complete L1/L2/L3 approval chain with timestamps, rejection reasons, snag logs, and media references — a single document ready for clients and auditors.",
    },
    {
      question: "How is QualityModule licensed?",
      answer:
        "We offer license-based enterprise pricing — not per-user SaaS. Contact our sales team for a custom quote based on your team size and deployment needs.",
    },
  ],
};

function FAQSection() {
  return (
    <div id="faq">
      <FAQ
        title="Got questions?"
        subtitle="FAQ"
        categories={faqCategories}
        faqData={faqData}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION 13 — FOOTER (Flickering Grid)
   ════════════════════════════════════════════════════════ */
function Footer() {
  return <QualityModuleFooter />;
}

/* ════════════════════════════════════════════════════════
   PAGE ASSEMBLY
   ════════════════════════════════════════════════════════ */
export default function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [navVisible, setNavVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Show nav when scrolling up or near top
      if (currentY < lastScrollY.current || currentY < 100) {
        setNavVisible(true);
      } else {
        setNavVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="grain">
      {/* Fixed top: banner + nav — hides on scroll down, reveals on scroll up */}
      <div
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 transition-transform duration-300"
        style={{ transform: navVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        {showBanner && (
          <div className="hidden min-[800px]:block px-4 py-2 border-b border-stone-200/60">
            <Banner
              show={showBanner}
              onHide={() => setShowBanner(false)}
              icon={<FileText className="m-px h-4 w-4 text-green-800" />}
              title={
                <>
                  <span className="font-semibold">PDF Audit Export</span> is now live
                  — share your complete approval trail with one click.
                </>
              }
              action={{
                label: "Book a Demo",
                onClick: () => {
                  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
                },
              }}
            />
          </div>
        )}
        <Header setMobileOpen={setMobileOpen} />
      </div>
      {/* Drawer rendered outside the transformed wrapper — avoids CSS stacking context bug */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Hero />
      <TrustBar />
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <TextGradientScroll
            text="Built for industries where a single missed check costs more than the entire project. QualityModule puts accountability at every step — not just at the end."
            type="letter"
            textOpacity="medium"
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug lg:leading-tight text-stone-900"
          />
        </div>
      </section>
      <HowItWorksTimeline />
      <ProblemSection />
      <ImpactSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
