import Card from "../ui/Card";
import { SOCIAL_PROOF } from "@/lib/constants";

function QuoteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4.5 12.5C3.4 12.5 2.5 11.6 2.5 10.5V10C2.5 7.5 4.5 5.5 7 5.5V7C5.6 7 4.5 8.1 4.5 9.5H6.5V12.5H4.5ZM11.5 12.5C10.4 12.5 9.5 11.6 9.5 10.5V10C9.5 7.5 11.5 5.5 14 5.5V7C12.6 7 11.5 8.1 11.5 9.5H13.5V12.5H11.5Z"
        fill="rgba(29,28,29,0.20)"
      />
    </svg>
  );
}

export default function SocialProof() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* User count banner */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-[999px] bg-surface-subtle border border-[var(--color-border-light)] text-[14px] text-[var(--color-text-subtle)]">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            {SOCIAL_PROOF.userCount}
          </span>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[960px] mx-auto">
          {SOCIAL_PROOF.testimonials.map((t, i) => (
            <Card key={i} hoverable>
              <QuoteIcon />
              <p className="mt-3 text-[14px] text-text-primary leading-[1.5]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 pt-3 border-t border-[var(--color-border-light)]">
                <p className="text-[13px] font-bold text-text-primary">
                  {t.name}
                </p>
                <p className="text-[12px] text-[var(--color-text-muted)]">
                  {t.role}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
