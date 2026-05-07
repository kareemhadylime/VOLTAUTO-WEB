import { Eyebrow } from '@/components/ui/Eyebrow';

const stops = [
  { day: 'D0', title: 'Confirm spec' },
  { day: 'D7', title: 'Vehicle secured' },
  { day: 'D14', title: 'Inspect in China' },
  { day: 'D21', title: 'Ocean freight' },
  { day: 'D50', title: 'Egypt customs' },
  { day: 'D60', title: 'PDI & delivery' },
];

export function ImportTimeline() {
  return (
    <section>
      <Eyebrow>Typical timeline</Eyebrow>
      <h3 className="mt-2 font-display text-xl tracking-tight text-white">
        Eight weeks. Real days, real ships, real customs.
      </h3>
      <ol className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-6">
        {stops.map((s) => (
          <li
            key={s.day}
            className="rounded border border-brand-border-soft bg-black px-3 py-3 text-center"
          >
            <div className="font-display text-base text-brand-green">{s.day}</div>
            <div className="mt-1 text-[11px] text-white">{s.title}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
