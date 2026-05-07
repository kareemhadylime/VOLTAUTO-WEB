import { Eyebrow } from '@/components/ui/Eyebrow';

const partners = ['Etisalat', 'Vodafone', 'Banque Misr', 'NBE'];

export function PartnersStrip() {
  return (
    <section className="border-b border-brand-border-soft">
      <div className="container-prose py-12">
        <div className="text-center">
          <Eyebrow>Trusted by</Eyebrow>
        </div>
        <div className="mt-6 grid grid-cols-2 items-center gap-6 text-center sm:grid-cols-4">
          {partners.map((p) => (
            <div key={p} className="font-display text-base text-brand-text-dim grayscale">
              {p}
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[10px] font-mono uppercase tracking-eyebrow text-brand-text-dim">
          Logos used with written permission
        </p>
      </div>
    </section>
  );
}
