'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PublicGalleryItem } from '@/lib/gallery';

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  customer_deliveries: 'Deliveries',
  showroom: 'Showroom',
  outdoor: 'Outdoor',
  event: 'Events',
  photo: 'Photos',
  reel: 'Reels',
  card: 'Creative',
};

function label(cat: string) {
  return CATEGORY_LABELS[cat] ?? cat.replace(/_/g, ' ');
}

interface Props { items: PublicGalleryItem[] }

export function GalleryClient({ items }: Props) {
  const categories = ['all', ...Array.from(new Set(items.map(i => i.category)))];
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? items : items.filter(i => i.category === active);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-400">
        <p className="text-lg font-medium">Gallery coming soon.</p>
        <p className="mt-2 text-sm">Follow us on social for the latest looks.</p>
      </div>
    );
  }

  return (
    <>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={[
              'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
              active === cat
                ? 'bg-brand-green text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700',
            ].join(' ')}
          >
            {label(cat)}
          </button>
        ))}
      </div>

      {/* Masonry grid via CSS columns */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
        {filtered.map(item => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

function GalleryCard({ item }: { item: PublicGalleryItem }) {
  const src = item.thumbnail_url ?? item.image_url;
  const [errored, setErrored] = useState(false);

  return (
    <div className="break-inside-avoid mb-3 group relative overflow-hidden rounded-xl bg-slate-800">
      {item.car_slug ? (
        <Link href={`/vehicles/${item.car_slug}`} tabIndex={-1}>
          <CardMedia src={src} item={item} errored={errored} onError={() => setErrored(true)} />
        </Link>
      ) : (
        <CardMedia src={src} item={item} errored={errored} onError={() => setErrored(true)} />
      )}

      {/* Caption slide-up on hover */}
      {(item.caption_en || item.car_name) && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          {item.caption_en
            ? <p className="text-white text-xs leading-snug">{item.caption_en}</p>
            : <p className="text-slate-300 text-xs">{item.car_name}</p>
          }
        </div>
      )}

      {/* Video badge */}
      {item.is_video && (
        <div className="absolute top-2 right-2 bg-black/60 rounded px-1.5 py-0.5 text-white text-[10px] font-medium">
          ▶ {item.duration_sec ? `${Math.round(item.duration_sec)}s` : 'Video'}
        </div>
      )}
    </div>
  );
}

function CardMedia({
  src, item, errored, onError,
}: { src: string; item: PublicGalleryItem; errored: boolean; onError: () => void }) {
  // Render video — preload=none so it doesn't auto-download the full mp4
  if (item.is_video) {
    const pb = item.height && item.width ? `${(item.height / item.width) * 100}%` : '177.78%';
    return (
      <div className="relative w-full" style={{ paddingBottom: pb }}>
        <video
          src={item.image_url}
          poster={item.thumbnail_url ?? undefined}
          controls
          playsInline
          muted
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  if (errored) {
    return (
      <div className="w-full aspect-square bg-slate-700 flex items-center justify-center text-slate-500 text-xs">
        Image unavailable
      </div>
    );
  }

  // Derive padding-bottom from aspect_ratio metadata or raw width/height
  let pb = '100%';
  if (typeof item.aspect_ratio === 'string' && item.aspect_ratio.includes(':')) {
    const [w, h] = item.aspect_ratio.split(':').map(Number);
    if (w && h) pb = `${(h / w) * 100}%`;
  } else if (item.width && item.height) {
    pb = `${(item.height / item.width) * 100}%`;
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ paddingBottom: pb }}>
      <Image
        src={src}
        alt={item.caption_en ?? item.car_name ?? 'VoltAuto gallery'}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        onError={onError}
        unoptimized
      />
    </div>
  );
}
