"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminReviews, getAdminDashboard } from "@/lib/api";
import type { ReviewRecord } from "@/lib/types";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-warning/15 text-warning",
    approved: "bg-success/15 text-success",
    rejected: "bg-danger/15 text-danger",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide ${styles[status] ?? "bg-[#EBEBEB] text-[var(--color-text-muted)]"}`}>
      {status}
    </span>
  );
}

function ComplexityBadge({ complexity }: { complexity: string }) {
  const styles: Record<string, string> = {
    LOW: "bg-success/10 text-success",
    MEDIUM: "bg-info/10 text-info",
    HIGH: "bg-danger/10 text-danger",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${styles[complexity] ?? "bg-[#EBEBEB] text-[var(--color-text-muted)]"}`}>
      {complexity}
    </span>
  );
}

function formatTimeAgo(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

type FilterStatus = "pending" | "approved" | "rejected" | "all";

function ReviewQueue() {
  const router = useRouter();

  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("pending");
  const [pendingCount, setPendingCount] = useState(0);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchDashboard = useCallback(async () => {
    try {
      const dash = await getAdminDashboard();
      setPendingCount(dash.pending_reviews);
    } catch {
      // ignore
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const statusParam = filterStatus === "all" ? undefined : filterStatus;
      const res = await getAdminReviews(statusParam);
      setReviews(res.reviews);
      setCursor(res.cursor);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchDashboard();
    fetchReviews();
  }, [fetchDashboard, fetchReviews]);

  async function handleLoadMore() {
    if (!cursor) return;
    setLoadingMore(true);
    try {
      const statusParam = filterStatus === "all" ? undefined : filterStatus;
      const res = await getAdminReviews(statusParam, 20, cursor);
      setReviews((prev) => [...prev, ...res.reviews]);
      setCursor(res.cursor);
    } catch {
      // ignore
    } finally {
      setLoadingMore(false);
    }
  }

  const filters: { key: FilterStatus; label: string }[] = [
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
    { key: "all", label: "All" },
  ];

  return (
    <AdminShell pendingCount={pendingCount}>
      <div className="max-w-[960px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-text-primary">Review Queue</h1>
          <p className="text-[14px] text-[var(--color-text-muted)] mt-1">
            Review and approve agent responses before they reach users.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-0 border-b border-[var(--color-border-light)] mb-5">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterStatus(f.key)}
              className={`relative px-4 py-2 text-[13px] font-semibold transition-colors duration-[180ms] cursor-pointer ${
                filterStatus === f.key
                  ? "text-text-primary"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-subtle)]"
              }`}
            >
              {f.label}
              {f.key === "pending" && pendingCount > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-danger text-white rounded-full">
                  {pendingCount > 99 ? "99+" : pendingCount}
                </span>
              )}
              {filterStatus === f.key && (
                <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-text-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Review list */}
        {loading ? (
          <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-4">
                <div className="w-16 h-5 rounded bg-[#EBEBEB] animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-[#EBEBEB] animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-[#EBEBEB] animate-pulse" />
                </div>
                <div className="w-12 h-3 rounded bg-[#EBEBEB] animate-pulse" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-[48px] mb-3">
              {filterStatus === "pending" ? "\u2705" : "\u{1F4CB}"}
            </div>
            <p className="text-[15px] font-semibold text-text-primary mb-1">
              {filterStatus === "pending" ? "No pending reviews" : "No reviews found"}
            </p>
            <p className="text-[13px] text-[var(--color-text-muted)]">
              {filterStatus === "pending"
                ? "All agent responses have been reviewed."
                : "No reviews match the selected filter."
              }
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
              {reviews.map((review) => (
                <button
                  key={review.review_id}
                  onClick={() => router.push(`/admin/reviews/${review.review_id}`)}
                  className="flex items-start gap-4 px-4 py-3.5 w-full text-left hover:bg-surface-subtle transition-colors cursor-pointer group"
                >
                  {/* Status */}
                  <div className="shrink-0 pt-0.5">
                    <StatusBadge status={review.status} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[14px] font-semibold text-text-primary truncate group-hover:text-cta transition-colors">
                        {review.subject || "(no subject)"}
                      </span>
                      {review.complexity && (
                        <ComplexityBadge complexity={review.complexity} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[var(--color-text-muted)]">
                      <span className="truncate">{review.sender_email}</span>
                      <span>&middot;</span>
                      <span className="truncate">{review.agent_email}</span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="shrink-0 text-[12px] text-[var(--color-text-muted)] pt-0.5">
                    {formatTimeAgo(review.created_at)}
                  </div>
                </button>
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

export default function AdminPage() {
  return (
    <AdminGuard>
      <ReviewQueue />
    </AdminGuard>
  );
}
