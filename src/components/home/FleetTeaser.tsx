import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function FleetTeaser() {
  return (
    <section className="border-b border-brand-border-soft bg-[#080808]">
      <div className="container-prose grid gap-10 py-20 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow>Fleet · save EGP 1.2M / car</Eyebrow>
          <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl">
            Run an EV fleet.
            <br />
            Save EGP 1.2M per car over 5 years.
          </h2>
          <p className="mt-3 text-sm text-brand-text-muted">
            Across 400 km/day, our generic EV-vs-ICE TCO model shows energy + maintenance +
            downtime + fuel-fraud risk savings stacking past 1.2M EGP per vehicle. Run your
            own numbers.
          </p>
          <div className="mt-6">
            <Button variant="primary" href="/fleet">
              Open the TCO calculator →
            </Button>
          </div>
        </div>
        <div
          aria-hidden
          className="card-base flex aspect-[16/10] items-center justify-center font-mono text-xs text-brand-text-dim"
        >
          [ stacked-bar chart preview · EV vs ICE 5-yr TCO ]
        </div>
      </div>
    </section>
  );
}
