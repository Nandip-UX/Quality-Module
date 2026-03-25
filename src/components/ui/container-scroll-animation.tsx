"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.7], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.7], [0, -100]);

  return (
    <div
      className="h-[68rem] sm:h-[70rem] lg:h-[80rem] flex items-center justify-center relative p-2 lg:p-20"
      ref={containerRef}
    >
      <div
        className="py-0 lg:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <>
      {/* ── Mobile (< 768px): iPhone 14 Pro Max ── */}
      <motion.div
        style={{ rotateX: rotate, scale }}
        className="md:hidden mt-0 mx-auto flex justify-center"
      >
        <div className="relative" style={{ width: 360 }}>
          {/* Side buttons — left */}
          <div className="absolute -left-[3px] top-[122px] w-[3px] h-[38px] bg-[#3A3A3C] rounded-l-full" />
          <div className="absolute -left-[3px] top-[185px] w-[3px] h-[77px] bg-[#3A3A3C] rounded-l-full" />
          <div className="absolute -left-[3px] top-[281px] w-[3px] h-[77px] bg-[#3A3A3C] rounded-l-full" />
          <div className="absolute -right-[3px] top-[218px] w-[3px] h-[110px] bg-[#3A3A3C] rounded-r-full" />
          <div
            className="relative bg-gradient-to-b from-[#2C2C2E] to-[#1C1C1E] p-[12px] shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)]"
            style={{ borderRadius: 60 }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 60, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)" }} />
            <div className="relative bg-black overflow-hidden" style={{ borderRadius: 50, aspectRatio: "390 / 844" }}>
              <div className="absolute top-[16px] left-1/2 -translate-x-1/2 z-20 bg-black" style={{ width: 139, height: 41, borderRadius: 26, boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }} />
              <div className="w-full h-full">{children}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Tablet (768px – 1023px): iPad Pro landscape ── */}
      <motion.div
        style={{ rotateX: rotate, scale }}
        className="hidden md:flex lg:hidden mt-8 mx-auto justify-center"
      >
        <div className="relative" style={{ width: 700 }}>
          {/* Power button — top right */}
          <div className="absolute -top-[3px] right-[80px] h-[3px] w-[52px] bg-[#1C1C1E] rounded-t-full" />
          {/* Volume buttons — top left */}
          <div className="absolute -top-[3px] left-[120px] h-[3px] w-[36px] bg-[#1C1C1E] rounded-t-full" />
          <div className="absolute -top-[3px] left-[168px] h-[3px] w-[36px] bg-[#1C1C1E] rounded-t-full" />

          {/* iPad frame — black */}
          <div
            className="relative bg-gradient-to-b from-[#2C2C2E] to-[#1C1C1E] p-[14px] shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)]"
            style={{ borderRadius: 28 }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 28, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)" }} />
            {/* Screen */}
            <div className="relative bg-black overflow-hidden" style={{ borderRadius: 16, aspectRatio: "4 / 3" }}>
              {/* Front camera dot */}
              <div className="absolute top-[10px] right-[14px] w-[8px] h-[8px] rounded-full bg-white/20 z-20" />
              <div className="w-full h-full">{children}</div>
            </div>
            {/* Home bar */}
            <div className="flex justify-center mt-2">
              <div className="w-16 h-1 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Desktop (1024px+): monitor frame — black ── */}
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        }}
        className="hidden lg:block max-w-5xl mt-8 mx-auto lg:h-[40rem] w-full border-4 border-[#1C1C1E] p-6 bg-[#0a0a0a] rounded-[30px] shadow-2xl"
      >
        <div className="h-full w-full overflow-hidden rounded-2xl bg-black">
          {children}
        </div>
      </motion.div>
    </>
  );
};
