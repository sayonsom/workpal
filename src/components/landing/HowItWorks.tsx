import Button from "../ui/Button";
import { HOW_IT_WORKS } from "@/lib/constants";

/* ── Step number pill ── */
function StepPill({ step }: { step: number }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cta text-white text-[14px] font-bold">
      {step}
    </span>
  );
}

/* ── Video player with mp4 + webm sources ── */
function StepVideo({
  mp4,
  webm,
  alt,
}: {
  mp4: string;
  webm: string;
  alt: string;
}) {
  return (
    <div className="rounded-[8px] overflow-hidden border border-[var(--color-border-light)] shadow-[var(--shadow-md)] bg-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto block"
        aria-label={alt}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}

export default function HowItWorks() {
  const steps = HOW_IT_WORKS.steps;

  return (
    <section id={HOW_IT_WORKS.sectionId} className="py-16 md:py-24 bg-surface-subtle">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Section header */}
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {HOW_IT_WORKS.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.5]">
            {HOW_IT_WORKS.subtext}
          </p>
        </div>

        {/* 3 rows — alternating video left/right */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;

            return (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                {/* Video — left on odd steps (0, 2), right on even step (1) */}
                <div
                  className={`${isEven ? "md:order-1" : "md:order-2"} order-2`}
                >
                  <StepVideo
                    mp4={step.videoMp4}
                    webm={step.videoWebm}
                    alt={step.videoAlt}
                  />
                </div>

                {/* Text — opposite side of video */}
                <div
                  className={`${isEven ? "md:order-2" : "md:order-1"} order-1`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <StepPill step={step.step} />
                    <h3 className="text-[24px] md:text-[28px] font-bold text-text-primary leading-[1.2]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[15px] text-[var(--color-text-subtle)] leading-[1.6] max-w-[440px]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a href="/#hero-signup">
            <Button variant="primary">{HOW_IT_WORKS.cta}</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
