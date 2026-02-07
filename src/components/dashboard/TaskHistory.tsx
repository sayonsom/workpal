"use client";

import { useEffect, useState, useCallback } from "react";
import Button from "../ui/Button";
import { DASHBOARD } from "@/lib/constants";
import { getAgentTasks } from "@/lib/api";
import type { Task } from "@/lib/types";

interface TaskHistoryProps {
  agentId: string;
}

export default function TaskHistory({ agentId }: TaskHistoryProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAgentTasks(agentId);
      setTasks(res.tasks);
      setNextCursor(res.next_cursor);
      setHasMore(res.has_more);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function loadMore() {
    if (!nextCursor) return;
    setLoadingMore(true);
    try {
      const res = await getAgentTasks(agentId, 20, nextCursor);
      setTasks((prev) => [...prev, ...res.tasks]);
      setNextCursor(res.next_cursor);
      setHasMore(res.has_more);
    } catch {
      // ignore
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-12 text-center">
        <p className="text-[14px] text-[var(--color-text-muted)]">
          {DASHBOARD.tasks.emptyState}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.task_id}
          className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold text-text-primary truncate">
                {task.subject}
              </p>
              <div className="mt-1 flex items-center gap-3 text-[12px] text-[var(--color-text-muted)]">
                <span>{task.input_chars.toLocaleString()} chars in</span>
                <span>{task.output_chars.toLocaleString()} chars out</span>
                {task.has_attachments && (
                  <span className="inline-flex items-center gap-0.5">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M14 7.5l-5.5 5.5a3.5 3.5 0 01-5-5L9 2.5a2 2 0 013 3L6.5 11a.5.5 0 01-1-1L11 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    attachments
                  </span>
                )}
              </div>
              <p className="mt-2 text-[11px] text-[var(--color-text-muted)]">
                {new Date(task.created_at * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <span
              className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                task.status === "completed"
                  ? "bg-[#dcfce7] text-cta"
                  : task.status === "processing"
                  ? "bg-[#e0f2fe] text-info"
                  : "bg-[#fce4ec] text-danger"
              }`}
            >
              {task.status}
            </span>
          </div>
        </div>
      ))}

      {hasMore && (
        <div className="text-center pt-2">
          <Button
            variant="secondary"
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : DASHBOARD.tasks.loadMore}
          </Button>
        </div>
      )}
    </div>
  );
}
