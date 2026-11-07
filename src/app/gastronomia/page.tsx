import type { Metadata } from "next";
import { connection } from "next/server";
import { ContentList } from "@/components/content-list";
import { getPublishedLocations } from "@/lib/content/data";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Gastronomia",
  description: "Encontre restaurantes, cafeterias e docerias em Pelotas, RS.",
  alternates: { canonical: "/gastronomia" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Gastronomia | Cantos de Pelotas",
    description: "Encontre restaurantes, cafeterias e docerias em Pelotas, RS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gastronomia | Cantos de Pelotas",
    description: "Encontre restaurantes, cafeterias e docerias em Pelotas, RS.",
  },
};

export const instant = false;

export default async function GastronomyPage() {
  await connection();
  const foodPlaces = await getPublishedLocations("gastronomia");
  return (
    <SiteShell active="gastronomia">
      <main className="mx-auto max-w-5xl px-5 pb-7 pt-3">
        <h1 className="text-center text-3xl font-extrabold">Gastronomia</h1>
        <div className="mt-3">
          <ContentList kind="gastronomia" items={foodPlaces} />
        </div>
      </main>
    </SiteShell>
  );
}
