import { describe, expect, it } from "vitest";
import { getWeatherRecommendation } from "./recommendation";
import type { WeatherData } from "./types";

const weather = (overrides: Partial<WeatherData>): WeatherData => ({
  currentTemperature: 20,
  currentWeatherCode: 0,
  precipitationProbability: 0,
  precipitation: 0,
  minimumTemperature: 18,
  maximumTemperature: 24,
  updatedAt: "2026-11-06T09:00",
  ...overrides,
});

describe("getWeatherRecommendation", () => {
  it("recomenda guarda-chuva quando a probabilidade de chuva atinge o limite", () => {
    expect(getWeatherRecommendation(weather({ precipitationProbability: 40 })).tone).toBe("rain");
  });

  it("recomenda agasalho quando a mínima está abaixo do limite", () => {
    expect(getWeatherRecommendation(weather({ minimumTemperature: 14 })).tone).toBe("cold");
  });

  it("recomenda proteção no calor", () => {
    expect(getWeatherRecommendation(weather({ maximumTemperature: 28 })).tone).toBe("heat");
  });

  it("retorna uma recomendação neutra em condições amenas", () => {
    expect(getWeatherRecommendation(weather({})).tone).toBe("neutral");
  });
});
