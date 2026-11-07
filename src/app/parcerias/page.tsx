import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Parcerias",
  description: "Saiba como estabelecimentos podem colaborar com o Cantos de Pelotas.",
  alternates: { canonical: "/parcerias" },
  robots: { index: true, follow: true },
};

export default function PartnershipsPage() {
  return (
    <SiteShell showWeather={false}>
      <main className="mx-auto min-h-screen max-w-3xl bg-paper px-5 py-8 text-ink">
      <Link className="font-bold text-brick" href="/turismo">← Voltar ao guia</Link>
      <h1 className="mt-8 font-display text-4xl font-bold text-brick">Parcerias</h1>
      <p className="mt-4 text-lg leading-8 text-muted">Restaurantes, cafeterias, hotéis, pousadas, atrações turísticas e outros estabelecimentos locais podem entrar em contato para conversar sobre divulgação e colaboração.</p>
      <section className="mt-7 rounded-3xl border border-brick bg-[#fffaf4] p-6">
        <h2 className="text-2xl font-extrabold text-brick">Como conversar</h2>
        <p className="mt-3 leading-7 text-muted">Envie uma mensagem com o nome do local, o tipo de atividade e a proposta de colaboração. Cada caso será avaliado individualmente.</p>
        <p className="mt-3 text-sm font-bold text-muted">Conteúdos patrocinados serão identificados como tal.</p>
        <a className="mt-5 inline-block rounded-xl bg-brick px-5 py-3 font-bold text-white" href="mailto:jovelinodev@gmail.com?subject=Proposta%20de%20parceria">
          Falar sobre parceria
        </a>
      </section>
      </main>
    </SiteShell>
  );
}
