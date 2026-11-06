import type { FoodPlace, TouristAttraction } from "./types";

const verifiedAt = "2026-11-05";

export const touristAttractions: TouristAttraction[] = [
  {
    id: "catedral-metropolitana",
    slug: "catedral-metropolitana-de-sao-francisco-de-paula",
    name: "Catedral Metropolitana de São Francisco de Paula",
    summary: "Atrativo cultural listado no portal oficial de turismo de Pelotas.",
    description: "A Catedral Metropolitana de São Francisco de Paula integra a seleção de atrativos do portal oficial de turismo de Pelotas.",
    category: "Patrimônio histórico e arquitetura",
    address: "Praça José Bonifácio, 15, Centro, Pelotas - RS, 96015-170",
    sourceUrl: "https://visite.pelotasturismo.com.br/service/show/Catedral_Metropolitana_de_Sao_Francisco_de_Paula3",
    lastVerifiedAt: verifiedAt,
    featured: true,
  },
  {
    id: "charqueada-sao-joao",
    slug: "charqueada-sao-joao",
    name: "Charqueada São João",
    summary: "Atrativo cultural listado no portal oficial de turismo de Pelotas.",
    description: "A Charqueada São João integra a seleção de atrativos e experiências do portal oficial de turismo de Pelotas.",
    category: "Patrimônio histórico e arquitetura",
    address: "Estrada da Costa, 750, Pelotas - RS, 96085-100",
    sourceUrl: "https://visite.pelotasturismo.com.br/company/show/Charqueada_Sao_Joao",
    lastVerifiedAt: verifiedAt,
    featured: true,
  },
  {
    id: "mercado-central",
    slug: "mercado-central-de-pelotas",
    name: "Mercado Central de Pelotas",
    summary: "Atrativo listado no portal oficial de turismo de Pelotas.",
    description: "O Mercado Central de Pelotas integra a seleção de atrativos do portal oficial de turismo de Pelotas.",
    category: "Cultura e espaços públicos",
    address: "Praça Coronel Pedro Osório, 101, Centro, Pelotas - RS, 96015-010",
    sourceUrl: "https://visite.pelotasturismo.com.br/service/show/Mercado_Central_de_Pelotas_",
    lastVerifiedAt: verifiedAt,
    featured: false,
  },
];

export const foodPlaces: FoodPlace[] = [
  {
    id: "docaria-frans",
    slug: "docaria-frans",
    name: "Doçaria Fran's",
    summary: "Doçaria listada no portal oficial de turismo de Pelotas.",
    description: "A Doçaria Fran's integra a seleção de opções gastronômicas do portal oficial de turismo de Pelotas.",
    category: "doceria",
    address: "Praça Sete de Julho, 179, bancas 41 e 42, Centro, Pelotas - RS, 96015-000",
    sourceUrl: "https://visite.pelotasturismo.com.br/service/show/Docaria_Fran_s",
    lastVerifiedAt: verifiedAt,
    featured: true,
  },
  {
    id: "diade-cafe",
    slug: "diade-cafe",
    name: "Díade Café",
    summary: "Cafeteria listada no portal oficial de turismo de Pelotas.",
    description: "A Díade Café integra a seleção de opções gastronômicas do portal oficial de turismo de Pelotas.",
    category: "cafeteria",
    address: "Praça Coronel Pedro Osório, 100, Centro, Pelotas - RS, 96015-010",
    sourceUrl: "https://visite.pelotasturismo.com.br/service/show/Diade_Cafe",
    lastVerifiedAt: verifiedAt,
    featured: true,
  },
];

export function getTouristAttraction(slug: string) {
  return touristAttractions.find((attraction) => attraction.slug === slug);
}

export function getFoodPlace(slug: string) {
  return foodPlaces.find((place) => place.slug === slug);
}
