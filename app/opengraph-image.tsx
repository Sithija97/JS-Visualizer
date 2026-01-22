import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0b0f19",
        color: "#f8fafc",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 64,
        fontWeight: 700,
        textAlign: "center",
        padding: "0 80px",
      }}
    >
      <div style={{ fontSize: 72 }}>JavaScript Event Loop</div>
      <div style={{ fontSize: 40, color: "#93c5fd", marginTop: 24 }}>
        Visualizer • Call Stack • Microtasks • Macrotasks
      </div>
    </div>,
    size,
  );
}
