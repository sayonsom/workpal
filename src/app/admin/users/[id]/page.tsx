"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminUserDetail, getAdminDashboard } from "@/lib/api";
import type {
  AdminUserDetail,
  AdminTask,
  AdminUserReview,
  PipelineTrace,
} from "@/lib/types";

/* ─── Formatters ────────────────────────────────────── */

function formatTimeAgo(ts: number): string {
  if (!ts) return "\u2014";
  const seconds = Math.floor(Date.now() / 1000 - ts);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(ts * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatDate(ts: number): string {
  if (!ts) return "\u2014";
  return new Date(ts * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "\u2014";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function formatChars(n: number): string {
  if (!n) return "0";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

/* ─── Small components ──────────────────────────────── */

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    completed: "bg-success/15 text-success",
    delivered: "bg-success/15 text-success",
    approved: "bg-success/15 text-success",
    pending_review: "bg-warning/15 text-warning",
    pending: "bg-warning/15 text-warning",
    processing: "bg-info/15 text-info",
    failed: "bg-danger/15 text-danger",
    rejected: "bg-danger/15 text-danger",
  };
  const color =
    colorMap[status] ?? "bg-[#EBEBEB] text-[var(--color-text-muted)]";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${color}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function ComplexityBadge({ complexity }: { complexity: string }) {
  const c = (complexity || "").toUpperCase();
  const color =
    c === "HIGH"
      ? "bg-danger/10 text-danger"
      : c === "MEDIUM"
        ? "bg-warning/10 text-warning"
        : "bg-success/10 text-success";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${color}`}
    >
      {c || "N/A"}
    </span>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const color =
    plan === "pro"
      ? "bg-[#007A5A]/15 text-[#007A5A]"
      : "bg-[#EBEBEB] text-[var(--color-text-muted)]";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${color}`}
    >
      {plan}
    </span>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border-light)] px-4 py-3">
      <div className="text-[12px] text-[var(--color-text-muted)] font-medium">
        {label}
      </div>
      <div className="text-[20px] font-bold text-text-primary mt-0.5">
        {value}
      </div>
    </div>
  );
}

/* ─── Stage Time Bar ───────────────────────────────── */

const STAGE_COLORS: Record<string, string> = {
  intake: "#1D9BD1",
  plan: "#007A5A",
  draft: "#3F0E40",
  review: "#ECB22E",
  provenance: "#E01E5A",
  output: "#1264A3",
  redraft: "#9B59B6",
};

function StageTimeline({ stageTimes }: { stageTimes: Record<string, number> }) {
  const total = Object.values(stageTimes).reduce((a, b) => a + b, 0);
  if (total <= 0) return null;

  return (
    <div>
      <div className="flex rounded-full overflow-hidden h-3 bg-[#EBEBEB]">
        {Object.entries(stageTimes).map(([stage, secs]) => {
          const pct = (secs / total) * 100;
          if (pct < 0.5) return null;
          return (
            <div
              key={stage}
              title={`${stage}: ${secs.toFixed(1)}s`}
              style={{
                width: `${pct}%`,
                backgroundColor: STAGE_COLORS[stage] || "#888",
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        {Object.entries(stageTimes).map(([stage, secs]) => (
          <div key={stage} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: STAGE_COLORS[stage] || "#888",
              }}
            />
            <span className="text-[11px] text-[var(--color-text-muted)]">
              {stage}: {secs.toFixed(1)}s
            </span>
          </div>
        ))}
        <div className="text-[11px] font-semibold text-text-primary">
          Total: {formatDuration(total)}
        </div>
      </div>
    </div>
  );
}

/* ─── Pipeline Trace Section ───────────────────────── */

function TraceSection({
  title,
  data,
}: {
  title: string;
  data: Record<string, unknown> | undefined;
}) {
  const [open, setOpen] = useState(false);
  if (!data || Object.keys(data).length === 0) return null;

  return (
    <div className="border border-[var(--color-border-light)] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-[12px] font-semibold text-text-primary hover:bg-surface-subtle transition-colors cursor-pointer"
      >
        <span>{title}</span>
        <span className="text-[var(--color-text-muted)]">{open ? "\u25B2" : "\u25BC"}</span>
      </button>
      {open && (
        <pre className="px-3 py-2 bg-[#1D1C1D] text-[#D1D2D3] text-[11px] leading-relaxed overflow-x-auto max-h-[300px]">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

/* ─── Expanded Task Detail ─────────────────────────── */

function TaskExpanded({
  task,
  review,
}: {
  task: AdminTask;
  review: AdminUserReview | null;
}) {
  const trace: PipelineTrace | null = useMemo(() => {
    if (!review?.pipeline_trace) return null;
    try {
      return JSON.parse(review.pipeline_trace) as PipelineTrace;
    } catch {
      return null;
    }
  }, [review]);

  const processingTime = task.completed_at && task.created_at
    ? task.completed_at - task.created_at
    : 0;

  // Determine full content sources
  const fullInput = review?.full_input || task.full_input || task.input_summary || "";
  const fullOutput = review?.full_output || task.full_output || task.output_summary || "";

  // Attachment info
  const taskAttachments = task.attachment_names || [];
  const reviewAttachments = review?.attachment_metadata || [];

  return (
    <div className="px-4 pb-4 space-y-4">
      {/* Metrics row */}
      <div className="flex flex-wrap gap-3">
        <div className="bg-surface-subtle rounded-lg px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
            Processing Time
          </div>
          <div className="text-[14px] font-bold text-text-primary">
            {formatDuration(processingTime)}
          </div>
        </div>
        <div className="bg-surface-subtle rounded-lg px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
            Input
          </div>
          <div className="text-[14px] font-bold text-text-primary">
            {formatChars(task.input_chars)} chars
          </div>
        </div>
        <div className="bg-surface-subtle rounded-lg px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
            Output
          </div>
          <div className="text-[14px] font-bold text-text-primary">
            {formatChars(task.output_chars)} chars
          </div>
        </div>
        {review && (
          <div className="bg-surface-subtle rounded-lg px-3 py-2">
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
              Complexity
            </div>
            <div className="mt-0.5">
              <ComplexityBadge complexity={review.complexity} />
            </div>
          </div>
        )}
      </div>

      {/* Pipeline Stage Timeline */}
      {trace?.stage_times && Object.keys(trace.stage_times).length > 0 && (
        <div className="bg-surface-subtle rounded-lg p-3">
          <div className="text-[12px] font-semibold text-text-primary mb-2">
            Pipeline Stages
          </div>
          <StageTimeline stageTimes={trace.stage_times} />
        </div>
      )}

      {/* Attachments */}
      {(taskAttachments.length > 0 || reviewAttachments.length > 0) && (
        <div className="bg-surface-subtle rounded-lg p-3">
          <div className="text-[12px] font-semibold text-text-primary mb-2">
            Attachments
          </div>
          {taskAttachments.length > 0 && (
            <div className="mb-2">
              <div className="text-[11px] text-[var(--color-text-muted)] mb-1">
                Forwarded by user:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {taskAttachments.map((name, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[var(--color-border-light)] text-[11px] text-text-primary"
                  >
                    {"\u{1F4CE}"} {name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {reviewAttachments.length > 0 && (
            <div>
              <div className="text-[11px] text-[var(--color-text-muted)] mb-1">
                Artifacts created:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {reviewAttachments.map((att, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[var(--color-border-light)] text-[11px] text-text-primary"
                  >
                    {"\u{1F4C4}"} {att.filename}
                    <span className="text-[var(--color-text-muted)]">
                      ({att.content_type})
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Full Input */}
      {fullInput && (
        <div>
          <div className="text-[12px] font-semibold text-text-primary mb-1">
            Full Input
          </div>
          <pre className="bg-surface-subtle rounded-lg p-3 text-[12px] text-text-primary whitespace-pre-wrap break-words max-h-[300px] overflow-y-auto leading-relaxed">
            {fullInput}
          </pre>
        </div>
      )}

      {/* Full Output */}
      {fullOutput && (
        <div>
          <div className="text-[12px] font-semibold text-text-primary mb-1">
            Full Output
          </div>
          <pre className="bg-surface-subtle rounded-lg p-3 text-[12px] text-text-primary whitespace-pre-wrap break-words max-h-[400px] overflow-y-auto leading-relaxed">
            {fullOutput}
          </pre>
        </div>
      )}

      {/* Pipeline Trace Details (collapsible sections) */}
      {trace && (
        <div className="space-y-2">
          <div className="text-[12px] font-semibold text-text-primary">
            Pipeline Trace
          </div>
          <TraceSection title="Intake Analysis" data={trace.intake_result} />
          <TraceSection title="Plan" data={trace.plan_result} />
          <TraceSection title="Quality Review" data={trace.review_result} />
          <TraceSection title="Provenance Check" data={trace.provenance_result} />
        </div>
      )}

      {/* Token note */}
      <div className="text-[11px] text-[var(--color-text-muted)] italic">
        Token-level usage tracking coming soon. Processing time and character counts shown above.
      </div>
    </div>
  );
}

/* ─── Main Content ─────────────────────────────────── */

function UserDetailContent() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [detail, setDetail] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const fetchPendingCount = useCallback(async () => {
    try {
      const dash = await getAdminDashboard();
      setPendingCount(dash.pending_reviews);
    } catch {
      // ignore
    }
  }, []);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminUserDetail(userId);
      setDetail(res);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPendingCount();
    fetchDetail();
  }, [fetchPendingCount, fetchDetail]);

  // Build a map of task_id → review for quick lookup
  const reviewsByTask = useMemo(() => {
    if (!detail) return new Map<string, AdminUserReview>();
    const m = new Map<string, AdminUserReview>();
    for (const r of detail.reviews) {
      if (r.task_id) m.set(r.task_id, r);
    }
    return m;
  }, [detail]);

  if (loading) {
    return (
      <AdminShell pendingCount={pendingCount}>
        <div className="max-w-[960px] space-y-4">
          <div className="w-32 h-5 rounded bg-[#EBEBEB] animate-pulse" />
          <div className="w-64 h-8 rounded bg-[#EBEBEB] animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-[8px] bg-[#EBEBEB] animate-pulse"
              />
            ))}
          </div>
          <div className="space-y-2 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-lg bg-[#EBEBEB] animate-pulse"
              />
            ))}
          </div>
        </div>
      </AdminShell>
    );
  }

  if (!detail) {
    return (
      <AdminShell pendingCount={pendingCount}>
        <div className="max-w-[960px] text-center py-16">
          <div className="text-[48px] mb-3">{"\u{1F6AB}"}</div>
          <p className="text-[15px] font-semibold text-text-primary mb-1">
            User not found
          </p>
          <button
            onClick={() => router.push("/admin/users")}
            className="mt-3 text-[13px] font-semibold text-cta hover:text-cta-hover transition-colors cursor-pointer"
          >
            {"\u2190"} Back to Users
          </button>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell pendingCount={pendingCount}>
      <div className="max-w-[960px]">
        {/* Back link */}
        <button
          onClick={() => router.push("/admin/users")}
          className="flex items-center gap-1 text-[13px] text-[var(--color-text-muted)] hover:text-text-primary transition-colors mb-4 cursor-pointer"
        >
          <span>{"\u2190"}</span> Back to Users
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[22px] font-bold text-text-primary">
              {detail.email || detail.user_id}
            </h1>
            {detail.usage && <PlanBadge plan={detail.usage.plan} />}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[var(--color-text-muted)]">
            <span>Joined {formatDate(detail.joined_at)}</span>
            <span>{detail.agent_count} agent{detail.agent_count !== 1 ? "s" : ""}</span>
            <span>
              {detail.usage?.tasks_used ?? detail.stats.total_tasks} forwards ({detail.usage?.tasks_used ?? 0}/{detail.usage?.tasks_limit ?? "\u221E"} used)
            </span>
            <span>{detail.stats.forwards_per_day} fwd/day</span>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total Forwards" value={detail.stats.total_tasks} />
          <StatCard label="Forwards / Day" value={detail.stats.forwards_per_day} />
          <StatCard label="Total Input" value={`${formatChars(detail.stats.total_input_chars)} chars`} />
          <StatCard label="Total Output" value={`${formatChars(detail.stats.total_output_chars)} chars`} />
        </div>

        {/* Agents */}
        {detail.agents.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[16px] font-bold text-text-primary mb-3">
              Agents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {detail.agents.map((agent) => (
                <div
                  key={agent.agent_id}
                  className="bg-white rounded-[8px] border border-[var(--color-border-light)] px-4 py-3"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[14px] font-semibold text-text-primary truncate">
                      {agent.display_name}
                    </div>
                    <StatusBadge status={agent.status} />
                  </div>
                  <div className="text-[12px] text-[var(--color-text-muted)]">
                    {agent.agent_email}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[var(--color-text-muted)]">
                    <span>{agent.tasks_completed} tasks</span>
                    <span>Created {formatDate(agent.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task History */}
        <div>
          <h2 className="text-[16px] font-bold text-text-primary mb-3">
            Task History ({detail.tasks.length})
          </h2>

          {detail.tasks.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-[36px] mb-2">{"\u{1F4ED}"}</div>
              <p className="text-[13px] text-[var(--color-text-muted)]">
                No tasks yet.
              </p>
            </div>
          ) : (
            <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
              {detail.tasks.map((task: AdminTask) => {
                const isExpanded = expandedTask === task.task_id;
                const review = reviewsByTask.get(task.task_id) || null;

                return (
                  <div key={task.task_id}>
                    {/* Task row */}
                    <button
                      onClick={() =>
                        setExpandedTask(isExpanded ? null : task.task_id)
                      }
                      className="flex items-start gap-3 px-4 py-3 w-full text-left hover:bg-surface-subtle transition-colors cursor-pointer"
                    >
                      <div className="shrink-0 pt-0.5 text-[14px] text-[var(--color-text-muted)]">
                        {isExpanded ? "\u25BC" : "\u25B6"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[14px] font-semibold text-text-primary truncate max-w-[400px]">
                            {task.subject || "Untitled"}
                          </span>
                          <StatusBadge status={task.status} />
                          {review && (
                            <ComplexityBadge complexity={review.complexity} />
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 text-[12px] text-[var(--color-text-muted)]">
                          <span>{formatTimeAgo(task.created_at)}</span>
                          <span>
                            {formatChars(task.input_chars)} {"\u2192"}{" "}
                            {formatChars(task.output_chars)} chars
                          </span>
                          {task.has_attachments && (
                            <span>
                              {"\u{1F4CE}"} {task.attachment_names?.length || 0}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded detail */}
                    {isExpanded && (
                      <TaskExpanded task={task} review={review} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

export default function UserDetailPage() {
  return (
    <AdminGuard>
      <UserDetailContent />
    </AdminGuard>
  );
}
