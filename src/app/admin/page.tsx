import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CreateLocationPanel } from "@/components/admin/create-location-panel";
import { deleteLocation } from "./actions";
import { hasActiveAdminSession } from "@/lib/supabase/admin-session";

export const instant = false;

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  const supabase = await createClient();
  if (!(await hasActiveAdminSession())) redirect("/admin/login");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("admin_profiles").select("id").eq("id", user.id).maybeSingle();
  if (!profile) redirect("/admin/login");

  const rawParams = await searchParams;
  const rawStatus = rawParams.status;
  const status = typeof rawStatus === "string" ? rawStatus : undefined;
  const rawView = rawParams.view;
  const view = rawView === "drafts" ? "drafts" : "all";
  const locationsQuery = supabase
    .from("locations")
    .select("id, name, type, category, published, partner")
    .order("name");
  const { data: locations, error } = view === "drafts"
    ? await locationsQuery.eq("published", false)
    : await locationsQuery;
  if (error) throw new Error(`Não foi possível carregar o painel: ${error.message}`);
  const statusMessages: Record<string, string> = {
    created: "Local cadastrado com sucesso.",
    updated: "Alterações salvas com sucesso.",
    deleted: "Local excluído com sucesso.",
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div><p className="font-display text-2xl font-bold text-brick">Pelotas</p><h1 className="mt-2 text-3xl font-extrabold">Painel administrativo</h1></div>
        <Link className="rounded-xl border border-border px-4 py-2 font-bold text-brick" href="/turismo">Ver site</Link>
      </div>
      {status && statusMessages[status] && (
        <p className="mb-5 rounded-xl border border-olive bg-olive/10 px-4 py-3 font-bold text-olive" role="status">
          {statusMessages[status]}
        </p>
      )}
      <CreateLocationPanel />
      <section className="mt-8 rounded-3xl border border-border bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-extrabold">{view === "drafts" ? "Rascunhos pendentes" : "Locais cadastrados"}</h2>
          <div className="flex items-center gap-3">
            {view === "drafts" ? (
              <Link className="text-sm font-bold text-olive" href="/admin">Ver todos</Link>
            ) : (
              <Link className="rounded-xl border border-brick px-4 py-2 text-sm font-bold text-brick" href="/admin?view=drafts">Ver rascunhos pendentes</Link>
            )}
          </div>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {locations?.map((location) => (
            <li className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-l-4 py-3 pl-3 ${location.published ? "border-transparent" : "border-amber-500 bg-amber-50/70"}`} key={location.id}>
              <div className="min-w-0">
                <strong className="block truncate">{location.name}</strong>
                <p className="text-sm text-muted">{location.type} · {location.category}{location.partner ? " · Parceiro" : ""}</p>
                {!location.published && <span className="mt-1 inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">Pendente de aprovação</span>}
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link className="text-sm font-bold text-olive" href={`/admin/locais/${location.id}/editar`}>Editar</Link>
                <form action={deleteLocation} onSubmit={(event) => {
                  if (!window.confirm(`Tem certeza que deseja excluir "${location.name}"?`)) {
                    event.preventDefault();
                  }
                }}>
                  <input name="id" type="hidden" value={location.id} />
                  <button className="text-sm font-bold text-brick" type="submit">Excluir</button>
                </form>
              </div>
            </li>
          ))}
          {!locations?.length && <li className="py-3 text-muted">{view === "drafts" ? "Nenhum rascunho pendente." : "Nenhum local cadastrado."}</li>}
        </ul>
      </section>
    </main>
  );
}
