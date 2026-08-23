import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = "My-th（マイス）| すべての体験をつなぐ アイドルOS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** SNSシェア時に表示されるカード画像（NFR-01） */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background:
            "linear-gradient(135deg, #FFFDF0 0%, #FAFBFE 45%, #EAF5FD 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 30,
            fontWeight: 700,
            color: "#0F172A",
            letterSpacing: 2,
          }}
        >
          <div
            style={{
              width: 18,
              height: 54,
              borderRadius: 9,
              background: "#F5D623",
              display: "flex",
            }}
          />
          My-th
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 68,
            fontWeight: 800,
            color: "#0F172A",
            lineHeight: 1.25,
            display: "flex",
          }}
        >
          すべての体験をつなぐ
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "#0F172A",
            lineHeight: 1.25,
            display: "flex",
          }}
        >
          アイドルOS
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 27,
            color: "#475569",
            lineHeight: 1.6,
            display: "flex",
          }}
        >
          チケット・チェキ券・入場特典をひとつのアプリに
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 23,
            color: "#94A3B8",
            display: "flex",
          }}
        >
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    size
  );
}
