"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, AlertOctagon, GitBranch, LayoutTemplate } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "PDF Export & Full Audit Trail",
    description:
      "Export any completed checklist as a structured PDF — includes all fields, snag conversions, sign-offs, and a full role-based audit log. Every action timestamped and traceable.",
    visual: "pdf",
    span: "sm:col-span-3",
    corner: "sm:rounded-tl-xl",
  },
  {
    icon: AlertOctagon,
    title: "Snag-to-Checklist Workflow",
    description:
      "Approvers can raise a snag directly inside a checklist. Assign, resolve, or reopen with a single tap — keeping defects linked to their source inspection.",
    visual: "snag",
    span: "sm:col-span-2",
    corner: "sm:rounded-tr-xl",
  },
  {
    icon: GitBranch,
    title: "Rule-Based Checklists",
    description:
      "Define conditional rules at creation time. Tasks auto-assign based on trade, zone, or VisiLean Takt & Gantt schedule — no manual delegation needed.",
    visual: "rules",
    span: "sm:col-span-2",
    corner: "sm:rounded-bl-xl",
  },
  {
    icon: LayoutTemplate,
    title: "Template Library",
    description:
      "Build reusable checklist templates with custom fields, trades, and approval chains. Deploy instantly across any project or site without starting from scratch.",
    visual: "template",
    span: "sm:col-span-3",
    corner: "sm:rounded-br-xl",
  },
];

function VisualPDF() {
  return (
    <div className="relative mt-6 h-36 overflow-hidden pl-6">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
      <div className="flex flex-col gap-2">
        {["Site Inspection — Block A", "Electrical Sign-off", "Concrete Pour Check"].map((label, i) => (
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
  return (
    <div className="mt-6 flex flex-col gap-2 px-2">
      {[
        { label: "Ceiling crack — Level 3", status: "Open", color: "text-red-500 bg-red-50" },
        { label: "Door misaligned — Block B", status: "Resolved", color: "text-green-600 bg-green-50" },
        { label: "Tile gap — Bathroom 2", status: "Reopened", color: "text-amber-600 bg-amber-50" },
      ].map((s, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2">
          <AlertOctagon className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <span className="text-xs text-stone-600 truncate flex-1">{s.label}</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.color}`}>{s.status}</span>
        </div>
      ))}
    </div>
  );
}

function VisualRules() {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {[
        { trigger: "Zone: Block A", action: "Assign → Civil Team" },
        { trigger: "Trade: Electrical", action: "Link → Gantt Task #42" },
        { trigger: "Stage: Handover", action: "Require L2 Approval" },
      ].map((r, i) => (
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
  return (
    <div className="relative mt-6 h-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
      <div className="grid grid-cols-3 gap-2">
        {["Structural Inspection", "MEP Checklist", "Handover QC", "Safety Audit", "Concrete Pour", "Fire Safety"].map((t, i) => (
          <div key={i} className="flex flex-col gap-1 rounded-lg border border-stone-200 bg-stone-50 p-3">
            <LayoutTemplate className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-medium text-stone-600 leading-tight">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-bold uppercase tracking-widest text-primary mb-4">
            Platform Capabilities
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-stone-900 mb-4">
            Everything your team needs{" "}
            <span className="text-primary">in one place.</span>
          </h2>
          <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto">
            From template creation to PDF export — QualityModule covers the full inspection lifecycle with structured workflows, snag tracking, and rule-driven automation.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-2 sm:grid-cols-5">
          {/* Card 1 — PDF Export (wide) */}
          <Card className="overflow-hidden sm:col-span-3 sm:rounded-none sm:rounded-tl-xl border-stone-200">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <p className="font-semibold text-stone-900">{features[0].title}</p>
              </div>
              <p className="text-stone-500 text-sm max-w-sm">{features[0].description}</p>
            </CardHeader>
            <CardContent className="px-6 pb-0">
              <VisualPDF />
            </CardContent>
          </Card>

          {/* Card 2 — Snag (narrow) */}
          <Card className="overflow-hidden sm:col-span-2 sm:rounded-none sm:rounded-tr-xl border-stone-200">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <AlertOctagon className="w-4 h-4 text-red-500" />
                </div>
                <p className="font-semibold text-stone-900">{features[1].title}</p>
              </div>
              <p className="text-stone-500 text-sm">{features[1].description}</p>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <VisualSnag />
            </CardContent>
          </Card>

          {/* Card 3 — Rule-based (narrow) */}
          <Card className="p-6 sm:col-span-2 sm:rounded-none sm:rounded-bl-xl border-stone-200">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-blue-500" />
              </div>
              <p className="font-semibold text-stone-900">{features[2].title}</p>
            </div>
            <p className="text-stone-500 text-sm mb-2">{features[2].description}</p>
            <VisualRules />
          </Card>

          {/* Card 4 — Template (wide) */}
          <Card className="overflow-hidden sm:col-span-3 sm:rounded-none sm:rounded-br-xl border-stone-200">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <LayoutTemplate className="w-4 h-4 text-amber-500" />
                </div>
                <p className="font-semibold text-stone-900">{features[3].title}</p>
              </div>
              <p className="text-stone-500 text-sm max-w-sm">{features[3].description}</p>
            </CardHeader>
            <CardContent className="px-6 pb-0">
              <VisualTemplate />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
