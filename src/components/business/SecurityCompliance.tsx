import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { CheckIcon } from "../ui/Icons";
import { BUSINESS_SECURITY } from "@/lib/constants";

/* ── Inline SVG icons (co-located per project convention) ── */

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="4" y="9" width="12" height="8" rx="2" stroke="#007A5A" strokeWidth="1.5" />
      <path d="M7 9V6a3 3 0 016 0v3" stroke="#007A5A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13" r="1" fill="#007A5A" />
    </svg>
  );
}

function AuditIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="3" y="2" width="14" height="16" rx="2" stroke="#1D9BD1" strokeWidth="1.5" />
      <path d="M7 6h6M7 10h6M7 14h4" stroke="#1D9BD1" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="10" cy="10" r="7.5" stroke="#3F0E40" strokeWidth="1.5" />
      <path d="M3 10h14M10 2.5c2 2.5 2 12.5 0 15M10 2.5c-2 2.5-2 12.5 0 15" stroke="#3F0E40" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="10" cy="8" r="5" stroke="#1D9BD1" strokeWidth="1.5" />
      <path
        d="M7.5 7.5l2 2 3-3.5"
        stroke="#1D9BD1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13l-1 5 4-2 4 2-1-5"
        stroke="#1D9BD1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Category icon selector */
const categoryIcons = [<LockIcon key="lock" />, <ShieldIcon key="shield" />, <GlobeIcon key="globe" />, <AuditIcon key="audit" />];

/* ── Certification badge card ── */
function CertBadge({ title, description }: { title: string; description: string }) {
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

export default function SecurityCompliance() {
  return (
    <section id="security-compliance" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <Badge variant="subtle">{BUSINESS_SECURITY.badge}</Badge>
          <h2 className="mt-4 text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {BUSINESS_SECURITY.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {BUSINESS_SECURITY.subtext}
          </p>
        </div>

        {/* Security categories — 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto mb-12">
          {BUSINESS_SECURITY.categories.map((category, i) => (
            <div key={i} className="flex gap-3">
              <div className="mt-0.5">{categoryIcons[i]}</div>
              <div>
                <h3 className="text-[15px] font-bold text-text-primary mb-2">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckIcon className="shrink-0 mt-0.5" />
                      <span className="text-[14px] text-[var(--color-text-subtle)] leading-[1.4]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="max-w-[900px] mx-auto mb-12">
          <div className="h-px bg-[var(--color-border-light)]" />
        </div>

        {/* Certifications — 4-column grid */}
        <div className="max-w-[900px] mx-auto">
          <h3 className="text-center text-[18px] font-bold text-text-primary mb-6">
            Enterprise-grade certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {BUSINESS_SECURITY.certifications.map((cert, i) => (
              <CertBadge key={i} title={cert.title} description={cert.description} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button variant="secondary">{BUSINESS_SECURITY.cta} &rarr;</Button>
          <p className="mt-2 text-[12px] text-[var(--color-text-muted)]">
            {BUSINESS_SECURITY.microcopy}
          </p>
        </div>
      </div>
    </section>
  );
}
