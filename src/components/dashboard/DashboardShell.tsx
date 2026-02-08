"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SITE, DASHBOARD } from "@/lib/constants";
import { clearTokens } from "@/lib/auth";


type NavItem = "agents" | "usage";

interface DashboardShellProps {
  activeNav: NavItem;
  onNavChange: (item: NavItem) => void;
  children: React.ReactNode;
}

function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardShell({
  activeNav,
  onNavChange,
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  function handleLogout() {
    setLoggingOut(true);
    clearTokens();
    router.push("/");
  }

  const navItems: { key: NavItem; label: string }[] = [
    { key: "agents", label: DASHBOARD.nav.agents },
    { key: "usage", label: DASHBOARD.nav.usage },
  ];

  return (
    <div className="min-h-screen bg-surface-subtle">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-12 bg-white border-b border-[var(--color-border-light)]">
        <div className="mx-auto max-w-[1200px] h-full flex items-center justify-between px-4">
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

          <div className="flex items-center gap-4">
            <a
              href="/settings"
              className="text-[14px] text-[var(--color-text-subtle)] hover:text-text-primary transition-colors duration-[180ms]"
            >
              {DASHBOARD.nav.settings}
            </a>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 text-[14px] text-[var(--color-text-subtle)] hover:text-danger transition-colors duration-[180ms] cursor-pointer"
            >
              <LogOutIcon />
              {DASHBOARD.logout}
            </button>
          </div>
        </div>
      </header>

      {/* Nav tabs */}
      <div className="bg-white border-b border-[var(--color-border-light)]">
        <div className="mx-auto max-w-[1200px] px-4 flex gap-0">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavChange(item.key)}
              className={`px-4 py-3 text-[14px] font-bold border-b-2 transition-colors duration-[180ms] cursor-pointer ${
                activeNav === item.key
                  ? "border-cta text-cta"
                  : "border-transparent text-[var(--color-text-subtle)] hover:text-text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-[1200px] px-4 py-8">{children}</main>
    </div>
  );
}
