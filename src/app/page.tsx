import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cantos de Pelotas | Guia de Turismo, Gastronomia e Experiências",
  description: "Descubra Pelotas/RS. Encontre pontos turísticos, lugares históricos, restaurantes, cafeterias, experiências e lugares especiais da cidade.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootPage() {
  redirect("/turismo");
}
