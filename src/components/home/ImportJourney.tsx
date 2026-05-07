import { Eyebrow } from '@/components/ui/Eyebrow';

const steps = [
  { day: 'D0', title: 'Confirm spec', detail: 'Locked quote · 30% deposit' },
  { day: 'D7', title: 'Vehicle secured', detail: 'Factory order · VIN issued' },
  { day: 'D14', title: 'Inspect in China', detail: 'Our team · pre-purchase QC' },
  { day: 'D21', title: 'Ocean freight', detail: 'Shanghai → port · ~25 days' },
  { day: 'D50', title: 'Egypt customs', detail: '0% duty · plates · reg.' },
  { day: 'D60', title: 'PDI & delivery', detail: 'To your door · keys handed over' },
];

export function ImportJourney() {
  return (
    <section className="border-b border-brand-border-soft bg-[#080808]">
      <div className="container-prose py-20">
        <Eyebrow>Your car · from a Chinese factory to your driveway</Eyebrow>
        <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight text-white sm:text-4xl">
          Eight weeks. One quote. <span className="text-brand-green">Zero surprises.</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-brand-text-muted">
          A real timeline based on the last 50 deliveries. Faster routes are possible —
          slower routes happen, but we tell you which day they happen on.
        </p>

        <ol className="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {steps.map((s, i) => (
            <li key={s.day} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute left-[calc(50%+18px)] top-[18px] hidden h-0.5 w-[calc(100%-36px)] bg-gradient-to-r from-brand-green to-brand-green-hover lg:block"
                />
              )}
              <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-green font-display text-[13px] text-black">
                {s.day}
              </div>
              <div className="mt-3 text-sm font-semibold text-white">{s.title}</div>
              <div className="mt-1 text-[11px] leading-snug text-brand-text-dim">{s.detail}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
