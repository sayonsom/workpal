import Button from "../ui/Button";
import { CheckIcon, XIcon } from "../ui/Icons";
import { COMPARISON } from "@/lib/constants";

export default function WhyNotChatGPT() {
  return (
    <section id="comparison" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Section header */}
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {COMPARISON.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)]">
            {COMPARISON.subtext}
          </p>
        </div>

        {/* Task prompt */}
        <div className="max-w-[900px] mx-auto mb-8">
          <div className="rounded-[8px] bg-surface-subtle border border-[var(--color-border-light)] px-4 py-3 text-center">
            <p className="text-[14px] text-text-primary leading-[1.4]">
              {COMPARISON.task}
            </p>
          </div>
        </div>

        {/* Side-by-side panels */}
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left panel — ChatGPT / Claude */}
          <div className="rounded-[8px] border border-[var(--color-border-light)] bg-white shadow-[var(--shadow-sm)] overflow-hidden">
            <div className="px-4 py-3 bg-surface-subtle border-b border-[var(--color-border-light)]">
              <span className="text-[13px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide">
                {COMPARISON.leftPanel.label}
              </span>
            </div>
            <div className="p-4">
              <ol className="space-y-3">
                {COMPARISON.leftPanel.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#fce4ec] text-[11px] font-bold text-danger">
                      {i + 1}
                    </span>
                    <span className="text-[14px] text-[var(--color-text-subtle)] leading-[1.4]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 pt-3 border-t border-[var(--color-border-light)] flex items-center gap-2">
                <XIcon size={14} />
                <span className="text-[14px] font-bold text-danger">
                  {COMPARISON.leftPanel.time}
                </span>
              </div>
            </div>
          </div>

          {/* Right panel — Workpal */}
          <div className="rounded-[8px] border-2 border-cta bg-white shadow-[var(--shadow-sm)] overflow-hidden">
            <div className="px-4 py-3 bg-[#f0fdf4] border-b border-cta/20">
              <span className="text-[13px] font-bold text-cta uppercase tracking-wide">
                {COMPARISON.rightPanel.label}
              </span>
            </div>
            <div className="p-4">
              <ol className="space-y-3">
                {COMPARISON.rightPanel.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#dcfce7] text-[11px] font-bold text-cta">
                      {i + 1}
                    </span>
                    <span className="text-[14px] text-text-primary leading-[1.4]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 pt-3 border-t border-cta/20 flex items-center gap-2">
                <CheckIcon size={14} />
                <span className="text-[14px] font-bold text-cta">
                  {COMPARISON.rightPanel.time}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer text + CTA */}
        <div className="mt-8 text-center">
          <p className="text-[13px] text-[var(--color-text-muted)] mb-4">
            {COMPARISON.footer}
          </p>
          <Button variant="secondary">{COMPARISON.cta}</Button>
        </div>
      </div>
    </section>
  );
}
