"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { SIGNUP_MODAL, SUCCESS_MODAL } from "@/lib/constants";
import { forgotPassword, confirmForgotPassword } from "@/lib/api";

/* ── Inline SVG icons ── */

function CheckCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="18" stroke="#007A5A" strokeWidth="2.5" />
      <path d="M13 20.5l4.5 4.5L27 16" stroke="#007A5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GiftIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className={className}>
      <rect x="1.5" y="8" width="15" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1.5 8h15V6.5a1.5 1.5 0 00-1.5-1.5H3A1.5 1.5 0 001.5 6.5V8z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 5v11.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 5C9 5 7 3 5.5 3S3 4 3 5h6zM9 5c0 0 2-2 3.5-2S15 4 15 5H9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M8 1l2.24 4.54 5.01.73-3.63 3.54.86 4.99L8 12.27 3.52 14.8l.86-4.99L.75 6.27l5.01-.73L8 1z" fill="currentColor" />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Example icons (small 16x16) ── */

function ExampleIcon({ type }: { type: string }) {
  const cls = "text-cta";
  switch (type) {
    case "document":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={cls}>
          <path d="M4 1h5l4 4v10H4V1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M9 1v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8h4M6 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "person":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={cls}>
          <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3" />
          <path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "research":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={cls}>
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "slides":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={cls}>
          <rect x="1.5" y="2" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 11v3M5 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "mail":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={cls}>
          <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M1.5 5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "table":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={cls}>
          <rect x="1.5" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M1.5 6h13M1.5 10h13M6 6v8M10 6v8" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Types ── */

type Step = "celebrate" | "password" | "customize";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  agentEmail: string;
  referralCode?: string;
  isPremium?: boolean;
  premiumUntil?: number;
}

/* ── Component ── */

export default function SignupModal({
  open,
  onClose,
  email,
  agentEmail,
  referralCode = "",
  isPremium = false,
  premiumUntil = 0,
}: SignupModalProps) {
  const router = useRouter();
  const confettiFired = useRef(false);

  const [step, setStep] = useState<Step>("celebrate");
  const [copied, setCopied] = useState(false);

  // Password step state
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Fire confetti on mount when modal opens on the celebrate step
  useEffect(() => {
    if (open && step === "celebrate" && !confettiFired.current) {
      confettiFired.current = true;
      // Small delay so modal is visible first
      const timer = setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#007A5A", "#2BAC76", "#dcfce7", "#ECB22E", "#1D9BD1"],
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, step]);

  // Auto-send verification code when entering password step
  useEffect(() => {
    if (step === "password" && !codeSent && !sendingCode && email) {
      setSendingCode(true);
      forgotPassword(email)
        .then(() => {
          setCodeSent(true);
        })
        .catch(() => {
          // Silently fail — user can click "Resend code"
        })
        .finally(() => {
          setSendingCode(false);
        });
    }
  }, [step, codeSent, sendingCode, email]);

  function handleCopyReferral() {
    const link = `https://workpal.email?ref=${referralCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleResendCode() {
    if (sendingCode) return;
    setSendingCode(true);
    setPasswordError("");
    forgotPassword(email)
      .then(() => {
        setCodeSent(true);
      })
      .catch((err) => {
        setPasswordError(err instanceof Error ? err.message : "Failed to resend code.");
      })
      .finally(() => {
        setSendingCode(false);
      });
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");

    if (!code.trim()) {
      setPasswordError("Please enter the 6-digit code from your email.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      await confirmForgotPassword(email, code.trim(), newPassword);
      setPasswordSuccess(true);
      // Auto-advance to customize step after brief success display
      setTimeout(() => setStep("customize"), 1200);
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Invalid or expired code. Please try again."
      );
    } finally {
      setPasswordLoading(false);
    }
  }

  function handleCustomize() {
    onClose();
    router.push("/inbox");
  }

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Your Workpal is ready">
      <div className="p-6 pt-8">

        {/* ── Step 1: Celebrate ── */}
        {step === "celebrate" && (
          <div className="animate-celebrate">
            {/* Header */}
            <div className="text-center mb-5">
              <div className="flex justify-center mb-3">
                <CheckCircleIcon />
              </div>
              <h2 className="text-[24px] font-bold text-text-primary">
                {SIGNUP_MODAL.celebrateStep.heading}
              </h2>
              <p className="mt-2 text-[14px] text-[var(--color-text-subtle)]">
                {SIGNUP_MODAL.celebrateStep.subHeading}
              </p>
            </div>

            {/* Agent email badge */}
            <div className="flex items-center justify-center mb-5">
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dcfce7] text-[15px] font-bold text-cta">
                {agentEmail}
              </p>
            </div>

            {/* Premium features */}
            <div className="mb-5 p-4 rounded-[10px] bg-[#f0fdf4] border border-cta/20">
              <div className="flex items-center gap-2 mb-2.5">
                <StarIcon className="text-cta shrink-0" />
                <p className="text-[14px] font-bold text-cta">Premium Features</p>
              </div>
              <ul className="space-y-2">
                {SIGNUP_MODAL.celebrateStep.premiumFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] text-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-cta shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Referral banner */}
            {referralCode && (
              <div className="mb-5 p-4 rounded-[10px] bg-[#F0F9FF] border border-[#2980B9]/20">
                <div className="flex items-center gap-2 mb-2">
                  <GiftIcon className="text-[#2980B9] shrink-0" />
                  <p className="text-[14px] font-bold text-text-primary">
                    {SIGNUP_MODAL.celebrateStep.referralHeading}
                  </p>
                </div>
                <p className="text-[13px] text-[var(--color-text-subtle)] leading-[1.5] mb-3">
                  {SIGNUP_MODAL.celebrateStep.referralBody}
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 text-[13px] bg-white rounded-[6px] border border-[var(--color-border-light)] truncate text-text-primary font-medium">
                    workpal.email?ref={referralCode}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyReferral}
                    className="shrink-0 px-4 py-2 text-[13px] font-bold rounded-[6px] bg-[#2980B9] text-white hover:bg-[#2471A3] transition-colors duration-[120ms] cursor-pointer"
                  >
                    {copied
                      ? SIGNUP_MODAL.celebrateStep.copiedLabel
                      : SIGNUP_MODAL.celebrateStep.copyLabel}
                  </button>
                </div>
              </div>
            )}

            {/* Contacts reminder */}
            <p className="mb-5 text-[12px] text-[var(--color-text-muted)] text-center flex items-center justify-center gap-1.5">
              <LockIcon className="shrink-0 opacity-60" />
              {SIGNUP_MODAL.celebrateStep.contactsReminder}
            </p>

            {/* Continue button */}
            <Button
              variant="primary"
              className="w-full h-12 text-[15px]"
              onClick={() => setStep("password")}
            >
              {SIGNUP_MODAL.celebrateStep.continueButton}
              <ArrowRightIcon />
            </Button>
          </div>
        )}

        {/* ── Step 2: Set Password ── */}
        {step === "password" && (
          <div>
            {/* Agent email at top */}
            <div className="flex items-center justify-center mb-4">
              <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[14px] font-bold text-cta">
                {agentEmail}
              </p>
            </div>

            <div className="text-center mb-5">
              <h2 className="text-[20px] font-bold text-text-primary">
                {SIGNUP_MODAL.passwordStep.heading}
              </h2>
              <p className="mt-1.5 text-[14px] text-[var(--color-text-subtle)]">
                {passwordSuccess
                  ? "Password set successfully!"
                  : sendingCode
                    ? SIGNUP_MODAL.passwordStep.sendingCode
                    : codeSent
                      ? SIGNUP_MODAL.passwordStep.codeSent
                      : SIGNUP_MODAL.passwordStep.subHeading}
              </p>
            </div>

            {passwordSuccess ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center animate-premium-badge">
                  <CheckCircleIcon />
                </div>
                <p className="text-[14px] font-bold text-cta">Redirecting...</p>
              </div>
            ) : (
              <form onSubmit={handleSetPassword} className="space-y-3.5">
                {/* Verification code */}
                <div>
                  <label
                    htmlFor="signup-code"
                    className="block text-[13px] font-bold text-text-primary mb-1"
                  >
                    Verification Code
                  </label>
                  <input
                    id="signup-code"
                    type="text"
                    inputMode="numeric"
                    placeholder={SIGNUP_MODAL.passwordStep.codePlaceholder}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                    autoFocus
                  />
                </div>

                {/* New password */}
                <div>
                  <label
                    htmlFor="signup-password"
                    className="block text-[13px] font-bold text-text-primary mb-1"
                  >
                    New Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder={SIGNUP_MODAL.passwordStep.passwordPlaceholder}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                  />
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="signup-confirm-password"
                    className="block text-[13px] font-bold text-text-primary mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="signup-confirm-password"
                    type="password"
                    placeholder={SIGNUP_MODAL.passwordStep.confirmPlaceholder}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                  />
                </div>

                {passwordError && (
                  <p className="text-[13px] text-danger font-bold">{passwordError}</p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full h-11 text-[14px]"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? "Setting password..." : SIGNUP_MODAL.passwordStep.submitButton}
                  <ArrowRightIcon />
                </Button>

                {/* Resend + Skip */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={sendingCode}
                    className="text-[13px] text-link hover:text-text-primary transition-colors duration-[120ms] cursor-pointer disabled:opacity-50"
                  >
                    {sendingCode ? "Sending..." : SIGNUP_MODAL.passwordStep.resendCode}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("customize")}
                    className="text-[13px] text-[var(--color-text-muted)] hover:text-text-primary transition-colors duration-[120ms] cursor-pointer"
                  >
                    {SIGNUP_MODAL.passwordStep.skipNote}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ── Step 3: Customize ── */}
        {step === "customize" && (
          <div>
            {/* Header */}
            <div className="text-center mb-5">
              <div className="flex justify-center mb-3">
                <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[14px] font-bold text-cta">
                  {agentEmail}
                </p>
              </div>
              <h2 className="text-[20px] font-bold text-text-primary">
                {SIGNUP_MODAL.customizeStep.heading}
              </h2>
            </div>

            {/* Email examples grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {SIGNUP_MODAL.customizeStep.examples.map((ex, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-2.5 rounded-[8px] border border-[var(--color-border-light)] bg-surface-subtle hover:border-cta/30 transition-colors duration-[120ms]"
                >
                  <div className="shrink-0 w-7 h-7 rounded-full bg-[#dcfce7] flex items-center justify-center mt-0.5">
                    <ExampleIcon type={ex.icon} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-text-primary leading-tight">
                      {ex.title}
                    </p>
                    <p className="text-[11px] text-[var(--color-text-subtle)] leading-[1.4] mt-0.5">
                      {ex.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="border-t border-[var(--color-border-light)] pt-4 space-y-3">
              <Button
                variant="primary"
                className="w-full h-11 text-[14px]"
                onClick={handleCustomize}
              >
                {SIGNUP_MODAL.customizeStep.customizeButton}
                <ArrowRightIcon />
              </Button>
              <a
                href={SUCCESS_MODAL.buttons.gmail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] font-bold text-text-primary hover:bg-surface-subtle transition-colors duration-[180ms]"
              >
                {SIGNUP_MODAL.customizeStep.startForwardingButton}
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
}
