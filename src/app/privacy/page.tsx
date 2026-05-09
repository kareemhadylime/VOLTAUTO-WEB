import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | VoltAuto',
  description: 'How VoltAuto collects, uses, and protects your personal data.',
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl prose prose-invert prose-slate">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: May 2026</p>

        <Section title="1. Who we are">
          <p>VoltAuto (operated by Voltauto Car Trading) is an Egyptian electric-vehicle import specialist. Our website is <strong>voltauto.biz</strong>. For privacy questions contact us at <a href="mailto:info@voltauto.biz" className="text-brand-green hover:underline">info@voltauto.biz</a> or via <Link href="/contact" className="text-brand-green hover:underline">our contact page</Link>.</p>
        </Section>

        <Section title="2. Data we collect">
          <ul className="text-slate-300 space-y-1 list-disc pl-5">
            <li><strong>Contact enquiries</strong> — name, phone, email, message when you submit the contact form or WhatsApp us.</li>
            <li><strong>Analytics</strong> — page views, session duration, device type via Google Analytics 4 (GA4) using Consent Mode v2. No analytics data is collected until you click "Accept all".</li>
            <li><strong>Ad performance</strong> — Meta Pixel and TikTok Pixel events (ViewContent, Contact, Lead) if you accept all cookies. Used to measure ad campaign effectiveness.</li>
            <li><strong>Technical logs</strong> — standard server logs (IP address, browser, referrer) retained for 30 days for security.</li>
          </ul>
        </Section>

        <Section title="3. Legal basis (GDPR)">
          <ul className="text-slate-300 space-y-1 list-disc pl-5">
            <li><strong>Consent</strong> — analytics and marketing cookies (you can withdraw via the cookie banner at any time).</li>
            <li><strong>Legitimate interest</strong> — security logs, fraud prevention.</li>
            <li><strong>Contract</strong> — processing your vehicle enquiry.</li>
          </ul>
        </Section>

        <Section title="4. Cookies">
          <p>We use a cookie consent banner. "Essential only" loads no third-party tracking. "Accept all" enables GA4, Meta Pixel, and TikTok Pixel. You can change your preference at any time by clearing your browser&apos;s localStorage for voltauto.biz.</p>
        </Section>

        <Section title="5. Third-party processors">
          <ul className="text-slate-300 space-y-1 list-disc pl-5">
            <li>Google Analytics 4 — <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">Google Privacy Policy</a></li>
            <li>Meta (Facebook) Pixel — <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">Meta Privacy Policy</a></li>
            <li>TikTok Pixel — <a href="https://www.tiktok.com/legal/page/eea/privacy-policy/en" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">TikTok Privacy Policy</a></li>
            <li>Vercel (hosting) — servers in EU West region.</li>
            <li>Supabase (database) — servers in EU West region.</li>
          </ul>
        </Section>

        <Section title="6. Data retention">
          <p>Enquiry data is retained for 2 years or until you request deletion. Analytics data follows Google&apos;s/Meta&apos;s retention settings (default 14 months for GA4).</p>
        </Section>

        <Section title="7. Your rights">
          <p>You have the right to access, correct, delete, or port your personal data. To exercise these rights, email <a href="mailto:info@voltauto.biz" className="text-brand-green hover:underline">info@voltauto.biz</a> or use our <Link href="/data-deletion" className="text-brand-green hover:underline">data deletion request page</Link>. We will respond within 30 days.</p>
        </Section>

        <Section title="8. Changes">
          <p>We may update this policy. The "Last updated" date at the top reflects the most recent version.</p>
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
