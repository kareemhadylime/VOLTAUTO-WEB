import { ImageResponse } from 'next/og';

export const alt = 'VoltAuto · China EV imports to Egypt';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background:
            'radial-gradient(ellipse at 75% 30%, #1a4d35 0%, transparent 55%), linear-gradient(180deg, #000 0%, #080d0a 60%, #000 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-4px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>VOLTAUTO</span>
          <span style={{ color: '#72ab44', marginTop: 16 }}>China EV imports.</span>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: '#b0b0b0',
            display: 'flex',
          }}
        >
          Egypt&apos;s door-to-door specialist · Since 2022
        </div>
      </div>
    ),
    size,
  );
}
