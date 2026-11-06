"use client";

import { deleteLocation } from "@/app/admin/actions";

export function DeleteLocationForm({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteLocation}
      onSubmit={(event) => {
        if (!window.confirm(`Tem certeza que deseja excluir "${name}"?`)) {
          event.preventDefault();
        }
      }}
    >
      <input name="id" type="hidden" value={id} />
      <button className="text-sm font-bold text-brick" type="submit">Excluir</button>
    </form>
  );
}
