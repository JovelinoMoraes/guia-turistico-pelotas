import { describe, expect, it } from "vitest";
import { filterContent } from "./filter";
import type { TouristAttraction } from "./types";

const items: TouristAttraction[] = [
  {
    id: "catedral",
    slug: "catedral",
    name: "Catedral Metropolitana",
    summary: "Arquitetura histórica no centro.",
    description: "Descrição",
    category: "Patrimônio",
    sourceUrl: "https://example.com/catedral",
    lastVerifiedAt: "2026-11-06",
    featured: true,
  },
  {
    id: "mercado",
    slug: "mercado",
    name: "Mercado Central",
    summary: "Cultura e gastronomia.",
    description: "Descrição",
    category: "Cultura",
    sourceUrl: "https://example.com/mercado",
    lastVerifiedAt: "2026-11-06",
    featured: false,
  },
];

describe("filterContent", () => {
  it("busca sem diferenciar maiúsculas e acentos do termo", () => {
    expect(filterContent(items, "catedral", "todas")).toHaveLength(1);
  });

  it("combina busca e categoria", () => {
    expect(filterContent(items, "cultura", "Cultura").map((item) => item.id)).toEqual(["mercado"]);
  });

  it("retorna vazio quando não há correspondência", () => {
    expect(filterContent(items, "praia", "todas")).toEqual([]);
  });
});
