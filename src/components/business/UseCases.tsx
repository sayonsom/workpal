import Card from "../ui/Card";
import { CheckIcon } from "../ui/Icons";
import { BUSINESS_USE_CASES } from "@/lib/constants";

export default function UseCases() {
  return (
    <section className="py-16 md:py-24 bg-surface-subtle">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {BUSINESS_USE_CASES.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {BUSINESS_USE_CASES.subtext}
          </p>
        </div>

        {/* 2×2 role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {BUSINESS_USE_CASES.roles.map((role, i) => (
            <Card key={i} accentBorder hoverable={false}>
              <h3 className="text-[18px] font-bold text-text-primary">
                {role.title}
              </h3>
              <p className="mt-2 text-[14px] italic text-[var(--color-text-muted)] leading-[1.4]">
                &ldquo;{role.example}&rdquo;
              </p>
              <ul className="mt-4 space-y-2">
                {role.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckIcon className="shrink-0 mt-0.5" />
                    <span className="text-[14px] text-text-primary leading-[1.4]">
                      {bullet}
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
