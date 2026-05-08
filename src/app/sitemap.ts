import type { MetadataRoute } from 'next';
import { getAllVehicles } from '@/lib/inventory';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://voltauto.biz';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/vehicles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/import`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const all = await getAllVehicles();
  const vehicleRoutes: MetadataRoute.Sitemap = all.map((v) => ({
    url: `${BASE}/vehicles/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...vehicleRoutes];
}
