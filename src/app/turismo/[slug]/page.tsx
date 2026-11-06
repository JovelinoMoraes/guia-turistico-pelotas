import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getLocationBySlug } from "@/lib/content/data";
import { SiteShell } from "@/components/site-shell";
import { getMapUrl } from "@/lib/maps";
import { OpeningStatus } from "@/components/opening-status";
import { getPhoneHref } from "@/lib/phone";
import { getOpeningHoursEntries } from "@/lib/opening-hours";

export const instant = false;

export async function generateMetadata({ params }: PageProps<"/turismo/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const attraction = await getLocationBySlug("turismo", slug);

  return attraction
    ? {
        title: attraction.name,
        description: attraction.summary,
        openGraph: {
          title: attraction.name,
          description: attraction.summary,
        },
      }
    : {};
}

export default async function TourismDetailPage({ params }: PageProps<"/turismo/[slug]">) {
  await connection();
  const { slug } = await params;
  const attraction = await getLocationBySlug("turismo", slug);

  if (!attraction) notFound();
  const mapUrl = getMapUrl(attraction);

  return (
    <SiteShell active="turismo" showWeather={false}>
      <main className="mx-auto max-w-5xl px-5 py-5">
        <Link className="ml-auto inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-bold text-brick transition-colors hover:bg-sand" href="/turismo" aria-label="Voltar para turismo">
          <span className="text-lg leading-none" aria-hidden="true">←</span>
          Voltar
        </Link>
        <div className="relative mt-4 h-72 overflow-hidden rounded-3xl bg-sand">
          {attraction.image ? (
            <>
              <Image className="object-cover" src={attraction.image.src} alt={attraction.image.alt} fill sizes="(max-width: 1024px) 100vw, 1024px" priority unoptimized />
              <div className="absolute inset-0 bg-ink/25" />
              {attraction.image.credit && (
                <a className="absolute bottom-3 right-3 text-xs text-white underline" href={attraction.image.sourceUrl} target="_blank" rel="noopener noreferrer">
                  Foto: {attraction.image.credit}
                </a>
              )}
            </>
          ) : <div className="flex h-full items-end p-6 text-sm font-bold text-muted">Foto não informada</div>}
        </div>
        <h1 className="mt-7 text-4xl font-extrabold">{attraction.name}</h1>
        {(attraction.partner || attraction.openingHours) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {attraction.partner && (
              <p className="inline-flex items-center gap-2 rounded-full bg-sand px-3 py-2 text-sm font-extrabold text-brick">
                <span aria-hidden="true">🤝</span>
                Local parceiro
              </p>
            )}
            <div className="ml-auto">
              <OpeningStatus hours={attraction.openingHours} />
            </div>
          </div>
        )}
        <p className="mt-5 rounded-2xl border border-border bg-sand px-5 py-4 text-lg font-bold text-brick">
          {attraction.category}
        </p>
        <h2 className="mt-10 text-2xl font-extrabold">Descrição</h2>
        <p className="mt-3 text-lg leading-8 text-muted">{attraction.description}</p>
        <section className="mt-8 rounded-2xl bg-sand p-6" aria-labelledby="tourism-location">
          <h2 id="tourism-location" className="mt-3 text-2xl font-extrabold">Endereço</h2>
          <p className="mt-2 text-muted">{attraction.address ?? "Endereço não informado na fonte consultada."}</p>
          {attraction.phone && (
            <p className="mt-4">
              <span className="block text-sm font-bold text-muted">Telefone</span>
              <a className="font-bold text-brick underline" href={getPhoneHref(attraction.phone)}>{attraction.phone}</a>
            </p>
          )}
          {attraction.openingHours && (
            <div className="mt-5 border-t border-border pt-4">
              <h3 className="text-sm font-bold text-muted">Horário de funcionamento</h3>
              <dl className="mt-2 grid gap-1 text-sm">
                {getOpeningHoursEntries(attraction.openingHours).map(({ label, intervals }) => (
                  <div className="flex flex-wrap justify-between gap-3" key={label}>
                    <dt className="font-bold">{label}</dt>
                    <dd className="text-muted">{intervals.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
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
