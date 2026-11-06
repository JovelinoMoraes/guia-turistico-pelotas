import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Acesso administrativo",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-5 py-10">
      <section className="w-full rounded-3xl border border-border bg-white p-7">
        <p className="font-display text-2xl font-bold text-brick">Pelotas</p>
        <h1 className="mt-8 text-3xl font-extrabold">Painel administrativo</h1>
        <p className="mt-3 text-muted">Entre para cadastrar e gerenciar locais.</p>
        <div className="mt-7">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
