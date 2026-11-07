"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isValidLocationCategory } from "@/lib/content/categories";
import { parseOpeningHours } from "@/lib/opening-hours";
import { validateLocationText, validateOptionalUrl } from "@/lib/content/validation";

function textValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type SuggestionState = {
  error?: string;
};

export async function suggestLocation(_previousState: SuggestionState, formData: FormData): Promise<SuggestionState> {
  try {
    if (textValue(formData, "website")) redirect("/sugerir?status=sent");

    const name = textValue(formData, "name");
    const type = textValue(formData, "type");
    const category = textValue(formData, "category");
    const summary = textValue(formData, "summary");
    const imageUrl = textValue(formData, "image_url");
    const description = textValue(formData, "description");
    const address = textValue(formData, "address");
    const phone = textValue(formData, "phone");
    const openingHours = textValue(formData, "opening_hours");
    const openingHoursNote = textValue(formData, "opening_hours_note");
    const websiteUrl = textValue(formData, "website_url");

    if (!name || !summary || !["turismo", "gastronomia"].includes(type) || !isValidLocationCategory(type, category)) {
      return { error: "Preencha nome, tipo, categoria e resumo." };
    }
    validateLocationText(name, "name", "Nome");
    validateLocationText(summary, "summary", "Resumo");
    validateLocationText(description, "description", "Descrição");
    validateLocationText(address, "address", "Endereço");
    validateLocationText(phone, "phone", "Telefone");
    validateLocationText(openingHours, "openingHours", "Horários");
    validateLocationText(openingHoursNote, "openingHoursNote", "Observação sobre o funcionamento");
    validateOptionalUrl(imageUrl, "A URL da imagem");
    validateOptionalUrl(websiteUrl, "O site");

    const supabase = await createClient();
    const { error } = await supabase.from("locations").insert({
      name,
      slug: `${slugify(name)}-${Date.now()}`,
      type,
      category,
      summary,
      description: description || null,
      address: address || null,
      phone: phone || null,
      latitude: Number(textValue(formData, "latitude")) || null,
      longitude: Number(textValue(formData, "longitude")) || null,
      image_url: imageUrl || null,
      image_alt: null,
      image_credit: null,
      image_source_url: null,
      published: false,
      partner: false,
      opening_hours: parseOpeningHours(openingHours),
      opening_hours_note: openingHoursNote || null,
      website_url: websiteUrl || null,
    });
    if (error) return { error: `Não foi possível enviar a sugestão: ${error.message}` };

    revalidatePath("/admin");
    redirect("/sugerir?status=sent");
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    if (error instanceof Error) return { error: error.message };
    console.error("Erro inesperado ao enviar sugestão.", error);
    return { error: "Não foi possível enviar a sugestão. Tente novamente." };
  }
}
