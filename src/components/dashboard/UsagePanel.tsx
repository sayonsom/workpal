"use client";

import { DASHBOARD } from "@/lib/constants";
import type { UsageStats } from "@/lib/types";

interface UsagePanelProps {
  usage: UsageStats | null;
  loading: boolean;
}

export default function UsagePanel({ usage, loading }: UsagePanelProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!usage) {
    return (
      <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-12 text-center">
        <p className="text-[14px] text-[var(--color-text-muted)]">
          Unable to load usage data.
        </p>
      </div>
    );
  }

  const percentage = Math.min(
    (usage.tasks_used / usage.tasks_limit) * 100,
    100
  );

  return (
    <div>
      <h2 className="text-[24px] font-bold text-text-primary mb-6">
        {DASHBOARD.usage.heading}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tasks used */}
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6">
          <p className="text-[13px] text-[var(--color-text-muted)] font-bold uppercase tracking-wide">
            {DASHBOARD.usage.tasksUsed}
          </p>
          <p className="mt-2 text-[32px] font-bold text-text-primary">
            {usage.tasks_used}
            <span className="text-[16px] text-[var(--color-text-muted)] font-normal">
              {" "}
              / {usage.tasks_limit}
            </span>
          </p>
          {/* Progress bar */}
          <div className="mt-3 h-2 rounded-full bg-surface-subtle overflow-hidden">
            <div
              className="h-full rounded-full bg-cta transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Tasks remaining */}
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6">
          <p className="text-[13px] text-[var(--color-text-muted)] font-bold uppercase tracking-wide">
            {DASHBOARD.usage.tasksRemaining}
          </p>
          <p className="mt-2 text-[32px] font-bold text-cta">
            {usage.tasks_remaining}
          </p>
        </div>

        {/* Plan */}
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6">
          <p className="text-[13px] text-[var(--color-text-muted)] font-bold uppercase tracking-wide">
            {DASHBOARD.usage.plan}
          </p>
          <p className="mt-2 text-[20px] font-bold text-text-primary capitalize">
            {usage.plan}
          </p>
        </div>
      </div>
    </div>
  );
}
