"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, clearTokens } from "@/lib/auth";
import { checkAdminAccess } from "@/lib/api";

/**
 * Admin auth guard. Wraps admin pages.
 * Verifies token validity AND admin access (email allowlist check).
 * Redirects non-admins to /inbox, unauthenticated users to /login.
 */
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "ok" | "denied">("checking");

  useEffect(() => {
    async function verify() {
      if (!isAuthenticated()) {
        setStatus("denied");
        clearTokens();
        router.replace("/login");
        return;
      }

      try {
        const isAdmin = await checkAdminAccess();
        if (isAdmin) {
          setStatus("ok");
        } else {
          setStatus("denied");
          router.replace("/inbox");
        }
      } catch {
        setStatus("denied");
        router.replace("/inbox");
      }
    }

    verify();
  }, [router]);

  if (status === "checking") {
    return (
      <div className="h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--color-border-strong)] border-t-cta rounded-full animate-spin" />
          <span className="text-[13px] text-[var(--color-text-muted)]">
            Verifying admin access…
          </span>
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return null;
  }

  return <>{children}</>;
}
