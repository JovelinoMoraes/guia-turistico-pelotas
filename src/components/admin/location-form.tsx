"use client";

import { createLocation, updateLocation } from "@/app/admin/actions";
import { gastronomyCategories, tourismCategories } from "@/lib/content/categories";
import { useState } from "react";

type LocationFormValues = {
  id?: string;
  name?: string;
  type?: "turismo" | "gastronomia";
  category?: string;
  summary?: string;
  description?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  image_url?: string | null;
  image_alt?: string | null;
  image_credit?: string | null;
  image_source_url?: string | null;
  published?: boolean;
  partner?: boolean;
};

export function LocationForm({ initialValues }: { initialValues?: LocationFormValues }) {
  const [type, setType] = useState<"turismo" | "gastronomia">(initialValues?.type ?? "turismo");
  const categories = type === "turismo" ? tourismCategories : gastronomyCategories;
  const isEditing = Boolean(initialValues?.id);

  return (
    <form action={isEditing ? updateLocation : createLocation} className="grid gap-4 rounded-3xl border border-border bg-white p-6">
      <h2 className="text-2xl font-extrabold">{isEditing ? "Editar local" : "Cadastrar local"}</h2>
      {initialValues?.id && <input name="id" type="hidden" value={initialValues.id} />}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Nome<input className="field" name="name" defaultValue={initialValues?.name} placeholder="Ex.: Museu do Doce" required /></label>
        <label className="grid gap-2 font-bold">Tipo<select className="field" name="type" value={type} onChange={(event) => setType(event.target.value as typeof type)}><option value="turismo">Turismo</option><option value="gastronomia">Gastronomia</option></select></label>
        <label className="grid gap-2 font-bold">Categoria<select className="field" name="category" defaultValue={initialValues?.category} required><option value="">Selecione uma categoria</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
        <label className="grid gap-2 font-bold">Resumo<input className="field" name="summary" defaultValue={initialValues?.summary} placeholder="Uma frase curta sobre o principal atrativo do local" required /></label>
      </div>
      <label className="grid gap-2 font-bold">Descrição<textarea className="field" name="description" defaultValue={initialValues?.description ?? ""} placeholder="Descreva o local com mais detalhes para a página do local." rows={3} /></label>
      <label className="grid gap-2 font-bold">Endereço<input className="field" name="address" defaultValue={initialValues?.address ?? ""} placeholder="Ex.: Praça Coronel Pedro Osório, Centro, Pelotas - RS" /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Latitude<input className="field" name="latitude" defaultValue={initialValues?.latitude ?? ""} placeholder="Ex.: -31.7703" type="number" step="any" /></label>
        <label className="grid gap-2 font-bold">Longitude<input className="field" name="longitude" defaultValue={initialValues?.longitude ?? ""} placeholder="Ex.: -52.3420" type="number" step="any" /></label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">URL da imagem<input className="field" name="image_url" defaultValue={initialValues?.image_url ?? ""} placeholder="https://..." type="url" /></label>
        <label className="grid gap-2 font-bold">Texto alternativo<input className="field" name="image_alt" defaultValue={initialValues?.image_alt ?? ""} placeholder="Descreva o que aparece na imagem" /></label>
        <label className="grid gap-2 font-bold">Crédito<input className="field" name="image_credit" defaultValue={initialValues?.image_credit ?? ""} placeholder="Ex.: Nome do autor / Wikimedia Commons" /></label>
        <label className="grid gap-2 font-bold">Fonte da imagem<input className="field" name="image_source_url" defaultValue={initialValues?.image_source_url ?? ""} placeholder="Link da página original da imagem" type="url" /></label>
      </div>
      <label className="flex items-center gap-2 font-bold"><input name="partner" type="checkbox" defaultChecked={initialValues?.partner ?? false} />Local parceiro</label>
      <label className="flex items-center gap-2 font-bold"><input name="published" type="checkbox" defaultChecked={initialValues?.published ?? true} />Publicar imediatamente</label>
      <button className="w-fit rounded-xl bg-brick px-5 py-3 font-bold text-white" type="submit">{isEditing ? "Salvar alterações" : "Cadastrar local"}</button>
    </form>
  );
}
