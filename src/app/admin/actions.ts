"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasActiveAdminSession, startAdminSession } from "@/lib/supabase/admin-session";
import { isValidLocationCategory } from "@/lib/content/categories";
import { parseOpeningHours } from "@/lib/opening-hours";
import { validateLocationText, validateOptionalUrl } from "@/lib/content/validation";

export async function startAdminAccess() {
  await startAdminSession();
}

async function getAdminClient() {
  const supabase = await createClient();
  if (!(await hasActiveAdminSession())) throw new Error("A sessão administrativa expirou.");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado.");

  const { data: profile, error } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (error || !profile) throw new Error("Usuário sem permissão administrativa.");

  return supabase;
}

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

export async function createLocation(formData: FormData) {
  const supabase = await getAdminClient();
  const name = textValue(formData, "name");
  const type = textValue(formData, "type");
  const category = textValue(formData, "category");
  const summary = textValue(formData, "summary");
  const description = textValue(formData, "description");
  const address = textValue(formData, "address");
  const phone = textValue(formData, "phone");
  const imageUrl = textValue(formData, "image_url");
  const imageAlt = textValue(formData, "image_alt");
  const imageCredit = textValue(formData, "image_credit");
  const imageSourceUrl = textValue(formData, "image_source_url");
  const openingHours = textValue(formData, "opening_hours");
  if (!name || !category || !summary || !["turismo", "gastronomia"].includes(type) || !isValidLocationCategory(type, category)) {
    throw new Error("Preencha nome, tipo, categoria e resumo.");
  }
  validateLocationText(name, "name", "Nome");
  validateLocationText(summary, "summary", "Resumo");
  validateLocationText(description, "description", "Descrição");
  validateLocationText(address, "address", "Endereço");
  validateLocationText(phone, "phone", "Telefone");
  validateLocationText(imageAlt, "description", "Texto alternativo");
  validateLocationText(imageCredit, "address", "Crédito");
  validateOptionalUrl(imageUrl, "A URL da imagem");
  validateOptionalUrl(imageSourceUrl, "A fonte da imagem");
  validateLocationText(openingHours, "openingHours", "Horários");

  const { error } = await supabase.from("locations").insert({
    name,
    slug: slugify(name),
    type,
    category,
    summary,
    description: description || null,
    address: address || null,
    phone: phone || null,
    latitude: Number(textValue(formData, "latitude")) || null,
    longitude: Number(textValue(formData, "longitude")) || null,
    image_url: imageUrl || null,
    image_alt: imageAlt || null,
    image_credit: imageCredit || null,
    image_source_url: imageSourceUrl || null,
    published: formData.get("published") === "on",
    partner: formData.get("partner") === "on",
    opening_hours: parseOpeningHours(openingHours),
  });
  if (error) throw new Error(`Não foi possível cadastrar o local: ${error.message}`);

  revalidatePath("/turismo");
  revalidatePath("/gastronomia");
  redirect("/admin?status=created");
}

export async function updateLocation(formData: FormData) {
  const supabase = await getAdminClient();
  const id = textValue(formData, "id");
  const name = textValue(formData, "name");
  const type = textValue(formData, "type");
  const category = textValue(formData, "category");
  const summary = textValue(formData, "summary");
  const description = textValue(formData, "description");
  const address = textValue(formData, "address");
  const phone = textValue(formData, "phone");
  const imageUrl = textValue(formData, "image_url");
  const imageAlt = textValue(formData, "image_alt");
  const imageCredit = textValue(formData, "image_credit");
  const imageSourceUrl = textValue(formData, "image_source_url");
  const openingHours = textValue(formData, "opening_hours");
  if (!id || !name || !category || !summary || !["turismo", "gastronomia"].includes(type) || !isValidLocationCategory(type, category)) {
    throw new Error("Preencha nome, tipo, categoria e resumo.");
  }
  validateLocationText(name, "name", "Nome");
  validateLocationText(summary, "summary", "Resumo");
  validateLocationText(description, "description", "Descrição");
  validateLocationText(address, "address", "Endereço");
  validateLocationText(phone, "phone", "Telefone");
  validateLocationText(imageAlt, "description", "Texto alternativo");
  validateLocationText(imageCredit, "address", "Crédito");
  validateOptionalUrl(imageUrl, "A URL da imagem");
  validateOptionalUrl(imageSourceUrl, "A fonte da imagem");
  validateLocationText(openingHours, "openingHours", "Horários");

  const { error } = await supabase.from("locations").update({
    name,
    type,
    category,
    summary,
    description: description || null,
    address: address || null,
    phone: phone || null,
    latitude: Number(textValue(formData, "latitude")) || null,
    longitude: Number(textValue(formData, "longitude")) || null,
    image_url: imageUrl || null,
    image_alt: imageAlt || null,
    image_credit: imageCredit || null,
    image_source_url: imageSourceUrl || null,
    published: formData.get("published") === "on",
    partner: formData.get("partner") === "on",
    opening_hours: parseOpeningHours(openingHours),
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  if (error) throw new Error(`Não foi possível atualizar o local: ${error.message}`);

  revalidatePath("/admin");
  revalidatePath("/turismo");
  revalidatePath("/gastronomia");
  redirect("/admin?status=updated");
}

export async function deleteLocation(formData: FormData) {
  const supabase = await getAdminClient();
  const id = textValue(formData, "id");
  if (!id) throw new Error("Local inválido.");
  const { error } = await supabase.from("locations").delete().eq("id", id);
  if (error) throw new Error(`Não foi possível excluir o local: ${error.message}`);
  revalidatePath("/turismo");
  revalidatePath("/gastronomia");
  redirect("/admin?status=deleted");
}
