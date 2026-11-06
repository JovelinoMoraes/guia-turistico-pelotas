import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationBySlug } from "@/lib/content/data";
import { SiteShell } from "@/components/site-shell";
import { getMapUrl } from "@/lib/maps";

export const instant = false;

export async function generateMetadata({ params }: PageProps<"/gastronomia/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const place = await getLocationBySlug("gastronomia", slug);

  return place
    ? {
        title: place.name,
        description: place.summary,
        openGraph: {
          title: place.name,
          description: place.summary,
        },
      }
    : {};
}

export default async function GastronomyDetailPage({ params }: PageProps<"/gastronomia/[slug]">) {
  const { slug } = await params;
  const place = await getLocationBySlug("gastronomia", slug);

  if (!place) notFound();
  const mapUrl = getMapUrl(place);

  return (
    <SiteShell active="gastronomia" showWeather={false}>
      <main className="mx-auto max-w-5xl px-5 py-5">
        <Link className="text-3xl text-[#333]" href="/gastronomia" aria-label="Voltar para gastronomia">‹</Link>
        <div className="relative mt-4 flex h-72 items-end rounded-3xl bg-sand p-6 text-sm font-bold text-muted">
          Foto não informada
        </div>
        <h1 className="mt-7 text-4xl font-extrabold">{place.name}</h1>
        <p className="mt-5 rounded-2xl border border-border bg-sand px-5 py-4 text-lg font-bold capitalize text-brick">
          {place.category}
        </p>
        <h2 className="mt-10 text-2xl font-extrabold">Descrição</h2>
        <p className="mt-3 text-lg leading-8 text-muted">{place.description}</p>
        <section className="mt-8 rounded-2xl bg-sand p-6" aria-labelledby="food-location">
          <h2 id="food-location" className="mt-3 text-2xl font-extrabold">Endereço</h2>
          <p className="mt-2 text-muted">{place.address ?? "Endereço não informado na fonte consultada."}</p>
          {mapUrl && (
            <a className="mt-5 inline-block rounded-xl bg-brick px-5 py-3 text-sm font-bold text-white" href={mapUrl} target="_blank" rel="noopener noreferrer">
              Abrir localização no mapa
            </a>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
