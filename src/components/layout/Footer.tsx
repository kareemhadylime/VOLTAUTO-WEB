import Link from 'next/link';
import { brand } from '@/lib/tokens';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-border-soft bg-black">
      <div className="container-prose grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="font-display text-base tracking-tight text-brand-green">VOLTAUTO</div>
          <p className="mt-3 text-xs text-brand-text-muted">
            Egypt's China-EV import specialist. Since 2022. A Lime Investments company.
          </p>
          <div className="mt-4 flex gap-4 text-xs text-brand-text-dim">
            <a href="https://instagram.com/voltauto.eg">Instagram</a>
            <a href="https://facebook.com/voltautobiz">Facebook</a>
            <a href="https://wa.me/201116200099">WhatsApp</a>
          </div>
        </div>
        <div>
          <div className="eyebrow mb-3">Discover</div>
          <ul className="space-y-2 text-sm text-brand-text-secondary">
            <li><Link href="/vehicles">Vehicles</Link></li>
            <li><Link href="/import">Import</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3">Locations</div>
          <p className="text-sm text-brand-text-secondary">{brand.showroom.cairo.address}</p>
          <p className="mt-2 text-sm text-brand-text-secondary">{brand.showroom.dubai.address}</p>
          <p className="mt-2 text-xs text-brand-text-dim">Coming soon: October City + Alexandria</p>
        </div>
        <div>
          <div className="eyebrow mb-3">Contact</div>
          <p className="text-sm text-brand-text-secondary">
            WhatsApp / phone:
            <br />
            <a href="tel:+201116200099" className="font-mono text-brand-green">
              +20 111 6200 099
            </a>
          </p>
          <p className="mt-2 text-sm text-brand-text-secondary">
            <a href="mailto:hello@voltauto.biz" className="font-mono text-brand-green">
              hello@voltauto.biz
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-brand-border-soft bg-black py-4">
        <div className="container-prose flex flex-wrap items-center justify-between gap-3 text-xs text-brand-text-dim">
          <span>© 2026 Volt Auto · A Lime Investments company</span>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/data-deletion">Data deletion</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
