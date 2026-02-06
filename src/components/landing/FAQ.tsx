"use client";

import { useState } from "react";
import { FAQ } from "@/lib/constants";

/* ── Chevron icon ── */
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Single FAQ item ── */
function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--color-border-light)] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 rounded-[4px]"
        aria-expanded={open}
      >
        <span className="text-[15px] font-bold text-text-primary leading-[1.4]">
          {question}
        </span>
        <ChevronIcon open={open} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)] ${
          open ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.6] pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id={FAQ.sectionId} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {FAQ.title}
          </h2>
        </div>

        {/* FAQ items */}
        <div className="max-w-[720px] mx-auto">
          {FAQ.items.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
