"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQProps extends React.ComponentProps<"section"> {
  title?: string;
  subtitle?: string;
  categories: Record<string, string>;
  faqData: Record<string, FAQItemData[]>;
}

/* ─── Main FAQ component ─── */
export const FAQ = ({
  title = "FAQs",
  subtitle = "Frequently Asked Questions",
  categories,
  faqData,
  className,
  ...props
}: FAQProps) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-stone-50/50 px-4 py-24 md:py-32",
        className
      )}
      {...props}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabs
        categories={categories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <FAQList faqData={faqData} selected={selectedCategory} />
    </section>
  );
};

/* ─── Header ─── */
const FAQHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="relative z-10 flex flex-col items-center justify-center">
    <span className="mb-4 font-body text-sm font-bold uppercase tracking-widest text-primary">
      {subtitle}
    </span>
    <h2 className="mb-10 font-display text-4xl font-extrabold tracking-tight text-stone-900 md:text-5xl">
      {title}
    </h2>
    <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-primary/8 to-primary/4 blur-3xl" />
  </div>
);

/* ─── Category tabs ─── */
const FAQTabs = ({
  categories,
  selected,
  setSelected,
}: {
  categories: Record<string, string>;
  selected: string;
  setSelected: (key: string) => void;
}) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setSelected(key)}
        className={cn(
          "relative overflow-hidden whitespace-nowrap rounded-lg border px-5 py-2 text-sm font-semibold transition-colors duration-500 cursor-pointer",
          selected === key
            ? "border-primary text-white"
            : "border-stone-200 bg-white text-stone-500 hover:text-stone-800 hover:border-stone-300"
        )}
      >
        <span className="relative z-10">{label}</span>
        <AnimatePresence>
          {selected === key && (
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: "backIn" }}
              className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-primary-dark"
            />
          )}
        </AnimatePresence>
      </button>
    ))}
  </div>
);

/* ─── FAQ list with AnimatePresence ─── */
const FAQList = ({
  faqData,
  selected,
}: {
  faqData: Record<string, FAQItemData[]>;
  selected: string;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Reset open item when category changes
  React.useEffect(() => {
    setOpenIndex(null);
  }, [selected]);

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {Object.entries(faqData).map(([category, questions]) => {
          if (selected === category) {
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "backIn" }}
                className="space-y-3"
              >
                {questions.map((faq, index) => (
                  <FAQItem
                    key={index}
                    {...faq}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                ))}
              </motion.div>
            );
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
};

/* ─── Single FAQ accordion item ─── */
const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "rounded-xl border transition-colors",
        isOpen ? "bg-white border-primary/20 shadow-sm" : "bg-white border-stone-200"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left cursor-pointer"
      >
        <span
          className={cn(
            "font-display text-base font-semibold transition-colors md:text-lg",
            isOpen ? "text-stone-900" : "text-stone-600"
          )}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: "45deg" },
            closed: { rotate: "0deg" },
          }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <Plus
            className={cn(
              "h-5 w-5 transition-colors",
              isOpen ? "text-primary" : "text-stone-400"
            )}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : "0px",
          marginBottom: isOpen ? "16px" : "0px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-5"
      >
        <p className="font-body text-stone-500 leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
};
