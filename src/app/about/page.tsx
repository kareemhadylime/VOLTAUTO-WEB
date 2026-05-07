import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PillEyebrow } from '@/components/ui/Pill';

export const metadata: Metadata = {
  title: 'About · Egypt&apos;s first EV-only specialist',
  description:
    'Founded in 2022 by Yassin & Karim Abdelhady. A subsidiary of Lime Investments Holding (est. 1993). 450+ EVs delivered in 2024 across Cairo + Dubai.',
};

const numbers = [
  { stat: '450+', label: 'EVs delivered · 2024' },
  { stat: '25+', label: 'Chinese OEM partners' },
  { stat: '2', label: 'Hubs · Cairo + Dubai' },
  { stat: '34K+', label: 'Parts SKUs in stock' },
  { stat: '24/7', label: 'Roadside support' },
];

const promise = [
  { title: 'Pure EV focus', body: 'No ICE distractions. We chose this category. Every hour we work makes us better at it.' },
  { title: 'Transparent pricing', body: 'One quote, all-in, in EGP. No surprise duties. No "storage fees" appearing at customs.' },
  { title: 'Long-haul commitment', body: "Service center, spare parts in two warehouses, 24/7 roadside. We&apos;re still here in year five." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-brand-border-soft">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 75% 40%, #1a4d35 0%, transparent 55%), linear-gradient(180deg, #000 0%, #080d0a 60%, #000 100%)',
          }}
        />
        <div className="container-prose relative py-24 md:py-28">
          <PillEyebrow>About · Since 2022</PillEyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.98] tracking-tight text-white sm:text-6xl">
            Egypt didn&apos;t have an EV specialist.
            <br />
            <span className="text-brand-green">So we became one.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-brand-text-secondary">
            Two electrical engineers. Three years of late-night importing logistics. 450+
            delivered cars. One showroom that gets bigger every month. We&apos;re not the
            cheapest dealer in Cairo. We&apos;re the only one whose service team has actually
            opened a Chinese-EV battery pack.
          </p>
        </div>
      </section>

      <div className="container-prose space-y-14 py-16">
        <section className="card-base p-8">
          <Eyebrow>Founders · electrical engineers</Eyebrow>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-white">
            Yassin &amp; Karim Abdelhady
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <FounderCard
              name="Yassin Abdelhady"
              role="Co-founder · Operations"
              bio="Electrical engineer. Runs the import logistics — China sourcing relationships, customs, the service center. Personally inspects half the cars before delivery."
            />
            <FounderCard
              name="Karim Abdelhady"
              role="Co-founder · Growth"
              bio="Electrical engineer. Previously built Alexmar. Owns commercial &amp; partnerships — fleet customers, finance partners, the brand."
            />
          </div>
        </section>

        <section className="rounded-md border border-[#1a3a2a] bg-gradient-to-br from-black to-[#0d1610] p-8">
          <Eyebrow>Numbers · 2024–2026</Eyebrow>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-white">By the numbers</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-3 md:grid-cols-5">
            {numbers.map((n) => (
              <div key={n.label} className="card-base p-5 text-center">
                <div className="font-display text-3xl leading-none text-brand-green">{n.stat}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-eyebrow text-brand-text-dim">
                  {n.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-base grid gap-8 p-8 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div className="card-base flex aspect-[4/3] items-center justify-center font-mono text-xs text-brand-text-dim">
            [ Lime Investments mark ]
          </div>
          <div>
            <Eyebrow>Part of · Lime Investments Holding</Eyebrow>
            <h2 className="mt-2 font-display text-2xl tracking-tight text-white">
              A 30-year operator behind us
            </h2>
            <p className="mt-3 text-sm text-brand-text-secondary">
              Voltauto is a subsidiary of <strong className="text-white">Lime Investments
              Holding</strong> — established 1993 by the Abdelhady family. Operating
              across hospitality, engineering services, facility management, automotive,
              and manufacturing. Volt Auto is Lime&apos;s expansion into car distribution and
              service.
            </p>
          </div>
        </section>

        <section className="card-base p-8">
          <Eyebrow>Our promise</Eyebrow>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-white">
            Every car we sell, we&apos;d drive ourselves.
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {promise.map((p) => (
              <div key={p.title} className="card-base p-5">
                <div className="font-display text-base text-white">{p.title}</div>
                <p className="mt-2 text-xs leading-relaxed text-brand-text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function FounderCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <div className="card-base flex gap-5 p-6">
      <div
        aria-hidden
        className="h-20 w-20 flex-shrink-0 rounded-full border border-brand-border-soft bg-brand-bg-raised"
      />
      <div>
        <div className="font-display text-lg tracking-tight text-white">{name}</div>
        <div className="font-mono text-[10px] uppercase tracking-eyebrow text-brand-green">
          {role}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-brand-text-secondary">{bio}</p>
      </div>
    </div>
  );
}
