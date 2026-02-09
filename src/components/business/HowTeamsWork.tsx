import ImagePlaceholder from "../ui/ImagePlaceholder";
import { BUSINESS_HOW_TEAMS_WORK } from "@/lib/constants";

const STEP_IMAGES = [
  "/images/business/step-1-provisioning.webp",
  "/images/business/step-2-contact-list.webp",
  "/images/business/step-3-email-forward.webp",
  "/images/business/step-4-audit-trail.webp",
  "/images/business/step-5-transfer-flow.webp",
];

/* ── Step number pill ── */
function StepNumber({ number }: { number: string }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cta text-white text-[14px] font-bold">
      {number}
    </span>
  );
}

export default function HowTeamsWork() {
  return (
    <section>
      {/* Header */}
      <div className="py-16 md:py-20 bg-surface-subtle">
        <div className="mx-auto max-w-[1200px] px-4 text-center max-w-[640px]">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {BUSINESS_HOW_TEAMS_WORK.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {BUSINESS_HOW_TEAMS_WORK.subtext}
          </p>
        </div>
      </div>

      {/* Step rows — alternating backgrounds */}
      {BUSINESS_HOW_TEAMS_WORK.steps.map((step, i) => {
        const isEven = i % 2 === 0;
        return (
          <div
            key={i}
            className={isEven ? "bg-white" : "bg-surface-subtle"}
          >
            <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-20">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center ${
                  isEven ? "" : "lg:[direction:rtl]"
                }`}
              >
                {/* Image — always first in DOM, but visually alternates via RTL trick */}
                <div className={isEven ? "" : "lg:[direction:ltr]"}>
                  <ImagePlaceholder
                    label={step.placeholderLabel}
                    src={STEP_IMAGES[i]}
                    alt={step.title}
                    aspectRatio="16/10"
                    className="w-full rounded-[8px]"
                  />
                </div>

                {/* Text */}
                <div className={isEven ? "" : "lg:[direction:ltr]"}>
                  <div className="flex items-center gap-3 mb-4">
                    <StepNumber number={step.number} />
                    <span className="text-[12px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.5px]">
                      Step {step.number}
                    </span>
                  </div>

                  <h3 className="text-[22px] md:text-[26px] font-bold text-text-primary leading-[1.2]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.6] max-w-[480px]">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
