import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';

const cards = [
  { eyebrow: 'Service center', title: 'Diagnostics · spare parts · warranty', sub: 'Latest equipment · book online →', href: '/service' },
  { eyebrow: 'Charging', title: 'Home install · public locator', sub: 'Survey to setup, with training →', href: '/charging' },
  { eyebrow: 'Gallery', title: 'Customer deliveries · ad creative', sub: 'See the showroom + service center →', href: '/gallery' },
];

export function ServiceChargingGalleryBand() {
  return (
    <section className="border-b border-brand-border-soft">
      <div className="container-prose py-20">
        <Eyebrow>After delivery · long-haul commitment</Eyebrow>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.eyebrow} href={c.href} className="card-base block p-6 transition-colors hover:border-brand-green">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">{c.eyebrow}</div>
              <div className="mt-2 text-base font-semibold text-white">{c.title}</div>
              <div className="mt-2 text-xs text-brand-text-dim">{c.sub}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
