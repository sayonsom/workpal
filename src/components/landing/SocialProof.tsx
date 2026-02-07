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

function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4.5 6.5V12M7.5 12V9.25C7.5 8.01 8.51 7 9.75 7C10.99 7 12 8.01 12 9.25V12M4.5 4.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        stroke="#0A66C2"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1"
        y="1"
        width="14"
        height="14"
        rx="2"
        stroke="#0A66C2"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Circle placeholder for a user photo. Shows initials when no photo src is provided. */
function PhotoCircle({
  name,
  photo,
}: {
  name: string;
  photo: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border-2 border-[var(--color-border-light)]"
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-surface-subtle border-2 border-dashed border-[var(--color-border-light)] flex items-center justify-center">
      <span className="text-[12px] font-bold text-[var(--color-text-muted)]">
        {initials}
      </span>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="py-12 md:py-16 bg-surface-subtle">
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
              <div className="mt-4 pt-3 border-t border-[var(--color-border-light)] flex items-center gap-3">
                {/* Photo circle */}
                <PhotoCircle name={t.name} photo={t.photo} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-bold text-text-primary truncate">
                      {t.name}
                    </p>
                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 hover:opacity-80 transition-opacity"
                      aria-label={`${t.name} on LinkedIn`}
                    >
                      <LinkedInIcon />
                    </a>
                  </div>
                  <p className="text-[12px] text-[var(--color-text-muted)]">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
