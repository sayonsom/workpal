"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { SIGNUP_MODAL, SUCCESS_MODAL } from "@/lib/constants";

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

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  agentEmail: string;
  referralCode?: string;
}

/* ── Component ── */

export default function SignupModal({
  open,
  onClose,
  email,
  agentEmail,
  referralCode = "",
}: SignupModalProps) {
  const router = useRouter();

  // Referral copy state
  const [copied, setCopied] = useState(false);

  function handleSetPassword() {
    onClose();
    router.push(`/set-password?email=${encodeURIComponent(email)}`);
  }

  function handleCopyReferral() {
    const link = `https://workpal.email?ref=${referralCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Your Workpal is ready">
      <div className="p-6 pt-8">
        <div>
          {/* Header */}
          <div className="text-center mb-5">
            <div className="flex justify-center mb-3">
              <CheckCircleIcon />
            </div>
            <h2 className="text-[24px] font-bold text-text-primary">
              {SIGNUP_MODAL.successStep.heading}
            </h2>
            <p className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[14px] font-bold text-cta">
              {agentEmail}
            </p>
            <p className="mt-2 text-[14px] text-[var(--color-text-subtle)]">
              {SIGNUP_MODAL.successStep.subHeading}
            </p>
          </div>

          {/* Email examples grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {SIGNUP_MODAL.successStep.examples.map((ex, i) => (
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

          {/* Referral banner */}
          {referralCode && (
            <div className="mb-4 p-3 rounded-[8px] bg-[#F0F9FF] border border-[#2980B9]/20">
              <p className="text-[13px] font-bold text-text-primary">
                {SIGNUP_MODAL.successStep.referralBanner.heading}
              </p>
              <p className="text-[12px] text-[var(--color-text-subtle)] mt-1 leading-[1.5]">
                {SIGNUP_MODAL.successStep.referralBanner.body}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 px-2 py-1.5 text-[12px] bg-white rounded border border-[var(--color-border-light)] truncate text-text-primary">
                  workpal.email?ref={referralCode}
                </code>
                <button
                  type="button"
                  onClick={handleCopyReferral}
                  className="shrink-0 px-3 py-1.5 text-[12px] font-bold rounded-[6px] bg-cta text-white hover:bg-[#006B4F] transition-colors duration-[120ms] cursor-pointer"
                >
                  {copied
                    ? SIGNUP_MODAL.successStep.referralBanner.copiedLabel
                    : SIGNUP_MODAL.successStep.referralBanner.copyLabel}
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-[var(--color-border-light)] pt-4 space-y-3">
            <Button
              variant="primary"
              className="w-full h-11 text-[14px]"
              onClick={handleSetPassword}
            >
              {SIGNUP_MODAL.successStep.setPasswordButton}
              <ArrowRightIcon />
            </Button>
            <p className="text-[12px] text-[var(--color-text-muted)] text-center">
              {SIGNUP_MODAL.successStep.setPasswordNote}
            </p>
            <a
              href={SUCCESS_MODAL.buttons.gmail.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] font-bold text-text-primary hover:bg-surface-subtle transition-colors duration-[180ms]"
            >
              {SIGNUP_MODAL.successStep.startForwardingButton}
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}
