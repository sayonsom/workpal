interface BadgeProps {
  children: React.ReactNode;
  variant?: "subtle" | "brand";
  className?: string;
}

const variantStyles = {
  subtle:
    "bg-surface-subtle text-[var(--color-text-subtle)] border border-[var(--color-border-light)]",
  brand: "bg-brand text-white",
};

export default function Badge({
  children,
  variant = "subtle",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-[999px] text-[12px] leading-[1.4] font-normal ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
