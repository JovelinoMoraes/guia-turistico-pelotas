"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FoodPlace, TouristAttraction } from "@/lib/content/types";

type ContentListProps = {
  kind: "turismo" | "gastronomia";
  items: TouristAttraction[] | FoodPlace[];
};

const foodLabels: Record<FoodPlace["category"], string> = {
  restaurante: "Restaurante",
  bar: "Bar",
  cafeteria: "Cafeteria",
  doceria: "Doceria",
  outro: "Outro",
};

export function ContentList({ kind, items }: ContentListProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");
  const categories = [...new Set(items.map((item) => item.category))];
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    return items.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        `${item.name} ${item.summary}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery);
      const matchesCategory = category === "todas" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, items, query]);

  return (
    <div>
      <div className="grid gap-4">
        <label className="flex flex-col gap-2 text-sm font-bold text-ink">
          <span className="sr-only">Buscar</span>
          <input
            className="rounded-2xl border border-[#d8dce2] bg-[#f2f7fd] px-5 py-4 text-base font-normal outline-none placeholder:text-[#777] focus:border-[#2764c4]"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Buscar em ${kind}`}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-ink">
          <span className="sr-only">Categoria</span>
          <select
            className="rounded-full border border-[#d8dce2] bg-[#f2f4f7] px-5 py-3 text-base font-bold outline-none focus:border-[#2764c4]"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="todas">Todas</option>
            {categories.map((itemCategory) => (
              <option key={itemCategory} value={itemCategory}>
                {kind === "gastronomia"
                  ? foodLabels[itemCategory as FoodPlace["category"]]
                  : itemCategory}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-5 pt-8 md:grid-cols-2">
          {filteredItems.map((item) => (
            <article key={item.id} className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#d9e0e8] bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-48 items-end bg-[#dbeafa] p-5 text-sm font-bold text-[#55708f]">
                Imagem não informada
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2764c4]">
                  {kind === "gastronomia"
                    ? foodLabels[(item as FoodPlace).category]
                    : (item as TouristAttraction).category}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#252525]">{item.name}</h2>
                <p className="mt-3 min-h-14 leading-7 text-[#676767]">{item.summary}</p>
                <Link className="absolute inset-0" href={`/${kind}/${item.slug}`}>
                  <span className="sr-only">Ver detalhes de {item.name}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="border border-border bg-sand p-6 text-muted" role="status">
          Nenhum resultado encontrado. Tente outro termo ou categoria.
        </p>
      )}
    </div>
  );
}
