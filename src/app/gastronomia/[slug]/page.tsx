import Link from "next/link";
import { notFound } from "next/navigation";
import { foodPlaces, getFoodPlace } from "@/lib/content/data";
import { SiteShell } from "@/components/site-shell";

export function generateStaticParams() {
  return foodPlaces.map((place) => ({ slug: place.slug }));
}

export default async function GastronomyDetailPage({ params }: PageProps<"/gastronomia/[slug]">) {
  const { slug } = await params;
  const place = getFoodPlace(slug);

  if (!place) notFound();

  return (
    <SiteShell active="gastronomia">
      <main className="mx-auto max-w-5xl px-5 py-5">
        <Link className="text-3xl text-[#333]" href="/gastronomia" aria-label="Voltar para gastronomia">‹</Link>
        <div className="mt-4 flex h-72 items-end rounded-3xl bg-[#dbeafa] p-6 text-sm font-bold text-[#55708f]">Imagem não informada</div>
        <h1 className="mt-7 text-4xl font-extrabold">{place.name}</h1>
        <p className="mt-5 rounded-2xl border border-[#b9deea] bg-[#eefaff] px-5 py-4 text-lg font-bold capitalize text-[#2764c4]">📍 {place.category}</p>
        <h2 className="mt-10 text-2xl font-extrabold">Descrição</h2>
        <p className="mt-3 text-lg leading-8 text-[#676767]">{place.description}</p>
        <div className="mt-8 rounded-2xl bg-[#f2f7fd] p-6">
          <p className="text-3xl text-[#2764c4]" aria-hidden="true">⌖</p>
          <p className="mt-3 text-lg font-bold">{place.name}</p>
          <p className="mt-2 text-[#676767]">Endereço não informado na fonte consultada.</p>
        </div>
        <div className="mt-8 border-t border-[#e5e7eb] pt-5 text-sm text-[#676767]">
          <p>Fonte: <a className="text-[#2764c4] underline" href={place.sourceUrl} target="_blank" rel="noreferrer">portal oficial de turismo</a></p>
          <p className="mt-2">Verificado em {place.lastVerifiedAt}</p>
        </div>
      </main>
    </SiteShell>
  );
}
