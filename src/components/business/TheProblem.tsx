import Badge from "../ui/Badge";
import { BUSINESS_PROBLEM } from "@/lib/constants";

/* ── Inline warning icon (danger red triangle) ── */
function WarningIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M10 2L1.5 17h17L10 2z"
        stroke="#E01E5A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 8v4"
        stroke="#E01E5A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="14.5" r="0.75" fill="#E01E5A" />
    </svg>
  );
}

export default function TheProblem() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <Badge variant="subtle">{BUSINESS_PROBLEM.badge}</Badge>
          <h2 className="mt-4 text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {BUSINESS_PROBLEM.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {BUSINESS_PROBLEM.subtext}
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {BUSINESS_PROBLEM.points.map((point, i) => (
            <div key={i} className="flex gap-3">
              <div className="mt-0.5">
                <WarningIcon />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-text-primary">
                  {point.title}
                </h3>
                <p className="mt-1 text-[14px] text-[var(--color-text-subtle)] leading-[1.4]">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
