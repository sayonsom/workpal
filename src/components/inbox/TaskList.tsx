"use client";

import Button from "../ui/Button";
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

function statusStyle(status: string): string {
  switch (status) {
    case "completed":
      return "bg-success/10 text-success";
    case "processing":
      return "bg-info/10 text-info";
    case "failed":
      return "bg-danger/10 text-danger";
    default:
      return "bg-surface-subtle text-[var(--color-text-muted)]";
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
      <div className="flex justify-center py-16">
        <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-[12px] bg-white border border-[var(--color-border-light)] p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-cta/10 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8h3.5a1 1 0 011 1v.5a1.5 1.5 0 003 0V9a1 1 0 011-1H14" stroke="var(--color-cta)" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="2" y="2" width="12" height="12" rx="2" stroke="var(--color-cta)" strokeWidth="1.5" />
          </svg>
        </div>
        <h3 className="text-[16px] font-bold text-text-primary mb-1">
          {INBOX.taskList.emptyHeading}
        </h3>
        <p className="text-[14px] text-[var(--color-text-subtle)] mb-4">
          {INBOX.taskList.emptyText}
        </p>
        <p className="text-[14px] font-bold text-cta">{agentEmail}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task, index) => (
        <button
          key={task.task_id}
          onClick={() => onSelectTask(task)}
          className="w-full text-left rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-4 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-[180ms] ease-[var(--ease-default)] cursor-pointer task-card-enter"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {/* Subject + attachments */}
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-bold text-text-primary truncate">
                  {task.subject}
                </p>
                {task.has_attachments && (
                  <span className="shrink-0 inline-flex items-center gap-0.5 text-[var(--color-text-muted)]">
                    <PaperclipIcon />
                    {task.attachment_names && task.attachment_names.length > 0 && (
                      <span className="text-[11px]">{task.attachment_names.length}</span>
                    )}
                  </span>
                )}
              </div>

              {/* Output summary preview */}
              {task.output_summary && (
                <p className="mt-1 text-[13px] text-[var(--color-text-subtle)] line-clamp-2">
                  {task.output_summary}
                </p>
              )}

              {/* Timestamp */}
              <p className="mt-2 text-[12px] text-[var(--color-text-muted)]">
                {relativeTime(task.created_at)}
              </p>
            </div>

            {/* Status badge */}
            <span
              className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${statusStyle(task.status)}`}
            >
              {task.status}
            </span>
          </div>
        </button>
      ))}

      {hasMore && (
        <div className="text-center pt-3">
          <Button variant="secondary" onClick={onLoadMore} disabled={loadingMore}>
            {loadingMore ? "Loading..." : INBOX.taskList.loadMore}
          </Button>
        </div>
      )}
    </div>
  );
}
