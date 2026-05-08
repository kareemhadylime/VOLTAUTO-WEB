import type { Metadata } from 'next';
import { fetchOcmPois } from '@/lib/charging';
import { ChargingClient } from '@/components/charging/ChargingClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const revalidate = 3600; // 1 hour — OCM data doesn't change fast

export const metadata: Metadata = {
  title: 'EV Charging Map | VoltAuto',
  description: 'Find EV charging stations across Egypt and UAE. Live data from Open Charge Map — fast chargers, connectors, and operators.',
  openGraph: {
    title: 'EV Charging Map | VoltAuto',
    description: 'Find EV charging stations across Egypt and UAE.',
  },
};

export default async function ChargingPage() {
  const [egPois, aePois] = await Promise.all([
    fetchOcmPois('EG'),
    fetchOcmPois('AE'),
  ]);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'EV Charging Stations — Egypt & UAE',
    description: 'Interactive map of EV charging stations in Egypt and UAE powered by Open Charge Map.',
  };

  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-2">
              Infrastructure
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">EV Charging Map</h1>
            <p className="mt-2 text-slate-400 max-w-xl">
              Live charging station data for Egypt and UAE — locations, connectors, operators, and fast-charge availability.
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Powered by{' '}
              <a href="https://openchargemap.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400">
                Open Charge Map
              </a>
              . Data refreshes hourly.
            </p>
          </div>

          <ChargingClient egPois={egPois} aePois={aePois} />
        </div>
      </main>
    </>
  );
}
