import { describe, expect, it } from "vitest";
import { getFormattedPixKey, getPixPayload, getPixKey } from "./pix";

describe("Pix payload", () => {
  it("creates a valid payload with the configured phone key", () => {
    const payload = getPixPayload();
    expect(getPixKey()).toBe("44ad3513-ac05-4a96-a0eb-670fb8f2fe44");
    expect(getFormattedPixKey()).toBe("44ad3513-ac05-4a96-a0eb-670fb8f2fe44");
    expect(payload).toContain("BR.GOV.BCB.PIX");
    expect(payload).toMatch(/6304[0-9A-F]{4}$/);
  });
});
