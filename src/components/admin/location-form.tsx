"use client";

import { createLocation, updateLocation } from "@/app/admin/actions";
import { gastronomyCategories, tourismCategories } from "@/lib/content/categories";
import { useActionState, useState } from "react";
import { CLOSED_DAY, serializeOpeningHours, weekDays, type OpeningHours, type WeekDayKey } from "@/lib/opening-hours";

type LocationFormValues = {
  id?: string;
  name?: string;
  type?: "turismo" | "gastronomia";
  category?: string;
  summary?: string;
  description?: string | null;
  address?: string | null;
  phone?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  image_url?: string | null;
  image_alt?: string | null;
  image_credit?: string | null;
  image_source_url?: string | null;
  published?: boolean;
  partner?: boolean;
  opening_hours?: OpeningHours | null;
  opening_hours_note?: string | null;
  website_url?: string | null;
};

export function LocationForm({ initialValues }: { initialValues?: LocationFormValues }) {
  const [type, setType] = useState<"turismo" | "gastronomia">(initialValues?.type ?? "turismo");
  const categories = type === "turismo" ? tourismCategories : gastronomyCategories;
  const isEditing = Boolean(initialValues?.id);
  const [openingHours, setOpeningHours] = useState<OpeningHours>(initialValues?.opening_hours ?? {});
  const [state, formAction, isPending] = useActionState<{ error?: string }, FormData>(
    async (_previousState, formData) => {
      try {
        await (isEditing ? updateLocation(formData) : createLocation(formData));
        return {};
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
        return {
          error: error instanceof Error ? error.message : "Não foi possível salvar o local. Tente novamente.",
        };
      }
    },
    {},
  );

  function updatePeriod(day: WeekDayKey, index: number, part: "start" | "end", value: string) {
    setOpeningHours((current) => {
      const periods = [...(current[day] ?? [])];
      const interval = periods[index] ?? "";
      const [start = "", end = ""] = interval.split("-");
      periods[index] = part === "start" ? `${value}-${end}` : `${start}-${value}`;
      return { ...current, [day]: periods };
    });
  }

  function addPeriod(day: WeekDayKey) {
    setOpeningHours((current) => ({ ...current, [day]: [...(current[day]?.includes(CLOSED_DAY) ? [] : current[day] ?? []), "-"] }));
  }

  function toggleClosedDay(day: WeekDayKey) {
    setOpeningHours((current) => ({
      ...current,
      [day]: current[day]?.includes(CLOSED_DAY) ? undefined : [CLOSED_DAY],
    }));
  }

  function removePeriod(day: WeekDayKey, index: number) {
    setOpeningHours((current) => {
      const periods = (current[day] ?? []).filter((_, periodIndex) => periodIndex !== index);
      return { ...current, [day]: periods.length ? periods : undefined };
    });
  }

  return (
    <form action={formAction} className="grid gap-4 rounded-3xl border border-border bg-white p-6">
      <h2 className="text-2xl font-extrabold">{isEditing ? "Editar local" : "Cadastrar local"}</h2>
      {state.error && (
        <p className="rounded-xl border border-brick bg-brick/10 px-4 py-3 font-bold text-brick" role="alert">
          {state.error}
        </p>
      )}
      {initialValues?.id && <input name="id" type="hidden" value={initialValues.id} />}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Nome<input className="field" name="name" maxLength={120} defaultValue={initialValues?.name} placeholder="Ex.: Museu do Doce" required /></label>
        <label className="grid gap-2 font-bold">Tipo<select className="field" name="type" value={type} onChange={(event) => setType(event.target.value as typeof type)}><option value="turismo">Turismo</option><option value="gastronomia">Gastronomia</option></select></label>
        <label className="grid gap-2 font-bold">Categoria<select className="field" name="category" defaultValue={initialValues?.category} required><option value="">Selecione uma categoria</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
        <label className="grid gap-2 font-bold">Resumo<input className="field" name="summary" maxLength={240} defaultValue={initialValues?.summary} placeholder="Resumo curto do local" required /></label>
      </div>
      <fieldset className="grid gap-3">
        <legend className="font-bold">Horário de funcionamento</legend>
        <p className="text-sm text-muted">Escolha os horários de abertura e fechamento. Adicione outro período quando necessário.</p>
        <input name="opening_hours" type="hidden" value={serializeOpeningHours(openingHours)} />
        <div className="grid gap-3">
          {weekDays.map(({ key, label }) => (
            <div className="grid gap-2 rounded-xl border border-border p-3" key={key}>
              <span className="text-sm font-bold">{label}</span>
              {(openingHours[key] ?? []).filter((interval) => interval !== CLOSED_DAY).map((interval, index) => {
                const [start = "", end = ""] = interval.split("-");
                return (
                  <div className="flex flex-wrap items-center gap-2" key={`${key}-${index}`}>
                    <label className="grid gap-1 text-xs font-bold text-muted">
                      Abre
                      <input className="field" type="time" value={start} onChange={(event) => updatePeriod(key, index, "start", event.target.value)} />
                    </label>
                    <span className="mt-4 text-muted" aria-hidden="true">até</span>
                    <label className="grid gap-1 text-xs font-bold text-muted">
                      Fecha
                      <input className="field" type="time" value={end} onChange={(event) => updatePeriod(key, index, "end", event.target.value)} />
                    </label>
                    <button className="mt-4 text-sm font-bold text-brick" type="button" onClick={() => removePeriod(key, index)}>
                      Remover
                    </button>
                  </div>
                );
              })}
              <button className="w-fit text-sm font-bold text-olive" type="button" onClick={() => addPeriod(key)}>
                + Adicionar período
              </button>
              <button className="w-fit text-sm font-bold text-brick" type="button" onClick={() => toggleClosedDay(key)}>
                {openingHours[key]?.includes(CLOSED_DAY) ? "Definir horário" : "Fechado o dia todo"}
              </button>
            </div>
          ))}
        </div>
        <label className="grid gap-2 font-bold">Observação sobre o funcionamento<textarea className="field" name="opening_hours_note" maxLength={1000} defaultValue={initialValues?.opening_hours_note ?? ""} placeholder="Ex.: O funcionamento ocorre conforme a programação de espetáculos e atividades culturais." rows={3} /></label>
      </fieldset>
      <label className="grid gap-2 font-bold">Descrição<textarea className="field" name="description" maxLength={2000} defaultValue={initialValues?.description ?? ""} placeholder="Descreva o local com mais detalhes para a página do local." rows={3} /></label>
      <label className="grid gap-2 font-bold">Endereço<input className="field" name="address" maxLength={300} defaultValue={initialValues?.address ?? ""} placeholder="Ex.: Praça Coronel Pedro Osório, Centro, Pelotas - RS" /></label>
      <label className="grid gap-2 font-bold">Telefone<input className="field" name="phone" maxLength={30} defaultValue={initialValues?.phone ?? ""} placeholder="Ex.: (53) 99999-9999" type="tel" /></label>
      <label className="grid gap-2 font-bold">Site<input className="field" name="website_url" maxLength={2000} defaultValue={initialValues?.website_url ?? ""} placeholder="https://..." type="url" /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Latitude<input className="field" name="latitude" defaultValue={initialValues?.latitude ?? ""} placeholder="Ex.: -31.7703" type="number" step="any" /></label>
        <label className="grid gap-2 font-bold">Longitude<input className="field" name="longitude" defaultValue={initialValues?.longitude ?? ""} placeholder="Ex.: -52.3420" type="number" step="any" /></label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">URL da imagem<input className="field" name="image_url" maxLength={2000} defaultValue={initialValues?.image_url ?? ""} placeholder="https://..." type="url" /></label>
        <label className="grid gap-2 font-bold">Texto alternativo<input className="field" name="image_alt" maxLength={2000} defaultValue={initialValues?.image_alt ?? ""} placeholder="Descreva o que aparece na imagem" /></label>
        <label className="grid gap-2 font-bold">Crédito<input className="field" name="image_credit" maxLength={300} defaultValue={initialValues?.image_credit ?? ""} placeholder="Ex.: Nome do autor / Wikimedia Commons" /></label>
        <label className="grid gap-2 font-bold">Fonte da imagem<input className="field" name="image_source_url" maxLength={2000} defaultValue={initialValues?.image_source_url ?? ""} placeholder="Link da página original da imagem" type="url" /></label>
      </div>
      <label className="flex items-center gap-2 font-bold"><input name="partner" type="checkbox" defaultChecked={initialValues?.partner ?? false} />Local parceiro</label>
      <label className="flex items-center gap-2 font-bold"><input name="published" type="checkbox" defaultChecked={initialValues?.published ?? true} />Publicar imediatamente</label>
      <button className="w-fit rounded-xl bg-brick px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isPending} aria-busy={isPending}>
        {isPending ? "Salvando..." : isEditing ? "Salvar alterações" : "Cadastrar local"}
      </button>
    </form>
  );
}
