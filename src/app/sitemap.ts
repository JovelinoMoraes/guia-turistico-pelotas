import type { MetadataRoute } from "next";
import { foodPlaces, touristAttractions } from "@/lib/content/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://guia-turistico-pelotas.vercel.app";

  return [
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
