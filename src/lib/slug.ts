interface SlugInput {
  brand: string;
  model: string;
  trim?: string;
}

export function vehicleSlug({ brand, model, trim }: SlugInput): string {
  const parts = [brand, model, trim].filter(Boolean) as string[];
  return parts
    .join(' ')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip diacritic combining marks
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
