"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();

  useEffect(() => {
    // Verification is no longer required — redirect to homepage
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle">
      <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
