import Link from "next/link";
import type { ReactNode } from "react";
import { getWeather } from "@/lib/weather/service";

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
    <div className="min-h-screen bg-white pb-24 text-[#252525]">
      <header className="sticky top-0 z-10 border-b border-[#e5e7eb] bg-white/95 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5" aria-label="Navegação principal">
          <Link href="/turismo" className="text-xl font-extrabold tracking-tight">Pelotas</Link>
          <Link href={active === "turismo" ? "/gastronomia" : "/turismo"} className="text-sm font-bold text-[#2764c4]">
            {active === "turismo" ? "Gastronomia" : "Turismo"}
          </Link>
        </nav>
      </header>
      {showWeather && (
        <section className="mx-auto max-w-5xl px-5 pt-5" aria-label="Clima em Pelotas">
          {weather ? (
            <div className="flex items-center justify-between rounded-2xl border border-[#d8e1eb] bg-[#f2f7fd] px-5 py-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl" aria-hidden="true">☁</span>
                <div>
                  <p className="font-bold">Pelotas, RS</p>
                  <p className="text-sm text-[#676767]">
                    {weatherDescriptions[weather.currentWeatherCode] ?? "Condição não informada"}
                  </p>
                </div>
              </div>
              <strong className="text-2xl">{Math.round(weather.currentTemperature)}°C</strong>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#d8e1eb] bg-[#f2f7fd] px-5 py-4 text-sm text-[#676767]">
              Não foi possível atualizar o clima agora.
            </div>
          )}
        </section>
      )}
      {children}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-[#e5e7eb] bg-white" aria-label="Navegação inferior">
        <div className="mx-auto grid max-w-5xl grid-cols-2">
          <Link className={`flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-bold ${active === "turismo" ? "text-[#1f2937]" : "text-[#8b8b8b]"}`} href="/turismo">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
              <path d="M9 3v15M15 6v15" />
            </svg>
            Turismo
          </Link>
          <Link className={`flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-bold ${active === "gastronomia" ? "text-[#1f2937]" : "text-[#8b8b8b]"}`} href="/gastronomia">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 3v7a3 3 0 0 0 6 0V3" />
              <path d="M8 3v18" />
              <path d="M5 7h6" />
              <path d="M17 3v18" />
              <path d="M17 3c2 2 3 4 3 7 0 1.7-1.3 3-3 3" />
            </svg>
            Restaurantes
          </Link>
        </div>
      </nav>
    </div>
  );
}
