"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { clearTokens } from "@/lib/auth";

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1L2 4v4c0 3.5 2.5 5.5 6 7 3.5-1.5 6-3.5 6-7V4L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 8l1.5 1.5L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QueueIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="6.5" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="11" width="12" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="2" width="5" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="7" width="5" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function AuditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 2h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 5h5M5.5 7.5h5M5.5 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10.5 11.5L14 8l-3.5-3.5M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: "/admin", label: "Review Queue", icon: QueueIcon, exact: true },
  { href: "/admin/dashboard", label: "Dashboard", icon: DashboardIcon, exact: true },
  { href: "/admin/audit", label: "Audit Log", icon: AuditIcon, exact: true },
];

interface AdminShellProps {
  children: React.ReactNode;
  pendingCount?: number;
}

export default function AdminShell({ children, pendingCount }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    clearTokens();
    router.push("/");
  }

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="h-screen bg-[#F5F5F5] flex flex-col overflow-hidden">
      {/* Top bar */}
      <header className="sticky top-0 z-40 h-[64px] bg-[#F5F5F5] shrink-0">
        <div className="h-full flex items-center">
          {/* Logo area */}
          <div className="shrink-0 w-[240px] flex items-center gap-3 px-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[var(--color-text-subtle)] hover:text-text-primary transition-colors cursor-pointer"
            >
              <MenuIcon />
            </button>
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Workpal logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-[17px] font-bold text-text-primary hidden sm:inline">
                workpal
              </span>
            </Link>
          </div>

          {/* Admin badge */}
          <div className="flex-1 flex items-center gap-3 pr-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand">
              <ShieldIcon />
              <span className="text-[13px] font-semibold">Admin</span>
            </div>
            {pendingCount !== undefined && pendingCount > 0 && (
              <span className="text-[13px] text-[var(--color-text-muted)]">
                {pendingCount} pending review{pendingCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Back to inbox */}
          <div className="pr-4">
            <Link
              href="/inbox"
              className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-muted)] hover:text-text-primary transition-colors"
            >
              <BackIcon />
              <span className="hidden sm:inline">Back to Inbox</span>
            </Link>
          </div>
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

        {/* Sidebar */}
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
          <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-medium transition-colors
                    ${active
                      ? "bg-white text-text-primary shadow-[var(--shadow-sm)]"
                      : "text-[var(--color-text-subtle)] hover:bg-white/60 hover:text-text-primary"
                    }
                  `}
                >
                  <Icon />
                  <span>{item.label}</span>
                  {item.href === "/admin" && pendingCount !== undefined && pendingCount > 0 && (
                    <span className="ml-auto text-[11px] font-bold bg-danger text-white rounded-full w-5 h-5 flex items-center justify-center">
                      {pendingCount > 99 ? "99+" : pendingCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="px-3 py-4 border-t border-[var(--color-border-light)]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-[14px] text-[var(--color-text-muted)] hover:bg-white/60 hover:text-text-primary transition-colors cursor-pointer"
            >
              <LogoutIcon />
              <span>Log out</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-white rounded-tl-2xl">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
