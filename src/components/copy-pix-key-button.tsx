"use client";

import { useState } from "react";

type CopyPixKeyButtonProps = {
  value: string;
};

export function CopyPixKeyButton({ value }: CopyPixKeyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <button
        className="inline-flex items-center gap-2 rounded-xl border border-brick px-4 py-2.5 text-sm font-bold text-brick transition-colors hover:bg-sand focus-visible:outline-4 disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        onClick={copyPixKey}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="8" y="8" width="11" height="11" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
        {status === "copied" ? "Chave copiada" : "Copiar chave Pix"}
      </button>
      {status === "error" && (
        <span className="text-sm font-bold text-brick" role="alert">
          Não foi possível copiar. Selecione a chave manualmente.
        </span>
      )}
    </div>
  );
}
