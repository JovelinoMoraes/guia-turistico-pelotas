import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import QRCode from "qrcode";
import { CopyPixKeyButton } from "@/components/copy-pix-key-button";
import { getFormattedPixKey, getPixKey, getPixPayload } from "@/lib/pix";

export const metadata: Metadata = {
  title: "Apoie o App",
  description: "Apoie o App do Guia Turístico de Pelotas e conheça as opções de parceria.",
};

export const instant = false;

export default async function SupportPage() {
  const qrCode = await QRCode.toDataURL(getPixPayload(), { margin: 2, width: 280 });

  return (
    <main className="mx-auto min-h-screen max-w-3xl bg-paper px-5 py-8 text-ink">
      <Link className="font-bold text-brick" href="/turismo">← Voltar ao guia</Link>
      <h1 className="mt-8 font-display text-4xl font-bold text-brick">Apoie o App</h1>
      <p className="mt-3 text-lg leading-8 text-muted">
        Sua contribuição ajuda a manter o guia independente, atualizado e útil para quem visita Pelotas.
      </p>

      <section className="mt-8 grid gap-6 rounded-3xl border border-border bg-white p-6 sm:grid-cols-[auto_1fr] sm:items-center" aria-labelledby="pix-title">
        <div className="mx-auto rounded-xl border border-border bg-white p-2">
          <Image src={qrCode} alt="QR Code para doação Pix" width={280} height={280} unoptimized />
        </div>
        <div>
          <h2 id="pix-title" className="text-2xl font-extrabold">Faça uma doação via Pix</h2>
          <p className="mt-3 text-muted">Aponte a câmera do seu banco para o QR Code ou use a chave:</p>
          <p className="mt-2 break-all rounded-lg bg-sand px-3 py-2 font-bold">{getFormattedPixKey()}</p>
          <p className="mt-3 text-sm text-muted">Chave Pix: telefone</p>
          <CopyPixKeyButton value={getPixKey()} />
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-brick bg-[#fffaf4] p-6" aria-labelledby="partner-title">
        <h2 id="partner-title" className="text-2xl font-extrabold text-brick">Torne seu local parceiro</h2>
        <p className="mt-3 leading-7 text-muted">
          Doações acima de <strong>R$ 14,90</strong> permitem solicitar a ativação do seu local como parceiro do guia, após a confirmação da contribuição.
        </p>
        <p className="mt-3 leading-7 text-muted">
          Locais parceiros recebem o selo de parceiro e um destaque visual especial nos cards do guia.
        </p>
        <a className="mt-5 inline-block rounded-xl bg-brick px-5 py-3 font-bold text-white" href="mailto:jovelinodev@gmail.com?subject=Quero%20me%20tornar%20parceiro">
          Solicitar parceria por e-mail
        </a>
      </section>
    </main>
  );
}
