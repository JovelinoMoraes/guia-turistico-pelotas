import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com o Cantos de Pelotas.",
  alternates: { canonical: "/contato" },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <SiteShell showWeather={false}>
      <main className="mx-auto min-h-screen max-w-3xl bg-paper px-5 py-8 text-ink">
      <Link className="font-bold text-brick" href="/turismo">← Voltar ao guia</Link>
      <h1 className="mt-8 font-display text-4xl font-bold text-brick">Contato</h1>
      <p className="mt-4 text-lg leading-8 text-muted">Para dúvidas, correções de informações, sugestões de locais ou parcerias comerciais, escreva para:</p>
      <a className="mt-6 inline-block rounded-xl bg-brick px-5 py-3 font-bold text-white" href="mailto:jovelinodev@gmail.com">
        jovelinodev@gmail.com
      </a>
      <p className="mt-6 leading-7 text-muted">Ao enviar uma mensagem, inclua o máximo de contexto possível para que o assunto possa ser avaliado.</p>
      </main>
    </SiteShell>
  );
}
