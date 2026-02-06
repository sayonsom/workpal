import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { SendIcon } from "../ui/Icons";
import { SITE, HERO } from "@/lib/constants";

function FakeEmailUI() {
  return (
    <div className="bg-white rounded-[8px] border border-[var(--color-border-light)] shadow-[var(--shadow-md)] overflow-hidden">
      {/* Email header */}
      <div className="px-4 py-3 border-b border-[var(--color-border-light)]">
        <div className="flex items-center gap-2 text-[13px]">
          <span className="font-bold text-text-primary">{HERO.emailUI.from}</span>
          <span className="text-[var(--color-text-muted)]">&rarr;</span>
          <span className="text-[var(--color-text-subtle)]">{HERO.emailUI.to}</span>
        </div>
        <div className="text-[15px] font-bold text-text-primary mt-1">
          {HERO.emailUI.subject}
        </div>
      </div>

      {/* Agent reply */}
      <div className="px-4 py-4">
        <div className="flex gap-3">
          {/* Agent avatar */}
          <div className="w-8 h-8 rounded-[6px] bg-cta flex items-center justify-center shrink-0">
            <span className="text-white text-[12px] font-bold">W</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-cta">
                {SITE.name} Agent
              </span>
              <span className="text-[12px] text-[var(--color-text-muted)]">
                Just now
              </span>
            </div>
            <div className="mt-1 px-3 py-2 bg-surface-subtle rounded-[6px] text-[14px] text-text-primary leading-[1.4]">
              {HERO.emailUI.reply}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="animate-fade-in py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <Badge variant="subtle">{HERO.badge}</Badge>

          <h1 className="mt-4 text-[40px] md:text-[48px] font-bold text-text-primary leading-[1.2]">
            {HERO.headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-4 text-[15px] text-[var(--color-text-subtle)] leading-[1.4] max-w-[480px]">
            {HERO.subtext}
          </p>

          {/* Input group */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-[480px]">
            <input
              type="url"
              placeholder={HERO.inputPlaceholder}
              aria-label={HERO.inputPlaceholder}
              className="flex-1 h-9 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]"
            />
            <Button variant="primary">
              {HERO.ctaLabel}
              <SendIcon className="ml-2" size={14} />
            </Button>
          </div>

          <p className="mt-3 text-[12px] text-[var(--color-text-muted)] leading-[1.4] max-w-[480px]">
            {HERO.microcopy}
          </p>
        </div>

        {/* Right column — Fake Email UI */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-[420px]">
            <FakeEmailUI />
          </div>
        </div>
      </div>
    </section>
  );
}
