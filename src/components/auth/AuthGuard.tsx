"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, clearTokens } from "@/lib/auth";
import { getAgents } from "@/lib/api";

/**
 * Client-side auth guard. Wraps protected pages.
 * On mount it verifies the token is still valid by calling GET /agents.
 * If the token is expired and refresh fails, redirects to /login.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "ok" | "denied">(
    "checking"
  );

  useEffect(() => {
    async function verify() {
      if (!isAuthenticated()) {
        setStatus("denied");
        clearTokens();
        router.replace("/login");
        return;
      }

      try {
        // Lightweight check — the API client will auto-refresh if needed
        await getAgents();
        setStatus("ok");
      } catch {
        setStatus("denied");
        clearTokens();
        router.replace("/login");
      }
    }

    verify();
  }, [router]);

  if (status === "checking") {
    return (
      <div className="h-screen bg-[#F6F6F6] flex flex-col overflow-hidden">
        {/* Top bar skeleton */}
        <div className="h-12 bg-white border-b border-[var(--color-border-light)] shrink-0 flex items-center px-4 gap-3">
          <div className="w-6 h-6 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
          <div className="h-4 w-20 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
        </div>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar skeleton */}
          <div className="hidden lg:flex flex-col w-[240px] shrink-0 bg-white border-r border-[var(--color-border-light)] px-3 py-4">
            <div className="h-10 rounded-full bg-[var(--color-surface-subtle)] animate-pulse mb-4" />
            <div className="space-y-1">
              <div className="h-9 rounded-full bg-[var(--color-surface-subtle)] animate-pulse" />
              <div className="h-9 rounded-full bg-[var(--color-surface-subtle)] animate-pulse w-3/4" />
              <div className="h-9 rounded-full bg-[var(--color-surface-subtle)] animate-pulse w-3/4" />
            </div>
          </div>
          {/* Content skeleton */}
          <div className="flex-1 px-4 sm:px-6 py-5">
            <div className="flex gap-4 border-b border-[var(--color-border-light)] mb-5 pb-2">
              <div className="h-4 w-12 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
              <div className="h-4 w-10 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
              <div className="h-4 w-14 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
            </div>
            <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-surface-subtle)] animate-pulse" />
                  <div className="h-4 w-[180px] rounded bg-[var(--color-surface-subtle)] animate-pulse" />
                  <div className="h-3 flex-1 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
                  <div className="h-3 w-[50px] rounded bg-[var(--color-surface-subtle)] animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return null;
  }

  return <>{children}</>;
}
