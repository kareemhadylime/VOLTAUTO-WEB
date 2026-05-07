import type { BrandCard } from '@/types/vehicle';

export const seedBrands: BrandCard[] = [
  // Chinese OEMs
  { name: 'BYD', models: ['Song L', 'Champion', 'Han', 'Tang', 'Sea Lion', 'Yuan', 'QIN'], cluster: 'chinese-oem' },
  { name: 'Denza', models: ['D9', 'N7', 'N8', 'Z9 GT'], cluster: 'chinese-oem' },
  { name: 'NEVO', models: ['Q05', 'M07', 'N7'], cluster: 'chinese-oem' },
  { name: 'Arcfox', models: ['Kaola', 'S5', 'T5', 'αT'], cluster: 'chinese-oem' },
  { name: 'Zeekr', models: ['001', '7X', 'X', '009', 'Mix'], cluster: 'chinese-oem' },
  { name: 'NIO', models: ['ET5', 'ES6', 'ES8', 'ET7', 'ET9'], cluster: 'chinese-oem' },
  { name: 'XPeng', models: ['G6', 'G9', 'P7+', 'X9'], cluster: 'chinese-oem' },
  { name: 'Aito', models: ['M5', 'M7', 'M9'], cluster: 'chinese-oem' },
  { name: 'Avatr', models: ['11', '12', '07'], cluster: 'chinese-oem' },
  { name: 'IM Motors', models: ['LS6', 'LS7', 'L6'], cluster: 'chinese-oem' },
  { name: 'Voyah', models: ['Free', 'Dream', 'Courage'], cluster: 'chinese-oem' },
  // China-built legacy
  { name: 'Mercedes-EQ', models: ['EQA', 'EQB', 'EQE', 'EQE SUV'], cluster: 'china-built-legacy' },
  { name: 'BMW China', models: ['iX3', 'i3 sedan', 'i5', 'iX'], cluster: 'china-built-legacy' },
  { name: 'Honda e:N', models: ['e:NP2', 'e:NS2'], cluster: 'china-built-legacy' },
  { name: 'Audi China', models: ['Q4 e-tron', 'Q5 e-tron'], cluster: 'china-built-legacy' },
];
