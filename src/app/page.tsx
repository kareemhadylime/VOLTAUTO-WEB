import { Hero } from '@/components/home/Hero';
import { ImportJourney } from '@/components/home/ImportJourney';
import { FeaturedImports } from '@/components/home/FeaturedImports';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImportJourney />
      <FeaturedImports />
    </>
  );
}
