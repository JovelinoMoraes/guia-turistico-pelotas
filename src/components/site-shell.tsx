import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { getWeather } from "@/lib/weather/service";
import { getWeatherIcon } from "@/lib/weather/presentation";

type SiteShellProps = {
  children: ReactNode;
  active: "turismo" | "gastronomia";
  showWeather?: boolean;
};

const weatherDescriptions: Record<number, string> = {
  0: "Céu limpo",
  1: "Predominantemente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  51: "Garoa",
  53: "Garoa",
  55: "Garoa",
  61: "Chuva",
  63: "Chuva",
  65: "Chuva",
  80: "Pancadas de chuva",
  81: "Pancadas de chuva",
  82: "Pancadas de chuva",
  95: "Trovoada",
  96: "Trovoada",
  99: "Trovoada",
};

export async function SiteShell({ children, active, showWeather = true }: SiteShellProps) {
  let weather;

  if (showWeather) {
    try {
      weather = await getWeather();
    } catch {
      weather = null;
    }
  }

  return (
    <div className="min-h-screen bg-paper pb-24 text-ink">
      <header className="sticky top-0 z-10 border-b border-border bg-paper/95 backdrop-blur">
        <nav className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5" aria-label="Navegação principal">
          <Link href="/turismo" aria-label="Ir para a página de Turismo">
            <span className="block rounded-2xl bg-white/70 p-1.5">
              <Image className="h-12 w-auto rounded-xl object-contain opacity-95" src="/images/logo.jpg" alt="Logo de Cantos de Pelotas" width={180} height={60} priority />
            </span>
          </Link>
          <Link href="/turismo" className="flex translate-y-1 flex-col items-end whitespace-nowrap leading-none" aria-label="Cantos de Pelotas — Descubra lugares, sabores e experiências">
            <span className="font-display text-xs italic tracking-wide text-black sm:text-sm">Cantos de</span>
            <span className="font-display text-3xl font-bold tracking-tight text-brick sm:text-4xl">Pelotas</span>
            <span className="mt-1 text-[8px] font-bold tracking-wide text-muted sm:text-[9px]">Descubra lugares, sabores e experiências</span>
          </Link>
        </nav>
      </header>
      {showWeather && (
        <section className="mx-auto max-w-5xl px-5 pt-3" aria-label="Clima em Pelotas">
          {weather ? (
            <div className="flex items-center justify-between rounded-xl border border-border bg-sand px-4 py-2.5">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{getWeatherIcon(weather.currentWeatherCode)}</span>
                <div>
                  <p className="text-sm font-bold">Pelotas, RS</p>
                  <p className="text-xs text-muted">
                    {weatherDescriptions[weather.currentWeatherCode] ?? "Condição não informada"}
                  </p>
                </div>
              </div>
              <strong className="text-xl">{Math.round(weather.currentTemperature)}°C</strong>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-sand px-4 py-2.5 text-sm text-muted">
              Não foi possível atualizar o clima agora.
            </div>
          )}
        </section>
      )}
      {children}
      <footer className="mx-auto max-w-5xl px-5 pb-24 pt-8" />
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-paper" aria-label="Navegação inferior">
        <div className="mx-auto grid max-w-5xl grid-cols-3">
          <Link className={`flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-bold ${active === "turismo" ? "text-brick" : "text-muted"}`} href="/turismo" aria-current={active === "turismo" ? "page" : undefined}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
              <path d="M9 3v15M15 6v15" />
            </svg>
            Turismo
          </Link>
          <Link className={`flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-bold ${active === "gastronomia" ? "text-brick" : "text-muted"}`} href="/gastronomia" aria-current={active === "gastronomia" ? "page" : undefined}>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 3v7a3 3 0 0 0 6 0V3" />
              <path d="M8 3v18" />
              <path d="M5 7h6" />
              <path d="M17 3v18" />
              <path d="M17 3c2 2 3 4 3 7 0 1.7-1.3 3-3 3" />
            </svg>
            Restaurantes
          </Link>
          <div className="flex min-h-16 flex-col items-stretch">
            <Link className="flex min-h-8 flex-1 items-center justify-center px-1 text-center text-xs font-bold text-muted" href="/sugerir">
              Sugerir local
            </Link>
            <Link className="flex min-h-8 flex-1 items-center justify-center border-t border-border px-1 text-center text-xs font-bold text-muted" href="/apoie">
              Apoie o app
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
