import type { Metadata } from 'next';
import { Inter, Archivo_Black, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloating } from '@/components/layout/WhatsAppFloating';
import { CookieBanner } from '@/components/layout/CookieBanner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body-stack',
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-display-stack',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono-stack',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'VoltAuto · China EV imports to Egypt',
    template: '%s · VoltAuto',
  },
  description:
    "Egypt's specialist for importing Chinese-made EVs door-to-door. Sourcing, shipping, customs, registration, service — one quote, one timeline, one team.",
  openGraph: {
    type: 'website',
    siteName: 'VoltAuto',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} bg-black font-body text-brand-text-primary antialiased`}
      >
        <Nav />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <WhatsAppFloating />
        <CookieBanner />
      </body>
    </html>
  );
}
