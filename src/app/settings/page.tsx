"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import SettingsShell from "@/components/dashboard/SettingsShell";

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsShell />
    </AuthGuard>
  );
}
