"use client";

import { useActionState, useState } from "react";
import { suggestLocation, type SuggestionState } from "@/app/sugerir/actions";
import { gastronomyCategories, tourismCategories } from "@/lib/content/categories";
import { serializeOpeningHours, weekDays, type OpeningHours, type WeekDayKey } from "@/lib/opening-hours";

export function SuggestLocationForm() {
  const [state, formAction, isPending] = useActionState<SuggestionState, FormData>(suggestLocation, {});
  const [type, setType] = useState<"turismo" | "gastronomia">("turismo");
  const [openingHours, setOpeningHours] = useState<OpeningHours>({});
  const categories = type === "turismo" ? tourismCategories : gastronomyCategories;

  function updatePeriod(day: WeekDayKey, index: number, part: "start" | "end", value: string) {
    setOpeningHours((current) => {
      const periods = [...(current[day] ?? [])];
      const [start = "", end = ""] = (periods[index] ?? "").split("-");
      periods[index] = part === "start" ? `${value}-${end}` : `${start}-${value}`;
      return { ...current, [day]: periods };
    });
  }

  function addPeriod(day: WeekDayKey) {
    setOpeningHours((current) => ({ ...current, [day]: [...(current[day] ?? []), "-"] }));
  }

  function removePeriod(day: WeekDayKey, index: number) {
    setOpeningHours((current) => {
      const periods = (current[day] ?? []).filter((_, periodIndex) => periodIndex !== index);
      return { ...current, [day]: periods.length ? periods : undefined };
    });
  }

  return (
    <form action={formAction} className="grid gap-4 rounded-3xl border border-border bg-white p-6">
      <p className="text-sm text-muted">A sugestão ficará pendente até ser conferida e publicada pela equipe.</p>
      <p className="text-sm text-muted">
        <span className="font-bold text-red-600" aria-hidden="true">*</span> Campos obrigatórios
      </p>
      {state.error && (
        <p className="rounded-xl border border-brick bg-brick/10 px-4 py-3 font-bold text-brick" role="alert">
          {state.error}
        </p>
      )}
      <div aria-hidden="true" className="hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold"><span>Nome do local <span className="text-red-600" aria-hidden="true">*</span></span><input className="field" name="name" maxLength={120} placeholder="Ex.: Museu do Doce" required /></label>
        <label className="grid gap-2 font-bold"><span>Tipo <span className="text-red-600" aria-hidden="true">*</span></span><select className="field" name="type" value={type} onChange={(event) => setType(event.target.value as typeof type)} required><option value="turismo">Turismo</option><option value="gastronomia">Gastronomia</option></select></label>
        <label className="grid gap-2 font-bold"><span>Categoria <span className="text-red-600" aria-hidden="true">*</span></span><select className="field" name="category" required><option value="">Selecione uma categoria</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
        <label className="grid gap-2 font-bold"><span>Resumo <span className="text-red-600" aria-hidden="true">*</span></span><input className="field" name="summary" maxLength={240} placeholder="Resumo curto do local" required /></label>
      </div>
      <label className="grid gap-2 font-bold">Descrição<textarea className="field" name="description" maxLength={2000} placeholder="Descreva o local com mais detalhes." rows={3} /></label>
      <label className="grid gap-2 font-bold">Endereço<input className="field" name="address" maxLength={300} placeholder="Ex.: Praça Coronel Pedro Osório, Centro, Pelotas - RS" /></label>
      <label className="grid gap-2 font-bold">Telefone<input className="field" name="phone" maxLength={30} placeholder="Ex.: (53) 99999-9999" type="tel" /></label>
      <fieldset className="grid gap-3">
        <legend className="font-bold">Horário de funcionamento</legend>
        <p className="text-sm text-muted">Opcional. Escolha os horários usando os seletores.</p>
        <input name="opening_hours" type="hidden" value={serializeOpeningHours(openingHours)} />
        {weekDays.map(({ key, label }) => (
          <div className="grid gap-2 rounded-xl border border-border p-3" key={key}>
            <span className="text-sm font-bold">{label}</span>
            {(openingHours[key] ?? []).map((interval, index) => {
              const [start = "", end = ""] = interval.split("-");
              return (
                <div className="flex flex-wrap items-end gap-2" key={`${key}-${index}`}>
                  <label className="grid gap-1 text-xs font-bold text-muted">Abre<input className="field" type="time" value={start} onChange={(event) => updatePeriod(key, index, "start", event.target.value)} /></label>
                  <span className="pb-3 text-muted" aria-hidden="true">até</span>
                  <label className="grid gap-1 text-xs font-bold text-muted">Fecha<input className="field" type="time" value={end} onChange={(event) => updatePeriod(key, index, "end", event.target.value)} /></label>
                  <button className="pb-3 text-sm font-bold text-brick" type="button" onClick={() => removePeriod(key, index)}>Remover</button>
                </div>
              );
            })}
            <button className="w-fit text-sm font-bold text-olive" type="button" onClick={() => addPeriod(key)}>+ Adicionar período</button>
          </div>
        ))}
      </fieldset>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 font-bold">URL da imagem<input className="field" name="image_url" maxLength={2000} placeholder="https://..." type="url" /></label>
        <label className="grid gap-2 font-bold">Latitude<input className="field" name="latitude" placeholder="Ex.: -31.7703" type="number" step="any" /></label>
        <label className="grid gap-2 font-bold">Longitude<input className="field" name="longitude" placeholder="Ex.: -52.3420" type="number" step="any" /></label>
      </div>
      <button className="w-fit rounded-xl bg-brick px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isPending}>
        {isPending ? "Enviando..." : "Enviar sugestão"}
      </button>
    </form>
  );
}
