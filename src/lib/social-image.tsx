import { ImageResponse } from "next/og";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f7f3ea",
          color: "#29251f",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "#9b4f3d",
            borderRadius: "50%",
            color: "#f7f3ea",
            display: "flex",
            fontFamily: "Georgia",
            fontSize: 110,
            fontWeight: 700,
            height: 180,
            justifyContent: "center",
            width: 180,
          }}
        >
          C
        </div>
        <div style={{ color: "#9b4f3d", fontFamily: "Georgia", fontSize: 64, fontWeight: 700, marginTop: 32 }}>
          Cantos de Pelotas
        </div>
        <div style={{ color: "#756f65", fontSize: 30, marginTop: 18 }}>
          Descubra lugares, sabores e experiências.
        </div>
      </div>
    ),
    socialImageSize,
  );
}
