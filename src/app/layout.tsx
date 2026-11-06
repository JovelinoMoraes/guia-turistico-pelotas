import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://guia-turistico-pelotas.vercel.app"),
  title: {
    default: "Guia Turístico de Pelotas",
    template: "%s | Guia Turístico de Pelotas",
  },
  description: "Descubra Pelotas, sua história, cultura e sabores.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Guia Turístico de Pelotas",
    description: "Descubra Pelotas, sua história, cultura e sabores.",
    siteName: "Guia Turístico de Pelotas",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
