export const weekDays = [
  { key: "monday", label: "Segunda-feira" },
  { key: "tuesday", label: "Terça-feira" },
  { key: "wednesday", label: "Quarta-feira" },
  { key: "thursday", label: "Quinta-feira" },
  { key: "friday", label: "Sexta-feira" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" },
] as const;

export type WeekDayKey = (typeof weekDays)[number]["key"];
export type OpeningHours = Partial<Record<WeekDayKey, string[]>>;

const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d-(?:[01]\d|2[0-3]):[0-5]\d$/;

export function parseOpeningHours(value: string): OpeningHours {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error("Os horários de funcionamento estão inválidos.");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("Os horários de funcionamento estão inválidos.");
  }

  const result: OpeningHours = {};
  for (const { key } of weekDays) {
    const intervals = (parsed as Record<string, unknown>)[key];
    if (intervals === undefined) continue;
    if (!Array.isArray(intervals) || intervals.some((interval) => typeof interval !== "string" || !timePattern.test(interval) || !isValidInterval(interval))) {
      throw new Error("Use horários no formato HH:MM-HH:MM.");
    }
    if (intervals.length) result[key] = intervals;
  }
  return result;
}

export function serializeOpeningHours(hours: OpeningHours): string {
  const completeHours: OpeningHours = {};
  for (const { key } of weekDays) {
    const completeIntervals = (hours[key] ?? []).filter((interval) => isCompleteInterval(interval));
    if (completeIntervals.length) completeHours[key] = completeIntervals;
  }
  return JSON.stringify(completeHours);
}

export function getOpeningStatus(hours: OpeningHours, now: Date): "open" | "closed" | undefined {
  const dayKey = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "long" })
    .format(now)
    .toLowerCase() as WeekDayKey;
  const intervals = hours[dayKey];
  if (!intervals?.length) return undefined;

  const currentTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now);
  const currentMinutes = toMinutes(currentTime);

  return intervals.some((interval) => {
    const [start, end] = interval.split("-");
    return currentMinutes >= toMinutes(start) && currentMinutes < toEndMinutes(end);
  })
    ? "open"
    : "closed";
}

function toMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function isValidInterval(value: string): boolean {
  const [start, end] = value.split("-");
  return toMinutes(start) < toEndMinutes(end);
}

function isCompleteInterval(value: string): boolean {
  return timePattern.test(value);
}

function toEndMinutes(value: string): number {
  return value === "00:00" ? 24 * 60 : toMinutes(value);
}
