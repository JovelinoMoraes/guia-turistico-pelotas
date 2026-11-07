import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CreateLocationPanel } from "@/components/admin/create-location-panel";
import { DeleteLocationForm } from "@/components/admin/delete-location-form";
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
  const rawSearch = rawParams.q;
  const search = typeof rawSearch === "string" ? rawSearch.trim() : "";
  const locationsQuery = supabase
    .from("locations")
    .select("id, name, type, category, published, partner")
    .order("name");
  const { data: locations, error } = view === "drafts"
    ? await locationsQuery.eq("published", false)
    : await locationsQuery;
  if (error) throw new Error(`Não foi possível carregar o painel: ${error.message}`);
  const normalizedSearch = search.toLocaleLowerCase("pt-BR");
  const filteredLocations = normalizedSearch
    ? locations?.filter((location) =>
        [location.name, location.category, location.type].some((value) =>
          value.toLocaleLowerCase("pt-BR").includes(normalizedSearch),
        ),
      )
    : locations;
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
        <form className="mt-4 flex flex-wrap gap-2" method="get">
          {view === "drafts" && <input name="view" type="hidden" value="drafts" />}
          <label className="min-w-0 flex-1">
            <span className="sr-only">Pesquisar local</span>
            <input
              className="field w-full"
              name="q"
              defaultValue={search}
              placeholder="Pesquisar por nome, categoria ou tipo"
              type="search"
            />
          </label>
          <button className="rounded-xl border border-brick px-4 py-2 font-bold text-brick hover:bg-sand" type="submit">
            Pesquisar
          </button>
          {search && <Link className="rounded-xl border border-border px-4 py-2 font-bold text-muted" href={view === "drafts" ? "/admin?view=drafts" : "/admin"}>Limpar</Link>}
        </form>
        <ul className="mt-4 divide-y divide-border">
          {filteredLocations?.map((location) => (
            <li className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-l-4 py-3 pl-3 ${location.published ? "border-transparent" : "border-amber-500 bg-amber-50/70"}`} key={location.id}>
              <div className="min-w-0">
                <strong className="block truncate">{location.name}</strong>
                <p className="text-sm text-muted">{location.type} · {location.category}{location.partner ? " · Parceiro" : ""}</p>
                {!location.published && <span className="mt-1 inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">Pendente de aprovação</span>}
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link className="text-sm font-bold text-olive" href={`/admin/locais/${location.id}/editar`}>Editar</Link>
                <DeleteLocationForm id={location.id} name={location.name} />
              </div>
            </li>
          ))}
          {!filteredLocations?.length && <li className="py-3 text-muted">{search ? "Nenhum local encontrado para essa pesquisa." : view === "drafts" ? "Nenhum rascunho pendente." : "Nenhum local cadastrado."}</li>}
        </ul>
      </section>
    </main>
  );
}
