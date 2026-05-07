import { Eyebrow } from '@/components/ui/Eyebrow';

const items = [
  'Vehicle & spec at Chinese factory',
  'Pre-purchase inspection in China',
  'Marine freight & insurance',
  'Egypt customs (0% duty · VAT only)',
  'Plate registration & paperwork',
  'Pre-Delivery Inspection (PDI)',
  'Delivery to your address',
  '12-month warranty + 1st service',
];

export function WhatsIncluded() {
  return (
    <section>
      <Eyebrow>What&apos;s included in your import</Eyebrow>
      <h3 className="mt-2 font-display text-xl tracking-tight text-white">
        Eight line items. Not seven, not nine.
      </h3>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {items.map((label) => (
          <li
            key={label}
            className="flex items-center justify-between rounded border border-brand-border-soft bg-black px-3.5 py-3 text-sm text-white"
          >
            <span>{label}</span>
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">
              included
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded border border-brand-green/20 bg-brand-green/[0.06] px-4 py-3 text-xs text-brand-text-secondary">
        <strong className="text-brand-green">Optional add-ons:</strong> home charger
        install · ceramic coat · extended warranty · finance arrangement.
      </p>
    </section>
  );
}
