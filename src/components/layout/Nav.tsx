'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { brand } from '@/lib/tokens';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const navLinks = [
  { href: '/vehicles',   label: 'Vehicles'   },
  { href: '/uae',        label: 'UAE'         },
  { href: '/fleet',      label: 'Fleet'       },
  { href: '/gallery',    label: 'Gallery'     },
  { href: '/offers',     label: 'Offers'      },
  { href: '/charging',   label: 'Charging'    },
  { href: '/calculator', label: 'Calculator'  },
  { href: '/import',     label: 'Import'      },
  { href: '/about',      label: 'About'       },
  { href: '/contact',    label: 'Contact'     },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-brand-border-soft bg-black/95 backdrop-blur">
        <div className="container-prose flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-lg tracking-tight text-brand-green">
            VOLTAUTO
          </Link>

          {/* Desktop nav */}
          <nav className="hidden gap-5 md:flex" aria-label="Primary">
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

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            <span aria-hidden className="rounded border border-brand-border-soft px-2.5 py-1 font-mono text-[10px] tracking-eyebrow text-brand-text-muted">
              EG / UAE
            </span>
            <Button variant="primary" size="sm" href={buildWhatsAppLink({ phone: brand.whatsapp.egypt })}>
              WhatsApp →
            </Button>
          </div>

          {/* Mobile right: WhatsApp + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <Button variant="primary" size="sm" href={buildWhatsAppLink({ phone: brand.whatsapp.egypt })}>
              WhatsApp →
            </Button>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border border-brand-border-soft bg-transparent text-white"
            >
              <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-30 flex flex-col bg-black/98 pt-16 md:hidden" aria-label="Mobile menu">
          <nav className="flex flex-col divide-y divide-brand-border-soft overflow-y-auto">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-6 py-4 text-lg font-medium text-white hover:text-brand-green transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 py-6 mt-auto border-t border-brand-border-soft">
            <a
              href={buildWhatsAppLink({ phone: brand.whatsapp.egypt })}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-green py-3 font-semibold text-slate-950"
              onClick={() => setOpen(false)}
            >
              <span className="text-lg">💬</span> Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
