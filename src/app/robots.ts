import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/turismo", "/gastronomia"],
    },
    sitemap: "https://cantosdepelotas.com.br/sitemap.xml",
  };
}
