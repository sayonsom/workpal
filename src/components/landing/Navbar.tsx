"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { SITE, NAV } from "@/lib/constants";
import { isAuthenticated } from "@/lib/auth";

export default function Navbar() {
  const [authed, setAuthed] = useState(false);

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
    <nav
      className="sticky top-0 z-50 h-12 bg-white border-b border-[var(--color-border-light)]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-[1200px] h-full flex items-center justify-between px-4">
        {/* Logo mark + wordmark */}
        <a
          href="/"
          className="flex items-center gap-2 leading-none"
        >
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

        {/* Right side: links + CTA */}
        <div className="flex items-center gap-6">
          {NAV.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...("external" in link && link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-[15px] text-text-primary hover:text-[var(--color-text-subtle)] transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] hidden md:inline"
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" onClick={handleCtaClick}>
            {authed ? "Dashboard" : NAV.cta}
          </Button>
        </div>
      </div>
    </nav>
  );
}
