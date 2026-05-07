import { Button } from '@/components/ui/Button';
import { PillEyebrow } from '@/components/ui/Pill';
import { brand } from '@/lib/tokens';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const stats = [
  { value: '450+', label: 'EVs delivered · 2024' },
  { value: '25+', label: 'Chinese OEM partners' },
  { value: '0%', label: 'Customs duty in Egypt' },
  { value: '8–10', label: 'Weeks · door to door' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-brand-border-soft">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 75% 30%, #1a4d35 0%, transparent 55%), linear-gradient(180deg, #000 0%, #080d0a 60%, #000 100%)',
        }}
      />
      <div className="container-prose relative grid gap-10 py-20 md:grid-cols-2 md:py-28 lg:py-32">
        <div>
          <PillEyebrow tone="green" className="mb-6">
            Egypt's China-EV specialist · Since 2022
          </PillEyebrow>
          <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            China's<br />
            best EVs.<br />
            <span className="text-brand-green">Egypt's door.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-brand-text-secondary">
            We import directly from Chinese manufacturers — BYD, NEVO, Denza, Arcfox, plus
            China-built BMW, Mercedes, Honda and dozens more. Sourcing, inspection, ocean
            freight, Egypt customs, registration, delivery. One quote, one timeline, one
            team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" href="/import">
              Request your EV →
            </Button>
            <Button variant="secondary" size="lg" href={buildWhatsAppLink({ phone: brand.whatsapp.egypt })}>
              <span className="text-brand-whatsapp">●</span> Chat on WhatsApp
            </Button>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-brand-border-soft pt-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl text-brand-green">{s.value}</dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-dim">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div
          aria-hidden
          className="hidden rounded-md border border-brand-border-soft bg-brand-bg-raised md:block"
        >
          <div className="flex aspect-[4/3] items-center justify-center font-mono text-xs text-brand-text-dim">
            [ hero photo · BYD Song L at Shanghai port at dusk ]
          </div>
        </div>
      </div>
    </section>
  );
}
