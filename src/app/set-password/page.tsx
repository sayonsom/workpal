"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { setPassword } from "@/lib/api";

/* ── Icons ── */

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14" stroke="#2BAC76" strokeWidth="2" />
      <path d="M10 16.5l4 4 8-9" stroke="#2BAC76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6.5 3.2A7.5 7.5 0 0115 8c-.5 1-1.4 2.4-2.8 3.5M9.9 9.9A2 2 0 016.1 6.1M1 8s2.5-5 7-5M1 1l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Form ── */

function SetPasswordForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [step, setStep] = useState<"set" | "success">("set");
  const [email, setEmail] = useState(emailParam);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
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
      await setPassword(email.trim(), newPassword);
      // Tokens are saved automatically by setPassword
      setStep("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to set password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClassName =
    "w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]";

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

          {/* Success state */}
          {step === "success" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <CheckIcon />
              <h1 className="text-[22px] font-bold text-text-primary">
                Password Set
              </h1>
              <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
                Your password has been set! You can now access your inbox.
              </p>
              <a
                href="/inbox"
                className="inline-flex items-center px-5 py-2.5 rounded-[6px] bg-cta text-white text-[14px] font-bold hover:bg-[#006B4F] transition-colors duration-[180ms]"
              >
                Go to Inbox
              </a>
            </div>
          )}

          {/* Set password form */}
          {step === "set" && (
            <>
              <h1 className="text-[24px] font-bold text-text-primary text-center">
                Set Your Password
              </h1>
              <p className="mt-2 text-[14px] text-[var(--color-text-subtle)] text-center">
                Choose a password to access your Workpal dashboard.
              </p>

              <form onSubmit={handleSetPassword} className="mt-6 space-y-4">
                {/* Email — read-only if pre-filled from URL, editable otherwise */}
                <div>
                  <label
                    htmlFor="set-email"
                    className="block text-[13px] font-bold text-text-primary mb-1"
                  >
                    Email
                  </label>
                  {emailParam ? (
                    <p className="h-11 flex items-center px-3 rounded-[6px] bg-[var(--color-surface-subtle)] border border-[var(--color-border-light)] text-[15px] text-text-primary">
                      {email}
                    </p>
                  ) : (
                    <input
                      id="set-email"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClassName}
                    />
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-[13px] font-bold text-text-primary mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Min 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                      className={`${inputClassName} pr-10`}
                      autoFocus={!!emailParam}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-text-primary transition-colors cursor-pointer"
                      tabIndex={-1}
                      aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">
                    Min 8 characters
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-[13px] font-bold text-text-primary mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      className={`${inputClassName} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-text-primary transition-colors cursor-pointer"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
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
                  {loading ? "Setting password..." : "Set Password"}
                </Button>
              </form>

              {/* Link to login */}
              <p className="mt-4 text-center text-[13px] text-[var(--color-text-subtle)]">
                Already have a password?{" "}
                <a href="/login" className="text-link font-bold hover:underline">
                  Log in
                </a>
              </p>
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
