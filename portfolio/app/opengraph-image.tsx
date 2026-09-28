import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share image generated at build time — no binary asset to maintain. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0b",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#f4f4f5",
              color: "#0a0a0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {site.name.charAt(0)}
          </div>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "#f26b3a", letterSpacing: 4, textTransform: "uppercase" }}>{site.role}</div>
          <div style={{ fontSize: 72, lineHeight: 1.05, marginTop: 20, letterSpacing: -2, maxWidth: 950 }}>
            I build digital products that feel as good as they work.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
