"use client";
import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

interface SmoothScrollHeroProps {
  scrollHeight?: number;
  desktopImage: string;
  mobileImage?: string;
  initialClipPercentage?: number;
  finalClipPercentage?: number;
  children?: React.ReactNode;
}

const SmoothScrollHero: React.FC<SmoothScrollHeroProps> = ({
  scrollHeight = 1500,
  desktopImage,
  mobileImage,
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  children,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Track scroll progress of THIS container (0 = enters viewport, 1 = leaves)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Clip animation: starts small, expands to full as you scroll through
  const clipStart = useTransform(
    scrollYProgress,
    [0, 0.35],
    [initialClipPercentage, 0]
  );
  const clipEnd = useTransform(
    scrollYProgress,
    [0, 0.35],
    [finalClipPercentage, 100]
  );
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  // Background zoom: starts zoomed in, settles to normal (via scale transform)
  const bgScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1.3, 1]
  );

  // Content fade in after image reveals
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.35],
    [0, 1]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0.2, 0.35],
    [40, 0]
  );

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(${scrollHeight}px + 100vh)` }}
      className="relative w-full"
    >
      <motion.div
        className="sticky top-0 h-screen w-full bg-dark overflow-hidden"
        style={{ clipPath }}
      >
        {/* Mobile bg */}
        <motion.div
          className="absolute inset-0 md:hidden"
          style={{
            backgroundImage: `url(${mobileImage || desktopImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            scale: bgScale,
          }}
        />
        {/* Desktop bg */}
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `url(${desktopImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            scale: bgScale,
          }}
        />
        {/* Dark overlay + gradient for text readability */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
        {/* Content — fades in after image reveals */}
        {children && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SmoothScrollHero;
