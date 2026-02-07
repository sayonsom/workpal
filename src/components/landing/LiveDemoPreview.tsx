"use client";

import { useState } from "react";
import { LIVE_DEMO_PREVIEW } from "@/lib/constants";

function EmailCard({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-[8px] border overflow-hidden ${
        accent
          ? "border-cta bg-[#f0fdf4]"
          : "border-[var(--color-border-light)] bg-white"
      }`}
    >
      <div
        className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wide border-b ${
          accent
            ? "bg-[#dcfce7] border-cta/20 text-cta"
            : "bg-surface-subtle border-[var(--color-border-light)] text-[var(--color-text-muted)]"
        }`}
      >
        {label}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M8 1L2 4v4c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V4L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5.5 8l2 2 3-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LiveDemoPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = LIVE_DEMO_PREVIEW.tabs[activeTab];

  return (
    <section id={LIVE_DEMO_PREVIEW.sectionId} className="py-16 md:py-24 bg-surface-subtle">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Section header */}
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <span className="inline-block text-[13px] font-bold text-cta uppercase tracking-wide mb-2">
            {LIVE_DEMO_PREVIEW.label}
          </span>
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {LIVE_DEMO_PREVIEW.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)]">
            {LIVE_DEMO_PREVIEW.subtitle}
          </p>
        </div>

        {/* Tabbed card */}
        <div className="max-w-[800px] mx-auto">
          {/* Tab buttons */}
          <div className="flex gap-1 mb-6 bg-white rounded-[8px] border border-[var(--color-border-light)] p-1 w-fit mx-auto">
            {LIVE_DEMO_PREVIEW.tabs.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-[6px] text-[14px] font-bold transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] ${
                  activeTab === i
                    ? "bg-cta text-white"
                    : "text-[var(--color-text-subtle)] hover:text-text-primary hover:bg-surface-subtle"
                }`}
              >
                {t.tabLabel}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Forwarded email */}
            <EmailCard label="You forward this">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="text-[var(--color-text-muted)]">From:</span>
                  <span className="font-bold text-text-primary">{tab.forwardedEmail.from}</span>
                </div>
                <div className="text-[14px] font-bold text-text-primary">
                  {tab.forwardedEmail.subject}
                </div>
                <p className="text-[13px] text-[var(--color-text-subtle)] leading-[1.5]">
                  {tab.forwardedEmail.body}
                </p>
              </div>
            </EmailCard>

            {/* Arrow */}
            <div className="flex justify-center">
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
                <path d="M8 4v16M8 20l-4-4M8 20l4-4" stroke="rgba(29,28,29,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Workpal reply */}
            <EmailCard label="Workpal replies to you" accent>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[12px]">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[999px] bg-cta/10 border border-cta/20">
                    <ShieldIcon />
                    <span className="text-[10px] font-bold text-cta uppercase tracking-wide">Closed Loop</span>
                  </div>
                  <span className="text-[var(--color-text-muted)]">{tab.workpalReply.fromLine}</span>
                </div>
                <div className="text-[14px] font-bold text-text-primary">
                  {tab.workpalReply.subject}
                </div>
                <div className="text-[13px] text-[var(--color-text-subtle)] leading-[1.6] whitespace-pre-line">
                  {tab.workpalReply.body.split("**").map((segment, i) => {
                    // Simple bold parsing: odd indices are bold
                    if (i % 2 === 1) {
                      return (
                        <strong key={i} className="text-text-primary font-bold">
                          {segment}
                        </strong>
                      );
                    }
                    // Handle italic markers
                    return segment.split("_").map((part, j) => {
                      if (j % 2 === 1) {
                        return (
                          <em key={`${i}-${j}`} className="text-[var(--color-text-muted)] not-italic text-[12px]">
                            {part}
                          </em>
                        );
                      }
                      return <span key={`${i}-${j}`}>{part}</span>;
                    });
                  })}
                </div>
              </div>
            </EmailCard>
          </div>
        </div>
      </div>
    </section>
  );
}
