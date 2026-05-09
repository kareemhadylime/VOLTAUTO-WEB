import type { Metadata } from 'next';
import Link from 'next/link';
import { FleetTcoCalculator } from '@/components/calculators/FleetTcoCalculator';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { brand } from '@/lib/tokens';

export const metadata: Metadata = {
  title: 'EV Fleet Calculator Egypt | 5-Year TCO vs Petrol',
  description:
    'Run the numbers on switching your Egyptian fleet to EVs. Adjust fleet size, daily km, CAPEX, and petrol price — see 5-year savings live. Backed by Egypt 2026 fuel and maintenance benchmarks.',
};

export default function FleetPage() {
  return (
    <>
      <section
        className="border-b border-brand-border-soft"
        style={{ background: 'linear-gradient(135deg, #000 0%, #0d1610 100%)' }}
      >
        <div className="container-prose py-20">
          <Eyebrow>Fleet · B2B</Eyebrow>
          <h1 className="mt-2 font-display text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl">
            Run an EV fleet.
            <br />
            <span className="text-brand-green">Save EGP 1.2M</span> per car.
            <br />
            Five years.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-brand-text-secondary">
            EVs flip the running-cost math for any fleet doing more than ~250 km/day. Energy is one
            sixth the cost of petrol, scheduled maintenance halves, and the fuel-fraud line item
            simply disappears. Here are the numbers.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Energy" value="−57%" sub="fuel → kWh" />
            <Stat label="Maintenance" value="−50%" sub="fewer parts" />
            <Stat label="Downtime" value="−60%" sub="hours/year" />
            <Stat label="Fuel fraud" value="0" sub="eliminated" />
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border-soft">
        <div className="container-prose py-12">
          <FleetTcoCalculator />
        </div>
      </section>

      <section className="border-b border-brand-border-soft">
        <div className="container-prose py-16">
          <Eyebrow>Methodology</Eyebrow>
          <h2 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">
            How we run a fleet transition
          </h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-2">
            <Step
              n={1}
              title="Utilization audit"
              body="Two-week telemetry review on your existing fleet — daily km, idle hours, dwell points, peak charging windows. Decides which routes go EV-first."
            />
            <Step
              n={2}
              title="Vehicle + charger spec"
              body="EV models matched to route profile + battery sizing. Depot AC chargers + on-route DC plan. We size for headroom, not just averages."
            />
            <Step
              n={3}
              title="Phased rollout"
              body="20% pilot → 60% scale → 100% transition over 12–18 months. Mixed fleet during transition; ICE retires as leases expire."
            />
            <Step
              n={4}
              title="Fleet service tier"
              body="Priority service queue · 24/7 roadside · same-day spare parts (Cairo) · monthly utilization report. SLA-backed."
            />
          </ol>
          <div className="mt-10 grid gap-3 sm:flex">
            <Button
              variant="primary"
              size="lg"
              href={buildWhatsAppLink({
                phone: brand.whatsapp.egypt,
                message:
                  'Hi VoltAuto — I want to talk to the fleet team about an EV transition for our company.',
              })}
            >
              Talk to the fleet team →
            </Button>
            <Button variant="secondary" size="lg" href="/contact">
              Email enquiry
            </Button>
            <Link href="/vehicles" className="self-center text-sm text-brand-text-secondary hover:text-white">
              See current fleet-suitable models →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border border-brand-border-soft p-3">
      <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl text-brand-green">{value}</div>
      <div className="text-[10px] text-brand-text-dim">{sub}</div>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="rounded-xl border border-brand-border-soft bg-black/30 p-5">
      <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
        Step {n}
      </div>
      <h3 className="mt-1 font-display text-xl text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">{body}</p>
    </li>
  );
}
