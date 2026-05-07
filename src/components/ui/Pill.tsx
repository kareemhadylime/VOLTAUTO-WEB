import { cn } from '@/lib/cn';

type Tone = 'green' | 'amber' | 'steel';

const tones: Record<Tone, string> = {
  green: 'border-brand-green/30 bg-brand-green/10 text-brand-green',
  amber: 'border-brand-amber-warn/30 bg-brand-amber-warn/10 text-brand-amber-warn',
  steel: 'border-brand-steel-info/30 bg-brand-steel-info/10 text-brand-steel-info',
};

export function PillEyebrow({
  children,
  tone = 'green',
  withDot = true,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  withDot?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-eyebrow',
        tones[tone],
        className,
      )}
    >
      {withDot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </div>
  );
}

export function StatusPill({
  status,
  className,
}: {
  status: 'currently_advertising' | 'recently_delivered' | 'catalog_only';
  className?: string;
}) {
  const map = {
    currently_advertising: { label: 'Currently advertising', tone: 'green' as const },
    recently_delivered: { label: 'Recently delivered', tone: 'amber' as const },
    catalog_only: { label: 'Catalog only', tone: 'steel' as const },
  };
  const { label, tone } = map[status];
  return (
    <PillEyebrow tone={tone} withDot={false} className={className}>
      {label}
    </PillEyebrow>
  );
}
