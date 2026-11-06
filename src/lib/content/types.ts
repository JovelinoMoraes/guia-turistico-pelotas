export type TouristAttraction = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  category: string;
  address?: string;
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
  sourceUrl: string;
  lastVerifiedAt: string;
  featured: boolean;
};
