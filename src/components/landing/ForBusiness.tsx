import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { CheckIcon } from "../ui/Icons";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import { FOR_BUSINESS } from "@/lib/constants";

export default function ForBusiness() {
  return (
    <section id="for-business" className="py-16 md:py-24 bg-surface-subtle">
      <div className="mx-auto max-w-[1200px] px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <Badge variant="brand">{FOR_BUSINESS.badge}</Badge>

          <h2 className="mt-4 text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {FOR_BUSINESS.headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p className="mt-4 text-[15px] text-[var(--color-text-subtle)] leading-[1.4] max-w-[480px]">
            {FOR_BUSINESS.body}
          </p>

          <ul className="mt-4 space-y-3">
            {FOR_BUSINESS.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckIcon className="shrink-0 mt-0.5" />
                <span className="text-[15px] text-text-primary leading-[1.4]">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Button variant="primary">{FOR_BUSINESS.cta} &rarr;</Button>
            <p className="mt-2 text-[12px] text-[var(--color-text-muted)]">
              {FOR_BUSINESS.microcopy}
            </p>
          </div>
        </div>

        {/* Right column — placeholder */}
        <div className="flex justify-center md:justify-end">
          <ImagePlaceholder
            label={FOR_BUSINESS.placeholderLabel}
            aspectRatio="16/10"
            className="w-full max-w-[500px]"
          />
        </div>
      </div>
    </section>
  );
}
