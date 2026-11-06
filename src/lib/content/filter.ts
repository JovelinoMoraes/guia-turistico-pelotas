import type { FoodPlace, TouristAttraction } from "./types";

type ContentItem = TouristAttraction | FoodPlace;

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
    const matchesCategory = category === "todas" || item.category === category;
    return matchesQuery && matchesCategory;
  });
}
