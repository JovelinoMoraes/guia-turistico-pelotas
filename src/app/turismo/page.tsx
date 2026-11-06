import type { Metadata } from "next";
import { ContentList } from "@/components/content-list";
import { touristAttractions } from "@/lib/content/data";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Pontos turísticos",
  description: "Encontre pontos turísticos e experiências culturais em Pelotas, RS.",
  openGraph: {
    title: "Pontos turísticos | Guia Turístico de Pelotas",
    description: "Encontre pontos turísticos e experiências culturais em Pelotas, RS.",
  },
};

export default function TourismPage() {
  return (
    <SiteShell active="turismo">
      <main className="mx-auto max-w-5xl px-5 py-7">
        <h1 className="text-center text-3xl font-extrabold">Pontos Turísticos</h1>
        <div className="mt-5">
          <ContentList kind="turismo" items={touristAttractions} />
        </div>
      </main>
    </SiteShell>
  );
}
