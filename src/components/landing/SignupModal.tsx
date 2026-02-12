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

type Step = "invite" | "examples";

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

  const [step, setStep] = useState<Step>("invite");
  const [copied, setCopied] = useState(false);

  function handleCopyReferral() {
    const link = `https://workpal.email?ref=${referralCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleSetPassword() {
    onClose();
    router.push(`/set-password?email=${encodeURIComponent(email)}`);
  }

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Your Workpal is ready">
      <div className="p-6 pt-8">

        {/* ── Step 1: Invite link ── */}
        {step === "invite" && (
          <div>
            {/* Header */}
            <div className="text-center mb-5">
              <div className="flex justify-center mb-3">
                <CheckCircleIcon />
              </div>
              <h2 className="text-[24px] font-bold text-text-primary">
                {SIGNUP_MODAL.inviteStep.heading}
              </h2>
              <p className="mt-2 text-[14px] text-[var(--color-text-subtle)]">
                {SIGNUP_MODAL.inviteStep.subHeading}
              </p>
            </div>

            {/* Agent email badge */}
            <div className="flex items-center justify-center mb-6">
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dcfce7] text-[15px] font-bold text-cta">
                {agentEmail}
              </p>
            </div>

            {/* Referral banner */}
            {referralCode && (
              <div className="mb-5 p-4 rounded-[10px] bg-[#F0F9FF] border border-[#2980B9]/20">
                <div className="flex items-center gap-2 mb-2">
                  <GiftIcon className="text-[#2980B9] shrink-0" />
                  <p className="text-[14px] font-bold text-text-primary">
                    {SIGNUP_MODAL.inviteStep.referralHeading}
                  </p>
                </div>
                <p className="text-[13px] text-[var(--color-text-subtle)] leading-[1.5] mb-3">
                  {SIGNUP_MODAL.inviteStep.referralBody}
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
                      ? SIGNUP_MODAL.inviteStep.copiedLabel
                      : SIGNUP_MODAL.inviteStep.copyLabel}
                  </button>
                </div>
              </div>
            )}

            {/* Next button */}
            <Button
              variant="primary"
              className="w-full h-12 text-[15px]"
              onClick={() => setStep("examples")}
            >
              {SIGNUP_MODAL.inviteStep.nextButton}
              <ArrowRightIcon />
            </Button>
          </div>
        )}

        {/* ── Step 2: Email examples ── */}
        {step === "examples" && (
          <div>
            {/* Header */}
            <div className="text-center mb-5">
              <div className="flex justify-center mb-3">
                <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[14px] font-bold text-cta">
                  {agentEmail}
                </p>
              </div>
              <h2 className="text-[20px] font-bold text-text-primary">
                {SIGNUP_MODAL.examplesStep.heading}
              </h2>
            </div>

            {/* Email examples grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {SIGNUP_MODAL.examplesStep.examples.map((ex, i) => (
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
                onClick={handleSetPassword}
              >
                {SIGNUP_MODAL.examplesStep.setPasswordButton}
                <ArrowRightIcon />
              </Button>
              <p className="text-[12px] text-[var(--color-text-muted)] text-center">
                {SIGNUP_MODAL.examplesStep.setPasswordNote}
              </p>
              <a
                href={SUCCESS_MODAL.buttons.gmail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] font-bold text-text-primary hover:bg-surface-subtle transition-colors duration-[180ms]"
              >
                {SIGNUP_MODAL.examplesStep.startForwardingButton}
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
}
