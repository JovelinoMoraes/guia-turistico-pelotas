import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o Cantos de Pelotas, um guia digital independente sobre a cidade.",
  alternates: { canonical: "/sobre" },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <SiteShell showWeather={false}>
      <main className="mx-auto min-h-screen max-w-3xl bg-paper px-5 py-8 text-ink">
      <Link className="font-bold text-brick" href="/turismo">← Voltar ao guia</Link>
      <h1 className="mt-8 font-display text-4xl font-bold text-brick">Sobre o Cantos de Pelotas</h1>
      <div className="mt-5 grid gap-5 text-lg leading-8 text-muted">
        <p>O Cantos de Pelotas é um guia digital independente dedicado a reunir e apresentar lugares, atrações, gastronomia, cultura e experiências de Pelotas.</p>
        <p>Ele foi criado para turistas e moradores que querem descobrir a cidade com mais praticidade, encontrando informações organizadas sobre locais e suas características.</p>
        <p>O compromisso do projeto é oferecer informações úteis e uma navegação clara, mantendo os conteúdos organizados para facilitar a descoberta de Pelotas.</p>
      </div>
      </main>
    </SiteShell>
  );
}
