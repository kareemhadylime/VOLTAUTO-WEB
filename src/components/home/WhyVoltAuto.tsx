import { Eyebrow } from '@/components/ui/Eyebrow';

const cards = [
  { stat: '25+', title: 'Chinese OEM relationships', body: 'Direct sourcing channels at BYD, NIO, Zeekr, NEVO, Arcfox, Denza, and 19 more.' },
  { stat: '450+', title: 'EVs delivered in 2024', body: 'Each one a real timeline from a Chinese factory to an Egyptian or UAE driveway.' },
  { stat: '2', title: 'Parts warehouses', body: 'Cairo + Jebel Ali Freezone. Batteries, inverters, ECUs — for the China-spec models we deliver.' },
  { stat: '24/7', title: 'Trained service network', body: 'Engineers continuously trained on Chinese-EV diagnostics. 60 kW mobile chargers in our roadside fleet.' },
];

export function WhyVoltAuto() {
  return (
    <section className="border-b border-brand-border-soft">
      <div className="container-prose py-20">
        <Eyebrow>Why VoltAuto</Eyebrow>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
          Egypt's deepest China-EV expertise
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-brand-text-muted">
          Three years of relationships with Chinese manufacturers, sourcing teams on the
          ground, a service network that knows these specific models, and parts in two
          warehouses.
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.title} className="card-base p-5">
              <div className="font-display text-3xl leading-none text-brand-green">{c.stat}</div>
              <div className="mt-2 text-sm font-semibold text-white">{c.title}</div>
              <p className="mt-2 text-xs leading-relaxed text-brand-text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
