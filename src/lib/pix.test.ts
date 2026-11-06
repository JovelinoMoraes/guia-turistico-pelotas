import { describe, expect, it } from "vitest";
import { getFormattedPixKey, getPixPayload, getPixKey } from "./pix";

describe("Pix payload", () => {
  it("creates a valid payload with the configured phone key", () => {
    const payload = getPixPayload();
    expect(getPixKey()).toBe("+5553981449916");
    expect(getFormattedPixKey()).toBe("(53) 98144-9916");
    expect(payload).toContain("BR.GOV.BCB.PIX");
    expect(payload).toMatch(/6304[0-9A-F]{4}$/);
  });
});
