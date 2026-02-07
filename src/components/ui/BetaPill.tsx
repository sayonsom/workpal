interface BetaPillProps {
  /** "light" for dark backgrounds (footer, aubergine), "dark" for light backgrounds (navbar, dashboard) */
  variant?: "dark" | "light";
}

export default function BetaPill({ variant = "dark" }: BetaPillProps) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-[1px] rounded-[4px] text-[9px] font-bold uppercase tracking-[0.05em] leading-none ${
        variant === "dark"
          ? "bg-cta/10 text-cta border border-cta/20"
          : "bg-white/15 text-white/90 border border-white/20"
      }`}
    >
      Beta
    </span>
  );
}
