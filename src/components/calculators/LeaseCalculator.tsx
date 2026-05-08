'use client';

import { useMemo, useState } from 'react';
import type { Vehicle } from '@/types/vehicle';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { formatEgp } from '@/lib/format';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { brand } from '@/lib/tokens';

/**
 * Lease / finance calculator. Pure client-side standard amortization math.
 * Never reads cost basis (FOB / shipping) — only the manual `startingPriceEgp`
 * field that public_inventory exposes. The vehicle dropdown is hydrated by the
 * parent server component so this stays a tiny client island.
 */

interface Props {
  vehicles: Vehicle[];
}

export function LeaseCalculator({ vehicles }: Props) {
  const [slug, setSlug] = useState(vehicles[0]?.slug ?? '');
  const v = vehicles.find((x) => x.slug === slug) ?? vehicles[0];

  const [pct, setPct] = useState(20); // downpayment %
  const [months, setMonths] = useState(60);
  const [apr, setApr] = useState(18); // CBE benchmark default

  const result = useMemo(() => {
    if (!v || !v.startingPriceEgp) return null;
    const principal = v.startingPriceEgp * (1 - pct / 100);
    const r = apr / 100 / 12;
    const n = months;
    const monthly =
      r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
    const total = monthly * n + v.startingPriceEgp * (pct / 100);
    const interest = monthly * n - principal;
    return {
      principal,
      monthly: Math.round(monthly),
      total: Math.round(total),
      interest: Math.round(interest),
      downpayment: Math.round(v.startingPriceEgp * (pct / 100)),
    };
  }, [v, pct, months, apr]);

  if (!v) return null;

  const whatsappText = result
    ? `Hi VoltAuto, I want to lease the ${v.brand} ${v.model} ${v.trim ?? ''} — downpayment ${formatEgp(result.downpayment)}, ${months} months at ${apr}% APR ≈ ${formatEgp(result.monthly)}/month. Can you confirm + send a formal quote?`
    : '';

  return (
    <div className="rounded-xl border border-brand-border-soft bg-black/30 p-6">
      <Eyebrow>Lease / finance calculator</Eyebrow>
      <h2 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">
        What does it actually cost per month?
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-5">
          <Field label={`Vehicle · ${formatEgp(v.startingPriceEgp)}`}>
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-md border border-brand-border-soft bg-black px-3 py-2 text-sm text-white"
            >
              {vehicles.map((opt) => (
                <option key={opt.slug} value={opt.slug}>
                  {opt.brand} {opt.model} {opt.trim ?? ''} —{' '}
                  {opt.startingPriceEgp ? formatEgp(opt.startingPriceEgp) : 'price on request'}
                </option>
              ))}
            </select>
          </Field>

          <Slider
            label="Downpayment"
            value={pct}
            min={0}
            max={50}
            step={1}
            onChange={setPct}
            display={`${pct}% · ${result ? formatEgp(result.downpayment) : '—'}`}
          />
          <Slider
            label="Term"
            value={months}
            min={12}
            max={84}
            step={6}
            onChange={setMonths}
            display={`${months} months · ${(months / 12).toFixed(1)} yr`}
          />
          <Slider
            label="APR (annual interest)"
            value={apr}
            min={10}
            max={26}
            step={0.5}
            onChange={setApr}
            display={`${apr.toFixed(1)}%`}
          />
          <p className="font-mono text-[10px] tracking-eyebrow text-brand-text-muted">
            Default APR = 18% (CBE benchmark · adjust if your bank quoted a different rate)
          </p>
        </div>

        <div className="grid gap-3 rounded-lg border border-brand-green/40 bg-brand-green/[0.04] p-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
              Estimated monthly
            </div>
            <div className="mt-1 font-display text-4xl text-brand-green">
              {result ? formatEgp(result.monthly) : '—'}
            </div>
            <div className="mt-1 text-xs text-brand-text-dim">/ month for {months} months</div>
          </div>
          <hr className="border-brand-border-soft" />
          <Stat label="Down payment" value={result ? formatEgp(result.downpayment) : '—'} />
          <Stat label="Amount financed" value={result ? formatEgp(result.principal) : '—'} />
          <Stat label="Total interest" value={result ? formatEgp(result.interest) : '—'} />
          <Stat
            label="Total cost (incl. down payment)"
            value={result ? formatEgp(result.total) : '—'}
            emphasis
          />
          <div className="mt-2 grid gap-2">
            <Button
              variant="primary"
              size="md"
              href={buildWhatsAppLink({ phone: brand.whatsapp.egypt, message: whatsappText })}
            >
              Send this quote on WhatsApp →
            </Button>
            <Button variant="secondary" size="sm" href={`/vehicles/${v.slug}`}>
              See full {v.brand} {v.model} spec →
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-brand-text-dim">
        Estimate only · final lease terms depend on the financing partner&apos;s underwriting.
        Banque Misr · NBE · CIB · QNB Al Ahli. Insurance and registration not included.
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
        {label}
      </div>
      {children}
    </label>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  display: string;
}) {
  return (
    <Field label={`${label} · ${display}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-green"
      />
    </Field>
  );
}

function Stat({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between text-sm">
      <span className="text-brand-text-secondary">{label}</span>
      <span
        className={`font-mono ${emphasis ? 'text-base font-semibold text-white' : 'text-brand-text-secondary'}`}
      >
        {value}
      </span>
    </div>
  );
}
