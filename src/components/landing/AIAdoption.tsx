import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { CheckIcon } from "../ui/Icons";
import { AI_ADOPTION } from "@/lib/constants";

export default function AIAdoption() {
  return (
    <section id="ai-adoption" className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <Badge variant="subtle">{AI_ADOPTION.badge}</Badge>
          <h2 className="mt-4 text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {AI_ADOPTION.heading}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {AI_ADOPTION.subtext}
          </p>
        </div>

        {/* 2x2 grid of points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
          {AI_ADOPTION.points.map((point, i) => (
            <div key={i} className="flex gap-3">
              <div className="mt-1 shrink-0">
                <CheckIcon size={18} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-text-primary">
                  {point.title}
                </h3>
                <p className="mt-1 text-[14px] text-[var(--color-text-subtle)] leading-[1.4]">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button variant="primary">{AI_ADOPTION.cta} &rarr;</Button>
        </div>
      </div>
    </section>
  );
}
