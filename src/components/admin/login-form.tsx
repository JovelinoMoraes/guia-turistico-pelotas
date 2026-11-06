"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    if (signInError) {
      setError("E-mail ou senha inválidos.");
      setPending(false);
      return;
    }

    router.push("/admin");
    router.refresh();
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
