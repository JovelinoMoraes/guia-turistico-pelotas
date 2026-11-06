import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/turismo", "/gastronomia"],
    },
    sitemap: "https://guia-turistico-pelotas.vercel.app/sitemap.xml",
  };
}
