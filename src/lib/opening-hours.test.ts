import { describe, expect, it } from "vitest";
import { getOpeningStatus, parseOpeningHours, serializeOpeningHours } from "./opening-hours";

describe("getOpeningStatus", () => {
  it("returns open inside a configured interval", () => {
    expect(getOpeningStatus({ friday: ["08:00-18:00"] }, new Date("2026-11-06T15:00:00.000Z"))).toBe("open");
  });

  it("returns closed outside configured intervals", () => {
    expect(getOpeningStatus({ friday: ["08:00-12:00", "14:00-18:00"] }, new Date("2026-11-06T16:00:00.000Z"))).toBe("closed");
  });

  it("does not show a status without a schedule", () => {
    expect(getOpeningStatus({}, new Date("2026-11-06T15:00:00.000Z"))).toBeUndefined();
  });

  it("accepts midnight as the start of an interval", () => {
    const hours = parseOpeningHours('{"friday":["00:00-23:59"]}');
    expect(serializeOpeningHours(hours)).toBe('{"friday":["00:00-23:59"]}');
  });

  it("accepts midnight as the end of an interval", () => {
    expect(parseOpeningHours('{"friday":["08:00-00:00"]}').friday).toEqual(["08:00-00:00"]);
  });
});
