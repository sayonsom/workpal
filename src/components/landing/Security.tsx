import Badge from "../ui/Badge";
import { SECURITY } from "@/lib/constants";

/* ── Inline SVG icons ── */

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 1.5L3 4.5v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9v-5L10 1.5z"
        stroke="#2BAC76"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 10l2 2 3.5-4"
        stroke="#2BAC76"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="4" y="9" width="12" height="8" rx="2" stroke="#007A5A" strokeWidth="1.5" />
      <path d="M7 9V6a3 3 0 016 0v3" stroke="#007A5A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13" r="1" fill="#007A5A" />
    </svg>
  );
}

export default function Security() {
  return (
    <section id="security" className="py-16 md:py-24 bg-surface-subtle">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <Badge variant="subtle">{SECURITY.badge}</Badge>
          <h2 className="mt-4 text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {SECURITY.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {SECURITY.subtext}
          </p>
        </div>

        {/* Security principles — 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mb-10">
          {SECURITY.principles.map((principle, i) => (
            <div key={i} className="flex gap-3">
              <div className="mt-0.5 shrink-0">
                {i % 2 === 0 ? <LockIcon /> : <ShieldIcon />}
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-text-primary">
                  {principle.title}
                </h3>
                <p className="mt-1 text-[14px] text-[var(--color-text-subtle)] leading-[1.4]">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cert note */}
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-[13px] text-[var(--color-text-muted)] italic leading-[1.5]">
            {SECURITY.certNote}
          </p>
        </div>

        {/* Contact */}
        <div className="mt-6 text-center">
          <p className="text-[12px] text-[var(--color-text-muted)]">
            Questions? Reach out to{" "}
            <a
              href={`mailto:${SECURITY.contact}`}
              className="text-link hover:underline"
            >
              {SECURITY.contact}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
