import Card from "../ui/Card";
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

        {/* Two-column comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
          {/* Left card — general-purpose */}
          <Card accentBorder={false} hoverable={false}>
            <h3 className="text-[15px] font-bold text-text-primary mb-4">
              {COMPARISON.leftCard.title}
            </h3>
            <ul className="space-y-3">
              {COMPARISON.leftCard.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XIcon className="shrink-0 mt-0.5" />
                  <span className="text-[15px] text-text-primary leading-[1.4]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Right card — Workpal */}
          <Card accentBorder={true} hoverable={false}>
            <h3 className="text-[15px] font-bold text-cta mb-4">
              {COMPARISON.rightCard.title}
            </h3>
            <ul className="space-y-3">
              {COMPARISON.rightCard.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckIcon className="shrink-0 mt-0.5" />
                  <span className="text-[15px] text-text-primary leading-[1.4]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Footer text + CTA */}
        <div className="mt-8 text-center">
          <p className="text-[13px] text-[var(--color-text-muted)] mb-4">
            {COMPARISON.footer}
          </p>
          <Button variant="secondary">{COMPARISON.cta} &rarr;</Button>
          <p className="mt-2 text-[12px] text-[var(--color-text-muted)]">
            {COMPARISON.microcopy}
          </p>
        </div>
      </div>
    </section>
  );
}
