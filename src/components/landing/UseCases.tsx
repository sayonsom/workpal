import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { USE_CASES } from "@/lib/constants";

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="6.5" stroke="#2BAC76" strokeWidth="1.5" />
      <path
        d="M8 4.5V8L10.5 9.5"
        stroke="#2BAC76"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function UseCases() {
  return (
    <section id={USE_CASES.sectionId} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Section header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {USE_CASES.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)]">
            {USE_CASES.subtext}
          </p>
        </div>

        {/* Use case cards — 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
          {USE_CASES.cases.map((uc, i) => (
            <Card key={i} accentBorder hoverable>
              {/* Persona badge */}
              <Badge variant="subtle" className="mb-3">
                {uc.persona}
              </Badge>

              {/* Trigger */}
              <p className="text-[13px] text-[var(--color-text-subtle)] italic leading-[1.5] mb-3">
                {uc.trigger}
              </p>

              {/* Output preview */}
              <div className="rounded-[6px] bg-surface-subtle border border-[var(--color-border-light)] p-3 mb-3">
                <p className="text-[12px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide mb-1.5">
                  Workpal produces:
                </p>
                <p className="text-[13px] text-text-primary leading-[1.5]">
                  {uc.output}
                </p>
              </div>

              {/* Why personalized — LinkedIn-grounded callout */}
              <div className="flex items-start gap-2 mb-3 px-3 py-2 rounded-[6px] bg-[#f0f9ff] border border-info/15">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
                  <rect x="1" y="1" width="14" height="14" rx="2" stroke="#1D9BD1" strokeWidth="1.5" />
                  <path d="M4.5 6.5V11M4.5 4.5v.5" stroke="#1D9BD1" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7 8.5c0-1.1.9-2 2-2h.5c.83 0 1.5.67 1.5 1.5V11M7 11V8.5" stroke="#1D9BD1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[12px] text-info leading-[1.4] font-medium">
                  {uc.whyPersonalized}
                </p>
              </div>

              {/* Time saved */}
              <div className="flex items-center gap-1.5">
                <ClockIcon />
                <span className="text-[13px] font-bold text-cta">
                  {uc.timeSaved}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
