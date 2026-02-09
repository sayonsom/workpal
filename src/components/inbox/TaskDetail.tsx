"use client";

import { INBOX } from "@/lib/constants";
import type { Task } from "@/lib/types";

/* ── Icons ── */

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M14 7.5l-5.5 5.5a3.5 3.5 0 01-5-5L9 2.5a2 2 0 013 3L6.5 11a.5.5 0 01-1-1L11 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Helpers ── */

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function statusStyle(status: string): { bg: string; text: string; label: string } {
  switch (status) {
    case "completed":
      return { bg: "bg-success/10", text: "text-success", label: "Completed" };
    case "processing":
      return { bg: "bg-info/10", text: "text-info", label: "Processing" };
    case "failed":
      return { bg: "bg-danger/10", text: "text-danger", label: "Failed" };
    default:
      return { bg: "bg-surface-subtle", text: "text-[var(--color-text-muted)]", label: status };
  }
}

/* ── Props ── */

interface TaskDetailProps {
  task: Task;
  onBack: () => void;
}

export default function TaskDetail({ task, onBack }: TaskDetailProps) {
  const status = statusStyle(task.status);
  const attachmentNames = task.attachment_names ?? [];

  return (
    <div className="animate-fade-in">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[14px] text-cta hover:text-cta-hover font-medium transition-colors duration-[180ms] cursor-pointer mb-6"
      >
        <ArrowLeftIcon />
        {INBOX.taskDetail.back}
      </button>

      {/* Subject */}
      <h1 className="text-[22px] font-bold text-text-primary leading-tight mb-3">
        {task.subject}
      </h1>

      {/* Metadata */}
      <div className="flex items-center gap-3 flex-wrap mb-8">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-bold ${status.bg} ${status.text}`}>
          {status.label}
        </span>
        <span className="text-[13px] text-[var(--color-text-muted)]">
          {formatDate(task.created_at)}
        </span>
        {attachmentNames.length > 0 && (
          <span className="inline-flex items-center gap-1 text-[13px] text-[var(--color-text-muted)]">
            <PaperclipIcon />
            {attachmentNames.length} file{attachmentNames.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* YOUR REQUEST */}
      <div className="rounded-[10px] bg-[var(--color-surface-subtle)] border border-[var(--color-border-light)] p-6 mb-4">
        <h3 className="text-[11px] font-bold tracking-[0.08em] text-[var(--color-text-muted)] uppercase mb-3">
          {INBOX.taskDetail.yourRequest}
        </h3>
        <p className="text-[14px] text-text-primary leading-[1.6] whitespace-pre-wrap">
          {task.input_summary || INBOX.taskDetail.noPreview}
        </p>
      </div>

      {/* WORKPAL'S RESPONSE */}
      <div className="rounded-[10px] bg-white border-2 border-cta/15 p-6 mb-4">
        <h3 className="text-[11px] font-bold tracking-[0.08em] text-cta uppercase mb-3">
          {INBOX.taskDetail.workpalResponse}
        </h3>
        <p className="text-[14px] text-text-primary leading-[1.6] whitespace-pre-wrap">
          {task.output_summary || INBOX.taskDetail.noPreview}
        </p>
      </div>

      {/* ATTACHMENTS */}
      {attachmentNames.length > 0 && (
        <div className="rounded-[10px] bg-[var(--color-surface-subtle)] border border-[var(--color-border-light)] p-5">
          <h3 className="text-[11px] font-bold tracking-[0.08em] text-[var(--color-text-muted)] uppercase mb-3">
            {INBOX.taskDetail.attachments}
          </h3>
          <div className="flex flex-wrap gap-2">
            {attachmentNames.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-white border border-[var(--color-border-light)] text-[13px] text-text-primary"
              >
                <PaperclipIcon />
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
