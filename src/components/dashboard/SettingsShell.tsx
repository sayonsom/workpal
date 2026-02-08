"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../ui/Button";
import { SITE, SETTINGS, DASHBOARD } from "@/lib/constants";
import { exportData, deleteAccount } from "@/lib/api";
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
              href="/dashboard"
              className="text-[14px] text-[var(--color-text-subtle)] hover:text-text-primary transition-colors duration-[180ms]"
            >
              Dashboard
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
