import Button from "../ui/Button";
import { SITE, NAV } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 h-11 bg-white border-b border-[var(--color-border-light)]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-[1200px] h-full flex items-center justify-between px-4">
        {/* Logo */}
        <a
          href="/"
          className="text-[18px] font-bold text-brand leading-none"
        >
          {SITE.nameLower}
        </a>

        {/* Right side: links + CTA */}
        <div className="flex items-center gap-6">
          {NAV.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] text-text-primary hover:text-[var(--color-text-subtle)] transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] hidden md:inline"
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary">{NAV.cta}</Button>
        </div>
      </div>
    </nav>
  );
}
