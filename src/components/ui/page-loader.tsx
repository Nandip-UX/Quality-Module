"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
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
        setTimeout(() => setVisible(false), 700);
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,131,68,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,131,68,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        >
          {/* Soft radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 500px 400px at 50% 48%, rgba(0,168,86,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Icon — layoutId ties it to the nav logo */}
          <motion.div
            layoutId="brand-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.4, ease: "easeOut" },
              scale: { duration: 0.4, ease: "easeOut" },
              y: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            }}
            style={{ width: 110, height: 110 }}
          >
            <Image
              src="/loader-icon.png"
              alt="QualityModule"
              width={110}
              height={110}
              priority
            />
          </motion.div>

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
  );
}
