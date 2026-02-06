import Card from "../ui/Card";
import Button from "../ui/Button";
import { ArrowRightIcon } from "../ui/Icons";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import { HOW_IT_WORKS } from "@/lib/constants";

export default function HowItWorks() {
  const steps = HOW_IT_WORKS.steps;

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Section header */}
        <div className="text-center max-w-[600px] mx-auto mb-12">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {HOW_IT_WORKS.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)]">
            {HOW_IT_WORKS.subtext}
          </p>
        </div>

        {/* 3-step card flow with arrows */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-start">
          {/* Step 1 */}
          <Card>
            <ImagePlaceholder
              label={steps[0].placeholderLabel}
              aspectRatio="16/10"
              className="mb-4"
            />
            <h3 className="text-[18px] font-bold text-text-primary mb-2">
              {steps[0].title}
            </h3>
            <p className="text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
              {steps[0].description}
            </p>
          </Card>

          {/* Arrow 1 */}
          <div className="hidden lg:flex items-center justify-center self-center">
            <ArrowRightIcon />
          </div>

          {/* Step 2 */}
          <Card>
            <ImagePlaceholder
              label={steps[1].placeholderLabel}
              aspectRatio="16/10"
              className="mb-4"
            />
            <h3 className="text-[18px] font-bold text-text-primary mb-2">
              {steps[1].title}
            </h3>
            <p className="text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
              {steps[1].description}
            </p>
          </Card>

          {/* Arrow 2 */}
          <div className="hidden lg:flex items-center justify-center self-center">
            <ArrowRightIcon />
          </div>

          {/* Step 3 */}
          <Card>
            <ImagePlaceholder
              label={steps[2].placeholderLabel}
              aspectRatio="16/10"
              className="mb-4"
            />
            <h3 className="text-[18px] font-bold text-text-primary mb-2">
              {steps[2].title}
            </h3>
            <p className="text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
              {steps[2].description}
            </p>
          </Card>
        </div>

        {/* Secondary CTA */}
        <div className="mt-12 text-center">
          <Button variant="secondary">{HOW_IT_WORKS.cta}</Button>
        </div>
      </div>
    </section>
  );
}
