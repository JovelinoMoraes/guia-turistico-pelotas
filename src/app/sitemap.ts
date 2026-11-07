import type { MetadataRoute } from "next";
import { getPublishedLocations } from "@/lib/content/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://cantosdepelotas.com.br";
  const [touristAttractions, foodPlaces] = await Promise.all([
    getPublishedLocations("turismo"),
    getPublishedLocations("gastronomia"),
  ]);

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/turismo`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gastronomia`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...touristAttractions.map((attraction) => ({
      url: `${baseUrl}/turismo/${attraction.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...foodPlaces.map((place) => ({
      url: `${baseUrl}/gastronomia/${place.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
