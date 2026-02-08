"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { verifyEmail } from "@/lib/api";

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

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token || !email) {
      setStatus("error");
      setMessage("Missing verification parameters. Please check your link.");
      return;
    }

    verifyEmail(token, email)
      .then((res) => {
        setStatus("success");
        setMessage(res.message || "Your email has been verified! You can now receive emails from your Workpal agent.");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(
          err instanceof Error
            ? err.message
            : "Verification link is invalid or expired. Please request a new one from your dashboard."
        );
      });
  }, [token, email]);

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
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-md)] p-8 text-center">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-cta border-t-transparent rounded-full animate-spin" />
              <p className="text-[15px] text-[var(--color-text-subtle)]">
                Verifying your email...
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
              <a
                href="/dashboard"
                className="inline-flex items-center px-5 py-2.5 rounded-[6px] bg-cta text-white text-[14px] font-bold hover:bg-[#006B4F] transition-colors duration-[180ms]"
              >
                Go to Dashboard
              </a>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4">
              <ErrorIcon />
              <h1 className="text-[22px] font-bold text-text-primary">
                Verification Failed
              </h1>
              <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
                {message}
              </p>
              <a
                href="/dashboard"
                className="inline-flex items-center px-5 py-2.5 rounded-[6px] bg-cta text-white text-[14px] font-bold hover:bg-[#006B4F] transition-colors duration-[180ms]"
              >
                Go to Dashboard
              </a>
            </div>
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
