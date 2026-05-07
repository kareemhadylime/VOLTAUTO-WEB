export function HeroGallery({
  hero,
  thumbs,
  alt,
}: {
  hero: string;
  thumbs: string[];
  alt: string;
}) {
  return (
    <div>
      <div
        aria-label={alt}
        className="aspect-[16/10] overflow-hidden rounded-md border border-brand-border-soft bg-brand-bg-raised"
      >
        <div className="flex h-full w-full items-center justify-center font-mono text-xs text-brand-text-dim">
          [ hero · {hero} ]
        </div>
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1.5">
        {thumbs.slice(0, 4).map((t) => (
          <div
            key={t}
            className="aspect-square rounded border border-brand-border-soft bg-brand-bg-raised"
            aria-hidden
          />
        ))}
        {thumbs.length > 4 && (
          <div className="flex aspect-square items-center justify-center rounded border border-brand-border-soft bg-brand-bg-raised text-[10px] text-brand-text-muted">
            +{thumbs.length - 4}
          </div>
        )}
      </div>
    </div>
  );
}
