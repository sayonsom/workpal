import { PERSONALIZATION } from "@/lib/constants";

export default function Personalization() {
  return (
    <section id={PERSONALIZATION.sectionId} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Section header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <span className="inline-block text-[13px] font-bold text-cta uppercase tracking-wide mb-2">
            {PERSONALIZATION.label}
          </span>
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {PERSONALIZATION.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.5]">
            {PERSONALIZATION.subtitle}
          </p>
        </div>

        {/* Progression timeline */}
        <div className="max-w-[600px] mx-auto">
          {PERSONALIZATION.progression.map((step, i) => {
            const isLast = i === PERSONALIZATION.progression.length - 1;

            return (
              <div key={i} className="flex gap-4">
                {/* Timeline line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-cta border-2 border-[#dcfce7] shrink-0 mt-1" />
                  {!isLast && (
                    <div className="w-0.5 flex-1 bg-cta/20 my-1" />
                  )}
                </div>

                {/* Content */}
                <div className={isLast ? "pb-0" : "pb-8"}>
                  <p className="text-[13px] font-bold text-cta uppercase tracking-wide">
                    {step.stage}
                  </p>
                  <p className="mt-1 text-[15px] text-text-primary leading-[1.5]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
