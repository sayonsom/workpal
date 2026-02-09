"use client";

import { Suspense, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { verifyCode, resendVerificationCode } from "@/lib/api";

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14" stroke="#2BAC76" strokeWidth="2" />
      <path d="M10 16.5l4 4 8-9" stroke="#2BAC76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14" stroke="#E01E5A" strokeWidth="2" />
      <path d="M12 12l8 8M20 12l-8 8" stroke="#E01E5A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="26" height="18" rx="3" stroke="#007A5A" strokeWidth="2" />
      <path d="M3 10l13 8 13-8" stroke="#007A5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [emailInput, setEmailInput] = useState(emailParam);
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const [status, setStatus] = useState<"form" | "loading" | "success" | "error">("form");
  const [message, setMessage] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleCodeChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...codeDigits];
    newDigits[index] = value.slice(-1);
    setCodeDigits(newDigits);
    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
  }

  function handleCodeKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  }

  function handleCodePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      e.preventDefault();
      setCodeDigits(pasted.split(""));
      codeRefs.current[5]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = codeDigits.join("");
    if (!emailInput.trim()) {
      setMessage("Please enter your email address.");
      setStatus("error");
      return;
    }
    if (code.length !== 6) {
      setMessage("Please enter all 6 digits.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const result = await verifyCode(emailInput.trim(), code);
      setAgentEmail(result.agent_email);
      setMessage(result.message);
      setStatus("success");
    } catch (err) {
      setMessage(
        err instanceof Error
          ? err.message
          : "Invalid or expired code. Please try again."
      );
      setStatus("error");
    }
  }

  async function handleResend() {
    if (!emailInput.trim()) return;
    setResending(true);
    setResendMsg("");
    try {
      await resendVerificationCode(emailInput.trim());
      setResendMsg("A new code has been sent to your email.");
      setCodeDigits(["", "", "", "", "", ""]);
      codeRefs.current[0]?.focus();
    } catch {
      setResendMsg("Failed to resend. Please try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle px-4">
      <div className="w-full max-w-[420px]">
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
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-md)] p-8 text-center">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-cta border-t-transparent rounded-full animate-spin" />
              <p className="text-[15px] text-[var(--color-text-subtle)]">
                Verifying your code...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <CheckIcon />
              <h1 className="text-[22px] font-bold text-text-primary">
                Email Verified
              </h1>
              <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
                {message}
              </p>
              {agentEmail && (
                <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[14px] font-bold text-[#007A5A]">
                  {agentEmail}
                </p>
              )}
              <a
                href={`/set-password?email=${encodeURIComponent(emailInput)}`}
                className="inline-flex items-center px-5 py-2.5 rounded-[6px] bg-cta text-white text-[14px] font-bold hover:bg-[#006B4F] transition-colors duration-[180ms]"
              >
                Set Your Password
              </a>
            </div>
          )}

          {(status === "form" || status === "error") && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center gap-4">
                <MailIcon />
                <h1 className="text-[22px] font-bold text-text-primary">
                  Enter Verification Code
                </h1>
                <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
                  Enter the 6-digit code sent to your email.
                </p>

                {/* Email input */}
                {!emailParam && (
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-cta focus:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                  />
                )}

                {/* 6-digit code */}
                <div className="flex gap-2" onPaste={handleCodePaste}>
                  {codeDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { codeRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(i, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(i, e)}
                      className="w-11 h-13 text-center text-[22px] font-bold rounded-[8px] border border-[var(--color-border-strong)] text-text-primary focus:border-cta focus:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                      autoFocus={i === 0}
                    />
                  ))}
                </div>

                {status === "error" && message && (
                  <div className="flex items-center gap-2">
                    <ErrorIcon />
                    <p className="text-[13px] text-danger font-bold">{message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full h-11 rounded-[6px] bg-cta text-white text-[14px] font-bold hover:bg-[#006B4F] transition-colors duration-[180ms] cursor-pointer"
                >
                  Verify Code
                </button>

                <div className="flex items-center gap-1">
                  <span className="text-[13px] text-[var(--color-text-muted)]">
                    Didn&apos;t get it?
                  </span>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="text-[13px] font-bold text-[#007A5A] hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {resending ? "Sending..." : "Resend code"}
                  </button>
                </div>

                {resendMsg && (
                  <p className="text-[12px] text-[var(--color-text-muted)]">{resendMsg}</p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-surface-subtle">
          <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
