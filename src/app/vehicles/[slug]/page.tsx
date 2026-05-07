import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { StatusPill } from '@/components/ui/Pill';
import { HeroGallery } from '@/components/vehicles/HeroGallery';
import { SpecTable } from '@/components/vehicles/SpecTable';
import { WhatsIncluded } from '@/components/vehicles/WhatsIncluded';
import { ImportTimeline } from '@/components/vehicles/ImportTimeline';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildVehicleJsonLd } from '@/lib/seo/vehicleSchema';
import { seedVehicles } from '@/lib/seed/vehicles';
import { formatEgp, formatKm, formatKwh } from '@/lib/format';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { brand } from '@/lib/tokens';

export function generateStaticParams() {
  return seedVehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = seedVehicles.find((x) => x.slug === slug);
  if (!v) return {};
  return {
    title: `${v.brand} ${v.model} ${v.trim ?? ''} — landed-cost EV import`,
    description: `${v.brand} ${v.model} ${v.trim ?? ''} · ${formatKm(v.rangeKm)} ${v.rangeStandard} · ${formatKwh(v.batteryKwh)} battery · ${v.dcChargeKw} kW DC fast charging. Imported direct from China. From ${formatEgp(v.startingPriceEgp)}.`,
  };
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = seedVehicles.find((x) => x.slug === slug);
  if (!v) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://voltauto.biz';
  const ld = buildVehicleJsonLd(v, baseUrl);

  return (
    <>
      <JsonLd data={ld} />
      <div className="container-prose pb-16 pt-10">
        <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
          <Link href="/">Home</Link> · <Link href="/vehicles">Vehicles</Link> · {v.brand} ·{' '}
          <span className="text-white">
            {v.model} {v.trim}
          </span>
        </nav>

        <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <HeroGallery
            hero={v.heroImageUrl}
            thumbs={v.galleryImageUrls}
            alt={`${v.brand} ${v.model} hero photo`}
          />
          <div>
            <Eyebrow>{v.brand}</Eyebrow>
            <h1 className="mt-1 font-display text-3xl tracking-tight text-white sm:text-4xl">
              {v.model} {v.trim ?? ''}
            </h1>
            <StatusPill status={v.status} className="mt-3" />
            <div className="mt-4 font-display text-3xl text-brand-green">
              From {formatEgp(v.startingPriceEgp)}
            </div>
            <div className="mt-2 text-xs text-brand-text-muted">
              Door-to-door delivery · 12-month warranty · ETA ~{v.etaWeeks} weeks
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <Stat label="Range" value={`${formatKm(v.rangeKm)}`} sub={v.rangeStandard} />
              <Stat label="Battery" value={formatKwh(v.batteryKwh)} sub="net" />
              <Stat label="DC fast" value={`${v.dcChargeKw} kW`} sub="up to" />
              <Stat label="Drive" value={v.drivetrain.toUpperCase()} />
            </div>

            <div className="mt-6 grid gap-2">
              <Button
                variant="primary"
                size="md"
                href={buildWhatsAppLink({ phone: brand.whatsapp.egypt, vehicleSlug: v.slug })}
              >
                Request this exact spec →
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="sm" href="/contact">
                  Book test drive
                </Button>
                <Button variant="secondary" size="sm" href={buildWhatsAppLink({ phone: brand.whatsapp.egypt })}>
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <Eyebrow>Full specification</Eyebrow>
          <h2 className="mt-2 font-display text-xl tracking-tight text-white">Specs</h2>
          <div className="mt-4">
            <SpecTable specs={v.specs} />
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <FeatureColumn title="ADAS" items={v.features.adas} />
          <FeatureColumn title="Comfort" items={v.features.comfort} />
          <FeatureColumn title="Tech" items={v.features.tech} />
        </div>

        <div className="mt-14">
          <ImportTimeline />
        </div>

        <div className="mt-14">
          <WhatsIncluded />
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded border border-brand-border-soft p-3">
      <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-white">
        {value}
        {sub && <span className="ml-1 text-[10px] text-brand-text-dim">{sub}</span>}
      </div>
    </div>
  );
}

function FeatureColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">
        {title}
      </div>
      <ul className="mt-2 space-y-1.5 text-sm text-brand-text-secondary">
        {items.map((it) => (
          <li key={it}>· {it}</li>
        ))}
      </ul>
    </div>
  );
}
