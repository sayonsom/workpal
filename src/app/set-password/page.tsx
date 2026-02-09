"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { confirmForgotPassword, forgotPassword } from "@/lib/api";

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
  const codeParam = searchParams.get("code") || "";
  const emailParam = searchParams.get("email") || "";

  // Step 1: If no code in URL, show "request code" flow
  const [step, setStep] = useState<"request" | "set" | "success">(
    codeParam ? "set" : "request"
  );
  const [email, setEmail] = useState(emailParam);
  const [code, setCode] = useState(codeParam);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  async function handleRequestCode(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setRequestMessage("A password reset code has been sent to your email.");
      setStep("set");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send reset code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Please enter the verification code from your email.");
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
      await confirmForgotPassword(email.trim(), code.trim(), newPassword);
      // Tokens are saved automatically by confirmForgotPassword
      setStep("success");
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

          {/* Request code step (first-time access without a code) */}
          {step === "request" && (
            <>
              <h1 className="text-[24px] font-bold text-text-primary text-center">
                Set Your Password
              </h1>
              <p className="mt-2 text-[14px] text-[var(--color-text-subtle)] text-center">
                {email
                  ? "Click below to receive a password reset code."
                  : "Enter your email to receive a password reset code."}
              </p>

              <form onSubmit={handleRequestCode} className="mt-6 space-y-4">
                {!emailParam && (
                  <div>
                    <label
                      htmlFor="request-email"
                      className="block text-[13px] font-bold text-text-primary mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="request-email"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                    />
                  </div>
                )}

                {emailParam && (
                  <p className="text-[14px] text-text-primary text-center">
                    Sending code to <span className="font-bold">{email}</span>
                  </p>
                )}

                {error && (
                  <p className="text-[13px] text-danger font-bold">{error}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Code"}
                </Button>
              </form>
            </>
          )}

          {/* Set password step */}
          {step === "set" && (
            <>
              <h1 className="text-[24px] font-bold text-text-primary text-center">
                Set Your Password
              </h1>
              <p className="mt-2 text-[14px] text-[var(--color-text-subtle)] text-center">
                {requestMessage || "Enter your reset code and new password."}
              </p>

              <form onSubmit={handleSetPassword} className="mt-6 space-y-4">
                {!codeParam && (
                  <div>
                    <label
                      htmlFor="reset-code"
                      className="block text-[13px] font-bold text-text-primary mb-1"
                    >
                      Verification Code
                    </label>
                    <input
                      id="reset-code"
                      type="text"
                      inputMode="numeric"
                      placeholder="6-digit code from your email"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                      autoFocus
                    />
                  </div>
                )}

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
                  {loading ? "Setting password..." : "Set Password"}
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
