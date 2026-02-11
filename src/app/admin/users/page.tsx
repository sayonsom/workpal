"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminUsers, getAdminDashboard } from "@/lib/api";
import type { AdminUser } from "@/lib/types";

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

function UsersContent() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const fetchPendingCount = useCallback(async () => {
    try {
      const dash = await getAdminDashboard();
      setPendingCount(dash.pending_reviews);
    } catch {
      // ignore
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminUsers(50);
      setUsers(res.users);
      setCursor(res.cursor);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingCount();
    fetchUsers();
  }, [fetchPendingCount, fetchUsers]);

  async function handleLoadMore() {
    if (!cursor) return;
    setLoadingMore(true);
    try {
      const res = await getAdminUsers(50, cursor);
      setUsers((prev) => [...prev, ...res.users]);
      setCursor(res.cursor);
    } catch {
      // ignore
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <AdminShell pendingCount={pendingCount}>
      <div className="max-w-[960px]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-text-primary">Users</h1>
          <p className="text-[14px] text-[var(--color-text-muted)] mt-1">
            All registered users and their activity.
          </p>
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-4 py-3.5 rounded-lg bg-white border border-[var(--color-border-light)]"
              >
                <div className="w-40 h-5 rounded bg-[#EBEBEB] animate-pulse" />
                <div className="w-12 h-5 rounded bg-[#EBEBEB] animate-pulse" />
                <div className="flex-1 h-4 rounded bg-[#EBEBEB] animate-pulse" />
                <div className="w-20 h-3 rounded bg-[#EBEBEB] animate-pulse" />
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-[48px] mb-3">{"\u{1F465}"}</div>
            <p className="text-[15px] font-semibold text-text-primary mb-1">
              No users yet
            </p>
            <p className="text-[13px] text-[var(--color-text-muted)]">
              Users will appear here when they register.
            </p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="hidden md:flex items-center gap-4 px-4 py-2 text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              <div className="flex-1 min-w-0">Email</div>
              <div className="w-14 text-center">Plan</div>
              <div className="w-16 text-right">Fwds</div>
              <div className="w-20 text-right">Last Fwd</div>
              <div className="w-24 text-right">Joined</div>
              <div className="w-16 text-right">Fwd/Day</div>
              <div className="w-14 text-right">Agents</div>
            </div>

            {/* Table rows */}
            <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
              {users.map((user) => (
                <button
                  key={user.user_id}
                  onClick={() =>
                    router.push(`/admin/users/${user.user_id}`)
                  }
                  className="flex items-center gap-4 px-4 py-3.5 w-full text-left hover:bg-surface-subtle transition-colors cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-text-primary truncate group-hover:text-cta transition-colors">
                      {user.email || user.user_id.slice(0, 12) + "..."}
                    </div>
                    <div className="md:hidden text-[12px] text-[var(--color-text-muted)] mt-0.5">
                      {user.tasks_used} forwards &middot; {formatTimeAgo(user.last_task_at)}
                    </div>
                  </div>
                  <div className="hidden md:block w-14 text-center">
                    <PlanBadge plan={user.plan} />
                  </div>
                  <div className="hidden md:block w-16 text-right text-[14px] font-semibold text-text-primary">
                    {user.tasks_used}
                  </div>
                  <div className="hidden md:block w-20 text-right text-[12px] text-[var(--color-text-muted)]">
                    {formatTimeAgo(user.last_task_at)}
                  </div>
                  <div className="hidden md:block w-24 text-right text-[12px] text-[var(--color-text-muted)]">
                    {formatDate(user.joined_at)}
                  </div>
                  <div className="hidden md:block w-16 text-right text-[13px] text-[var(--color-text-muted)]">
                    {user.forwards_per_day}
                  </div>
                  <div className="hidden md:block w-14 text-right text-[13px] text-[var(--color-text-muted)]">
                    {user.agent_count}
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

export default function UsersPage() {
  return (
    <AdminGuard>
      <UsersContent />
    </AdminGuard>
  );
}
