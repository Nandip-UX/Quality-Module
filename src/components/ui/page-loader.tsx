"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "flying" | "done">("loading");
  const [iconStyle, setIconStyle] = useState<React.CSSProperties>({
    position: "fixed",
    width: 110,
    height: 110,
    zIndex: 9999,
    pointerEvents: "none",
    opacity: 0,
  });
  const hasFlown = useRef(false);

  useEffect(() => {
    // Position icon at center once we have window dimensions
    setIconStyle(s => ({
      ...s,
      left: window.innerWidth / 2 - 55,
      top: window.innerHeight / 2 - 55,
      opacity: 1,
    }));

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

        setTimeout(() => {
          if (hasFlown.current) return;
          hasFlown.current = true;
          setPhase("flying");

          const navEl = document.getElementById("nav-brand-icon");
          if (navEl) {
            const rect = navEl.getBoundingClientRect();
            // Animate icon to nav position using CSS transition
            setIconStyle({
              position: "fixed",
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
              zIndex: 9999,
              pointerEvents: "none",
              opacity: 1,
              transition: "left 0.65s cubic-bezier(0.4,0,0.2,1), top 0.65s cubic-bezier(0.4,0,0.2,1), width 0.65s cubic-bezier(0.4,0,0.2,1), height 0.65s cubic-bezier(0.4,0,0.2,1)",
            });

            // After fly completes, reveal real nav logo and remove loader
            setTimeout(() => {
              const navEl2 = document.getElementById("nav-brand-icon");
              if (navEl2) navEl2.style.opacity = "1";
              setPhase("done");
            }, 700);
          } else {
            setPhase("done");
          }
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
      {/* White grid overlay */}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9998] bg-white"
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

      {/* Flying icon — CSS transition handles the move */}
      <div style={iconStyle}>
        <motion.div
          animate={phase === "loading" ? { y: [0, -8, 0] } : { y: 0 }}
          transition={{ duration: 2.8, repeat: phase === "loading" ? Infinity : 0, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/loader-icon.png"
            alt="QualityModule"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </motion.div>
      </div>
    </>
  );
}
