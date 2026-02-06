import { SITE, FOOTER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand py-8">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <span className="text-[18px] font-bold text-white">
            {SITE.nameLower}
          </span>

          {/* Links */}
          <div className="flex items-center gap-6">
            {FOOTER.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] text-[rgba(255,255,255,0.86)] hover:text-white transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Tagline */}
          <span className="text-[13px] text-[rgba(255,255,255,0.70)] italic">
            {SITE.footerTagline}
          </span>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <span className="text-[12px] text-[rgba(255,255,255,0.56)]">
            &copy; {SITE.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
