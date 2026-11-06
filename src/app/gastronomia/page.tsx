import { ContentList } from "@/components/content-list";
import { foodPlaces } from "@/lib/content/data";
import { SiteShell } from "@/components/site-shell";

export default function GastronomyPage() {
  return (
    <SiteShell active="gastronomia">
      <main className="mx-auto max-w-5xl px-5 py-7">
        <h1 className="text-center text-3xl font-extrabold">Gastronomia</h1>
        <div className="mt-5">
          <ContentList kind="gastronomia" items={foodPlaces} />
        </div>
      </main>
    </SiteShell>
  );
}
