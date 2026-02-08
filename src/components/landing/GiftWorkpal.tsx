import { GIFT_WORKPAL } from "@/lib/constants";

function GiftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="8" width="16" height="10" rx="2" stroke="#007A5A" strokeWidth="1.5" />
      <path d="M10 8v10M2 12h16" stroke="#007A5A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 8C10 8 10 4 7 4s-3 4 3 4M10 8c0 0 0-4 3-4s3 4-3 4" stroke="#007A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#007A5A" strokeWidth="1.5" />
      <path d="M2 5l6 4 6-4" stroke="#007A5A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GiftWorkpal() {
  return (
    <section id={GIFT_WORKPAL.sectionId} className="py-16 md:py-24 bg-[#f0fdf4]">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cta/10 mb-4">
              <GiftIcon />
            </div>
            <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
              {GIFT_WORKPAL.heading}
            </h2>
            <p className="mt-3 text-[18px] text-[var(--color-text-subtle)] leading-[1.4]">
              {GIFT_WORKPAL.subheading}
            </p>
          </div>

          {/* Body + Mock email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: body text + CTA */}
            <div>
              <p className="text-[15px] text-[var(--color-text-subtle)] leading-[1.6] mb-6">
                {GIFT_WORKPAL.body}
              </p>
              <a
                href="/#hero-signup"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[6px] bg-cta text-white text-[15px] font-bold hover:bg-[#006B4F] transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)]"
              >
                {GIFT_WORKPAL.cta}
              </a>
              <p className="mt-4 text-[13px] text-[var(--color-text-muted)] font-bold">
                {GIFT_WORKPAL.socialProofLine}
              </p>
            </div>

            {/* Right: mock email notification */}
            <div className="rounded-[8px] border border-[var(--color-border-light)] bg-white shadow-[var(--shadow-md)] overflow-hidden">
              {/* Email header */}
              <div className="px-4 py-3 border-b border-[var(--color-border-light)] bg-[#fafafa]">
                <div className="flex items-center gap-2 mb-1">
                  <MailIcon />
                  <span className="text-[12px] font-bold text-[var(--color-text-muted)] uppercase tracking-wide">
                    New Email
                  </span>
                </div>
                <p className="text-[14px] font-bold text-text-primary leading-[1.3]">
                  {GIFT_WORKPAL.mockEmail.subject}
                </p>
              </div>
              {/* Email body */}
              <div className="px-4 py-4">
                <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
                  {GIFT_WORKPAL.mockEmail.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
