"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../ui/Modal";
import { SUCCESS_MODAL } from "@/lib/constants";

function CheckCircleIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
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

function StepCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 8.5l3 3L12 5" stroke="#2BAC76" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type SuccessTab = "tutorial" | "desktop" | "phone";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  agentEmail: string;
}

export default function SuccessModal({
  open,
  onClose,
  agentEmail,
}: SuccessModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SuccessTab>("tutorial");

  const tabs: { key: SuccessTab; label: string }[] = [
    { key: "tutorial", label: SUCCESS_MODAL.tabs.tutorial.label },
    { key: "desktop", label: SUCCESS_MODAL.tabs.desktop.label },
    { key: "phone", label: SUCCESS_MODAL.tabs.phone.label },
  ];

  function handlePersonalize() {
    onClose();
    router.push("/dashboard");
  }

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Your Workpal is ready">
      <div className="p-6 pt-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <CheckCircleIcon />
          </div>
          <h2 className="text-[24px] font-bold text-text-primary">
            {SUCCESS_MODAL.heading}
          </h2>
          <p className="mt-1 text-[14px] text-[var(--color-text-subtle)]">
            {SUCCESS_MODAL.subHeading}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[14px] font-bold text-cta">
            {agentEmail}
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-0 border-b border-[var(--color-border-light)] mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-3 py-2.5 text-[13px] font-bold border-b-2 transition-colors duration-[180ms] cursor-pointer text-center ${
                activeTab === tab.key
                  ? "border-cta text-cta"
                  : "border-transparent text-[var(--color-text-subtle)] hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-[160px] mb-6">
          {activeTab === "tutorial" && (
            <div className="flex items-center justify-center rounded-[8px] border-2 border-dashed border-[var(--color-border-light)] bg-surface-subtle aspect-video">
              <p className="text-[14px] text-[var(--color-text-muted)]">
                {SUCCESS_MODAL.tabs.tutorial.placeholder}
              </p>
            </div>
          )}
          {activeTab === "desktop" && (
            <ul className="space-y-3">
              {SUCCESS_MODAL.tabs.desktop.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-0.5">
                    <StepCheckIcon />
                  </span>
                  <span className="text-[14px] text-text-primary leading-[1.4]">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {activeTab === "phone" && (
            <ul className="space-y-3">
              {SUCCESS_MODAL.tabs.phone.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-0.5">
                    <StepCheckIcon />
                  </span>
                  <span className="text-[14px] text-text-primary leading-[1.4]">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-border-light)] pt-5">
          {/* Action buttons — full-width, vertical stack */}
          <div className="space-y-3">
            <a
              href={SUCCESS_MODAL.buttons.gmail.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] font-bold text-text-primary hover:bg-surface-subtle transition-colors duration-[180ms]"
            >
              {SUCCESS_MODAL.buttons.gmail.label}
              <ArrowRightIcon />
            </a>
            <a
              href={SUCCESS_MODAL.buttons.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] font-bold text-text-primary hover:bg-surface-subtle transition-colors duration-[180ms]"
            >
              {SUCCESS_MODAL.buttons.linkedin.label}
              <ArrowRightIcon />
            </a>
            <button
              onClick={handlePersonalize}
              className="flex items-center justify-center gap-2 w-full h-11 rounded-[6px] bg-cta text-white text-[14px] font-bold hover:bg-cta-hover transition-colors duration-[180ms] cursor-pointer"
            >
              {SUCCESS_MODAL.buttons.personalize.label}
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
