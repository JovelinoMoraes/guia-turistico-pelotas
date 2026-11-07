import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cantosdepelotas.com.br"),
  title: {
    default: "Cantos de Pelotas",
    template: "%s | Cantos de Pelotas",
  },
  description: "Descubra lugares, sabores e experiências em Pelotas.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Cantos de Pelotas",
    description: "Descubra lugares, sabores e experiências em Pelotas.",
    siteName: "Cantos de Pelotas",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
