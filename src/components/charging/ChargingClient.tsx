'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { OcmPoi, CountryCode } from '@/lib/charging';
import { COUNTRY_CONFIG, ocmStats } from '@/lib/charging';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 text-sm">
      Loading map…
    </div>
  ),
});

interface Props {
  egPois: OcmPoi[];
  aePois: OcmPoi[];
}

export function ChargingClient({ egPois, aePois }: Props) {
  const [country, setCountry] = useState<CountryCode>('EG');
  const pois = country === 'EG' ? egPois : aePois;
  const stats = ocmStats(pois);
  const cfg = COUNTRY_CONFIG[country];

  return (
    <div>
      {/* Country tabs */}
      <div className="flex gap-3 mb-8">
        {(['EG', 'AE'] as CountryCode[]).map(cc => (
          <button
            key={cc}
            onClick={() => setCountry(cc)}
            className={[
              'flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors',
              country === cc
                ? 'bg-brand-green text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700',
            ].join(' ')}
          >
            <span>{COUNTRY_CONFIG[cc].flag}</span>
            {COUNTRY_CONFIG[cc].name}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Stations',              value: stats.total       },
          { label: 'Operational',           value: stats.operational },
          { label: 'Fast Chargers (≥50 kW)',value: stats.fast        },
          { label: 'Total Points',          value: stats.points      },
        ].map(s => (
          <div key={s.label} className="bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-brand-green">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Leaflet dark map */}
      <div className="rounded-xl overflow-hidden border border-slate-700">
        <LeafletMap pois={pois} country={country} />
      </div>

      {/* Station list */}
      {pois.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-white mb-4">
            {cfg.flag} {cfg.name} — Charging Stations
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pois.slice(0, 30).map(poi => {
              const fast = poi.Connections?.some(c => (c.PowerKW ?? 0) >= 50);
              return (
                <div key={poi.ID} className="bg-slate-800 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-white leading-snug">{poi.AddressInfo.Title}</p>
                    {fast && (
                      <span className="shrink-0 text-[10px] bg-brand-green/20 text-brand-green px-2 py-0.5 rounded-full">
                        Fast
                      </span>
                    )}
                  </div>
                  {poi.AddressInfo.Town && (
                    <p className="text-xs text-slate-400 mt-1">{poi.AddressInfo.Town}</p>
                  )}
                  {poi.OperatorInfo?.Title && (
                    <p className="text-xs text-slate-500 mt-1">{poi.OperatorInfo.Title}</p>
                  )}
                  {poi.Connections && poi.Connections.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {poi.Connections.slice(0, 3).map((c, i) => (
                        <span key={i} className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">
                          {c.ConnectionType?.Title?.replace('Type ', 'T') ?? '—'}
                          {c.PowerKW ? ` ${c.PowerKW}kW` : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {pois.length > 30 && (
            <p className="text-center text-slate-500 text-sm mt-6">
              Showing 30 of {pois.length} stations. Use the map above to explore all.
            </p>
          )}
        </div>
      )}

      {pois.length === 0 && (
        <p className="text-slate-500 text-sm mt-6 text-center">
          No charging data available right now. Check back soon.
        </p>
      )}
    </div>
  );
}
