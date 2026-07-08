type ImagePlaceholderProps = {
  label: string;
  description?: string;
};

export function ImagePlaceholder({ label, description }: ImagePlaceholderProps) {
  return (
    <div className="flex min-h-72 flex-col justify-end overflow-hidden rounded-sm border border-champagne-gold/20 bg-[radial-gradient(circle_at_20%_20%,rgba(217,75,140,0.18),transparent_34%),linear-gradient(135deg,#120c0d,#050304)] p-6 shadow-2xl shadow-deep-magenta/10">
      <div className="h-px w-16 bg-champagne-gold" />
      <p className="mt-5 font-serif text-3xl text-warm-cream">{label}</p>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-muted-taupe">{description}</p>
      ) : null}
    </div>
  );
}
