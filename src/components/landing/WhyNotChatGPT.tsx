import Button from "../ui/Button";
import { CheckIcon, XIcon } from "../ui/Icons";
import { COMPARISON } from "@/lib/constants";

export default function WhyNotChatGPT() {
  return (
    <section id="comparison" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Section header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {COMPARISON.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)]">
            {COMPARISON.subtext}
          </p>
        </div>

        {/* Row-based comparison table */}
        <div className="max-w-[900px] mx-auto">
          {/* Table header — desktop only */}
          <div className="hidden md:grid grid-cols-[140px_1fr_1fr] gap-4 pb-3 border-b border-[var(--color-border-light)]">
            <div />
            <div className="text-[13px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide">
              {COMPARISON.competitorLabel}
            </div>
            <div className="text-[13px] font-bold text-cta uppercase tracking-wide">
              {COMPARISON.workpalLabel}
            </div>
          </div>

          {/* Rows */}
          {COMPARISON.rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] gap-3 md:gap-4 py-4 md:py-5 border-b border-[var(--color-border-light)] last:border-b-0"
            >
              {/* Dimension label */}
              <div className="text-[14px] font-bold text-text-primary md:pt-0.5">
                {row.dimension}
              </div>

              {/* Competitor */}
              <div className="flex items-start gap-2">
                <XIcon className="shrink-0 mt-0.5" />
                <span className="text-[14px] text-[var(--color-text-subtle)] leading-[1.4]">
                  {row.competitor}
                </span>
              </div>

              {/* Workpal */}
              <div className="flex items-start gap-2">
                <CheckIcon className="shrink-0 mt-0.5" />
                <span className="text-[14px] text-text-primary leading-[1.4]">
                  {row.workpal}
                </span>
              </div>
            </div>
          ))}
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
