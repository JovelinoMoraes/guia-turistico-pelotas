import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#9b4f3d",
          borderRadius: 38,
          color: "#f7f3ea",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Georgia",
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ fontSize: 92, lineHeight: 1 }}>C</div>
        <div style={{ fontSize: 18, letterSpacing: 2 }}>PELOTAS</div>
      </div>
    ),
    size,
  );
}
