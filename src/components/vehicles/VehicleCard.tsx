import Link from 'next/link';
import type { Vehicle } from '@/types/vehicle';
import { Button } from '@/components/ui/Button';
import { formatEgp, formatKm } from '@/lib/format';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { brand } from '@/lib/tokens';

export function VehicleCard({ vehicle, featured = false }: { vehicle: Vehicle; featured?: boolean }) {
  return (
    <article className="card-base flex flex-col overflow-hidden">
      <Link
        href={`/vehicles/${vehicle.slug}`}
        aria-label={`${vehicle.brand} ${vehicle.model}`}
        className="relative block aspect-[16/10] bg-gradient-to-br from-[#1a2a1a] to-[#0a1510]"
      >
        {featured && vehicle.featuredWeek && (
          <span className="absolute left-3 top-3 rounded bg-brand-green px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-eyebrow text-black">
            Featured · Week {vehicle.featuredWeek}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">
              {vehicle.brand}
            </div>
            <Link
              href={`/vehicles/${vehicle.slug}`}
              className="mt-1 block font-display text-xl tracking-tight text-white hover:underline"
            >
              {vehicle.model} {vehicle.trim ?? ''}
            </Link>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-dim">
              From
            </div>
            <div className="font-display text-xl text-brand-green">
              {formatEgp(vehicle.startingPriceEgp, { compact: true })}
            </div>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 border-t border-brand-border-soft pt-3 font-mono text-[11px] text-brand-text-muted">
          <li>
            <strong className="text-white">{formatKm(vehicle.rangeKm)}</strong> {vehicle.rangeStandard}
          </li>
          <li>
            <strong className="text-white">{vehicle.dcChargeKw} kW</strong> DC
          </li>
          <li>
            <strong className="text-white uppercase">{vehicle.drivetrain}</strong>
          </li>
          <li>
            <strong className="text-white">~{vehicle.etaWeeks} wks</strong> ETA
          </li>
        </ul>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            href={buildWhatsAppLink({ phone: brand.whatsapp.egypt, vehicleSlug: vehicle.slug })}
          >
            Request this spec →
          </Button>
          <Button variant="secondary" size="sm" href={`/vehicles/${vehicle.slug}`}>
            Specs
          </Button>
        </div>
      </div>
    </article>
  );
}
