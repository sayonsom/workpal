"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { SendIcon } from "../ui/Icons";
import { LIVE_DEMO } from "@/lib/constants";

export default function LiveDemo() {
  const [emailText, setEmailText] = useState("");

  return (
    <section id={LIVE_DEMO.sectionId} className="py-16 md:py-24 bg-surface-subtle">
      <div className="mx-auto max-w-[720px] px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {LIVE_DEMO.headline}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)]">
            {LIVE_DEMO.subheadline}
          </p>
        </div>

        {/* Demo card */}
        <div className="rounded-[8px] border border-[var(--color-border-light)] bg-white shadow-[var(--shadow-sm)] p-5">
          <textarea
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder={LIVE_DEMO.placeholder}
            maxLength={5000}
            rows={6}
            className="w-full px-3 py-2.5 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] leading-[1.5] resize-none focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]"
          />

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
            <Button variant="primary" className="w-full sm:w-auto">
              {LIVE_DEMO.submitLabel}
              <SendIcon className="ml-2" size={14} />
            </Button>
            <span className="text-[12px] text-[var(--color-text-muted)]">
              {LIVE_DEMO.rateLimit}
            </span>
          </div>
        </div>

        {/* Conversion CTA below */}
        <p className="mt-6 text-center text-[14px] text-[var(--color-text-subtle)]">
          {LIVE_DEMO.resultCta}
        </p>
      </div>
    </section>
  );
}
