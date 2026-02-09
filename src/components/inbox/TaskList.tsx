"use client";

import { INBOX } from "@/lib/constants";
import type { Task } from "@/lib/types";

/* ── Icons ── */

function PaperclipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M14 7.5l-5.5 5.5a3.5 3.5 0 01-5-5L9 2.5a2 2 0 013 3L6.5 11a.5.5 0 01-1-1L11 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="2" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6v7a1 1 0 001 1h10a1 1 0 001-1V6M6.5 9h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M5 4V2.5A.5.5 0 015.5 2h5a.5.5 0 01.5.5V4M13 4v9.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 013 13.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Helpers ── */

function relativeTime(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 172800) return "Yesterday";
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function shortDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function statusDot(status: string): string {
  switch (status) {
    case "completed":
      return "bg-success";
    case "processing":
      return "bg-info";
    case "failed":
      return "bg-danger";
    default:
      return "bg-[var(--color-text-muted)]";
  }
}

/* ── Props ── */

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
  onSelectTask: (task: Task) => void;
  agentEmail: string;
}

export default function TaskList({
  tasks,
  loading,
  hasMore,
  loadingMore,
  onLoadMore,
  onSelectTask,
  agentEmail,
}: TaskListProps) {
  if (loading) {
    return (
      <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <div className="w-2 h-2 rounded-full bg-[var(--color-surface-subtle)] animate-pulse" />
            <div className="h-4 w-[160px] sm:w-[200px] rounded bg-[var(--color-surface-subtle)] animate-pulse" />
            <div className="h-3 flex-1 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
            <div className="h-3 w-[50px] rounded bg-[var(--color-surface-subtle)] animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-[12px] bg-white border border-[var(--color-border-light)] p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-[var(--color-surface-subtle)] flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8h3.5a1 1 0 011 1v.5a1.5 1.5 0 003 0V9a1 1 0 011-1H14" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="2" y="2" width="12" height="12" rx="2" stroke="var(--color-text-muted)" strokeWidth="1.5" />
          </svg>
        </div>
        <h3 className="text-[16px] font-bold text-text-primary mb-1">
          {INBOX.taskList.emptyHeading}
        </h3>
        <p className="text-[14px] text-[var(--color-text-subtle)] mb-4">
          {INBOX.taskList.emptyText}
        </p>
        <p className="text-[14px] font-medium text-cta">{agentEmail}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Gmail-style dense row list */}
      <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
        {tasks.map((task) => (
          <button
            key={task.task_id}
            onClick={() => onSelectTask(task)}
            className="task-row w-full text-left flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--color-surface-subtle)] hover:shadow-[inset_2px_0_0_var(--color-cta)] transition-all duration-[120ms] cursor-pointer group"
          >
            {/* Status dot */}
            <span className={`shrink-0 w-2 h-2 rounded-full ${statusDot(task.status)}`} />

            {/* Subject — bold, truncated */}
            <span className="shrink-0 w-[180px] sm:w-[220px] text-[14px] font-semibold text-text-primary truncate">
              {task.subject}
            </span>

            {/* Separator dash */}
            <span className="shrink-0 text-[var(--color-text-muted)] text-[13px]">&mdash;</span>

            {/* Summary preview — muted, fills remaining space */}
            <span className="flex-1 min-w-0 text-[13px] text-[var(--color-text-subtle)] truncate">
              {task.output_summary || task.input_summary || "No preview"}
            </span>

            {/* Attachment indicator */}
            {task.has_attachments && (
              <span className="shrink-0 text-[var(--color-text-muted)]">
                <PaperclipIcon />
              </span>
            )}

            {/* Date — hidden on hover, replaced by actions */}
            <span className="task-row-date shrink-0 text-[12px] text-[var(--color-text-muted)] tabular-nums w-[60px] text-right">
              {shortDate(task.created_at)}
            </span>

            {/* Hover actions (Gmail-style) */}
            <span className="task-row-actions shrink-0 flex items-center gap-1 w-[60px] justify-end">
              <span
                className="p-1 rounded-full hover:bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:text-text-primary transition-colors"
                title="Archive"
                onClick={(e) => e.stopPropagation()}
              >
                <ArchiveIcon />
              </span>
              <span
                className="p-1 rounded-full hover:bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:text-danger transition-colors"
                title="Delete"
                onClick={(e) => e.stopPropagation()}
              >
                <DeleteIcon />
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Relative time + count footer */}
      <div className="flex items-center justify-between mt-3 px-1">
        <p className="text-[12px] text-[var(--color-text-muted)]">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
          {tasks.length > 0 && (
            <> &middot; latest {relativeTime(tasks[0].created_at)}</>
          )}
        </p>
        {hasMore && (
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="text-[13px] font-medium text-cta hover:text-cta-hover transition-colors cursor-pointer disabled:opacity-50"
          >
            {loadingMore ? "Loading..." : INBOX.taskList.loadMore}
          </button>
        )}
      </div>
    </div>
  );
}
