export type WeatherData = {
  currentTemperature: number;
  currentWeatherCode: number;
  precipitationProbability: number | null;
  precipitation: number;
  minimumTemperature: number;
  maximumTemperature: number;
  updatedAt: string;
};

export type WeatherRecommendation = {
  message: string;
  tone: "neutral" | "rain" | "cold" | "heat";
};
