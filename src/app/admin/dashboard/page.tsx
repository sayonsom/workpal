"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminDashboard } from "@/lib/api";
import type { AdminDashboard, ReviewRecord } from "@/lib/types";

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border-light)] bg-white p-5">
      <div className="text-[12px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className={`text-[28px] font-bold ${color ?? "text-text-primary"}`}>
        {value}
      </div>
    </div>
  );
}

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

function DashboardContent() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminDashboard();
      setDashboard(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const pendingCount = dashboard?.pending_reviews ?? 0;

  if (loading) {
    return (
      <AdminShell>
        <div className="max-w-[960px] animate-pulse">
          <div className="h-8 w-40 rounded bg-[#EBEBEB] mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-[var(--color-border-light)] bg-white p-5">
                <div className="h-3 w-16 rounded bg-[#EBEBEB] mb-3" />
                <div className="h-8 w-12 rounded bg-[#EBEBEB]" />
              </div>
            ))}
          </div>
        </div>
      </AdminShell>
    );
  }

  if (!dashboard) {
    return (
      <AdminShell>
        <div className="text-center py-16">
          <p className="text-[15px] text-danger">Failed to load dashboard data.</p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell pendingCount={pendingCount}>
      <div className="max-w-[960px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-text-primary">Dashboard</h1>
          <p className="text-[14px] text-[var(--color-text-muted)] mt-1">
            Overview of Workpal platform activity.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Pending Reviews"
            value={dashboard.pending_reviews}
            color={dashboard.pending_reviews > 0 ? "text-warning" : "text-success"}
          />
          <StatCard label="Total Reviews" value={dashboard.total_reviews} />
          <StatCard label="Total Agents" value={dashboard.total_agents} />
          <StatCard label="Total Users" value={dashboard.total_users} />
        </div>

        {/* Recent reviews */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[16px] font-bold text-text-primary">Recent Reviews</h2>
            <button
              onClick={() => router.push("/admin")}
              className="text-[13px] text-cta hover:text-cta-hover font-semibold transition-colors cursor-pointer"
            >
              View all
            </button>
          </div>

          {dashboard.recent_reviews && dashboard.recent_reviews.length > 0 ? (
            <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
              {dashboard.recent_reviews.map((review: ReviewRecord) => (
                <button
                  key={review.review_id}
                  onClick={() => router.push(`/admin/reviews/${review.review_id}`)}
                  className="flex items-center gap-4 px-4 py-3 w-full text-left hover:bg-surface-subtle transition-colors cursor-pointer"
                >
                  <StatusBadge status={review.status} />
                  <span className="text-[14px] text-text-primary truncate flex-1">
                    {review.subject || "(no subject)"}
                  </span>
                  <span className="text-[12px] text-[var(--color-text-muted)] shrink-0">
                    {formatTimeAgo(review.created_at)}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[14px] text-[var(--color-text-muted)]">
              No reviews yet.
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

export default function DashboardPage() {
  return (
    <AdminGuard>
      <DashboardContent />
    </AdminGuard>
  );
}
