import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { foodPlaces, getFoodPlace } from "@/lib/content/data";
import { SiteShell } from "@/components/site-shell";
import { getMapUrl } from "@/lib/maps";

export function generateStaticParams() {
  return foodPlaces.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gastronomia/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const place = getFoodPlace(slug);

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
  const place = getFoodPlace(slug);

  if (!place) notFound();
  const mapUrl = getMapUrl(place);

  return (
    <SiteShell active="gastronomia" showWeather={false}>
      <main className="mx-auto max-w-5xl px-5 py-5">
        <Link className="text-3xl text-[#333]" href="/gastronomia" aria-label="Voltar para gastronomia">‹</Link>
        <div className="mt-4 flex h-72 items-end rounded-3xl bg-[#dbeafa] p-6 text-sm font-bold text-[#55708f]">Foto não informada</div>
        <h1 className="mt-7 text-4xl font-extrabold">{place.name}</h1>
        <p className="mt-5 rounded-2xl border border-[#b9deea] bg-[#eefaff] px-5 py-4 text-lg font-bold capitalize text-[#2764c4]">
          {place.category}
        </p>
        <h2 className="mt-10 text-2xl font-extrabold">Descrição</h2>
        <p className="mt-3 text-lg leading-8 text-[#676767]">{place.description}</p>
        <section className="mt-8 rounded-2xl bg-[#f2f7fd] p-6" aria-labelledby="food-location">
          <p className="text-3xl text-[#2764c4]" aria-hidden="true">⌖</p>
          <h2 id="food-location" className="mt-3 text-2xl font-extrabold">Endereço</h2>
          <p className="mt-2 text-[#676767]">{place.address ?? "Endereço não informado na fonte consultada."}</p>
          {mapUrl && (
            <a className="mt-5 inline-block rounded-xl bg-[#2764c4] px-5 py-3 text-sm font-bold text-white" href={mapUrl} target="_blank" rel="noopener noreferrer">
              Abrir localização no mapa
            </a>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
