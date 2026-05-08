import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getUAEVehicles, formatAed } from '@/lib/uae';
import { JsonLd } from '@/components/seo/JsonLd';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'UAE Electric Vehicles | VoltAuto',
  description: 'Shop electric vehicles available in the UAE. AED pricing, DC fast charging, and delivery across Dubai, Abu Dhabi, and beyond.',
  openGraph: {
    title: 'UAE Electric Vehicles | VoltAuto',
    description: 'Electric vehicles with AED pricing — available for delivery across the UAE.',
  },
};

export default async function UAEPage() {
  const vehicles = await getUAEVehicles();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'VoltAuto UAE Electric Vehicles',
    description: 'Electric vehicles available for delivery in the UAE.',
    numberOfItems: vehicles.length,
    itemListElement: vehicles.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${v.manufacturer} ${v.model}${v.trim ? ` ${v.trim}` : ''}`,
        offers: v.starting_price_aed
          ? { '@type': 'Offer', price: v.starting_price_aed, priceCurrency: 'AED' }
          : undefined,
      },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header + geo toggle */}
          <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🇦🇪</span>
                <p className="text-brand-green text-sm font-semibold uppercase tracking-widest">UAE</p>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Electric Vehicles in the UAE</h1>
              <p className="mt-2 text-slate-400 max-w-xl">
                All prices in AED. Delivery across Dubai, Abu Dhabi, Sharjah, and the Northern Emirates.
              </p>
            </div>
            <Link
              href="/vehicles"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm transition-colors"
            >
              <span>🇪🇬</span> Switch to Egypt
            </Link>
          </div>

          {/* Vehicle grid */}
          {vehicles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-slate-400">
              <p className="text-lg font-medium">UAE inventory coming soon.</p>
              <p className="mt-2 text-sm">
                <Link href="/contact" className="underline hover:text-white">Contact us</Link> to enquire about UAE delivery.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map(v => (
                <UaeVehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-slate-800 p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Planning a UAE fleet order?</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              We handle multi-vehicle orders, corporate financing, and custom delivery scheduling across the UAE.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/fleet" className="px-5 py-2.5 rounded-full bg-brand-green text-slate-950 font-semibold text-sm hover:opacity-90 transition-opacity">
                Fleet Calculator
              </Link>
              <Link href="/contact" className="px-5 py-2.5 rounded-full bg-slate-700 text-white font-semibold text-sm hover:bg-slate-600 transition-colors">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function UaeVehicleCard({ vehicle: v }: { vehicle: Awaited<ReturnType<typeof getUAEVehicles>>[0] }) {
  const heroSrc = v.hero_image_url ?? v.photo_url;
  const name = `${v.manufacturer} ${v.model}${v.trim ? ` ${v.trim}` : ''}`;

  return (
    <Link href={`/vehicles/${v.slug}`} className="group block rounded-2xl overflow-hidden bg-slate-800 hover:bg-slate-700 transition-colors">
      {/* Hero image */}
      <div className="relative aspect-[16/9] bg-slate-700">
        {heroSrc ? (
          <Image
            src={heroSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm">No image</div>
        )}
        {v.is_featured && (
          <span className="absolute top-3 left-3 bg-brand-green text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            Featured
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-5">
        <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{v.manufacturer}</p>
        <h3 className="font-bold text-white text-lg leading-tight">
          {v.model}{v.trim ? <span className="font-normal text-slate-300"> {v.trim}</span> : null}
        </h3>
        {v.model_ar && (
          <p className="text-slate-500 text-sm mt-0.5 text-right" dir="rtl">{v.model_ar}</p>
        )}

        {/* Specs chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {v.range_km && (
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{v.range_km} km range</span>
          )}
          {v.battery_kwh && (
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{v.battery_kwh} kWh</span>
          )}
          {v.drivetrain && (
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{v.drivetrain}</span>
          )}
        </div>

        {/* Price + ETA */}
        <div className="flex items-end justify-between mt-4">
          <div>
            <p className="text-xs text-slate-500 mb-0.5">Starting from</p>
            <p className="text-brand-green font-bold text-lg">{formatAed(v.starting_price_aed)}</p>
          </div>
          {v.eta_weeks && (
            <p className="text-xs text-slate-500">{v.eta_weeks}w delivery</p>
          )}
        </div>
      </div>
    </Link>
  );
}
