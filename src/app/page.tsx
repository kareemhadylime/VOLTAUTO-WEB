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
