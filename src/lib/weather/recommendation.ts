import type { WeatherData, WeatherRecommendation } from "./types";

export const weatherThresholds = {
  rainProbability: 40,
  relevantPrecipitation: 1,
  coldTemperature: 15,
  heatTemperature: 28,
};

export function getWeatherRecommendation(weather: WeatherData): WeatherRecommendation {
  if (
    weather.precipitationProbability !== null &&
    weather.precipitationProbability >= weatherThresholds.rainProbability ||
    weather.precipitation >= weatherThresholds.relevantPrecipitation
  ) {
    return {
      message: "Há possibilidade de chuva. Vale levar um guarda-chuva.",
      tone: "rain",
    };
  }

  if (
    weather.currentTemperature < weatherThresholds.coldTemperature ||
    weather.minimumTemperature < weatherThresholds.coldTemperature
  ) {
    return {
      message: "A temperatura deve ficar mais baixa. Leve um agasalho.",
      tone: "cold",
    };
  }

  if (weather.maximumTemperature >= weatherThresholds.heatTemperature) {
    return {
      message: "O dia pode ser quente. Lembre-se de beber água e se proteger do sol.",
      tone: "heat",
    };
  }

  return {
    message: "O tempo parece ameno para explorar Pelotas.",
    tone: "neutral",
  };
}
