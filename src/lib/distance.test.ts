import { describe, expect, it } from "vitest";
import { getDistanceInKm } from "./distance";

describe("getDistanceInKm", () => {
  it("returns zero for the same coordinates", () => {
    expect(getDistanceInKm({ latitude: -31.77, longitude: -52.34 }, { latitude: -31.77, longitude: -52.34 })).toBe(0);
  });

  it("calculates the distance between two coordinates", () => {
    expect(getDistanceInKm({ latitude: 0, longitude: 0 }, { latitude: 0, longitude: 1 })).toBeCloseTo(111.2, 0);
  });
});
