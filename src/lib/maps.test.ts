import { describe, expect, it } from "vitest";
import { getMapUrl } from "./maps";

describe("getMapUrl", () => {
  it("prioriza coordenadas quando disponíveis", () => {
    expect(getMapUrl({ address: "endereço ignorado", latitude: -31.77, longitude: -52.34 }))
      .toBe("https://www.google.com/maps/dir/?api=1&destination=-31.77%2C-52.34");
  });

  it("gera busca codificada para endereço", () => {
    expect(getMapUrl({ address: "Praça José Bonifácio, 15, Pelotas - RS" }))
      .toBe("https://www.google.com/maps/dir/?api=1&destination=Pra%C3%A7a%20Jos%C3%A9%20Bonif%C3%A1cio%2C%2015%2C%20Pelotas%20-%20RS");
  });

  it("não gera link quando não há localização", () => {
    expect(getMapUrl({})).toBeUndefined();
  });
});
