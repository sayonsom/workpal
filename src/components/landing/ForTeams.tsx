import { CheckIcon } from "../ui/Icons";
import { FOR_TEAMS } from "@/lib/constants";

export default function ForTeams() {
  return (
    <section id={FOR_TEAMS.sectionId} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {FOR_TEAMS.title}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.4]">
            {FOR_TEAMS.subtitle}
          </p>
        </div>

        {/* Selling points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {FOR_TEAMS.sellingPoints.map((point, i) => (
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
      </div>
    </section>
  );
}
