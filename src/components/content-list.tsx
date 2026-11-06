"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FoodPlace, TouristAttraction } from "@/lib/content/types";
import { filterContent } from "@/lib/content/filter";
import { getDistanceInKm } from "@/lib/distance";

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
  const [sortByDistance, setSortByDistance] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "ready" | "denied" | "error">("idle");
  const [visibleStart, setVisibleStart] = useState(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const categories = [...new Set(items.map((item) => item.category))];
  const filteredItems = useMemo(() => filterContent(items, query, category), [category, items, query]);
  const sortedItems = useMemo(() => {
    if (!sortByDistance || !userLocation) return filteredItems;

    return [...filteredItems].sort((first, second) => {
      if (typeof first.latitude !== "number" || typeof first.longitude !== "number") return 1;
      if (typeof second.latitude !== "number" || typeof second.longitude !== "number") return -1;

      return (
        getDistanceInKm(userLocation, { latitude: first.latitude, longitude: first.longitude }) -
        getDistanceInKm(userLocation, { latitude: second.latitude, longitude: second.longitude })
      );
    });
  }, [filteredItems, sortByDistance, userLocation]);
  const visibleItems = sortedItems.slice(visibleStart, visibleStart + 5);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || visibleStart + 5 >= sortedItems.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleStart((current) => current + 5);
      },
      { rootMargin: "240px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [sortedItems.length, visibleStart]);

  function requestLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }

    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
        setSortByDistance(true);
        setVisibleStart(0);
        setLocationStatus("ready");
      },
      (error) => {
        setLocationStatus(error.code === error.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 },
    );
  }

  return (
    <div>
      <div className="grid gap-4">
        <button
          className="rounded-full border border-brick px-5 py-3 text-sm font-bold text-brick outline-none hover:bg-sand focus-visible:outline-4"
          type="button"
          onClick={requestLocation}
          disabled={locationStatus === "loading"}
        >
          {locationStatus === "loading" ? "Obtendo localização..." : "Ordenar por mais próximo"}
        </button>
        <label className="flex flex-col gap-2 text-sm font-bold text-ink">
          <span className="sr-only">Buscar</span>
          <input
            className="rounded-2xl border border-[#d8dce2] bg-[#f2f7fd] px-5 py-4 text-base font-normal outline-none placeholder:text-[#777] focus:border-[#2764c4]"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleStart(0);
            }}
            placeholder={`Buscar em ${kind}`}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-ink">
          <span className="sr-only">Categoria</span>
          <select
            className="rounded-full border border-[#d8dce2] bg-[#f2f4f7] px-5 py-3 text-base font-bold outline-none focus:border-[#2764c4]"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setVisibleStart(0);
            }}
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

      {locationStatus === "denied" && (
        <p className="mt-4 text-sm text-muted" role="status">
          A localização foi negada. Você pode continuar vendo os locais na ordem padrão.
        </p>
      )}
      {locationStatus === "error" && (
        <p className="mt-4 text-sm text-muted" role="status">
          Não foi possível obter sua localização. Verifique a permissão do navegador e tente novamente.
        </p>
      )}

      {sortedItems.length > 0 ? (
        <div className="grid gap-5 pt-8 md:grid-cols-2">
          {visibleItems.map((item) => (
            <article key={item.id} className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-48 overflow-hidden bg-sand">
                {item.image ? (
                  <>
                    <Image className="object-cover" src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-ink/25" />
                  </>
                ) : (
                  <div className="flex h-full items-end p-5 text-sm font-bold text-muted">Imagem não informada</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brick">
                  {kind === "gastronomia"
                    ? foodLabels[(item as FoodPlace).category]
                    : (item as TouristAttraction).category}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-ink">{item.name}</h2>
                <p className="mt-3 min-h-14 leading-7 text-muted">{item.summary}</p>
                <Link
                  className="absolute inset-0 rounded-3xl focus-visible:outline-4 focus-visible:outline-[#2764c4]"
                  href={`/${kind}/${item.slug}`}
                  aria-label={`Ver detalhes de ${item.name}`}
                />
              </div>
            </article>
          ))}
          {visibleStart + 5 < sortedItems.length && <div ref={loadMoreRef} className="h-8" aria-hidden="true" />}
        </div>
      ) : (
        <p className="border border-border bg-sand p-6 text-muted" role="status">
          Nenhum resultado encontrado. Tente outro termo ou categoria.
        </p>
      )}
    </div>
  );
}
