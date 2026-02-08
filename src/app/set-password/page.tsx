"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { confirmForgotPassword } from "@/lib/api";

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14" stroke="#2BAC76" strokeWidth="2" />
      <path d="M10 16.5l4 4 8-9" stroke="#2BAC76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SetPasswordForm() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";
  const email = searchParams.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!code || !email) {
      setError("Missing reset parameters. Please check your link.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await confirmForgotPassword(email, code, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Reset code is invalid or expired. Please request a new one."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Workpal logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-[20px] font-bold text-text-primary">
              {SITE.nameLower}
            </span>
          </a>
        </div>

        {/* Card */}
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-md)] p-8">
          {success ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <CheckIcon />
              <h1 className="text-[22px] font-bold text-text-primary">
                Password Reset
              </h1>
              <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
                Your password has been reset! You can now log in.
              </p>
              <a
                href="/login"
                className="inline-flex items-center px-5 py-2.5 rounded-[6px] bg-cta text-white text-[14px] font-bold hover:bg-[#006B4F] transition-colors duration-[180ms]"
              >
                Go to Login
              </a>
            </div>
          ) : (
            <>
              <h1 className="text-[24px] font-bold text-text-primary text-center">
                Set New Password
              </h1>
              <p className="mt-2 text-[14px] text-[var(--color-text-subtle)] text-center">
                Enter your new password below.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-[13px] font-bold text-text-primary mb-1"
                  >
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    placeholder="Min 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                  />
                  <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">
                    Min 8 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-[13px] font-bold text-text-primary mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                  />
                </div>

                {error && (
                  <p className="text-[13px] text-danger font-bold">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-surface-subtle">
          <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SetPasswordForm />
    </Suspense>
  );
}
