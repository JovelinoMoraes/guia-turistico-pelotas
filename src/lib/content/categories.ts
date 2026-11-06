export const tourismCategories = [
  "Patrimônio histórico e arquitetura",
  "Praças e espaços públicos",
  "Museus e cultura",
  "Natureza e lazer",
  "Experiências",
] as const;

export const gastronomyCategories = [
  "Restaurante",
  "Bar",
  "Cafeteria",
  "Doceria e confeitaria",
  "Outro",
] as const;

export const locationCategories = {
  turismo: tourismCategories,
  gastronomia: gastronomyCategories,
} as const;

export type LocationType = keyof typeof locationCategories;

export function isValidLocationCategory(type: string, category: string) {
  return type in locationCategories &&
    (locationCategories[type as LocationType] as readonly string[]).includes(category);
}
