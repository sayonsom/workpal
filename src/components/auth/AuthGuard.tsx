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
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-cta border-t-transparent rounded-full animate-spin" />
          <p className="text-[14px] text-[var(--color-text-muted)]">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return null;
  }

  return <>{children}</>;
}
