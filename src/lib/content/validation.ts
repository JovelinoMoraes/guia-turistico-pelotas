export const locationFieldLimits = {
  name: 120,
  summary: 240,
  description: 2000,
  address: 300,
  phone: 30,
  url: 2000,
  openingHours: 4000,
  openingHoursNote: 1000,
} as const;

export function validateLocationText(value: string, field: keyof typeof locationFieldLimits, label: string): string {
  const limit = locationFieldLimits[field];
  if (value.length > limit) {
    throw new Error(`${label} deve ter no máximo ${limit} caracteres.`);
  }
  return value;
}

export function validateOptionalUrl(value: string, label: string): string {
  if (value.length > locationFieldLimits.url) {
    throw new Error(`${label} deve ter no máximo ${locationFieldLimits.url} caracteres.`);
  }
  if (value && !/^https?:\/\//i.test(value)) {
    throw new Error(`${label} deve começar com http:// ou https://.`);
  }
  return value;
}
