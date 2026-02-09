"use client";

import Image from "next/image";
import { SITE } from "@/lib/constants";

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface InboxShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function InboxShell({ sidebar, children }: InboxShellProps) {
  return (
    <div className="min-h-screen bg-surface-subtle flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-12 bg-white border-b border-[var(--color-border-light)] shrink-0">
        <div className="h-full flex items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Workpal logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="text-[17px] font-bold text-text-primary">
              {SITE.nameLower}
            </span>
          </a>

          <a
            href="/settings"
            className="text-[var(--color-text-subtle)] hover:text-text-primary transition-colors duration-[180ms]"
            title="Settings"
          >
            <GearIcon />
          </a>
        </div>
      </header>

      {/* Body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[220px] shrink-0 bg-white border-r border-[var(--color-border-light)] hidden lg:flex flex-col">
          {sidebar}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
