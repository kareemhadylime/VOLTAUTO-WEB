import type { Metadata } from 'next';
import { getAllVehicles } from '@/lib/inventory';
import { LeaseCalculator } from '@/components/calculators/LeaseCalculator';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'EV Lease Calculator Egypt | Estimate Monthly Payments',
  description:
    'Estimate the monthly payment for any VoltAuto-imported EV. Adjust downpayment, term, and APR — get a live monthly figure. Pure transparency, no hidden fees.',
};

export default async function CalculatorPage() {
  const all = await getAllVehicles();
  // Only show vehicles we have a public price for; otherwise the math is meaningless.
  const priced = all.filter((v) => v.startingPriceEgp && v.startingPriceEgp > 0);

  return (
    <>
      <section
        className="border-b border-brand-border-soft"
        style={{ background: 'linear-gradient(135deg, #000 0%, #0d1610 100%)' }}
      >
        <div className="container-prose py-16">
          <Eyebrow>Customer calculator</Eyebrow>
          <h1 className="mt-2 font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl">
            What does it actually
            <br />
            <span className="text-brand-green">cost per month?</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-brand-text-secondary">
            Pick the EV, set your downpayment and term, see the monthly payment immediately. We
            partner with Banque Misr, NBE, CIB, and QNB Al Ahli — final terms come from your
            chosen bank&apos;s underwriting.
          </p>
        </div>
      </section>

      <section className="border-b border-brand-border-soft">
        <div className="container-prose py-12">
          {priced.length > 0 ? (
            <LeaseCalculator vehicles={priced} />
          ) : (
            <div className="rounded-xl border border-brand-border-soft bg-black/30 p-8 text-center text-brand-text-secondary">
              No vehicles have a public starting price set yet. Check back shortly — the catalog is
              being populated.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
