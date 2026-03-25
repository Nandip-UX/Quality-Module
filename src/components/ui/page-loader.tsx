"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import Image from "next/image";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "flying" | "done">("loading");

  const iconX = useMotionValue(0);
  const iconY = useMotionValue(0);
  const iconSize = useMotionValue(110);

  useEffect(() => {
    // Center the icon
    iconX.set(window.innerWidth / 2 - 55);
    iconY.set(window.innerHeight / 2 - 55);

    const MIN_DURATION = 2600;
    const startedAt = Date.now();

    let current = 0;
    const tick = setInterval(() => {
      current += Math.random() * 6 + 2;
      if (current >= 85) { current = 85; clearInterval(tick); }
      setProgress(Math.min(current, 85));
    }, 80);

    const finish = () => {
      clearInterval(tick);
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_DURATION - elapsed);

      setTimeout(() => {
        setProgress(100);

        // Slight pause at 100% then fly
        setTimeout(async () => {
          setPhase("flying"); // fades the overlay

          // Find nav logo position
          const navEl = document.getElementById("nav-brand-icon");
          if (navEl) {
            const rect = navEl.getBoundingClientRect();
            // Fly icon to nav logo position
            await Promise.all([
              animate(iconX, rect.left, { duration: 0.65, ease: [0.4, 0, 0.2, 1] }),
              animate(iconY, rect.top, { duration: 0.65, ease: [0.4, 0, 0.2, 1] }),
              animate(iconSize, rect.width, { duration: 0.65, ease: [0.4, 0, 0.2, 1] }),
            ]);
          }

          // Reveal the real nav logo and remove loader
          const navEl2 = document.getElementById("nav-brand-icon");
          if (navEl2) navEl2.style.opacity = "1";
          setPhase("done");
        }, 500);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      clearInterval(tick);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      {/* Overlay — fades out when flying starts */}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-white"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,131,68,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,131,68,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 500px 400px at 50% 48%, rgba(0,168,86,0.08) 0%, transparent 70%)",
              }}
            />
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-stone-100">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-dark via-primary to-primary-light rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flying icon — lives outside overlay, independent z-layer */}
      <motion.div
        style={{
          position: "fixed",
          left: iconX,
          top: iconY,
          width: iconSize,
          height: iconSize,
          zIndex: 9999,
          pointerEvents: "none",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          animate={phase === "loading" ? { y: [0, -8, 0] } : {}}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src="/loader-icon.png"
            alt="QualityModule"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </motion.div>
      </motion.div>
    </>
  );
}
