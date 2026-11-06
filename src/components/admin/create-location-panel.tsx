"use client";

import { useState } from "react";
import { LocationForm } from "./location-form";

export function CreateLocationPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mb-8">
      <button
        className="rounded-xl bg-brick px-5 py-3 font-bold text-white"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="create-location-form"
      >
        {isOpen ? "Fechar cadastro" : "Cadastrar local"}
      </button>
      {isOpen && (
        <div className="mt-4" id="create-location-form">
          <LocationForm />
        </div>
      )}
    </section>
  );
}
