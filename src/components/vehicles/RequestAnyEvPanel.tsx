import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function RequestAnyEvPanel() {
  return (
    <section
      className="border-b border-brand-border-soft"
      style={{ background: 'linear-gradient(135deg, rgba(114,171,68,0.08) 0%, rgba(0,0,0,0.4) 60%)' }}
    >
      <div className="container-prose grid gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <Eyebrow>Don&apos;t see your model?</Eyebrow>
          <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl">
            Request any EV.
            <br />
            From any China factory.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-brand-text-secondary">
            If it&apos;s made in China, we can probably source it. Tell us make, model, trim,
            color, and timeline — we come back with sourcing options, total landed cost
            in EGP/AED, and ETA.
          </p>
        </div>
        <form className="card-base p-5" action="/import">
          <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
            Quick request · we reply ≤ 24h
          </div>
          <div className="mt-3 space-y-2">
            <input
              className="w-full rounded border border-brand-border bg-black px-3 py-2 text-sm text-white placeholder:text-brand-text-dim"
              placeholder="Make & model · e.g. Tesla Model Y"
            />
            <input
              className="w-full rounded border border-brand-border bg-black px-3 py-2 text-sm text-white placeholder:text-brand-text-dim"
              placeholder="Trim / battery preference"
            />
            <input
              className="w-full rounded border border-brand-border bg-black px-3 py-2 text-sm text-white placeholder:text-brand-text-dim"
              placeholder="Your name · WhatsApp"
            />
          </div>
          <Button variant="primary" size="md" className="mt-4 w-full">
            Send request →
          </Button>
        </form>
      </div>
    </section>
  );
}
