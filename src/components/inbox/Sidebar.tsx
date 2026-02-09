"use client";

import { useState } from "react";
import { INBOX } from "@/lib/constants";
import Modal from "../ui/Modal";

/* ── Icons ── */

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h3.5a1 1 0 011 1v.5a1.5 1.5 0 003 0V9a1 1 0 011-1H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M14 2L7 9M14 2l-4 12-3-5.5L2 6l12-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M5 4V2.5A.5.5 0 015.5 2h5a.5.5 0 01.5.5V4M13 4v9.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 013 13.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ── Types ── */

interface SidebarProps {
  activeItem: "inbox" | "sent" | "trash";
  onItemChange: (item: "inbox" | "sent" | "trash") => void;
  inboxCount?: number;
  agentEmail: string;
  onLogout: () => void;
}

export default function Sidebar({
  activeItem,
  onItemChange,
  inboxCount,
  agentEmail,
  onLogout,
}: SidebarProps) {
  const [showCompose, setShowCompose] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(agentEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const navItems: {
    key: "inbox" | "sent" | "trash";
    label: string;
    icon: React.ReactNode;
    disabled?: boolean;
  }[] = [
    { key: "inbox", label: INBOX.sidebar.inbox, icon: <InboxIcon /> },
    { key: "sent", label: INBOX.sidebar.sent, icon: <SendIcon />, disabled: true },
    { key: "trash", label: INBOX.sidebar.trash, icon: <TrashIcon />, disabled: true },
  ];

  return (
    <>
      <div className="flex flex-col h-full px-3 py-4">
        {/* Compose button */}
        <button
          onClick={() => setShowCompose(true)}
          className="w-full h-10 rounded-[8px] bg-cta hover:bg-cta-hover text-white text-[14px] font-bold flex items-center justify-center gap-2 transition-colors duration-[180ms] cursor-pointer mb-4"
        >
          <PencilIcon />
          {INBOX.sidebar.compose}
        </button>

        {/* Nav items */}
        <nav className="space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => !item.disabled && onItemChange(item.key)}
              disabled={item.disabled}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[14px] font-bold transition-colors duration-[180ms] cursor-pointer ${
                activeItem === item.key && !item.disabled
                  ? "bg-cta/10 text-cta"
                  : item.disabled
                  ? "text-[var(--color-text-muted)] opacity-50 cursor-default"
                  : "text-[var(--color-text-subtle)] hover:bg-[var(--color-surface-subtle)] hover:text-text-primary"
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.key === "inbox" && inboxCount !== undefined && inboxCount > 0 && (
                <span className="bg-cta text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {inboxCount}
                </span>
              )}
              {item.disabled && (
                <span className="text-[10px] text-[var(--color-text-muted)] font-normal">
                  Soon
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Log out */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[13px] text-[var(--color-text-muted)] hover:text-danger transition-colors duration-[180ms] cursor-pointer"
        >
          <LogOutIcon />
          {INBOX.sidebar.logout}
        </button>
      </div>

      {/* Compose modal */}
      <Modal open={showCompose} onClose={() => setShowCompose(false)} ariaLabel="Send a task">
        <div className="p-6">
          <h2 className="text-[20px] font-bold text-text-primary mb-2">
            {INBOX.compose.heading}
          </h2>
          <p className="text-[14px] text-[var(--color-text-subtle)] mb-6">
            {INBOX.compose.subtext}
          </p>

          {/* Agent email card */}
          <div className="rounded-[8px] bg-[var(--color-surface-subtle)] border border-[var(--color-border-light)] p-4 flex items-center justify-between gap-3">
            <p className="text-[16px] font-bold text-cta truncate">
              {agentEmail}
            </p>
            <button
              onClick={handleCopy}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-cta text-white text-[13px] font-bold hover:bg-cta-hover transition-colors duration-[180ms] cursor-pointer"
            >
              <CopyIcon />
              {copied ? INBOX.compose.copiedLabel : INBOX.compose.copyLabel}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
