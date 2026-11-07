import type { Metadata } from "next";
import Link from "next/link";
import { SuggestLocationForm } from "@/components/suggest-location-form";

export const metadata: Metadata = {
  title: "Sugerir local",
  description: "Envie uma sugestão de local para o App Cantos de Pelotas.",
};

export const instant = false;

export default async function SuggestLocationPage({ searchParams }: PageProps<"/sugerir">) {
  const rawStatus = (await searchParams).status;
  const status = typeof rawStatus === "string" ? rawStatus : undefined;

  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-paper px-5 py-8 text-ink">
      <Link className="font-bold text-brick" href="/turismo">← Voltar ao guia</Link>
      <h1 className="mt-8 text-3xl font-extrabold">Sugerir um local</h1>
      <p className="mt-3 text-muted">Conhece um lugar que deveria estar no guia? Envie os dados para avaliação.</p>
      {status === "sent" ? (
        <p className="mt-6 rounded-xl border border-olive bg-olive/10 px-4 py-3 font-bold text-olive" role="status">
          Sugestão enviada com sucesso. Ela será analisada antes de aparecer no guia.
        </p>
      ) : (
        <div className="mt-6">
          <SuggestLocationForm />
        </div>
      )}
    </main>
  );
}
