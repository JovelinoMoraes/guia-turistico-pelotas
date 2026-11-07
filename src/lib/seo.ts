import type { FoodPlace, TouristAttraction } from "@/lib/content/types";

const siteUrl = "https://cantosdepelotas.com.br";

export function getCanonicalUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

function getAddress(location: TouristAttraction | FoodPlace) {
  return location.address
    ? {
        "@type": "PostalAddress",
        addressLocality: "Pelotas",
        addressRegion: "RS",
        addressCountry: "BR",
        streetAddress: location.address,
      }
    : undefined;
}

function getGeo(location: TouristAttraction | FoodPlace) {
  return typeof location.latitude === "number" && typeof location.longitude === "number"
    ? {
        "@type": "GeoCoordinates",
        latitude: location.latitude,
        longitude: location.longitude,
      }
    : undefined;
}

export function getLocationStructuredData(
  location: TouristAttraction | FoodPlace,
  type: "turismo" | "gastronomia",
) {
  const foodType = location.category === "restaurante"
    ? "Restaurant"
    : location.category === "cafeteria"
      ? "CafeOrCoffeeShop"
      : location.category === "bar"
        ? "BarOrPub"
        : "LocalBusiness";

  return {
    "@context": "https://schema.org",
    "@type": type === "turismo" ? "TouristAttraction" : foodType,
    name: location.name,
    description: location.summary,
    url: getCanonicalUrl(`/${type}/${location.slug}`),
    image: location.image?.src,
    address: getAddress(location),
    geo: getGeo(location),
    telephone: location.phone,
    sameAs: location.websiteUrl ? [location.websiteUrl] : undefined,
  };
}
