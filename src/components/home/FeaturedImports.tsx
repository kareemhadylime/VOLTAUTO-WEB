import { Eyebrow } from '@/components/ui/Eyebrow';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { getFeaturedVehicles } from '@/lib/inventory';

export async function FeaturedImports() {
  const featured = (await getFeaturedVehicles()).slice(0, 4);
  if (featured.length === 0) return null;
  return (
    <section className="border-b border-brand-border-soft">
      <div className="container-prose py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <Eyebrow>
              <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
              Currently advertising · {featured.length} models
            </Eyebrow>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
              This month&apos;s featured imports
            </h2>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-dim sm:inline">
            Updated weekly
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {featured.map((v) => (
            <VehicleCard key={v.slug} vehicle={v} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
