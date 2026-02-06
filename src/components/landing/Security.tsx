import Badge from "../ui/Badge";
import Button from "../ui/Button";
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

function CertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="8" r="5" stroke="#1D9BD1" strokeWidth="1.5" />
      <path
        d="M7.5 7.5l2 2 3-3.5"
        stroke="#1D9BD1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 13l-1 5 4-2 4 2-1-5" stroke="#1D9BD1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Certification badge pill ── */
function CertBadge({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[8px] border border-[var(--color-border-light)] bg-white p-4 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-2 mb-2">
        <CertIcon />
        <h4 className="text-[14px] font-bold text-text-primary">{title}</h4>
      </div>
      <p className="text-[13px] text-[var(--color-text-subtle)] leading-[1.4]">
        {description}
      </p>
    </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mb-12">
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

        {/* Divider */}
        <div className="max-w-[900px] mx-auto mb-12">
          <div className="h-px bg-[var(--color-border-light)]" />
        </div>

        {/* Certifications */}
        <div className="max-w-[900px] mx-auto">
          <h3 className="text-center text-[18px] font-bold text-text-primary mb-6">
            Enterprise-grade certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SECURITY.certifications.map((cert, i) => (
              <CertBadge key={i} title={cert.title} description={cert.description} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button variant="secondary">{SECURITY.cta} &rarr;</Button>
          <p className="mt-2 text-[12px] text-[var(--color-text-muted)]">
            {SECURITY.microcopy}
          </p>
        </div>
      </div>
    </section>
  );
}
