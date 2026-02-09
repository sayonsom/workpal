"use client";

import Image from "next/image";

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1v3M8 12v3M1 8h3M12 8h3M3.5 3.5l2 2M10.5 10.5l2 2M12.5 3.5l-2 2M5.5 10.5l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

export default function SkillsShowcase() {
  function handleCtaClick() {
    const el = document.getElementById("hero-signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#hero-signup";
    }
  }

  const features = [
    "One-click skill activation from a curated catalog",
    "Learn new skills from YouTube videos and podcasts",
    "Custom sub-skills that make your Workpal even sharper",
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cta/8 text-cta text-[13px] font-semibold mb-4">
            <SparkleIcon />
            Instant Expertise
          </span>
          <h2 className="text-[28px] md:text-[38px] font-bold text-text-primary leading-[1.15] tracking-tight">
            Skills your Workpal can learn in seconds.
          </h2>
          <p className="mt-3 text-[16px] md:text-[18px] text-[var(--color-text-subtle)] max-w-[600px] mx-auto leading-[1.5]">
            Activate professional skills from a built-in catalog, or teach your Workpal new ones from YouTube tutorials and podcasts.
          </p>
        </div>

        {/* Two-column: features + screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: feature list + CTA */}
          <div>
            <ul className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 text-cta"><CheckIcon /></span>
                  <span className="text-[16px] text-text-primary leading-[1.5]">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 px-6 h-12 rounded-[8px] bg-cta text-white text-[15px] font-bold hover:bg-cta-hover transition-colors duration-[180ms] cursor-pointer"
            >
              Add and Manage Skills
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Right: screenshot */}
          <div className="rounded-[12px] border border-[var(--color-border-light)] shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden bg-[#F6F6F6]">
            <Image
              src="/assets/skills.webp"
              alt="Workpal Skills Dashboard — activate skills, learn from YouTube"
              width={800}
              height={560}
              className="w-full h-auto"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
