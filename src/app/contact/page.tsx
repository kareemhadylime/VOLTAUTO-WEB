import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PillEyebrow } from '@/components/ui/Pill';
import { ContactForm } from '@/components/contact/ContactForm';
import { brand } from '@/lib/tokens';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contact · WhatsApp, phone, showroom',
  description:
    'Talk to VoltAuto: WhatsApp +20 111 6200 099, hello@voltauto.biz, or visit our Kattameya Square showroom in Cairo. We reply on WhatsApp under 30 minutes during business hours.',
};

const channels = [
  { eyebrow: 'Fastest · 30 min', title: 'WhatsApp', sub: 'Direct line to a sales engineer.', cta: 'Open chat →', href: buildWhatsAppLink({ phone: brand.whatsapp.egypt }), value: brand.whatsapp.egypt },
  { eyebrow: 'Phone · business hours', title: 'Call', sub: 'Sun–Thu 09:00–19:00 · Sat 11:00–17:00.', cta: 'Tap to dial →', href: 'tel:+201116200099', value: brand.whatsapp.egypt },
  { eyebrow: 'Email · 24h reply', title: 'Email', sub: 'For quotes, fleet, partnerships.', cta: 'Compose →', href: 'mailto:hello@voltauto.biz', value: 'hello@voltauto.biz' },
  { eyebrow: 'Visit · by appointment', title: 'Showroom', sub: 'Test-drive bays available.', cta: 'Book a slot →', href: '#contact-form', value: 'Kattameya Square, Cairo' },
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-brand-border-soft">
        <div className="container-prose py-20">
          <PillEyebrow>Contact · Cairo + Dubai</PillEyebrow>
          <h1 className="mt-5 font-display text-5xl leading-[0.98] tracking-tight text-white sm:text-6xl">
            Talk to us.
          </h1>
          <p className="mt-5 max-w-xl text-base text-brand-text-secondary">
            Pick the channel that fits. We answer WhatsApp fastest — usually under 30
            minutes during business hours.
          </p>
        </div>
      </section>

      <section>
        <div className="container-prose grid gap-3 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="card-base block p-5 transition-colors hover:border-brand-green"
            >
              <div className="font-mono text-[9px] uppercase tracking-eyebrow text-brand-text-dim">
                {c.eyebrow}
              </div>
              <div className="mt-2 font-display text-lg tracking-tight text-white">{c.title}</div>
              <p className="mt-1 text-xs text-brand-text-muted">{c.sub}</p>
              <div className="mt-3 font-mono text-xs text-brand-green">{c.value}</div>
              <div className="mt-3 text-xs text-brand-green">{c.cta}</div>
            </a>
          ))}
        </div>
      </section>

      <section id="contact-form" className="container-prose grid gap-6 pb-20 md:grid-cols-2">
        <div>
          <Eyebrow>Enquiry form</Eyebrow>
          <h2 className="mt-2 font-display text-2xl tracking-tight text-white sm:text-3xl">
            Send us a structured request
          </h2>
          <p className="mt-3 text-sm text-brand-text-muted">
            Pick a topic, tell us what you&apos;re looking at, and we&apos;ll come back with a
            quote, an inspection date, or a fleet conversation invite — whatever fits.
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-dim">
            Submissions land in our CRM inbox; we follow up on WhatsApp within 30 min.
          </p>
        </div>

        <ContactForm />
      </section>

      <section className="border-t border-brand-border-soft">
        <div className="container-prose grid gap-4 py-10 md:grid-cols-2">
          <div className="card-base overflow-hidden">
            <div
              aria-hidden
              className="aspect-[16/9] bg-gradient-to-br from-[#0d1810] to-black"
            />
            <div className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">
                Flagship showroom
              </div>
              <div className="mt-1 text-base font-semibold text-white">{brand.showroom.cairo.name}</div>
              <p className="mt-2 text-xs text-brand-text-secondary">{brand.showroom.cairo.address}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded border border-brand-border-soft p-2">
                  <div className="font-mono text-[9px] uppercase tracking-eyebrow text-brand-text-dim">
                    Sun–Thu
                  </div>
                  <div className="mt-0.5 text-white">{brand.showroom.cairo.hours.sunThu}</div>
                </div>
                <div className="rounded border border-brand-border-soft p-2">
                  <div className="font-mono text-[9px] uppercase tracking-eyebrow text-brand-text-dim">
                    Sat
                  </div>
                  <div className="mt-0.5 text-white">{brand.showroom.cairo.hours.sat}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-base overflow-hidden">
            <div
              aria-hidden
              className="aspect-[16/9] bg-gradient-to-br from-[#0d1810] to-black"
            />
            <div className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">
                UAE branch
              </div>
              <div className="mt-1 text-base font-semibold text-white">{brand.showroom.dubai.name}</div>
              <p className="mt-2 text-xs text-brand-text-secondary">{brand.showroom.dubai.address}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
