import Badge from "../ui/Badge";
import { VIDEO_DEMO } from "@/lib/constants";

/* ── Play button icon ── */
function PlayIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="23" stroke="#007A5A" strokeWidth="2" />
      <path d="M20 16l12 8-12 8V16z" fill="#007A5A" />
    </svg>
  );
}

export default function VideoDemo() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-8">
          <Badge variant="subtle">{VIDEO_DEMO.badge}</Badge>
          <h2 className="mt-4 text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {VIDEO_DEMO.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {VIDEO_DEMO.subtext}
          </p>
        </div>

        {/* Video embed placeholder */}
        <div className="mx-auto max-w-[800px]">
          <div
            className="relative w-full rounded-[8px] border-2 border-dashed border-[var(--color-border-strong)] bg-surface-subtle overflow-hidden cursor-pointer group"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Placeholder content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-110">
                <PlayIcon />
              </div>
              <span className="text-[15px] font-bold text-cta">
                {VIDEO_DEMO.ctaLabel}
              </span>
              <span className="text-[12px] text-[var(--color-text-muted)]">
                {VIDEO_DEMO.placeholder}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
