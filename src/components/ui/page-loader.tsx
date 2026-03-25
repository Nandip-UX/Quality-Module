"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fast-tick progress bar to 80% while waiting for load
    let current = 0;
    const tick = setInterval(() => {
      current += Math.random() * 12;
      if (current >= 80) { current = 80; clearInterval(tick); }
      setProgress(Math.min(current, 80));
    }, 120);

    const finish = () => {
      clearInterval(tick);
      setProgress(100);
      // Small delay after 100% so the user sees it complete
      setTimeout(() => setVisible(false), 600);
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
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f0d]"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-5"
          >
            {/* Icon */}
            <div className="relative w-14 h-14">
              <motion.div
                className="absolute inset-0 rounded-2xl bg-primary/20 border border-primary/30"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="#00a856" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#00a856" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Brand name */}
            <div className="text-center">
              <p className="text-white font-bold text-xl tracking-tight">QualityModule</p>
              <p className="text-stone-500 text-xs mt-1 tracking-widest uppercase">by VisiLean</p>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary-light to-primary rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
