import Button from "../ui/Button";
import { SendIcon } from "../ui/Icons";
import { BOTTOM_CTA } from "@/lib/constants";

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function BottomCTA() {
  return (
    <section className="py-16 md:py-24 bg-brand">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="max-w-[560px] mx-auto text-center">
          <h2 className="text-[32px] md:text-[36px] font-bold text-white leading-[1.2]">
            {BOTTOM_CTA.heading}
          </h2>
          <p className="mt-4 text-[15px] text-white/70 leading-[1.4]">
            {BOTTOM_CTA.subtext}
          </p>

          {/* Input group — mirrors Hero */}
          <div className="mt-8 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                placeholder={BOTTOM_CTA.linkedInPlaceholder}
                aria-label={BOTTOM_CTA.linkedInPlaceholder}
                className="flex-1 h-9 px-3 rounded-[6px] border border-white/20 bg-white/10 text-[15px] text-white placeholder:text-white/50 focus:border-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]"
              />
              <input
                type="email"
                placeholder={BOTTOM_CTA.emailPlaceholder}
                aria-label={BOTTOM_CTA.emailPlaceholder}
                className="flex-1 h-9 px-3 rounded-[6px] border border-white/20 bg-white/10 text-[15px] text-white placeholder:text-white/50 focus:border-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]"
              />
            </div>
            <Button variant="primary" className="w-full sm:w-auto">
              {BOTTOM_CTA.ctaLabel}
              <SendIcon className="ml-2" size={14} />
            </Button>
          </div>

          <p className="mt-4 text-[12px] text-white/50">
            {BOTTOM_CTA.microcopy}
          </p>

          <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-white/40">
            <LockIcon />
            {BOTTOM_CTA.encryptionNote}
          </p>
        </div>
      </div>
    </section>
  );
}
