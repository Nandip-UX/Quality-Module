"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, AlertOctagon, GitBranch, LayoutTemplate } from "lucide-react";
import { useLanguage } from "@/i18n/context";

function VisualPDF() {
  return (
    <div className="relative mt-4 -mx-6">
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
      <Image
        src="/PDF.png"
        alt="PDF Audit Report preview"
        width={900}
        height={600}
        className="w-full h-auto object-cover object-top"
        draggable={false}
      />
    </div>
  );
}

function VisualSnag() {
  const { t } = useLanguage();
  const indexColors = ["text-red-500 bg-red-50", "text-green-600 bg-green-50", "text-amber-600 bg-amber-50"];
  return (
    <div className="mt-6 flex flex-col gap-2 px-2">
      {t.features.visual.snagItems.map((s, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2">
          <AlertOctagon className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <span className="text-xs text-stone-600 truncate flex-1">{s.label}</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${indexColors[i]}`}>{s.status}</span>
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

export function FeaturesSection() {
  const { t } = useLanguage();
  const f = t.features;

  const features = [
    { icon: FileText,       title: f.pdf.title,      description: f.pdf.description,      visual: "pdf",      span: "sm:col-span-3", corner: "sm:rounded-tl-xl" },
    { icon: AlertOctagon,   title: f.snag.title,     description: f.snag.description,     visual: "snag",     span: "sm:col-span-2", corner: "sm:rounded-tr-xl" },
    { icon: GitBranch,      title: f.rules.title,    description: f.rules.description,    visual: "rules",    span: "sm:col-span-2", corner: "sm:rounded-bl-xl" },
    { icon: LayoutTemplate, title: f.template.title, description: f.template.description, visual: "template", span: "sm:col-span-3", corner: "sm:rounded-br-xl" },
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
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
            <CardContent className="px-6 pb-0 overflow-hidden">
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
