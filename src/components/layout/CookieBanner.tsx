'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

const STORAGE_KEY = 'voltauto-consent-v1';

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
  }, []);

  function decide(value: 'all' | 'essential') {
    localStorage.setItem(STORAGE_KEY, value);
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border-soft bg-black/95 px-6 py-4 backdrop-blur">
      <div className="container-prose flex flex-wrap items-center justify-between gap-4 text-sm text-brand-text-secondary">
        <span>
          We use cookies for analytics + ad performance. Reject the optional cookies and the
          site still works normally.
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => decide('essential')}>
            Essential only
          </Button>
          <Button size="sm" variant="primary" onClick={() => decide('all')}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
