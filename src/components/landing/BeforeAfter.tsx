import { BEFORE_AFTER } from "@/lib/constants";

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="#E01E5A" strokeWidth="1.5" />
      <path d="M8 4.5V8l2.5 1.5" stroke="#E01E5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 8.5l3 3 5-6" stroke="#2BAC76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BeforeAfter() {
  return (
    <section id={BEFORE_AFTER.sectionId} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Heading */}
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {BEFORE_AFTER.heading}
          </h2>
        </div>

        {/* Two-column comparison */}
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded-[8px] border border-[var(--color-border-light)] bg-[#fffbf5] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border-light)]">
              <h3 className="text-[16px] font-bold text-[var(--color-text-muted)]">
                {BEFORE_AFTER.before.label}
              </h3>
            </div>
            <div className="p-5 space-y-3">
              {BEFORE_AFTER.before.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5">
                    <ClockIcon />
                  </span>
                  <span className="text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="rounded-[8px] border-2 border-cta bg-[#f0fdf4] overflow-hidden">
            <div className="px-5 py-4 border-b border-cta/20">
              <h3 className="text-[16px] font-bold text-cta">
                {BEFORE_AFTER.after.label}
              </h3>
            </div>
            <div className="p-5 space-y-3">
              {BEFORE_AFTER.after.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-[14px] text-text-primary leading-[1.5] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
