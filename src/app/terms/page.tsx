import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | VoltAuto',
  description: 'Terms and conditions for using VoltAuto services.',
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-2">Terms &amp; Conditions</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: May 2026</p>

        <Section title="1. Agreement">
          <p>By using voltauto.biz or contacting VoltAuto (Voltauto Car Trading), you agree to these terms. If you do not agree, please do not use our services.</p>
        </Section>

        <Section title="2. Services">
          <p>VoltAuto provides electric vehicle import services to Egypt and the UAE including sourcing, shipping, customs clearance, registration assistance, and after-sales support. We act as an importer/agent — we are not a manufacturer or authorised dealer of any vehicle brand.</p>
        </Section>

        <Section title="3. Pricing">
          <ul className="text-slate-300 space-y-1 list-disc pl-5">
            <li>All prices shown on the website are indicative and subject to change based on exchange rates, customs duties, and supplier pricing.</li>
            <li>A formal binding quote is provided only after a written order confirmation.</li>
            <li>Prices are in Egyptian Pounds (EGP) unless otherwise stated. AED prices on the UAE section are indicative.</li>
            <li>VoltAuto is not responsible for price changes after order confirmation.</li>
          </ul>
        </Section>

        <Section title="4. Vehicle specifications">
          <p>Specifications (range, power, dimensions) are sourced from manufacturers and are subject to change. Real-world range varies with driving conditions, climate, and usage. VoltAuto does not guarantee specifications match any specific market standard.</p>
        </Section>

        <Section title="5. Orders and payments">
          <ul className="text-slate-300 space-y-1 list-disc pl-5">
            <li>All orders require a written agreement and deposit.</li>
            <li>Delivery timelines (ETA weeks shown on the site) are estimates. VoltAuto is not liable for delays caused by shipping, customs, or force majeure.</li>
            <li>Deposits are non-refundable once the vehicle is ordered from the manufacturer unless VoltAuto is unable to deliver.</li>
          </ul>
        </Section>

        <Section title="6. Website use">
          <p>The website and its content are for informational purposes. You may not copy, scrape, or redistribute content without written permission. The calculators (lease, fleet TCO) provide estimates only and do not constitute financial advice.</p>
        </Section>

        <Section title="7. Limitation of liability">
          <p>VoltAuto is not liable for indirect or consequential losses arising from use of the website or our services beyond the value of the specific transaction in question.</p>
        </Section>

        <Section title="8. Governing law">
          <p>These terms are governed by the laws of the Arab Republic of Egypt. Disputes shall be subject to the jurisdiction of Egyptian courts.</p>
        </Section>

        <Section title="9. Contact">
          <p>Questions? <Link href="/contact" className="text-brand-green hover:underline">Contact us</Link> or email <a href="mailto:info@voltauto.biz" className="text-brand-green hover:underline">info@voltauto.biz</a>.</p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="text-slate-300 leading-relaxed">{children}</div>
    </section>
  );
}
