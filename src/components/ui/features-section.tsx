"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, AlertOctagon, GitBranch, LayoutTemplate } from "lucide-react";
import { useLanguage } from "@/i18n/context";

function VisualPDF() {
  return (
    <div className="relative -mt-4 -mx-4">
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      <Image
        src="/PDF Export.png"
        alt="PDF export preview"
        width={800}
        height={600}
        className="w-full h-auto object-cover object-top"
        draggable={false}
      />
    </div>
  );
}

function VisualSnag() {
  return (
    <div className="relative mt-4 -mx-4">
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      <Image
        src="/Checklist Snag.png"
        alt="Snag workflow preview"
        width={600}
        height={800}
        className="w-full h-auto object-cover object-top"
        draggable={false}
      />
    </div>
  );
}

function VisualRules() {
  return (
    <div className="relative mt-4 -mx-4">
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
      <Image
        src="/E Rule Based.png"
        alt="Rule based checklist preview"
        width={600}
        height={400}
        className="w-full h-auto object-cover object-top"
        draggable={false}
      />
    </div>
  );
}

function VisualTemplate() {
  return (
    <div className="relative -mt-1 -mx-4 -mb-6">
      <Image
        src="/Option 5.png"
        alt="Template library preview"
        width={800}
        height={500}
        className="w-full h-auto object-cover object-top"
        draggable={false}
      />
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
            <CardContent className="px-6 pb-0 pt-0 overflow-hidden">
              <VisualPDF />
            </CardContent>
          </Card>

          {/* Card 2 — Snag (narrow) */}
          <Card className="overflow-hidden sm:col-span-2 sm:rounded-none sm:rounded-tr-xl border-stone-200 flex flex-col">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                  <AlertOctagon className="w-4 h-4 text-red-500" />
                </div>
                <p className="font-semibold text-stone-900">{features[1].title}</p>
              </div>
              <p className="text-stone-500 text-sm">{features[1].description}</p>
            </CardHeader>
            <CardContent className="px-4 pb-0 mt-auto">
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
          <Card className="overflow-hidden sm:col-span-3 sm:rounded-none sm:rounded-br-xl border-stone-200 flex flex-col">
            <CardHeader className="pb-0">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                  <LayoutTemplate className="w-4 h-4 text-amber-500" />
                </div>
                <p className="font-semibold text-stone-900">{features[3].title}</p>
              </div>
              <p className="text-stone-500 text-sm max-w-sm">{features[3].description}</p>
            </CardHeader>
            <CardContent className="px-6 pb-0 pt-0 mt-auto">
              <VisualTemplate />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
