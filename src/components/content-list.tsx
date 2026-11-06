"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { FoodPlace, TouristAttraction } from "@/lib/content/types";
import { filterContent, normalizeCategory } from "@/lib/content/filter";
import { getDistanceInKm } from "@/lib/distance";
import { getOpeningStatus } from "@/lib/opening-hours";

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

function getCategoryLabel(category: string): string {
  const legacyLabel = foodLabels[category as FoodPlace["category"]];
  return legacyLabel ?? category;
}

function formatDistance(distanceInKm: number): string {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m`;
  }

  return `${distanceInKm.toFixed(1).replace(".", ",")} km`;
}

export function ContentList({ kind, items }: ContentListProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");
  const [sortByDistance, setSortByDistance] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "ready" | "denied" | "error">("idle");
  const [visibleStart, setVisibleStart] = useState(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const categories = [...new Map(items.map((item) => [normalizeCategory(item.category), item.category])).values()];
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
      <div className="grid gap-3">
        <button
          className="inline-flex w-fit items-center gap-2 justify-self-end rounded-full border border-brick px-4 py-2 text-sm font-bold text-brick outline-none hover:bg-sand focus-visible:outline-4"
          type="button"
          onClick={requestLocation}
          disabled={locationStatus === "loading"}
          aria-label="Ordenar locais por proximidade"
          aria-busy={locationStatus === "loading"}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M22 12h-3M12 22v-3M2 12h3" />
          </svg>
          {locationStatus === "loading" ? "Localizando..." : "Ordenar por proximidade"}
        </button>
        <label className="flex flex-col gap-2 text-sm font-bold text-ink">
          <span className="sr-only">Buscar</span>
          <input
            className="rounded-xl border border-border bg-white px-4 py-3 text-base font-normal outline-none placeholder:text-muted focus:border-brick"
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
            className="rounded-full border border-border bg-white px-4 py-2.5 text-sm font-bold outline-none focus:border-brick"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setVisibleStart(0);
            }}
          >
            <option value="todas">Todas</option>
            {categories.map((itemCategory) => (
              <option key={itemCategory} value={normalizeCategory(itemCategory)}>
                {kind === "gastronomia" ? getCategoryLabel(itemCategory) : itemCategory}
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
        <div className="grid gap-3 pt-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <article key={item.id} className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${item.partner ? "border-2 border-brick bg-[#fffaf4] shadow-[0_0_0_3px_rgba(155,79,61,0.18)]" : "border-border"}`}>
              {item.partner && <div className="h-1 w-full shrink-0 bg-brick" aria-hidden="true" />}
              <div className="relative h-24 overflow-hidden bg-sand">
                {item.partner && (
                  <span className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-paper/95 px-2 py-1 text-[11px] font-extrabold text-brick shadow-sm" title="Local parceiro">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="m8 11 2.5-2.5a2.1 2.1 0 0 1 3 0l1 1a2.1 2.1 0 0 0 3 0l.5-.5a2.1 2.1 0 0 1 3 3L16 17.5a3 3 0 0 1-4.2 0L8 13.7" />
                      <path d="m8 11-2.2-2.2a2.1 2.1 0 0 0-3 3l5.5 5.5a3 3 0 0 0 4.2 0l1-1" />
                      <path d="m13 10.5 2.5 2.5M10.5 12.5l2 2M8.5 14.5l1.5 1.5" />
                    </svg>
                    <span>Parceiro</span>
                  </span>
                )}
                {item.image ? (
                  <>
                    <Image className="object-cover" src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 768px) 100vw, 50vw" unoptimized />
                    <div className="absolute inset-0 bg-ink/25" />
                  </>
                ) : (
                  <div className="flex h-full items-end p-3 text-xs font-bold text-muted">Imagem não informada</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brick">
                  {kind === "gastronomia"
                    ? getCategoryLabel((item as FoodPlace).category)
                    : (item as TouristAttraction).category}
                </p>
                <h2 className="mt-1 text-lg font-extrabold text-ink">{item.name}</h2>
                {item.openingHours && (() => {
                  const status = getOpeningStatus(item.openingHours, new Date());
                  return status ? (
                    <p className={`mt-1 text-xs font-bold ${status === "open" ? "text-olive" : "text-brick"}`} role="status">
                      {status === "open" ? "Aberto" : "Fechado"}
                    </p>
                  ) : null;
                })()}
                <p className="mt-1.5 min-h-10 text-xs leading-5 text-muted">{item.summary}</p>
                {userLocation && typeof item.latitude === "number" && typeof item.longitude === "number" && (
                  <p className="mt-2 border-t border-border pt-1.5 text-xs font-bold text-olive">
                    Aproximadamente{" "}
                    {formatDistance(
                      getDistanceInKm(userLocation, {
                        latitude: item.latitude,
                        longitude: item.longitude,
                      }),
                    )}
                  </p>
                )}
                <Link
                  className="absolute inset-0 rounded-2xl focus-visible:outline-4 focus-visible:outline-[#2764c4]"
                  href={`/${kind}/${item.slug}`}
                  aria-label={`Ver detalhes de ${item.name}`}
                />
              </div>
            </article>
          ))}
          {visibleStart + 5 < sortedItems.length && <div ref={loadMoreRef} className="h-8" aria-hidden="true" />}
        </div>
      ) : (
        <p className="mt-4 border border-border bg-sand p-6 text-muted" role="status">
          Nenhum resultado encontrado. Tente outro termo ou categoria.
        </p>
      )}
    </div>
  );
}
