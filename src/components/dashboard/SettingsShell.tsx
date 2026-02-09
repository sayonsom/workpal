"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../ui/Button";
import { SITE, SETTINGS, DASHBOARD } from "@/lib/constants";
import { exportData, deleteAccount, changePassword } from "@/lib/api";
import { clearTokens } from "@/lib/auth";


function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SettingsShell() {
  const router = useRouter();
  const [exporting, setExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Change password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleExport() {
    setExporting(true);
    try {
      const blob = await exportData();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "workpal-data-export.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // ignore
    } finally {
      setExporting(false);
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      await deleteAccount();
      clearTokens();
      router.push("/");
    } catch {
      setDeleting(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword.length < 8) {
      setPasswordMessage({ type: "error", text: "New password must be at least 8 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    setChangingPassword(true);
    try {
      await changePassword(oldPassword, newPassword);
      setPasswordMessage({ type: "success", text: "Password changed successfully." });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to change password. Please try again.",
      });
    } finally {
      setChangingPassword(false);
    }
  }

  function handleLogout() {
    setLoggingOut(true);
    clearTokens();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-surface-subtle">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-12 bg-white border-b border-[var(--color-border-light)]">
        <div className="mx-auto max-w-[1200px] h-full flex items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Workpal logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="text-[17px] font-bold text-text-primary">
              {SITE.nameLower}
            </span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href="/inbox"
              className="text-[14px] text-[var(--color-text-subtle)] hover:text-text-primary transition-colors duration-[180ms]"
            >
              Inbox
            </a>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 text-[14px] text-[var(--color-text-subtle)] hover:text-danger transition-colors duration-[180ms] cursor-pointer"
            >
              <LogOutIcon />
              {DASHBOARD.logout}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-[600px] px-4 py-8">
        <h1 className="text-[28px] font-bold text-text-primary mb-8">
          {SETTINGS.heading}
        </h1>

        {/* Change password */}
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 mb-6">
          <h2 className="text-[18px] font-bold text-text-primary">
            Change Password
          </h2>
          <p className="mt-2 text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
            Update your account password. Must be at least 8 characters.
          </p>

          <form onSubmit={handleChangePassword} className="mt-4 space-y-3 max-w-[360px]">
            <div>
              <label className="block text-[13px] font-bold text-text-primary mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="w-full h-9 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary focus:border-info focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-text-primary mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full h-9 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary focus:border-info focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-text-primary mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full h-9 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary focus:border-info focus:outline-none"
              />
            </div>

            {passwordMessage && (
              <p
                className={`text-[13px] leading-[1.5] ${
                  passwordMessage.type === "success"
                    ? "text-[#2BAC76]"
                    : "text-danger"
                }`}
              >
                {passwordMessage.text}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={changingPassword}
            >
              {changingPassword ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </div>

        {/* Export data */}
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 mb-6">
          <h2 className="text-[18px] font-bold text-text-primary">
            {SETTINGS.exportData.heading}
          </h2>
          <p className="mt-2 text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
            {SETTINGS.exportData.description}
          </p>
          <div className="mt-4">
            <Button
              variant="secondary"
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? "Exporting..." : SETTINGS.exportData.cta}
            </Button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-[8px] bg-white border-2 border-danger/30 p-6">
          <h2 className="text-[18px] font-bold text-danger">
            {SETTINGS.deleteAccount.heading}
          </h2>
          <p className="mt-2 text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
            {SETTINGS.deleteAccount.description}
          </p>

          {showDeleteConfirm ? (
            <div className="mt-4 rounded-[8px] bg-[#fce4ec] border border-danger/20 p-4">
              <p className="text-[14px] text-danger leading-[1.5] mb-4">
                {SETTINGS.deleteAccount.confirm}
              </p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  className="!text-white !bg-danger hover:!bg-danger/90"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                >
                  {deleting
                    ? "Deleting..."
                    : SETTINGS.deleteAccount.confirmCta}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  {SETTINGS.deleteAccount.cancelCta}
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <Button
                variant="ghost"
                className="!text-danger"
                onClick={() => setShowDeleteConfirm(true)}
              >
                {SETTINGS.deleteAccount.cta}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
