import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Saiba como o Cantos de Pelotas trata informações e dados pessoais.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <SiteShell showWeather={false}>
      <main className="mx-auto min-h-screen max-w-3xl bg-paper px-5 py-8 text-ink">
      <Link className="font-bold text-brick" href="/turismo">← Voltar ao guia</Link>
      <h1 className="mt-8 font-display text-4xl font-bold text-brick">Política de Privacidade</h1>
      <div className="mt-6 grid gap-6 leading-7 text-muted">
        <section>
          <h2 className="text-2xl font-extrabold text-ink">Quais dados são tratados</h2>
          <p className="mt-2">O formulário de sugestão pode receber nome, categoria, descrição, endereço, telefone, horários, site, imagem e coordenadas de um local. Esses dados são enviados ao Supabase para análise e eventual publicação.</p>
          <p className="mt-2">O painel administrativo utiliza cookies de sessão para autenticação e autorização. O projeto não possui analytics ou publicidade identificados no código atual.</p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-ink">Finalidade e armazenamento</h2>
          <p className="mt-2">As informações são usadas para avaliar, organizar e exibir sugestões de locais no guia. O conteúdo é armazenado no Supabase, serviço utilizado pelo projeto, e o acesso administrativo é protegido por autenticação.</p>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-ink">Seus direitos</h2>
          <p className="mt-2">Para solicitar acesso, correção ou exclusão de informações pessoais enviadas ao projeto, entre em contato pelo canal abaixo. O pedido será analisado conforme a legislação aplicável.</p>
          <a className="mt-3 inline-block font-bold text-brick underline" href="mailto:jovelinodev@gmail.com">jovelinodev@gmail.com</a>
        </section>
        <section>
          <h2 className="text-2xl font-extrabold text-ink">Controlador</h2>
          <p className="mt-2">Os dados de identificação do controlador e demais informações institucionais formais ainda precisam ser confirmados pelo responsável antes da publicação definitiva desta política.</p>
        </section>
      </div>
      </main>
    </SiteShell>
  );
}
