import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { JsonLd } from '@/components/seo/JsonLd';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Ads & Creative | VoltAuto',
  description: 'See our latest EV ad campaigns — creative cards, reels, and promotional content for NEVO, BYD, BMW, and more.',
  openGraph: {
    title: 'Ads & Creative | VoltAuto',
    description: 'Latest EV ad campaigns and creative work from VoltAuto Egypt.',
  },
};

interface GalleryItem {
  id: number;
  image_url: string;
  thumbnail_url: string | null;
  category: string;
  caption_en: string | null;
  caption_ar: string | null;
  is_video: boolean;
  width: number | null;
  height: number | null;
  car_slug: string | null;
  car_name: string | null;
  featured_order: number;
}

async function getCreatives(): Promise<GalleryItem[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data } = await client
    .from('public_gallery')
    .select('id,image_url,thumbnail_url,category,caption_en,caption_ar,is_video,width,height,car_slug,car_name,featured_order')
    .eq('category', 'creative')
    .order('featured_order', { ascending: true });
  return (data as GalleryItem[]) ?? [];
}

export default async function OffersPage() {
  const items = await getCreatives();
  const images = items.filter(i => !i.is_video);
  const videos = items.filter(i => i.is_video);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'VoltAuto Ads & Creative',
    description: 'Ad campaigns and creative work for VoltAuto Egypt.',
    numberOfItems: items.length,
  };

  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-2">
              Ad campaigns
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Offers &amp; Ads</h1>
            <p className="mt-2 text-slate-400 max-w-xl">
              Our latest creative campaigns for NEVO, BYD, BMW and more. Follow us for live deals.
            </p>
          </div>

          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-slate-400">
              <p className="text-lg font-medium">New campaigns coming soon.</p>
              <p className="mt-2 text-sm">
                <Link href="/contact" className="underline hover:text-white">Contact us</Link> to discuss your EV.
              </p>
            </div>
          )}

          {/* Static ad cards */}
          {images.length > 0 && (
            <div className="mb-12">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-6">Ad Creatives</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map(item => (
                  <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-slate-800 aspect-square">
                    <Image
                      src={item.thumbnail_url ?? item.image_url}
                      alt={item.caption_en ?? item.car_name ?? 'VoltAuto ad'}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      unoptimized
                    />
                    {item.car_name && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                        <p className="text-white text-xs font-medium">{item.car_name}</p>
                        {item.caption_en && <p className="text-slate-300 text-[10px] mt-0.5">{item.caption_en}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reels / video */}
          {videos.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-6">Reels</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map(item => (
                  <div key={item.id} className="relative rounded-2xl overflow-hidden bg-slate-800 aspect-[9/16]">
                    <video
                      src={item.image_url}
                      poster={item.thumbnail_url ?? undefined}
                      controls
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {item.car_name && (
                      <p className="absolute bottom-2 left-2 text-white text-xs font-medium bg-black/60 px-2 py-0.5 rounded">
                        {item.car_name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-slate-800 p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Interested in one of these vehicles?</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              All vehicles are import-ready. Get a quote in 24 hours.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/vehicles" className="px-5 py-2.5 rounded-full bg-brand-green text-slate-950 font-semibold text-sm hover:opacity-90 transition-opacity">
                View Vehicles
              </Link>
              <Link href="/contact" className="px-5 py-2.5 rounded-full bg-slate-700 text-white font-semibold text-sm hover:bg-slate-600 transition-colors">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
