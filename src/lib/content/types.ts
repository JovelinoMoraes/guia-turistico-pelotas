export type ContentImage = {
  src: string;
  alt: string;
  credit?: string;
  sourceUrl: string;
};

import type { OpeningHours } from "@/lib/opening-hours";

export type TouristAttraction = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  category: string;
  address?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  image?: ContentImage;
  openingHours?: OpeningHours;
  openingHoursNote?: string;
  websiteUrl?: string;
  partner?: boolean;
  sourceUrl: string;
  lastVerifiedAt: string;
  featured: boolean;
};

export type FoodCategory = "restaurante" | "bar" | "cafeteria" | "doceria" | "outro";

export type FoodPlace = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description?: string;
  category: FoodCategory;
  address?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  image?: ContentImage;
  openingHours?: OpeningHours;
  openingHoursNote?: string;
  websiteUrl?: string;
  partner?: boolean;
  sourceUrl: string;
  lastVerifiedAt: string;
  featured: boolean;
};
