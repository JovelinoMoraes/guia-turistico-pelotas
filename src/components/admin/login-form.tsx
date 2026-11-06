"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { startAdminAccess } from "@/app/admin/actions";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const formData = new FormData(event.currentTarget);
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      });

      if (signInError) {
        setError("E-mail ou senha inválidos.");
        return;
      }

      await startAdminAccess();
      setPending(false);
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Não foi possível concluir o login. Verifique sua conexão e tente novamente.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <label className="grid gap-2 font-bold">
        E-mail
        <input className="rounded-xl border border-border bg-paper px-4 py-3 outline-none focus:border-brick" name="email" type="email" required autoComplete="email" />
      </label>
      <label className="grid gap-2 font-bold">
        Senha
        <input className="rounded-xl border border-border bg-paper px-4 py-3 outline-none focus:border-brick" name="password" type="password" required autoComplete="current-password" />
      </label>
      {error && <p className="text-sm text-brick" role="alert">{error}</p>}
      <button className="rounded-xl bg-brick px-5 py-3 font-bold text-white disabled:opacity-60" type="submit" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
