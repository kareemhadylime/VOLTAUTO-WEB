import type { VehicleSpec } from '@/types/vehicle';

export function SpecTable({ specs }: { specs: VehicleSpec[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-2 gap-y-0 overflow-hidden rounded-md border border-brand-border-soft md:grid-cols-4">
      {specs.flatMap((s, i) => {
        const isLast = i === specs.length - 1;
        return [
          <dt
            key={`dt-${s.label}`}
            className={
              'border-r border-brand-border-soft px-3 py-2.5 text-xs text-brand-text-muted ' +
              (isLast ? '' : 'border-b')
            }
          >
            {s.label}
          </dt>,
          <dd
            key={`dd-${s.label}`}
            className={
              'px-3 py-2.5 text-xs text-white ' + (isLast ? '' : 'border-b border-brand-border-soft')
            }
          >
            {s.value}
          </dd>,
        ];
      })}
    </dl>
  );
}
