import { OUTPUT_SHOWCASE } from "@/lib/constants";

/* ── Inline email icons ── */

function InboxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1v3M8 12v3M1 8h3M12 8h3M3.5 3.5l2 2M10.5 10.5l2 2M12.5 3.5l-2 2M5.5 10.5l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DownArrow() {
  return (
    <div className="flex justify-center py-2">
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
        <path d="M8 4v16M8 20l-4-4M8 20l4-4" stroke="rgba(29,28,29,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function OutputShowcase() {
  const example = OUTPUT_SHOWCASE.examples[0];

  return (
    <section id={OUTPUT_SHOWCASE.sectionId} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {OUTPUT_SHOWCASE.title}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)]">
            {OUTPUT_SHOWCASE.subtitle}
          </p>
        </div>

        {/* Input → Output example */}
        <div className="max-w-[640px] mx-auto">
          {/* LinkedIn calibration callout */}
          <div className="mb-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] border border-info/20 bg-[#f0f9ff]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
              <rect x="1" y="1" width="14" height="14" rx="2" stroke="#1D9BD1" strokeWidth="1.5" />
              <path d="M4.5 6.5V11M4.5 4.5v.5" stroke="#1D9BD1" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7 8.5c0-1.1.9-2 2-2h.5c.83 0 1.5.67 1.5 1.5V11M7 11V8.5" stroke="#1D9BD1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[13px] font-bold text-info">
              {OUTPUT_SHOWCASE.linkedInCallout}
            </span>
          </div>

          {/* Input email */}
          <div className="rounded-[8px] border border-[var(--color-border-light)] bg-white shadow-[var(--shadow-sm)] overflow-hidden">
            <div className="px-4 py-2.5 bg-surface-subtle border-b border-[var(--color-border-light)] flex items-center gap-2">
              <InboxIcon />
              <span className="text-[12px] font-bold text-[var(--color-text-subtle)]">{example.inputLabel}</span>
            </div>
            <div className="px-4 py-3">
              <div className="text-[13px] font-bold text-text-primary">{example.inputSubject}</div>
              <p className="mt-1 text-[13px] text-[var(--color-text-subtle)] leading-[1.4]">{example.inputBody}</p>
            </div>
          </div>

          <DownArrow />

          {/* Output email */}
          <div className="rounded-[8px] border-2 border-cta bg-[#f0fdf4] shadow-[var(--shadow-sm)] overflow-hidden">
            <div className="px-4 py-2.5 bg-[#dcfce7] border-b border-cta/20 flex items-center gap-2">
              <SparkleIcon />
              <span className="text-[12px] font-bold text-cta">{example.outputLabel}</span>
            </div>
            <div className="px-4 py-3">
              <div className="text-[13px] font-bold text-text-primary">{example.outputSubject}</div>
              <p className="mt-2 text-[13px] text-[var(--color-text-subtle)] leading-[1.5]">
                {example.outputPreview}
              </p>
              <p className="mt-3 text-[12px] text-cta font-bold italic">
                {example.outputNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
