import Badge from "../ui/Badge";
import Button from "../ui/Button";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import { BUSINESS_HERO } from "@/lib/constants";

export default function BusinessHero() {
  return (
    <section className="animate-fade-in py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column — copy */}
        <div>
          <Badge variant="brand">{BUSINESS_HERO.badge}</Badge>

          <h1 className="mt-4 text-[40px] md:text-[48px] font-bold text-text-primary leading-[1.1]">
            {BUSINESS_HERO.headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-4 text-[15px] text-[var(--color-text-subtle)] leading-[1.4] max-w-[480px]">
            {BUSINESS_HERO.subtext}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="primary">{BUSINESS_HERO.cta} &rarr;</Button>
            <Button variant="secondary">{BUSINESS_HERO.ctaSecondary}</Button>
          </div>
        </div>

        {/* Right column — placeholder */}
        <div className="flex justify-center lg:justify-end">
          <ImagePlaceholder
            label={BUSINESS_HERO.placeholderLabel}
            aspectRatio="16/10"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>
    </section>
  );
}
