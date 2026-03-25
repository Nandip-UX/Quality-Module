"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-center text-3xl font-bold text-black/15 md:text-4xl lg:text-5xl xl:text-[3.5rem] xl:leading-[1.2] leading-snug">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block mx-[0.25em]">
      <span className="opacity-30">{children}</span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 text-stone-900"
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
