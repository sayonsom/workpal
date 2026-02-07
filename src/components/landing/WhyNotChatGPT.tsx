import { COMPARISON_SECTION } from "@/lib/constants";

function ComparisonIcon({ icon }: { icon: string }) {
  const isNegative = icon === "\u2715" || icon === "\u26a0";
  const isDiamond = icon === "\u25c6";

  return (
    <span
      className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-[13px] font-bold ${
        isNegative
          ? "bg-[#fce4ec] text-danger"
          : isDiamond
            ? "bg-[#dcfce7] text-cta"
            : "bg-[#dcfce7] text-cta"
      }`}
    >
      {icon}
    </span>
  );
}

export default function WhyNotChatGPT() {
  return (
    <section id={COMPARISON_SECTION.sectionId} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Section header */}
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <span className="inline-block text-[13px] font-bold text-cta uppercase tracking-wide mb-2">
            {COMPARISON_SECTION.label}
          </span>
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {COMPARISON_SECTION.heading}
          </h2>
          <p className="mt-2 text-[18px] text-[var(--color-text-subtle)]">
            {COMPARISON_SECTION.subtitle}
          </p>
        </div>

        {/* Two-column comparison */}
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left — ChatGPT Way */}
          <div className="rounded-[8px] border border-[var(--color-border-light)] bg-[#fffbf5] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border-light)]">
              <h3 className="text-[16px] font-bold text-[var(--color-text-muted)]">
                {COMPARISON_SECTION.left.header}
              </h3>
            </div>
            <div className="p-5 space-y-3">
              {COMPARISON_SECTION.left.rows.map((row, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ComparisonIcon icon={row.icon} />
                  <span className="text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
                    {row.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Workpal Way */}
          <div className="rounded-[8px] border-2 border-cta bg-[#f0fdf4] overflow-hidden">
            <div className="px-5 py-4 border-b border-cta/20">
              <h3 className="text-[16px] font-bold text-cta">
                {COMPARISON_SECTION.right.header}
              </h3>
            </div>
            <div className="p-5 space-y-3">
              {COMPARISON_SECTION.right.rows.map((row, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ComparisonIcon icon={row.icon} />
                  <span className="text-[14px] text-text-primary leading-[1.5] font-medium">
                    {row.text}
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
