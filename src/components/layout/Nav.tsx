import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { brand } from '@/lib/tokens';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const navLinks = [
  { href: '/vehicles', label: 'Vehicles' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/import', label: 'Import' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-border-soft bg-black/95 backdrop-blur">
      <div className="container-prose flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display text-lg tracking-tight text-brand-green">
            VOLTAUTO
          </Link>
          <nav className="hidden gap-6 md:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-brand-text-secondary transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="hidden rounded border border-brand-border-soft px-2.5 py-1 font-mono text-[10px] tracking-eyebrow text-brand-text-muted md:inline-flex"
          >
            ðŸ‡ªðŸ‡¬ EG / ðŸ‡¦ðŸ‡ª UAE
          </span>
          <Button variant="primary" size="sm" href={buildWhatsAppLink({ phone: brand.whatsapp.egypt })}>
            WhatsApp â†’
          </Button>
        </div>
      </div>
    </header>
  );
}
