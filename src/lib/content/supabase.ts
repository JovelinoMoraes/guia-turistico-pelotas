import type { FoodPlace, TouristAttraction } from "./types";
import { createClient } from "@/lib/supabase/server";
import type { OpeningHours } from "@/lib/opening-hours";

type LocationRow = {
  id: string;
  slug: string;
  name: string;
  type: "turismo" | "gastronomia";
  category: string;
  summary: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  image_alt: string | null;
  image_credit: string | null;
  image_source_url: string | null;
  published: boolean;
  partner: boolean;
  updated_at: string;
  opening_hours: OpeningHours | null;
};

function toContentItem(row: LocationRow): TouristAttraction | FoodPlace {
  const image = row.image_url
    ? {
        src: row.image_url,
        alt: row.image_alt ?? `Imagem de ${row.name}`,
        credit: row.image_credit ?? undefined,
        sourceUrl: row.image_source_url ?? row.image_url,
      }
    : undefined;

  const common = {
    id: row.id,
    slug: row.slug,
    name: row.name,
    summary: row.summary,
    address: row.address ?? undefined,
    phone: row.phone ?? undefined,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
    image,
    partner: row.partner,
    openingHours: row.opening_hours ?? undefined,
    sourceUrl: row.image_source_url ?? "",
    lastVerifiedAt: row.updated_at.slice(0, 10),
    featured: false,
  };

  if (row.type === "turismo") {
    return {
      ...common,
      description: row.description ?? row.summary,
      category: row.category,
    };
  }

  return {
    ...common,
    description: row.description ?? undefined,
    category: row.category as FoodPlace["category"],
  };
}

export async function getPublishedLocations(type: "turismo"): Promise<TouristAttraction[]>;
export async function getPublishedLocations(type: "gastronomia"): Promise<FoodPlace[]>;
export async function getPublishedLocations(type: LocationRow["type"]) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("type", type)
    .eq("published", true)
    .order("name");

  if (error) throw new Error(`Não foi possível carregar os locais: ${error.message}`);
  return (data as LocationRow[]).map(toContentItem) as TouristAttraction[] | FoodPlace[];
}

export async function getLocationBySlug(type: "turismo", slug: string): Promise<TouristAttraction | undefined>;
export async function getLocationBySlug(type: "gastronomia", slug: string): Promise<FoodPlace | undefined>;
export async function getLocationBySlug(type: LocationRow["type"], slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("type", type)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw new Error(`Não foi possível carregar o local: ${error.message}`);
  return data ? toContentItem(data as LocationRow) : undefined;
}
