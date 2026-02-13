"use client";

import { INBOX } from "@/lib/constants";
import type { Task } from "@/lib/types";

/* ── Icons ── */

function CalendarEmptyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="var(--color-text-muted)" strokeWidth="1.5" />
      <path d="M2 7h12M5 1.5v3M11 1.5v3" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Helpers ── */

type DateGroup = "today" | "tomorrow" | "thisWeek" | "later";

function getDateGroup(meetingDate: number): DateGroup {
  const now = new Date();
  const meeting = new Date(meetingDate * 1000);

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  const dayAfterTomorrow = new Date(todayStart);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  // End of this week (Sunday)
  const weekEnd = new Date(todayStart);
  weekEnd.setDate(weekEnd.getDate() + (7 - todayStart.getDay()));

  if (meeting >= todayStart && meeting < tomorrowStart) return "today";
  if (meeting >= tomorrowStart && meeting < dayAfterTomorrow) return "tomorrow";
  if (meeting >= dayAfterTomorrow && meeting < weekEnd) return "thisWeek";
  return "later";
}

const groupLabels: Record<DateGroup, string> = {
  today: INBOX.upcoming.today,
  tomorrow: INBOX.upcoming.tomorrow,
  thisWeek: INBOX.upcoming.thisWeek,
  later: INBOX.upcoming.later,
};

const groupOrder: DateGroup[] = ["today", "tomorrow", "thisWeek", "later"];

function groupTasks(tasks: Task[]): Map<DateGroup, Task[]> {
  const groups = new Map<DateGroup, Task[]>();
  for (const task of tasks) {
    if (!task.meeting_date) continue;
    const group = getDateGroup(task.meeting_date);
    const existing = groups.get(group) ?? [];
    existing.push(task);
    groups.set(group, existing);
  }
  return groups;
}

function formatMeetingTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatMeetingDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function cleanTitle(subject: string): string {
  return subject.replace(/^Meeting Prep:\s*/i, "");
}

function statusBadge(status: string): { label: string; className: string } {
  switch (status) {
    case "completed":
      return {
        label: INBOX.upcoming.briefReady,
        className: "bg-success/10 text-success",
      };
    case "processing":
      return {
        label: INBOX.upcoming.preparing,
        className: "bg-info/10 text-info",
      };
    case "failed":
      return {
        label: INBOX.upcoming.failed,
        className: "bg-danger/10 text-danger",
      };
    default:
      return {
        label: INBOX.upcoming.preparing,
        className: "bg-[var(--color-surface-subtle)] text-[var(--color-text-muted)]",
      };
  }
}

/* ── Props ── */

interface UpcomingListProps {
  tasks: Task[];
  loading: boolean;
  onSelectTask: (task: Task) => void;
  agentEmail: string;
}

/* ── Component ── */

export default function UpcomingList({
  tasks,
  loading,
  onSelectTask,
  agentEmail,
}: UpcomingListProps) {
  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-[12px] bg-white border border-[var(--color-border-light)] p-4">
            <div className="h-4 w-24 rounded bg-[var(--color-surface-subtle)] animate-pulse mb-3" />
            <div className="h-5 w-48 rounded bg-[var(--color-surface-subtle)] animate-pulse mb-2" />
            <div className="h-3 w-32 rounded bg-[var(--color-surface-subtle)] animate-pulse mb-2" />
            <div className="h-3 w-64 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (tasks.length === 0) {
    return (
      <div className="rounded-[12px] bg-white border border-[var(--color-border-light)] p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--color-surface-subtle)] flex items-center justify-center mx-auto mb-4">
          <CalendarEmptyIcon />
        </div>
        <h3 className="text-[16px] font-bold text-text-primary mb-1">
          {INBOX.upcoming.emptyHeading}
        </h3>
        <p className="text-[14px] text-[var(--color-text-subtle)] mb-4">
          {INBOX.upcoming.emptyText}
        </p>
        <p className="text-[14px] font-medium text-cta">{agentEmail}</p>
      </div>
    );
  }

  // Grouped list
  const grouped = groupTasks(tasks);

  return (
    <div className="space-y-6">
      {groupOrder.map((group) => {
        const groupTasks = grouped.get(group);
        if (!groupTasks || groupTasks.length === 0) return null;

        return (
          <section key={group}>
            {/* Date group heading */}
            <h3 className="text-[12px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2 px-1">
              {groupLabels[group]}
            </h3>

            {/* Meeting cards */}
            <div className="space-y-2">
              {groupTasks.map((task) => {
                const badge = statusBadge(task.status);
                return (
                  <button
                    key={task.task_id}
                    onClick={() => onSelectTask(task)}
                    className="w-full text-left rounded-[10px] bg-white border border-[var(--color-border-light)] p-4 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:border-[var(--color-border-light)] transition-all duration-[150ms] cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* Left: title + meta */}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[14px] font-semibold text-text-primary truncate group-hover:text-cta transition-colors duration-[150ms]">
                          {cleanTitle(task.subject)}
                        </h4>

                        {/* Time + date row */}
                        {task.meeting_date && (
                          <div className="flex items-center gap-1.5 mt-1 text-[12px] text-[var(--color-text-muted)]">
                            <ClockIcon />
                            <span>{formatMeetingTime(task.meeting_date)}</span>
                            <span>&middot;</span>
                            <span>{formatMeetingDate(task.meeting_date)}</span>
                          </div>
                        )}

                        {/* Summary preview */}
                        {task.output_summary && (
                          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1.5 line-clamp-2">
                            {task.output_summary}
                          </p>
                        )}
                      </div>

                      {/* Right: status badge */}
                      <span className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${badge.className}`}>
                        {badge.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Footer count */}
      <p className="text-[12px] text-[var(--color-text-muted)] px-1">
        {tasks.length} upcoming meeting{tasks.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
