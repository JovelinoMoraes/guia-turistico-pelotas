import { getWeatherRecommendation } from "@/lib/weather/recommendation";
import type { WeatherData } from "@/lib/weather/types";

const weatherDescriptions: Record<number, string> = {
  0: "Céu limpo",
  1: "Predominantemente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Neblina com geada",
  51: "Garoa leve",
  53: "Garoa moderada",
  55: "Garoa intensa",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva intensa",
  80: "Pancadas de chuva leves",
  81: "Pancadas de chuva moderadas",
  82: "Pancadas de chuva intensas",
  95: "Trovoada",
  96: "Trovoada com granizo leve",
  99: "Trovoada com granizo intenso",
};

function formatTemperature(value: number) {
  return `${Math.round(value)} °C`;
}

export function WeatherCard({ weather }: { weather: WeatherData }) {
  const recommendation = getWeatherRecommendation(weather);

  return (
    <section className="border-y border-border bg-sand" aria-labelledby="weather-title">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-olive">Previsão de hoje</p>
        <div className="mt-4 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 id="weather-title" className="font-display text-4xl text-ink">Clima em Pelotas</h2>
            <p className="mt-3 text-lg text-muted">
              {weatherDescriptions[weather.currentWeatherCode] ?? "Condição meteorológica não informada"}
            </p>
            <p className="mt-6 font-display text-5xl text-brick">{formatTemperature(weather.currentTemperature)}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-muted">
            <div>
              <dt>Máxima</dt>
              <dd className="font-bold text-ink">{formatTemperature(weather.maximumTemperature)}</dd>
            </div>
            <div>
              <dt>Mínima</dt>
              <dd className="font-bold text-ink">{formatTemperature(weather.minimumTemperature)}</dd>
            </div>
            <div>
              <dt>Chuva prevista</dt>
              <dd className="font-bold text-ink">
                {weather.precipitationProbability === null ? "Não informado" : `${weather.precipitationProbability}%`}
              </dd>
            </div>
            <div>
              <dt>Precipitação</dt>
              <dd className="font-bold text-ink">{weather.precipitation.toFixed(1)} mm</dd>
            </div>
          </dl>
        </div>
        <p className="mt-8 border-l-4 border-olive bg-paper px-4 py-3 text-muted">{recommendation.message}</p>
        <p className="mt-4 text-xs text-muted">Atualizado em {weather.updatedAt.replace("T", " ")}</p>
      </div>
    </section>
  );
}

export function WeatherUnavailable() {
  return (
    <section className="border-y border-border bg-sand" aria-labelledby="weather-title">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-olive">Previsão de hoje</p>
        <h2 id="weather-title" className="mt-4 font-display text-4xl text-ink">Clima em Pelotas</h2>
        <p className="mt-4 text-muted">Não foi possível atualizar o clima agora. O restante do guia continua disponível.</p>
      </div>
    </section>
  );
}
