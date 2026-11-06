import type { FoodPlace, TouristAttraction } from "./types";

type ContentItem = TouristAttraction | FoodPlace;

export function normalizeCategory(category: string): string {
  return category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLocaleLowerCase("pt-BR")
    .replace(/\s+/g, " ");
}

export function filterContent(
  items: ContentItem[],
  query: string,
  category: string,
): ContentItem[] {
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

  return items.filter((item) => {
    const matchesQuery =
      !normalizedQuery ||
      `${item.name} ${item.summary}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery);
    const matchesCategory = category === "todas" || normalizeCategory(item.category) === normalizeCategory(category);
    return matchesQuery && matchesCategory;
  });
}
