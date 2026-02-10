"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE, INBOX } from "@/lib/constants";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface InboxShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export default function InboxShell({ sidebar, children, searchQuery = "", onSearchChange }: InboxShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen bg-[#FDFDFD] flex flex-col overflow-hidden">
      {/* Top bar — logo area matches sidebar grey, rest is light */}
      <header className="sticky top-0 z-40 h-[64px] bg-[#F5F5F5] shrink-0">
        <div className="h-full flex items-center">
          {/* Logo area — same width as sidebar */}
          <div className="shrink-0 w-[240px] flex items-center gap-3 px-4">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[var(--color-text-subtle)] hover:text-text-primary transition-colors cursor-pointer"
            >
              <MenuIcon />
            </button>
            <a href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Workpal logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-[17px] font-bold text-text-primary hidden sm:inline">
                {SITE.nameLower}
              </span>
            </a>
          </div>

          {/* Search bar — aligned with main content */}
          {onSearchChange && (
            <div className="flex-1 flex items-center px-4 sm:px-6">
              <div className="relative w-full max-w-[720px]">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder={INBOX.search.placeholder}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full h-[46px] pl-11 pr-4 rounded-full bg-[#E9EEF6] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:bg-white focus:shadow-[var(--shadow-md)] focus:outline-none transition-all duration-[200ms]"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar — grey background like Gmail */}
        <aside
          className={`
            fixed lg:relative z-30 lg:z-auto
            w-[240px] shrink-0 bg-[#F5F5F5]
            flex flex-col h-[calc(100vh-64px)]
            transition-transform duration-[240ms] ease-[var(--ease-default)]
            overflow-y-auto custom-scrollbar
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {sidebar}
        </aside>

        {/* Main content — light background */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#FDFDFD]">
          <div className="px-4 sm:px-6 py-5">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
