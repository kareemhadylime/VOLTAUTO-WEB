import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PillEyebrow } from '@/components/ui/Pill';
import { ImportTimeline } from '@/components/vehicles/ImportTimeline';
import { WhatsIncluded } from '@/components/vehicles/WhatsIncluded';
import { brand } from '@/lib/tokens';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Best EV import prices · door-to-door from China',
  description:
    'One quote, all-in, in EGP. We source from Chinese factories, handle marine + insurance + Jebel Ali transit + Egypt customs (0% duty) + plate registration + PDI + delivery to your door. 8–10 weeks typical.',
};

export default function ImportPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-brand-border-soft">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, #1a4d35 0%, transparent 55%), linear-gradient(180deg, #000 0%, #080d0a 60%, #000 100%)',
          }}
        />
        <div className="container-prose relative grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <PillEyebrow>Import · China → Egypt</PillEyebrow>
            <h1 className="mt-5 font-display text-5xl leading-[0.98] tracking-tight text-white sm:text-6xl">
              Best price.
              <br />
              Best timeline.
              <br />
              <span className="text-brand-green">No surprises.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-brand-text-secondary">
              Tell us the EV you want. We come back with a single all-in landed-cost quote
              in EGP — sourcing, marine, insurance, customs, registration, PDI, delivery.
              No hidden fees, no per-day storage charges, no last-minute &quot;extra duties.&quot;
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="primary" size="lg">
                Get my landed-cost quote →
              </Button>
              <Button variant="secondary" size="lg" href={buildWhatsAppLink({ phone: brand.whatsapp.egypt })}>
                WhatsApp
              </Button>
            </div>
          </div>
          <div
            aria-hidden
            className="card-base hidden aspect-[4/3] items-center justify-center font-mono text-xs text-brand-text-dim md:flex"
          >
            [ photo · row of EVs being driven off a Ro-Ro vessel at port ]
          </div>
        </div>
      </section>

      <div className="container-prose space-y-14 py-16">
        <ImportTimeline />
        <WhatsIncluded />

        <section className="rounded-md border border-brand-border-soft bg-brand-bg-raised p-8">
          <Eyebrow>Customer tracker · while your car ships</Eyebrow>
          <h2 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">
            Watch your EV cross the ocean.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-brand-text-secondary">
            Once your order is confirmed, you get a private tracker link. Real shipping
            milestones, real photos at each handover, real ETA updates. No black-box
            waiting.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-dim">
            Ships in Phase 5. Phase-1 placeholder.
          </p>
        </section>
      </div>
    </>
  );
}
