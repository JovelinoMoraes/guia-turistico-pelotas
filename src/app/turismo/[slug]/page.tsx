import Link from "next/link";
import { notFound } from "next/navigation";
import { getTouristAttraction, touristAttractions } from "@/lib/content/data";
import { SiteShell } from "@/components/site-shell";

export function generateStaticParams() {
  return touristAttractions.map((attraction) => ({ slug: attraction.slug }));
}

export default async function TourismDetailPage({ params }: PageProps<"/turismo/[slug]">) {
  const { slug } = await params;
  const attraction = getTouristAttraction(slug);

  if (!attraction) notFound();

  return (
    <SiteShell active="turismo">
      <main className="mx-auto max-w-5xl px-5 py-5">
        <Link className="text-3xl text-[#333]" href="/turismo" aria-label="Voltar para turismo">‹</Link>
        <div className="mt-4 flex h-72 items-end rounded-3xl bg-[#dbeafa] p-6 text-sm font-bold text-[#55708f]">Imagem não informada</div>
        <h1 className="mt-7 text-4xl font-extrabold">{attraction.name}</h1>
        <p className="mt-5 rounded-2xl border border-[#b9deea] bg-[#eefaff] px-5 py-4 text-lg font-bold text-[#2764c4]">📍 {attraction.category}</p>
        <h2 className="mt-10 text-2xl font-extrabold">Descrição</h2>
        <p className="mt-3 text-lg leading-8 text-[#676767]">{attraction.description}</p>
        <div className="mt-8 rounded-2xl bg-[#f2f7fd] p-6">
          <p className="text-3xl text-[#2764c4]" aria-hidden="true">⌖</p>
          <p className="mt-3 text-lg font-bold">{attraction.name}</p>
          <p className="mt-2 text-[#676767]">Localização não informada na fonte consultada.</p>
        </div>
        <div className="mt-8 border-t border-[#e5e7eb] pt-5 text-sm text-[#676767]">
          <p>Fonte: <a className="text-[#2764c4] underline" href={attraction.sourceUrl} target="_blank" rel="noreferrer">portal oficial de turismo</a></p>
          <p className="mt-2">Verificado em {attraction.lastVerifiedAt}</p>
        </div>
      </main>
    </SiteShell>
  );
}
