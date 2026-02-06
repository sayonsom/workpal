import Button from "../ui/Button";
import { BUSINESS_CTA } from "@/lib/constants";

export default function EnterpriseCTA() {
  return (
    <section className="py-16 md:py-24 bg-brand">
      {/* Top border to separate from content above */}
      <div className="mx-auto max-w-[1200px] px-4 text-center">
        <h2 className="text-[32px] md:text-[36px] font-bold text-white leading-[1.2] max-w-[640px] mx-auto">
          {BUSINESS_CTA.heading}
        </h2>
        <p className="mt-4 text-[15px] text-white/70 leading-[1.4] max-w-[540px] mx-auto">
          {BUSINESS_CTA.subtext}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="primary">{BUSINESS_CTA.cta} &rarr;</Button>
          <button
            className="inline-flex items-center justify-center h-9 min-h-[32px] px-4 rounded-[6px] text-[15px] font-bold text-white border border-white/30 bg-transparent hover:bg-white/10 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
          >
            {BUSINESS_CTA.ctaSecondary}
          </button>
        </div>

        <p className="mt-4 text-[12px] text-white/50">
          {BUSINESS_CTA.microcopy}
        </p>
      </div>
    </section>
  );
}
