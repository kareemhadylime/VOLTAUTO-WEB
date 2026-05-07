import type { BrandCard } from '@/types/vehicle';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function BrandGrid({ brands }: { brands: BrandCard[] }) {
  const chinese = brands.filter((b) => b.cluster === 'chinese-oem');
  const legacy = brands.filter((b) => b.cluster === 'china-built-legacy');

  return (
    <section className="border-b border-brand-border-soft">
      <div className="container-prose py-16">
        <Eyebrow>Catalog · by brand · China-made</Eyebrow>
        <h2 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">
          {brands.length}+ Chinese OEMs we have full sourcing experience with
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Cluster title="Chinese OEMs" items={chinese} />
          <Cluster title="Legacy badges · China-built" items={legacy} extra />
        </div>
      </div>
    </section>
  );
}

function Cluster({
  title,
  items,
  extra = false,
}: {
  title: string;
  items: BrandCard[];
  extra?: boolean;
}) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-eyebrow text-brand-green">
        {title}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {items.map((b) => (
          <div key={b.name} className="card-base p-4">
            <div className="font-display text-base text-white">{b.name}</div>
            <div className="mt-1 text-[10px] leading-snug text-brand-text-muted">
              {b.models.join(' · ')}
            </div>
          </div>
        ))}
      </div>
      {extra && (
        <div className="mt-4 rounded-md border border-brand-green/20 bg-brand-green/[0.06] p-4">
          <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">
            Why China-spec is often better
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-brand-text-secondary">
            China-spec versions of European badges often have <strong>more range, faster
            charging, and tech features</strong> not in the European or US version — same
            nameplate, better car. We tell you exactly what&apos;s different per model.
          </p>
        </div>
      )}
    </div>
  );
}
