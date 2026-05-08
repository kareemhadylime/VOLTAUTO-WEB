import type { Metadata } from 'next';
import { getPublicGallery } from '@/lib/gallery';
import { GalleryClient } from '@/components/gallery/GalleryClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Gallery | VoltAuto',
  description: 'Real EV deliveries, showroom photos, and outdoor shoots from VoltAuto Egypt.',
  openGraph: {
    title: 'Gallery | VoltAuto',
    description: 'Real customer EV deliveries and showroom photos from VoltAuto Egypt.',
  },
};

export default async function GalleryPage() {
  const items = await getPublicGallery();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'VoltAuto Gallery',
    description: 'EV deliveries, showroom photos, and outdoor shoots from VoltAuto Egypt.',
    numberOfItems: items.length,
  };

  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="text-brand-green text-sm font-semibold uppercase tracking-widest mb-2">
              Visual proof
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Gallery</h1>
            <p className="mt-2 text-slate-400 max-w-xl">
              Real deliveries, showroom moments, and outdoor shoots — straight from our lot.
            </p>
          </div>
          <GalleryClient items={items} />
        </div>
      </main>
    </>
  );
}
