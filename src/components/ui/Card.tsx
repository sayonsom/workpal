interface CardProps {
  children: React.ReactNode;
  className?: string;
  accentBorder?: boolean;
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  accentBorder = false,
  hoverable = true,
}: CardProps) {
  const borderStyle = accentBorder
    ? "border-2 border-cta"
    : "border border-[var(--color-border-light)]";

  const hoverStyle = hoverable
    ? "hover:-translate-y-0.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)]"
    : "";

  return (
    <div
      className={`bg-white rounded-[8px] shadow-[var(--shadow-sm)] p-6 ${borderStyle} ${hoverStyle} ${className}`}
    >
      {children}
    </div>
  );
}
