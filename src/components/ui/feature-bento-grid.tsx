"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import createGlobe from "cobe";
import {
  IconShieldCheck,
  IconCamera,
  IconFileExport,
  IconAlertTriangle,
  IconMail,
  IconTags,
} from "@tabler/icons-react";

/* ─── Layout primitives ─── */
const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("p-4 sm:p-8 relative overflow-hidden", className)}>
    {children}
  </div>
);

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => (
  <p className="max-w-5xl mx-auto text-left tracking-tight text-stone-900 text-xl md:text-2xl md:leading-snug font-semibold">
    {children}
  </p>
);

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => (
  <p className="text-sm md:text-sm max-w-sm text-left text-stone-500 font-normal my-2">
    {children}
  </p>
);

/* ─── Skeleton: Multi-Level Approvals (visual flow) ─── */
const SkeletonApprovals = () => {
  const levels = [
    { label: "L1", name: "Field Inspector", status: "Approved", color: "bg-primary" },
    { label: "L2", name: "QC Engineer", status: "Approved", color: "bg-primary" },
    { label: "L3", name: "Site Director", status: "Pending", color: "bg-stone-300" },
  ];

  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-white shadow-2xl rounded-lg h-full">
        <div className="flex flex-col space-y-4">
          {/* Approval chain visual */}
          <div className="flex items-center justify-between px-4 py-3 bg-stone-50 rounded-lg">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Approval Chain</span>
            <span className="text-xs text-primary font-medium">2 of 3 approved</span>
          </div>
          {levels.map((level, i) => (
            <motion.div
              key={level.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className="flex items-center gap-4 px-4 py-3 rounded-lg border border-stone-100 hover:border-primary/20 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full ${level.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {level.label}
              </div>
              {i < levels.length - 1 && (
                <div className="absolute ml-5 mt-14 w-px h-4 bg-stone-200" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-stone-800">{level.name}</div>
                <div className="text-xs text-stone-400">Level {i + 1} Approver</div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                level.status === "Approved"
                  ? "bg-primary-50 text-primary-dark"
                  : "bg-stone-100 text-stone-500"
              }`}>
                {level.status === "Approved" ? "✓ " : ""}
                {level.status}
              </span>
            </motion.div>
          ))}
          {/* Progress bar */}
          <div className="px-4">
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "66%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white via-white to-transparent w-full pointer-events-none" />
    </div>
  );
};

/* ─── Skeleton: Evidence capture (photo gallery) ─── */
const SkeletonEvidence = () => {
  const items = [
    { label: "Rebar Grid", icon: "📸" },
    { label: "Pour Check", icon: "📸" },
    { label: "GPS: 19.07°N", icon: "📍" },
    { label: "Alignment", icon: "📸" },
    { label: "Material QC", icon: "📸" },
  ];

  const imageVariants = {
    whileHover: { scale: 1.1, rotate: 0, zIndex: 100 },
    whileTap: { scale: 1.1, rotate: 0, zIndex: 100 },
  };

  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {items.map((item, idx) => (
          <motion.div
            variants={imageVariants}
            key={"evidence-first-" + idx}
            style={{ rotate: Math.random() * 20 - 10 }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white border border-stone-100 flex-shrink-0 overflow-hidden shadow-sm"
          >
            <div className="rounded-lg h-20 w-20 md:h-40 md:w-40 bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col items-center justify-center gap-1">
              <span className="text-2xl md:text-4xl">{item.icon}</span>
              <span className="text-[8px] md:text-[10px] font-medium text-primary-dark">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {items.map((item, idx) => (
          <motion.div
            key={"evidence-second-" + idx}
            style={{ rotate: Math.random() * 20 - 10 }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white border border-stone-100 flex-shrink-0 overflow-hidden shadow-sm"
          >
            <div className="rounded-lg h-20 w-20 md:h-40 md:w-40 bg-gradient-to-br from-stone-50 to-stone-100 flex flex-col items-center justify-center gap-1">
              <span className="text-2xl md:text-4xl">{item.icon}</span>
              <span className="text-[8px] md:text-[10px] font-medium text-stone-500">{item.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white to-transparent h-full pointer-events-none" />
    </div>
  );
};

/* ─── Skeleton: PDF Export (stacked cards, interactive) ─── */
const SkeletonPDF = () => {
  const pages = [
    { src: "/pdf-page-1.png", label: "Summary" },
    { src: "/pdf-page-2.png", label: "Inspection Details" },
    { src: "/pdf-page-3.png", label: "Status Verification" },
    { src: "/pdf-page-4.png", label: "Photos & Evidence" },
  ];

  const [activeIndex, setActiveIndex] = useState(pages.length - 1);
  const [hovered, setHovered] = useState<number | null>(null);

  const getCardStyle = (i: number) => {
    const isActive = i === activeIndex;
    const isHovered = i === hovered;
    const stackOffset = i * 38;

    if (isActive) {
      return {
        left: `${stackOffset}px`,
        zIndex: 50,
        y: -16,
        scale: 1.04,
        boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
      };
    }
    if (isHovered) {
      return {
        left: `${stackOffset}px`,
        zIndex: 40,
        y: -8,
        scale: 1.02,
        boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
      };
    }
    return {
      left: `${stackOffset}px`,
      zIndex: i + 1,
      y: 0,
      scale: 1,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    };
  };

  return (
    <div className="relative mt-6 mx-auto w-full max-w-sm" style={{ height: "270px" }}>
      {pages.map((page, i) => {
        const style = getCardStyle(i);
        return (
          <motion.div
            key={page.label}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{
              y: style.y,
              scale: style.scale,
              zIndex: style.zIndex,
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            onClick={() => setActiveIndex(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="absolute top-0 rounded-lg border bg-white overflow-hidden cursor-pointer"
            style={{
              left: style.left,
              zIndex: style.zIndex,
              width: "175px",
              height: "232px",
              boxShadow: style.boxShadow,
              borderColor: i === activeIndex ? "rgb(0 131 68 / 0.4)" : "rgb(231 229 228)",
            }}
          >
            <div className="h-full overflow-hidden">
              <Image
                src={page.src}
                alt={`PDF ${page.label} — Page ${i + 1}`}
                width={175}
                height={232}
                className="w-full h-full object-cover object-top"
                draggable={false}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-white via-white/90 to-transparent">
              <span className={`text-[9px] font-semibold ${i === activeIndex ? "text-primary" : "text-stone-500"}`}>
                {i === activeIndex ? "▶ " : ""}{page.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ─── Skeleton: Globe (global deployments) ─── */
const SkeletonGlobe = () => {
  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent mt-10">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  );
};

const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let frameId: number;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.9, 0.95, 0.92],
      markerColor: [0, 0.52, 0.27],
      glowColor: [0.85, 0.95, 0.9],
      markers: [
        { location: [19.076, 72.8777], size: 0.08 },
        { location: [51.5074, -0.1278], size: 0.06 },
        { location: [25.2048, 55.2708], size: 0.06 },
        { location: [1.3521, 103.8198], size: 0.05 },
        { location: [40.7128, -74.006], size: 0.05 },
        { location: [-33.8688, 151.2093], size: 0.04 },
      ],
    });

    function animate() {
      phi += 0.005;
      globe.update({ phi });
      frameId = requestAnimationFrame(animate);
    }
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};

/* ─── Main Export ─── */
export function QualityFeaturesBentoGrid() {
  const features = [
    {
      title: "Multi-Level Approval Workflow",
      description:
        "Configure L1 → L2 → L3 approval chains. Each level requires explicit sign-off before the checklist progresses. Every action is timestamped.",
      skeleton: <SkeletonApprovals />,
      className:
        "col-span-1 md:col-span-4 lg:col-span-4 border-b md:border-r border-stone-200",
      icon: <IconShieldCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: "Mandatory Photo & GPS Evidence",
      description:
        "Every submission requires photo proof, GPS location, and detailed notes. No evidence, no submission — zero exceptions.",
      skeleton: <SkeletonEvidence />,
      className: "col-span-1 md:col-span-2 lg:col-span-2 border-b border-stone-200",
      icon: <IconCamera className="h-6 w-6 text-primary" />,
    },
    {
      title: "One-Click PDF Audit Export",
      description:
        "Full checklist with responses, approval chain with timestamps, rejection reasons, and snag logs — all in a single document ready for clients and auditors.",
      skeleton: <SkeletonPDF />,
      className:
        "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-r border-stone-200",
      icon: <IconFileExport className="h-6 w-6 text-primary" />,
    },
    {
      title: "Deployed Across Global Sites",
      description:
        "From Mumbai to London, Dubai to Sydney — QualityModule works on every site, every device, every time. Web + Mobile with full offline support.",
      skeleton: <SkeletonGlobe />,
      className: "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-none",
      icon: <IconTags className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
<h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-bold text-stone-900">
          Built for teams who{" "}
          <span className="text-primary">demand proof.</span>
        </h4>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-stone-500 text-center font-normal">
          Six core capabilities that replace paper checklists with enforceable,
          auditable digital workflows across your entire operation.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 mt-12 xl:border rounded-xl border-stone-200">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <div className="mb-4">{feature.icon}</div>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>

      {/* Extra feature pills below the grid */}
      <div className="flex flex-wrap justify-center gap-3 mt-12 px-8">
        {[
          { icon: <IconAlertTriangle className="h-4 w-4" />, label: "Snag Management" },
          { icon: <IconMail className="h-4 w-4" />, label: "Auto Email Notifications" },
          { icon: <IconTags className="h-4 w-4" />, label: "Trade & Task Tagging" },
          { icon: <IconShieldCheck className="h-4 w-4" />, label: "Role-Based Access" },
        ].map((pill, i) => (
          <motion.div
            key={pill.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-dark"
          >
            {pill.icon}
            {pill.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
