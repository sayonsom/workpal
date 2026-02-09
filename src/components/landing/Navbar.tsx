"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { SITE, NAV } from "@/lib/constants";
import { isAuthenticated } from "@/lib/auth";

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [authed, setAuthed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  function handleCtaClick() {
    if (authed) {
      window.location.href = "/inbox";
    } else {
      const el = document.getElementById("hero-signup");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "/#hero-signup";
      }
    }
  }

  return (
    <>
      <nav
        className="sticky top-0 z-50 h-12 bg-white border-b border-[var(--color-border-light)]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-[1200px] h-full flex items-center justify-between px-4">
          {/* Logo mark + wordmark */}
          <a href="/" className="flex items-center gap-2 leading-none">
            <Image
              src="/logo.png"
              alt="Workpal logo"
              width={24}
              height={24}
              className="w-6 h-6"
              priority
            />
            <span className="text-[17px] font-bold text-text-primary">
              {SITE.nameLower}
            </span>
          </a>

          {/* Desktop: links + Login + CTA */}
          <div className="hidden md:flex items-center gap-6">
            {NAV.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...("external" in link && link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-[15px] text-text-primary hover:text-[var(--color-text-subtle)] transition-colors duration-[180ms]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://medium.com/workpal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-text-primary hover:text-[var(--color-text-subtle)] transition-colors duration-[180ms]"
            >
              Blog
            </a>
            {!authed && (
              <a
                href="/login"
                className="text-[15px] font-medium text-text-primary hover:text-[var(--color-text-subtle)] transition-colors duration-[180ms]"
              >
                Log in
              </a>
            )}
            <Button variant="primary" onClick={handleCtaClick}>
              {authed ? "Dashboard" : NAV.cta}
            </Button>
          </div>

          {/* Mobile: hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-primary cursor-pointer"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-12 z-40 bg-white border-b border-[var(--color-border-light)] shadow-[var(--shadow-md)] animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-3">
            {NAV.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] text-text-primary py-1.5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://medium.com/workpal"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] text-text-primary py-1.5"
            >
              Blog
            </a>
          </div>
        </div>
      )}

      {/* Mobile sticky bottom CTA bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-border-light)] shadow-[0_-2px_12px_rgba(0,0,0,0.08)] px-4 py-3 flex gap-3">
        <a
          href="/login"
          className="flex-1 h-10 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] font-semibold text-text-primary flex items-center justify-center hover:bg-[var(--color-surface-subtle)] transition-colors"
        >
          Log in
        </a>
        <button
          onClick={handleCtaClick}
          className="flex-1 h-10 rounded-[6px] bg-cta text-white text-[14px] font-semibold flex items-center justify-center hover:bg-cta-hover transition-colors cursor-pointer"
        >
          {NAV.cta}
        </button>
      </div>
    </>
  );
}
