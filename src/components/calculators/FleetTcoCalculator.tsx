'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { formatEgp } from '@/lib/format';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { brand } from '@/lib/tokens';

/**
 * Fleet TCO calculator. Pure client-side math; no Supabase.
 * Defaults match Egypt 2026 rates from spec §8.4.
 */

const DEFAULTS = {
  fleetSize: 10,
  dailyKm: 400,
  years: 5,
  evCapex: 1_500_000,
  iceCapex: 1_200_000,
  evKwhPer100Km: 18,
  iceLPer100Km: 6.7,
  acKwhPriceEgp: 3.393,
  dcKwhPriceEgp: 6.552,
  dcSharePct: 20,
  petrolEgpPerL: 25,
  evMaintAnnual: 59_500,
  iceMaintAnnual: 119_000,
  evDowntimeAnnual: 10_000,
  iceDowntimeAnnual: 25_000,
  fuelFraudRate: 0.015,
  evPartsReserveAnnual: 5_000,
  icePartsReserveAnnual: 30_000,
};

export function FleetTcoCalculator() {
  const [fleetSize, setFleetSize] = useState(DEFAULTS.fleetSize);
  const [dailyKm, setDailyKm] = useState(DEFAULTS.dailyKm);
  const [years, setYears] = useState(DEFAULTS.years);
  const [evCapex, setEvCapex] = useState(DEFAULTS.evCapex);
  const [iceCapex, setIceCapex] = useState(DEFAULTS.iceCapex);
  const [petrol, setPetrol] = useState(DEFAULTS.petrolEgpPerL);

  const calc = useMemo(() => {
    const annualKm = dailyKm * 365;
    const blendedKwhPrice =
      DEFAULTS.acKwhPriceEgp * (1 - DEFAULTS.dcSharePct / 100) +
      DEFAULTS.dcKwhPriceEgp * (DEFAULTS.dcSharePct / 100);

    const evEnergy = (DEFAULTS.evKwhPer100Km / 100) * annualKm * blendedKwhPrice;
    const iceFuel = (DEFAULTS.iceLPer100Km / 100) * annualKm * petrol;
    const iceFuelFraud = iceFuel * DEFAULTS.fuelFraudRate;

    const evAnnual =
      evEnergy + DEFAULTS.evMaintAnnual + DEFAULTS.evDowntimeAnnual + DEFAULTS.evPartsReserveAnnual;
    const iceAnnual =
      iceFuel +
      iceFuelFraud +
      DEFAULTS.iceMaintAnnual +
      DEFAULTS.iceDowntimeAnnual +
      DEFAULTS.icePartsReserveAnnual;

    const evTcoPerVehicle = evCapex + years * evAnnual;
    const iceTcoPerVehicle = iceCapex + years * iceAnnual;
    const savingsPerVehicle = iceTcoPerVehicle - evTcoPerVehicle;
    const fleetSavings = savingsPerVehicle * fleetSize;
    const energySavings = (iceFuel + iceFuelFraud - evEnergy) * years;
    const maintSavings = (DEFAULTS.iceMaintAnnual - DEFAULTS.evMaintAnnual) * years;
    const downtimeSavings = (DEFAULTS.iceDowntimeAnnual - DEFAULTS.evDowntimeAnnual) * years;
    const riskSavings =
      (iceFuelFraud + DEFAULTS.icePartsReserveAnnual - DEFAULTS.evPartsReserveAnnual) * years;

    return {
      evTcoPerVehicle: Math.round(evTcoPerVehicle),
      iceTcoPerVehicle: Math.round(iceTcoPerVehicle),
      savingsPerVehicle: Math.round(savingsPerVehicle),
      fleetSavings: Math.round(fleetSavings),
      annualKm,
      energySavings: Math.round(energySavings),
      maintSavings: Math.round(maintSavings),
      downtimeSavings: Math.round(downtimeSavings),
      riskSavings: Math.round(riskSavings),
    };
  }, [fleetSize, dailyKm, years, evCapex, iceCapex, petrol]);

  const evShareOfIce = Math.max(
    0,
    Math.min(100, (calc.evTcoPerVehicle / calc.iceTcoPerVehicle) * 100),
  );

  const whatsappText = `Hi VoltAuto, I want to talk to your fleet team. My fleet: ${fleetSize} vehicles · ${dailyKm} km/day · ${years}-yr horizon. Calculator: EV TCO ${formatEgp(calc.evTcoPerVehicle)}/vehicle, ICE ${formatEgp(calc.iceTcoPerVehicle)}/vehicle, total fleet savings ${formatEgp(calc.fleetSavings)}.`;

  return (
    <div className="rounded-xl border border-brand-border-soft bg-black/30 p-6">
      <Eyebrow>Fleet · 5-year TCO calculator</Eyebrow>
      <h2 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">
        EV vs ICE — your fleet, your numbers
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-5">
          <Slider label="Fleet size" value={fleetSize} min={1} max={100} step={1} onChange={setFleetSize} display={`${fleetSize} vehicles`} />
          <Slider label="Daily km per vehicle" value={dailyKm} min={50} max={1000} step={10} onChange={setDailyKm} display={`${dailyKm} km/day · ${(dailyKm * 365).toLocaleString('en-US')} km/year`} />
          <Slider label="Time horizon" value={years} min={3} max={7} step={1} onChange={setYears} display={`${years} years`} />
          <Slider label="EV CAPEX per vehicle" value={evCapex} min={800_000} max={5_000_000} step={50_000} onChange={setEvCapex} display={formatEgp(evCapex)} />
          <Slider label="ICE CAPEX per vehicle" value={iceCapex} min={600_000} max={3_000_000} step={50_000} onChange={setIceCapex} display={formatEgp(iceCapex)} />
          <Slider label="Petrol price" value={petrol} min={15} max={45} step={0.5} onChange={setPetrol} display={`${petrol.toFixed(1)} EGP / L`} />
        </div>

        <div className="grid gap-3 rounded-lg border border-brand-green/40 bg-brand-green/[0.04] p-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
              {years}-year fleet savings (EV vs ICE)
            </div>
            <div className="mt-1 font-display text-3xl text-brand-green sm:text-4xl">
              {formatEgp(calc.fleetSavings)}
            </div>
            <div className="mt-1 text-xs text-brand-text-dim">
              {formatEgp(calc.savingsPerVehicle)} per vehicle · {fleetSize} vehicles
            </div>
          </div>
          <hr className="border-brand-border-soft" />
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
              5-year TCO comparison
            </div>
            <Bar label="ICE" value={1} color="#dc2626" formatted={formatEgp(calc.iceTcoPerVehicle)} />
            <Bar label="EV" value={evShareOfIce / 100} color="#22c55e" formatted={formatEgp(calc.evTcoPerVehicle)} />
          </div>
          <hr className="border-brand-border-soft" />
          <div className="grid gap-1.5 text-xs">
            <Chip label="Energy savings" value={formatEgp(calc.energySavings)} />
            <Chip label="Maintenance savings" value={formatEgp(calc.maintSavings)} />
            <Chip label="Downtime savings" value={formatEgp(calc.downtimeSavings)} />
            <Chip label="Risk eliminated (fuel fraud + parts)" value={formatEgp(calc.riskSavings)} />
          </div>
          <div className="mt-2 grid gap-2">
            <Button variant="primary" size="md" href={buildWhatsAppLink({ phone: brand.whatsapp.egypt, message: whatsappText })}>
              Talk to the fleet team →
            </Button>
            <Button variant="secondary" size="sm" href="/contact">
              Email me this report
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-brand-text-dim">
        Defaults: EV 18 kWh/100km · ICE 6.7 L/100km · AC 3.39 EGP/kWh · DC 6.55 EGP/kWh · 80/20 AC/DC blend · ICE maint 119K/yr · EV maint 59.5K/yr · ICE downtime 25K/yr · EV downtime 10K/yr · fuel fraud 1.5% · parts reserve 30K ICE / 5K EV. Adjust for your real utilization; the fleet team will tighten with your actual data.
      </p>
    </div>
  );
}

function Slider({
  label, value, min, max, step, onChange, display,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (n: number) => void; display: string;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
        {label} · {display}
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-green"
      />
    </label>
  );
}

function Bar({
  label, value, color, formatted,
}: {
  label: string; value: number; color: string; formatted: string;
}) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <span className="w-8 font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
        {label}
      </span>
      <div className="relative flex-1 overflow-hidden rounded bg-brand-border-soft">
        <div className="h-5 rounded transition-all" style={{ width: `${Math.max(8, value * 100)}%`, background: color }} />
      </div>
      <span className="font-mono text-xs text-white">{formatted}</span>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-brand-text-secondary">{label}</span>
      <span className="font-mono text-brand-green">+{value}</span>
    </div>
  );
}
