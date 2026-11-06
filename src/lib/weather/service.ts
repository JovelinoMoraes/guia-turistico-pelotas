import type { WeatherData } from "./types";

const WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const PELOTAS_COORDINATES = {
  latitude: -31.7654,
  longitude: -52.3376,
};

type OpenMeteoResponse = {
  current?: {
    time?: string;
    temperature_2m?: number;
    weather_code?: number;
    precipitation?: number;
  };
  daily?: {
    temperature_2m_min?: number[];
    temperature_2m_max?: number[];
    precipitation_probability_max?: number[];
    precipitation_sum?: number[];
  };
};

function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function parseWeatherResponse(payload: OpenMeteoResponse): WeatherData {
  const current = payload.current;
  const daily = payload.daily;
  const minimumTemperature = daily?.temperature_2m_min?.[0];
  const maximumTemperature = daily?.temperature_2m_max?.[0];
  const precipitationProbability = daily?.precipitation_probability_max?.[0];
  const precipitation = daily?.precipitation_sum?.[0];

  if (
    !current ||
    !isValidNumber(current.temperature_2m) ||
    !isValidNumber(current.weather_code) ||
    !isValidNumber(minimumTemperature) ||
    !isValidNumber(maximumTemperature) ||
    !isValidNumber(precipitation) ||
    (precipitationProbability !== null && precipitationProbability !== undefined && !isValidNumber(precipitationProbability))
  ) {
    throw new Error("A resposta meteorológica não contém os dados esperados.");
  }

  return {
    currentTemperature: current.temperature_2m,
    currentWeatherCode: current.weather_code,
    precipitationProbability: precipitationProbability ?? null,
    precipitation,
    minimumTemperature,
    maximumTemperature,
    updatedAt: current.time ?? new Date().toISOString(),
  };
}

export async function getWeather(): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(PELOTAS_COORDINATES.latitude),
    longitude: String(PELOTAS_COORDINATES.longitude),
    current: "temperature_2m,weather_code,precipitation",
    daily: "temperature_2m_min,temperature_2m_max,precipitation_probability_max,precipitation_sum",
    timezone: "America/Sao_Paulo",
    forecast_days: "1",
  });

  try {
    const response = await fetch(`${WEATHER_ENDPOINT}?${params}`, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Open-Meteo respondeu com status ${response.status}.`);
    }

    return parseWeatherResponse((await response.json()) as OpenMeteoResponse);
  } catch (error) {
    console.error("Falha ao consultar o clima de Pelotas.", error);
    throw new Error("Não foi possível atualizar o clima agora.");
  }
}
