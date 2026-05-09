import { Hero } from '@/components/home/Hero';
import { ImportJourney } from '@/components/home/ImportJourney';
import { FeaturedImports } from '@/components/home/FeaturedImports';
import { WhyVoltAuto } from '@/components/home/WhyVoltAuto';
import { FleetTeaser } from '@/components/home/FleetTeaser';
import { ServiceChargingGalleryBand } from '@/components/home/ServiceChargingGalleryBand';
import { CustomerStories } from '@/components/home/CustomerStories';
import { PartnersStrip } from '@/components/home/PartnersStrip';
import { Locations } from '@/components/home/Locations';
import { BlogTeaser } from '@/components/home/BlogTeaser';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electric Cars Egypt — Import Your EV | VoltAuto',
  description: "Buy electric cars in Egypt directly from China. NEVO, BYD, Denza, Arcfox, BMW EV — door-to-door import: sourcing, shipping, customs, registration. Get a quote in 24 hours.",
  alternates: { canonical: 'https://voltauto.biz/' },
  openGraph: {
    title: 'Electric Cars Egypt — VoltAuto | Chinese EV Imports',
    description: "Egypt's specialist for Chinese electric vehicles. NEVO A06, Q05, BYD, BMW iX3 — imported door-to-door in 6–10 weeks.",
    url: 'https://voltauto.biz/',
  },
};
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImportJourney />
      <FeaturedImports />
      <WhyVoltAuto />
      <FleetTeaser />
      <ServiceChargingGalleryBand />
      <CustomerStories />
      <PartnersStrip />
      <Locations />
      <BlogTeaser />
      <FinalCTA />
    </>
  );
}
