import { Eyebrow } from '@/components/ui/Eyebrow';

const stubs = [
  { eyebrow: 'EV adoption · 4 min', title: "Why Egypt's grid is ready for mass EV adoption", body: 'Solar growth + chronic fuel shortages + 0% customs = the perfect storm.' },
  { eyebrow: 'Ownership · 6 min', title: 'Charging at home in a Cairo apartment', body: 'What to ask the building manager, and what we install.' },
  { eyebrow: 'Fleet · 8 min', title: "Switching a 50-vehicle fleet to EV: a CFO's playbook", body: 'From utilization analysis to charging-depot rollout.' },
];

export function BlogTeaser() {
  return (
    <section className="border-b border-brand-border-soft">
      <div className="container-prose py-20">
        <Eyebrow>From the journal</Eyebrow>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stubs.map((p) => (
            <article key={p.title} className="card-base p-5">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">
                {p.eyebrow}
              </div>
              <h3 className="mt-2 text-base font-semibold leading-tight text-white">{p.title}</h3>
              <p className="mt-2 text-xs text-brand-text-muted">{p.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-center text-[10px] font-mono uppercase tracking-eyebrow text-brand-text-dim">
          Phase 1 stubs — full Sanity-driven blog ships in Phase 3
        </p>
      </div>
    </section>
  );
}
