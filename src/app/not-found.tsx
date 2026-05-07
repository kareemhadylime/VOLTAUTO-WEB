import { Button } from '@/components/ui/Button';
import { PillEyebrow } from '@/components/ui/Pill';

export default function NotFound() {
  return (
    <section className="container-prose py-32 text-center">
      <PillEyebrow>404 · Not found</PillEyebrow>
      <h1 className="mt-6 font-display text-5xl tracking-tight text-white sm:text-6xl">
        Wrong turn.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-brand-text-secondary">
        The page you wanted isn&apos;t here. The car you wanted probably is.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button variant="primary" href="/vehicles">
          Browse vehicles →
        </Button>
        <Button variant="secondary" href="/">
          Back to home
        </Button>
      </div>
    </section>
  );
}
