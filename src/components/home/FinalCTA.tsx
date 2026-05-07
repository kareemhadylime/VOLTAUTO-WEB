import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { brand } from '@/lib/tokens';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export function FinalCTA() {
  return (
    <section
      className="bg-gradient-to-br from-[#0d1610] to-black"
      aria-label="Get a personalized EV recommendation"
    >
      <div className="container-prose py-24 text-center">
        <Eyebrow>One last thing</Eyebrow>
        <h2 className="mt-4 font-display text-4xl tracking-tight text-white sm:text-5xl">
          Tell us which EV you want.
          <br />
          We'll do the rest.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-brand-text-muted">
          A 30-second message gets you a landed-cost quote in EGP, an ETA based on the
          actual ship schedule from China, and the spec sheet of the closest match if you
          haven't picked yet.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="primary" size="lg" href="/import">
            Open the request form
          </Button>
          <Button variant="secondary" size="lg" href={buildWhatsAppLink({ phone: brand.whatsapp.egypt })}>
            <span className="text-brand-whatsapp">●</span> WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
