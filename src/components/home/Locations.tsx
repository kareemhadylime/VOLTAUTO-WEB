import { Eyebrow } from '@/components/ui/Eyebrow';
import { brand } from '@/lib/tokens';

export function Locations() {
  return (
    <section className="border-b border-brand-border-soft bg-[#080808]">
      <div className="container-prose py-20">
        <Eyebrow>Locations · Cairo + Dubai</Eyebrow>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">Find us</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <a
            href="https://maps.google.com/?q=One+Kattameya+Towers+Cairo"
            target="_blank"
            rel="noopener"
            className="card-base block overflow-hidden transition-colors hover:border-brand-green"
          >
            <div className="aspect-[16/10] bg-gradient-to-br from-[#101510] to-[#000]" aria-hidden />
            <div className="p-4">
              <div className="text-sm font-semibold text-white">{brand.showroom.cairo.name}</div>
              <div className="mt-1 text-xs text-brand-text-muted">{brand.showroom.cairo.address}</div>
            </div>
          </a>
          <a
            href="https://maps.google.com/?q=Jebel+Ali+Freezone+Dubai"
            target="_blank"
            rel="noopener"
            className="card-base block overflow-hidden transition-colors hover:border-brand-green"
          >
            <div className="aspect-[16/10] bg-gradient-to-br from-[#101510] to-[#000]" aria-hidden />
            <div className="p-4">
              <div className="text-sm font-semibold text-white">{brand.showroom.dubai.name}</div>
              <div className="mt-1 text-xs text-brand-text-muted">{brand.showroom.dubai.address}</div>
            </div>
          </a>
          <div className="card-base p-4">
            <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">
              Coming soon
            </div>
            <div className="mt-2 text-sm font-semibold text-white">October City</div>
            <div className="mt-1 text-sm font-semibold text-white">Alexandria</div>
          </div>
        </div>
      </div>
    </section>
  );
}
