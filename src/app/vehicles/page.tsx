import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { BrandGrid } from '@/components/vehicles/BrandGrid';
import { RequestAnyEvPanel } from '@/components/vehicles/RequestAnyEvPanel';
import { seedVehicles } from '@/lib/seed/vehicles';
import { seedBrands } from '@/lib/seed/brands';

export const metadata: Metadata = {
  title: 'EV catalog · import on request',
  description:
    'Every Chinese-made EV currently worth importing — BYD, NEVO, Denza, Arcfox, plus China-built BMW, Mercedes, Honda. Featured imports + request any model.',
};

export default function VehiclesPage() {
  const featured = seedVehicles.filter((v) => v.isFeatured);
  return (
    <>
      <section
        className="border-b border-brand-border-soft"
        style={{ background: 'linear-gradient(135deg, #000 0%, #0d1610 100%)' }}
      >
        <div className="container-prose py-20">
          <Eyebrow>Catalog · import on request</Eyebrow>
          <h1 className="mt-2 font-display text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl">
            Every EV
            <br />
            currently worth
            <br />
            <span className="text-brand-green">importing.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-brand-text-secondary">
            A curated catalog of the Chinese EVs we know inside and out — sourcing routes,
            real-world range, after-market support, parts pipeline. Pick one and we&apos;ll
            source it, or tell us your shortlist and we&apos;ll quote what&apos;s possible.
          </p>
        </div>
      </section>

      <section className="border-b border-brand-border-soft">
        <div className="container-prose py-16">
          <Eyebrow>
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
            Currently advertising · {featured.length} models
          </Eyebrow>
          <h2 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">
            This month&apos;s featured imports
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {featured.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} featured />
            ))}
          </div>
        </div>
      </section>

      <RequestAnyEvPanel />
      <BrandGrid brands={seedBrands} />
    </>
  );
}
