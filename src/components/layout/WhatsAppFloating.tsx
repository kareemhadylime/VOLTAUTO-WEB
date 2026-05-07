'use client';

import { brand } from '@/lib/tokens';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export function WhatsAppFloating({ vehicleSlug }: { vehicleSlug?: string }) {
  return (
    <a
      href={buildWhatsAppLink({ phone: brand.whatsapp.egypt, vehicleSlug })}
      target="_blank"
      rel="noopener"
      aria-label="Open WhatsApp chat with VoltAuto"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-brand-whatsapp px-5 py-3.5 text-sm font-bold text-black shadow-lg transition-transform hover:scale-105 motion-reduce:hover:scale-100"
    >
      <span className="text-base">●</span> WhatsApp
    </a>
  );
}
