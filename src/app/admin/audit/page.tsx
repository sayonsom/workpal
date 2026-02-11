"use client";

import { useEffect, useState, useCallback } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminAudit, getAdminDashboard } from "@/lib/api";
import type { AuditEntry } from "@/lib/types";

function formatTimestamp(ts: number): string {
  if (!ts) return "\u2014";
  return new Date(ts * 1000).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function ActionBadge({ action }: { action: string }) {
  const colorMap: Record<string, string> = {
    review_approved: "bg-success/15 text-success",
    review_rejected: "bg-danger/15 text-danger",
    review_viewed: "bg-info/15 text-info",
    task_viewed: "bg-info/15 text-info",
    dashboard_viewed: "bg-[#EBEBEB] text-[var(--color-text-muted)]",
  };

  const color = colorMap[action] ?? "bg-[#EBEBEB] text-[var(--color-text-muted)]";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${color}`}>
      {action.replace(/_/g, " ")}
    </span>
  );
}

function AuditContent() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [actionFilter, setActionFilter] = useState<string>("");

  const fetchPendingCount = useCallback(async () => {
    try {
      const dash = await getAdminDashboard();
      setPendingCount(dash.pending_reviews);
    } catch {
      // ignore
    }
  }, []);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminAudit(actionFilter || undefined);
      setEntries(res.entries);
      setCursor(res.cursor);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [actionFilter]);

  useEffect(() => {
    fetchPendingCount();
    fetchEntries();
  }, [fetchPendingCount, fetchEntries]);

  async function handleLoadMore() {
    if (!cursor) return;
    setLoadingMore(true);
    try {
      const res = await getAdminAudit(actionFilter || undefined, 50, cursor);
      setEntries((prev) => [...prev, ...res.entries]);
      setCursor(res.cursor);
    } catch {
      // ignore
    } finally {
      setLoadingMore(false);
    }
  }

  const actions = [
    { key: "", label: "All actions" },
    { key: "review_approved", label: "Approved" },
    { key: "review_rejected", label: "Rejected" },
    { key: "review_viewed", label: "Viewed" },
  ];

  return (
    <AdminShell pendingCount={pendingCount}>
      <div className="max-w-[960px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-text-primary">Audit Log</h1>
          <p className="text-[14px] text-[var(--color-text-muted)] mt-1">
            Record of all admin actions.
          </p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5">
          {actions.map((a) => (
            <button
              key={a.key}
              onClick={() => setActionFilter(a.key)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
                actionFilter === a.key
                  ? "bg-text-primary text-white"
                  : "bg-[#EBEBEB] text-[var(--color-text-muted)] hover:bg-[#E0E0E0]"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Entries */}
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white border border-[var(--color-border-light)]">
                <div className="w-20 h-5 rounded bg-[#EBEBEB] animate-pulse" />
                <div className="flex-1 h-4 rounded bg-[#EBEBEB] animate-pulse" />
                <div className="w-24 h-3 rounded bg-[#EBEBEB] animate-pulse" />
              </div>
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-[48px] mb-3">{"\u{1F4DD}"}</div>
            <p className="text-[15px] font-semibold text-text-primary mb-1">No audit entries</p>
            <p className="text-[13px] text-[var(--color-text-muted)]">
              Admin actions will be recorded here.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
              {entries.map((entry) => (
                <div
                  key={entry.audit_id}
                  className="flex items-start gap-4 px-4 py-3"
                >
                  <div className="shrink-0 pt-0.5">
                    <ActionBadge action={entry.action} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] text-text-primary">
                      <span className="font-semibold">{entry.admin_id}</span>
                      {" "}
                      <span className="text-[var(--color-text-muted)]">
                        {entry.action.replace(/_/g, " ")} on{" "}
                        {entry.resource_type} {entry.resource_id}
                      </span>
                    </div>
                    {entry.details && (
                      <div className="text-[12px] text-[var(--color-text-muted)] mt-0.5 truncate">
                        {entry.details}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 text-[12px] text-[var(--color-text-muted)]">
                    {formatTimestamp(entry.timestamp)}
                  </div>
                </div>
              ))}
            </div>

            {cursor && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-4 py-2 text-[13px] font-semibold text-cta hover:text-cta-hover transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AdminShell>
  );
}

export default function AuditPage() {
  return (
    <AdminGuard>
      <AuditContent />
    </AdminGuard>
  );
}
