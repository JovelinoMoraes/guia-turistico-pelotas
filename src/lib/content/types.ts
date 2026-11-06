export type ContentImage = {
  src: string;
  alt: string;
  credit?: string;
  sourceUrl: string;
};

export type TouristAttraction = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  category: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  image?: ContentImage;
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
  latitude?: number;
  longitude?: number;
  image?: ContentImage;
  partner?: boolean;
  sourceUrl: string;
  lastVerifiedAt: string;
  featured: boolean;
};
