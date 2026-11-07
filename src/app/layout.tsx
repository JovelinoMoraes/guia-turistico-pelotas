import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cantosdepelotas.com.br"),
  alternates: { canonical: "/" },
  title: {
    default: "Cantos de Pelotas | Guia de Turismo, Gastronomia e Experiências",
    template: "%s | Cantos de Pelotas",
  },
  description: "Descubra lugares, sabores e experiências em Pelotas.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Cantos de Pelotas | Guia de Turismo, Gastronomia e Experiências",
    description: "Descubra Pelotas/RS. Encontre pontos turísticos, lugares históricos, restaurantes, cafeterias, experiências e lugares especiais da cidade.",
    siteName: "Cantos de Pelotas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cantos de Pelotas | Guia de Turismo, Gastronomia e Experiências",
    description: "Descubra Pelotas/RS. Encontre pontos turísticos, lugares históricos, restaurantes, cafeterias, experiências e lugares especiais da cidade.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
