import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Data Deletion Request | VoltAuto',
  description: 'Request deletion of your personal data held by VoltAuto.',
  robots: { index: false },
};

export default function DataDeletionPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-4">
          Your rights
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Data Deletion Request
        </h1>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto">
          You have the right to request deletion of your personal data held by VoltAuto. We will process your request within <strong className="text-white">30 days</strong> and confirm by email.
        </p>

        {/* What gets deleted */}
        <div className="rounded-2xl bg-slate-800 p-6 text-left mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">What data we hold</h2>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex gap-3">
              <span className="text-brand-green mt-0.5">✓</span>
              <span><strong className="text-white">Contact enquiries</strong> — name, email, phone, message sent via the website or WhatsApp.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-green mt-0.5">✓</span>
              <span><strong className="text-white">Lead records</strong> — vehicle interest, quote requests stored in our CRM.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-slate-500 mt-0.5">—</span>
              <span><strong className="text-white">Analytics data</strong> — anonymised and held by Google / Meta / TikTok under their own policies. We cannot delete data held directly by these platforms.</span>
            </li>
          </ul>
        </div>

        {/* How to request */}
        <div className="rounded-2xl bg-slate-800 p-6 text-left mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">How to request deletion</h2>
          <p className="text-slate-300 text-sm mb-4">
            Send an email to <a href="mailto:info@voltauto.biz?subject=Data%20Deletion%20Request&body=Please%20delete%20all%20personal%20data%20held%20for%20this%20email%20address." className="text-brand-green hover:underline font-medium">info@voltauto.biz</a> with subject line <em>&quot;Data Deletion Request&quot;</em> and include:
          </p>
          <ul className="space-y-1 text-slate-300 text-sm list-disc pl-5">
            <li>Your full name</li>
            <li>The email address or phone number you used to contact us</li>
          </ul>
          <p className="text-slate-400 text-xs mt-4">We may ask for proof of identity before processing the request.</p>
        </div>

        {/* Quick email button */}
        <a
          href="mailto:info@voltauto.biz?subject=Data%20Deletion%20Request&body=Please%20delete%20all%20personal%20data%20held%20for%20this%20email%20address.%0A%0AName%3A%20%0APhone%20used%3A%20"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-green text-slate-950 font-semibold text-sm hover:opacity-90 transition-opacity mb-6"
        >
          Send deletion request by email
        </a>

        <p className="text-slate-600 text-xs mt-4">
          For more information see our <Link href="/privacy" className="underline hover:text-slate-400">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}
