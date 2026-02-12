"use client";

import { useState } from "react";

/* ── Icons ── */

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M8 1v3M8 12v3M1 8h3M12 8h3M3.5 3.5l2 2M10.5 10.5l2 2M12.5 3.5l-2 2M5.5 10.5l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SkillsIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10.4 4.4 12l.7-4L2.2 5.2l4-.6L8 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ForwardIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8H5a3.5 3.5 0 00-3.5 3.5V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Types ── */

type Path = "customize" | "forward";

interface FirstTimeGuideProps {
  agentEmail: string;
  onSwitchTab: (tab: "skills" | "samples") => void;
  onDismiss: () => void;
}

/* ── Component ── */

export default function FirstTimeGuide({
  agentEmail,
  onSwitchTab,
  onDismiss,
}: FirstTimeGuideProps) {
  const [path, setPath] = useState<Path>("customize");
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  function handleCopy() {
    navigator.clipboard.writeText(agentEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="animate-fade-in">
      {/* Path selector tabs */}
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => { setPath("customize"); setCurrentStep(0); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors duration-[180ms] cursor-pointer ${
            path === "customize"
              ? "bg-cta/10 text-cta border border-cta/20"
              : "bg-surface-subtle text-[var(--color-text-muted)] border border-[var(--color-border-light)] hover:border-[var(--color-border-strong)]"
          }`}
        >
          <SparkleIcon className="w-3.5 h-3.5" />
          Customize first
        </button>
        <button
          type="button"
          onClick={() => { setPath("forward"); setCurrentStep(0); }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors duration-[180ms] cursor-pointer ${
            path === "forward"
              ? "bg-cta/10 text-cta border border-cta/20"
              : "bg-surface-subtle text-[var(--color-text-muted)] border border-[var(--color-border-light)] hover:border-[var(--color-border-strong)]"
          }`}
        >
          <ForwardIcon className="w-3.5 h-3.5" />
          Forward first
        </button>
      </div>

      {/* Path A: Customize first */}
      {path === "customize" && (
        <div className="rounded-[12px] border border-[var(--color-border-light)] bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <SparkleIcon className="text-cta" />
            <h3 className="text-[18px] font-bold text-text-primary">
              Let&apos;s set up your Workpal
            </h3>
          </div>

          <p className="text-[14px] text-[var(--color-text-subtle)] mb-6">
            A few quick steps to make your Workpal smarter from day one.
          </p>

          {/* Steps */}
          <div className="space-y-3 mb-6">
            {/* Step 1: Add skills */}
            <div
              className={`flex items-start gap-3 p-4 rounded-[10px] border transition-colors duration-[180ms] ${
                currentStep === 0
                  ? "border-cta/30 bg-[#f0fdf4]"
                  : "border-[var(--color-border-light)] bg-surface-subtle"
              }`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 0 ? "bg-cta text-white" : "bg-[var(--color-border-light)] text-[var(--color-text-muted)]"
              }`}>
                <SkillsIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-text-primary">Add skills</p>
                <p className="text-[13px] text-[var(--color-text-subtle)] mt-0.5">
                  Choose what your Workpal specializes in — contract review, writing, data analysis, and more.
                </p>
                {currentStep === 0 && (
                  <button
                    type="button"
                    onClick={() => { onSwitchTab("skills"); setCurrentStep(1); }}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-cta text-white text-[13px] font-bold hover:bg-cta-hover transition-colors duration-[180ms] cursor-pointer"
                  >
                    Browse Skills
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Step 2: Connect LinkedIn */}
            <div
              className={`flex items-start gap-3 p-4 rounded-[10px] border transition-colors duration-[180ms] ${
                currentStep === 1
                  ? "border-cta/30 bg-[#f0fdf4]"
                  : "border-[var(--color-border-light)] bg-surface-subtle"
              }`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 1 ? "bg-cta text-white" : "bg-[var(--color-border-light)] text-[var(--color-text-muted)]"
              }`}>
                <PersonIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-text-primary">Connect your LinkedIn</p>
                <p className="text-[13px] text-[var(--color-text-subtle)] mt-0.5">
                  Help your Workpal understand your expertise and write in your professional voice.
                </p>
                {currentStep === 1 && (
                  <button
                    type="button"
                    onClick={() => { onSwitchTab("samples"); setCurrentStep(2); }}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-cta text-white text-[13px] font-bold hover:bg-cta-hover transition-colors duration-[180ms] cursor-pointer"
                  >
                    Personalize
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {[0, 1].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-colors duration-[180ms] ${
                  currentStep > s ? "bg-cta" : currentStep === s ? "bg-cta/50" : "bg-[var(--color-border-strong)]"
                }`}
              />
            ))}
          </div>

          {/* Dismiss */}
          <button
            type="button"
            onClick={onDismiss}
            className="w-full text-center text-[12px] text-[var(--color-text-muted)] hover:text-text-primary transition-colors duration-[180ms] cursor-pointer"
          >
            I&apos;ll customize later
          </button>
        </div>
      )}

      {/* Path B: Forward first */}
      {path === "forward" && (
        <div className="rounded-[12px] border border-[var(--color-border-light)] bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <ForwardIcon className="text-cta" />
            <h3 className="text-[18px] font-bold text-text-primary">
              Ready to go? Forward an email now
            </h3>
          </div>

          <p className="text-[14px] text-[var(--color-text-subtle)] mb-5">
            Forward any work email to your Workpal and it will figure out the task automatically.
          </p>

          {/* Agent email card */}
          <div className="rounded-[10px] bg-[#f0fdf4] border border-cta/20 p-4 flex items-center justify-between gap-3 mb-5">
            <p className="text-[16px] font-bold text-cta truncate">
              {agentEmail}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-cta text-white text-[13px] font-bold hover:bg-cta-hover transition-colors duration-[180ms] cursor-pointer"
            >
              <CopyIcon />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <p className="text-[13px] text-[var(--color-text-muted)] mb-4">
            You can customize anytime from the Skills and Personalize tabs.
          </p>

          {/* Dismiss */}
          <button
            type="button"
            onClick={onDismiss}
            className="w-full text-center text-[12px] text-[var(--color-text-muted)] hover:text-text-primary transition-colors duration-[180ms] cursor-pointer"
          >
            Dismiss this guide
          </button>
        </div>
      )}
    </div>
  );
}
