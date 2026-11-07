"use client";

export function BackToTopButton() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className="mx-auto mt-8 flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-bold text-brick transition-colors hover:bg-sand focus-visible:outline-4"
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo da página"
    >
      <span className="text-lg leading-none" aria-hidden="true">↑</span>
      Voltar ao topo
    </button>
  );
}
