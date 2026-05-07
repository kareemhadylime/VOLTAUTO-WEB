import { Eyebrow } from '@/components/ui/Eyebrow';

const stories = [
  { name: 'Yassin', vehicle: 'Mercedes EQE', timeline: '9 weeks Cairo → Cairo' },
  { name: 'Mona', vehicle: 'BYD Song L', timeline: 'Door-to-door New Cairo' },
  { name: 'Concrete Plus', vehicle: '6× NEVO Q05', timeline: 'Fleet in 14 weeks' },
];

export function CustomerStories() {
  return (
    <section className="border-b border-brand-border-soft bg-[#080808]">
      <div className="container-prose py-20">
        <Eyebrow>Recent deliveries · real customers</Eyebrow>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
          The cars we've put on the road this month
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stories.map((s) => (
            <div key={s.name} className="card-base overflow-hidden">
              <div
                aria-hidden
                className="aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
              />
              <div className="p-5">
                <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">
                  {s.timeline}
                </div>
                <div className="mt-1 text-base font-semibold text-white">
                  {s.name} · {s.vehicle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
