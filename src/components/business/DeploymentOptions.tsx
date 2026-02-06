import Badge from "../ui/Badge";
import Card from "../ui/Card";
import { CheckIcon } from "../ui/Icons";
import { BUSINESS_DEPLOYMENT } from "@/lib/constants";

export default function DeploymentOptions() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {BUSINESS_DEPLOYMENT.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {BUSINESS_DEPLOYMENT.subtext}
          </p>
        </div>

        {/* 3-column deployment cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {BUSINESS_DEPLOYMENT.options.map((option, i) => (
            <Card
              key={i}
              accentBorder={option.recommended}
              hoverable={false}
            >
              {option.recommended && (
                <div className="mb-3">
                  <Badge variant="subtle">Most Popular</Badge>
                </div>
              )}

              <h3 className="text-[18px] font-bold text-text-primary">
                {option.title}
              </h3>
              <p className="mt-2 text-[14px] text-[var(--color-text-subtle)] leading-[1.4]">
                {option.description}
              </p>

              {/* Divider */}
              <div className="my-4 h-px bg-[var(--color-border-light)]" />

              <ul className="space-y-2">
                {option.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckIcon className="shrink-0 mt-0.5" />
                    <span className="text-[14px] text-text-primary leading-[1.4]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
