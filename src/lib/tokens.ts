// Brand tokens. Exported as TS so we can use them from JSON-LD generators
// and from any place that needs typed access (e.g. partner color overrides).

export const brand = {
  colors: {
    green: '#72ab44',
    greenHover: '#37551f',
    black: '#000000',
    bgRaised: '#0a0a0a',
    bgPanel: '#0f0f0f',
    border: '#1f1f1f',
    borderSoft: '#1a1a1a',
    textPrimary: '#ffffff',
    textSecondary: '#d0d0d0',
    textMuted: '#9a9a9a',
    textDim: '#7a7a7a',
    amberWarn: '#d69450',
    steelInfo: '#9aa9b8',
    whatsapp: '#25d366',
  },
  fonts: {
    display: 'Archivo Black, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  whatsapp: {
    egypt: '+201116200099',
  },
  showroom: {
    cairo: {
      name: 'VoltAuto Cairo · Kattameya Square',
      address: 'One Kattameya Towers, Ring Road Tower 120 — 3rd Floor, Cairo, Egypt',
      lat: 29.9783088,
      lng: 31.354216,
      hours: { sunThu: '09:00–19:00', sat: '11:00–17:00' },
    },
    dubai: {
      name: 'VoltAuto Dubai · Jebel Ali Freezone',
      address: 'Jebel Ali Freezone, Dubai, UAE',
      lat: 24.9854,
      lng: 55.0537,
      hours: { sunThu: '09:00–18:00', sat: 'Closed' },
    },
  },
} as const;
