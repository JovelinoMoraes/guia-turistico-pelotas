import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LocationForm } from "@/components/admin/location-form";
import { hasActiveAdminSession } from "@/lib/supabase/admin-session";
import { createClient } from "@/lib/supabase/server";

export const instant = false;

export default async function EditLocationPage({ params }: PageProps<"/admin/locais/[id]/editar">) {
  if (!(await hasActiveAdminSession())) redirect("/admin/login");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("admin_profiles").select("id").eq("id", user.id).maybeSingle();
  if (!profile) redirect("/admin/login");

  const { id } = await params;
  const { data: location, error } = await supabase.from("locations").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`Não foi possível carregar o local: ${error.message}`);
  if (!location) notFound();

  return (
    <main className="mx-auto max-w-5xl px-5 py-8">
      <Link className="font-bold text-brick" href="/admin">← Voltar ao painel</Link>
      <div className="mt-6"><LocationForm initialValues={location} /></div>
    </main>
  );
}
