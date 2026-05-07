'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { contactSchema, TOPICS, type ContactFormValues } from '@/lib/schemas/contact';
import { Button } from '@/components/ui/Button';
import { submitContact, type SubmitContactError } from '@/app/contact/actions';
import { brand } from '@/lib/tokens';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const topicLabel: Record<(typeof TOPICS)[number], string> = {
  importing_an_ev: 'Importing an EV',
  fleet: 'Fleet · B2B',
  service: 'Service',
  charger_install: 'Charging install',
  press: 'Press & partners',
  other: 'Other',
};

const errorCopy: Record<SubmitContactError, string> = {
  invalid_payload: 'Some fields look off — please review and resubmit.',
  recaptcha_failed: 'Spam check failed. Try again or message us on WhatsApp.',
  db_error: 'Our system hiccuped. Please try again or message us on WhatsApp.',
  network_error: 'Network error. Try again or message us on WhatsApp.',
};

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorKind, setErrorKind] = useState<SubmitContactError | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: 'importing_an_ev', consentWhatsApp: true },
  });

  const topic = watch('topic');

  async function onSubmit(values: ContactFormValues) {
    setStatus('submitting');
    setErrorKind(null);

    // reCAPTCHA token attachment is opt-in: only if the global grecaptcha is loaded
    // (i.e. NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set on the deployment). If not, we send
    // an empty token and the server falls into dev-mode-pass behaviour (or rejects
    // in production without a secret, per the verifyRecaptchaToken contract).
    let recaptchaToken: string | undefined;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const grecaptcha = (window as any).grecaptcha;
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (grecaptcha && siteKey) {
        recaptchaToken = await new Promise<string>((resolve) => {
          grecaptcha.ready(() => {
            grecaptcha
              .execute(siteKey, { action: 'contact_submit' })
              .then((t: string) => resolve(t))
              .catch(() => resolve(''));
          });
        });
      }
    } catch {
      recaptchaToken = undefined;
    }

    const result = await submitContact({ ...values, recaptchaToken });
    if (result.ok) {
      setSubmittedRef(result.leadId ? `lead-${result.leadId}` : 'lead');
      setStatus('success');
    } else {
      setErrorKind(result.error ?? 'network_error');
      setStatus('error');
    }
  }

  if (status === 'success') {
    const waLink = buildWhatsAppLink({
      phone: brand.whatsapp.egypt,
      message: submittedRef
        ? `Hi VoltAuto — I just submitted the contact form (ref: ${submittedRef}).`
        : 'Hi VoltAuto — I just submitted the contact form.',
    });
    return (
      <div className="card-base p-6 text-sm text-brand-text-secondary">
        <strong className="text-brand-green">Thanks — we got it.</strong> We&apos;ll WhatsApp
        you within 30 minutes during business hours.
        <div className="mt-4">
          <a
            href={waLink}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-md bg-brand-whatsapp px-4 py-2 text-xs font-bold text-black transition-transform hover:scale-105 motion-reduce:hover:scale-100"
          >
            <span>●</span> Open WhatsApp now
          </a>
          <span className="ml-3 text-[11px] text-brand-text-dim">
            (or wait for us — your call)
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card-base space-y-4 p-6">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
          I&apos;m interested in
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TOPICS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setValue('topic', t)}
              className={
                'rounded-full border px-3 py-1 text-xs transition-colors ' +
                (topic === t
                  ? 'border-brand-green bg-brand-green text-black'
                  : 'border-brand-border-soft bg-transparent text-brand-text-secondary hover:border-brand-green/60')
              }
            >
              {topicLabel[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <input
            {...register('name')}
            className="w-full rounded border border-brand-border-soft bg-black px-3 py-2 text-sm text-white placeholder:text-brand-text-dim"
            placeholder="Mona K."
          />
        </Field>
        <Field label="WhatsApp" error={errors.phone?.message}>
          <input
            {...register('phone')}
            className="w-full rounded border border-brand-border-soft bg-black px-3 py-2 text-sm text-white placeholder:text-brand-text-dim"
            placeholder="+20 111 6200 099"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register('email')}
            className="w-full rounded border border-brand-border-soft bg-black px-3 py-2 text-sm text-white placeholder:text-brand-text-dim"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Make &amp; model (if known)" error={undefined}>
          <input
            {...register('vehicleMake')}
            className="w-full rounded border border-brand-border-soft bg-black px-3 py-2 text-sm text-white placeholder:text-brand-text-dim"
            placeholder="BYD Song L AWD"
          />
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register('message')}
          rows={4}
          className="w-full rounded border border-brand-border-soft bg-black px-3 py-2 text-sm text-white placeholder:text-brand-text-dim"
          placeholder="The more detail the better."
        />
      </Field>

      <label className="flex items-center gap-2 text-xs text-brand-text-secondary">
        <input
          type="checkbox"
          {...register('consentWhatsApp')}
          className="accent-brand-green"
        />
        I&apos;m OK with WhatsApp follow-up
      </label>

      <Button type="submit" variant="primary" size="md" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send enquiry →'}
      </Button>

      {status === 'error' && errorKind && (
        <p className="text-xs text-red-400">{errorCopy[errorKind]}</p>
      )}
      <p className="text-center font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-dim">
        We reply within 30 min during business hours
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-muted">
        {label}
      </div>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
    </div>
  );
}
