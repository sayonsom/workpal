import { PERSONALIZATION } from "@/lib/constants";

export default function Personalization() {
  return (
    <section id={PERSONALIZATION.sectionId} className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Section header */}
        <div className="text-center max-w-[640px] mx-auto mb-10">
          <span className="inline-block text-[13px] font-bold text-cta uppercase tracking-wide mb-2">
            {PERSONALIZATION.label}
          </span>
          <h2 className="text-[32px] md:text-[36px] font-bold text-text-primary leading-[1.2]">
            {PERSONALIZATION.heading}{" "}
            <span className="text-[var(--color-text-muted)] text-[24px] font-normal">
              {PERSONALIZATION.headingSuffix}
            </span>
          </h2>
          <p className="mt-3 text-[15px] text-[var(--color-text-subtle)] leading-[1.5]">
            {PERSONALIZATION.subtitle}
          </p>
        </div>

        {/* Two cards side by side */}
        <div className="max-w-[800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {PERSONALIZATION.cards.map((card, i) => {
            const isAccent = card.tagStyle === "accent";

            return (
              <div
                key={i}
                className={`rounded-[8px] p-6 ${
                  isAccent
                    ? "border-2 border-cta bg-white shadow-[var(--shadow-md)]"
                    : "border border-[var(--color-border-light)] bg-white shadow-[var(--shadow-sm)]"
                }`}
              >
                {/* Tag pill */}
                <span
                  className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-[999px] mb-4 ${
                    isAccent
                      ? "bg-[#dcfce7] text-cta"
                      : "bg-surface-subtle text-[var(--color-text-muted)]"
                  }`}
                >
                  {card.tag}
                </span>

                <h3 className="text-[18px] font-bold text-text-primary mb-2">
                  {card.title}
                </h3>

                <p className="text-[14px] text-[var(--color-text-subtle)] leading-[1.5]">
                  {card.body}
                </p>

                {/* Personalization methods (only on accent card) */}
                {"methods" in card && card.methods && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.methods.map((method) => (
                      <span
                        key={method}
                        className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-[999px] bg-[#dcfce7] text-cta border border-cta/20"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
