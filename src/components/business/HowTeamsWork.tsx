import ImagePlaceholder from "../ui/ImagePlaceholder";
import { BUSINESS_HOW_TEAMS_WORK } from "@/lib/constants";

/* ── Step number pill ── */
function StepNumber({ number }: { number: string }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-cta text-white text-[13px] font-bold">
      {number}
    </span>
  );
}

export default function HowTeamsWork() {
  return (
    <section className="py-16 md:py-24 bg-surface-subtle">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {BUSINESS_HOW_TEAMS_WORK.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {BUSINESS_HOW_TEAMS_WORK.subtext}
          </p>
        </div>

        {/* Step cards — responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_HOW_TEAMS_WORK.steps.map((step, i) => (
            <div
              key={i}
              className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-5"
            >
              <div className="mb-3">
                <StepNumber number={step.number} />
              </div>

              <ImagePlaceholder
                label={step.placeholderLabel}
                aspectRatio="16/10"
                className="w-full mb-4"
              />

              <h3 className="text-[15px] font-bold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-1 text-[14px] text-[var(--color-text-subtle)] leading-[1.4]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
