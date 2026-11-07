import type { Metadata } from "next";
import { connection } from "next/server";
import { ContentList } from "@/components/content-list";
import { getPublishedLocations } from "@/lib/content/data";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Pontos turísticos",
  description: "Encontre pontos turísticos e experiências culturais em Pelotas, RS.",
  alternates: { canonical: "/turismo" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pontos turísticos | Cantos de Pelotas",
    description: "Encontre pontos turísticos e experiências culturais em Pelotas, RS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pontos turísticos | Cantos de Pelotas",
    description: "Encontre pontos turísticos e experiências culturais em Pelotas, RS.",
  },
};

export const instant = false;

export default async function TourismPage() {
  await connection();
  const touristAttractions = await getPublishedLocations("turismo");
  return (
    <SiteShell active="turismo">
      <main className="mx-auto max-w-5xl px-5 pb-7 pt-3">
        <h1 className="text-center text-3xl font-extrabold">Pontos Turísticos</h1>
        <div className="mt-3">
          <ContentList kind="turismo" items={touristAttractions} />
        </div>
      </main>
    </SiteShell>
  );
}
