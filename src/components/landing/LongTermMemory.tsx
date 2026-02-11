"use client";

import ImagePlaceholder from "../ui/ImagePlaceholder";

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1C5.5 1 3 3 3 5.5c0 1.5.8 2.8 2 3.5v4a1 1 0 001 1h4a1 1 0 001-1V9c1.2-.7 2-2 2-3.5C13 3 10.5 1 8 1z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 14v-2M10 14v-2M5.5 7.5S6.5 8 8 8s2.5-.5 2.5-.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LongTermMemory() {
  function handleCtaClick() {
    const el = document.getElementById("hero-signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#hero-signup";
    }
  }

  const points = [
    "BCC your Workpal on any email — it quietly files the context away",
    "When a future task needs that context, Workpal connects the dots for you",
    "Perfect for executives drowning in data they can't act on yet",
  ];

  return (
    <section className="py-16 md:py-24 bg-surface-subtle">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cta/8 text-cta text-[13px] font-semibold mb-4">
            <BrainIcon />
            Long-Term Intelligence
          </span>
          <h2 className="text-[28px] md:text-[38px] font-bold text-text-primary leading-[1.15] tracking-tight">
            Not every email needs action today.<br className="hidden md:block" />
            But your Workpal never forgets.
          </h2>
          <p className="mt-3 text-[16px] md:text-[18px] text-[var(--color-text-subtle)] max-w-[640px] mx-auto leading-[1.5]">
            Forward a PDF you don&apos;t know what to do with yet. BCC your Workpal on a thread that might matter later. When the right moment arrives, it already has the context.
          </p>
        </div>

        {/* Two-column: screenshot + features (reversed) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: screenshot placeholder */}
          <div className="order-2 lg:order-1">
            <ImagePlaceholder
              label="Image: Long-term context and intelligence"
              aspectRatio="16/10"
              className="w-full rounded-[8px]"
            />
          </div>

          {/* Right: copy + CTA */}
          <div className="order-1 lg:order-2">
            <h3 className="text-[20px] md:text-[24px] font-bold text-text-primary leading-[1.2] mb-2">
              Build context over months. Apply it in seconds.
            </h3>
            <p className="text-[15px] text-[var(--color-text-subtle)] leading-[1.6] mb-6">
              Most AI tools have the memory of a goldfish. Your Workpal accumulates intelligence over time — pricing decks from Q2, vendor proposals from last year, that compliance update you skimmed in a cab. When you need it, it&apos;s already there.
            </p>

            <ul className="space-y-4 mb-8">
              {points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 text-cta"><CheckIcon /></span>
                  <span className="text-[15px] text-text-primary leading-[1.5]">{point}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 px-6 h-12 rounded-[8px] bg-cta text-white text-[15px] font-bold hover:bg-cta-hover transition-colors duration-[180ms] cursor-pointer"
            >
              Start building your Workpal&apos;s memory
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
