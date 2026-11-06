import { createLocation } from "@/app/admin/actions";

export function LocationForm() {
  return (
    <form action={createLocation} className="grid gap-4 rounded-3xl border border-border bg-white p-6">
      <h2 className="text-2xl font-extrabold">Cadastrar local</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Nome<input className="field" name="name" required /></label>
        <label className="grid gap-2 font-bold">Tipo<select className="field" name="type" defaultValue="turismo"><option value="turismo">Turismo</option><option value="gastronomia">Gastronomia</option></select></label>
        <label className="grid gap-2 font-bold">Categoria<input className="field" name="category" required /></label>
        <label className="grid gap-2 font-bold">Resumo<input className="field" name="summary" required /></label>
      </div>
      <label className="grid gap-2 font-bold">Descrição<textarea className="field" name="description" rows={3} /></label>
      <label className="grid gap-2 font-bold">Endereço<input className="field" name="address" /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">Latitude<input className="field" name="latitude" type="number" step="any" /></label>
        <label className="grid gap-2 font-bold">Longitude<input className="field" name="longitude" type="number" step="any" /></label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 font-bold">URL da imagem<input className="field" name="image_url" type="url" /></label>
        <label className="grid gap-2 font-bold">Texto alternativo<input className="field" name="image_alt" /></label>
        <label className="grid gap-2 font-bold">Crédito<input className="field" name="image_credit" /></label>
        <label className="grid gap-2 font-bold">Fonte da imagem<input className="field" name="image_source_url" type="url" /></label>
      </div>
      <label className="flex items-center gap-2 font-bold"><input name="published" type="checkbox" defaultChecked /> Publicar imediatamente</label>
      <button className="w-fit rounded-xl bg-brick px-5 py-3 font-bold text-white" type="submit">Cadastrar local</button>
    </form>
  );
}
