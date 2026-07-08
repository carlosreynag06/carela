import { DecorativeDivider } from "@/components/DecorativeDivider";
import { ImageFrame } from "@/components/ImageFrame";

type ImagePlaceholderProps = {
  label: string;
  description?: string;
};

export function ImagePlaceholder({ label, description }: ImagePlaceholderProps) {
  return (
    <ImageFrame className="flex min-h-72 flex-col justify-end bg-[radial-gradient(circle_at_20%_20%,rgba(217,75,140,0.18),transparent_34%),linear-gradient(135deg,#120c0d,#050304)] p-6">
      <DecorativeDivider />
      <p className="mt-5 font-serif text-3xl text-warm-cream">{label}</p>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-muted-taupe">{description}</p>
      ) : null}
    </ImageFrame>
  );
}
