interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: string;
  src?: string;
  alt?: string;
  className?: string;
}

export default function ImagePlaceholder({
  label,
  aspectRatio = "16/10",
  src,
  alt,
  className = "",
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={`overflow-hidden rounded-[8px] ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || label}
          className="w-full h-auto object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-[8px] bg-surface-subtle border-2 border-dashed border-[var(--color-border-light)] ${className}`}
      style={{ aspectRatio }}
    >
      <span className="text-[12px] text-[var(--color-text-muted)] select-none">
        {label}
      </span>
    </div>
  );
}
