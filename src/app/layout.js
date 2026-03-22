import { Outfit, Noto_Sans_JP, Jost } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const logoFont = Jost({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "My-th（マイス）| すべての体験をつなぐ アイドルOS",
  description:
    "チェキ券・チケット・入場特典・売上管理をひとつに統合。アイドル運営のアナログをゼロにする業界特化OSアプリ。",
  keywords: ["My-th", "マイス", "アイドル", "チェキ", "チケット", "イベント管理", "デジタル券"],
  openGraph: {
    title: "My-th（マイス）| すべての体験をつなぐ アイドルOS",
    description:
      "チェキ券・チケット・入場特典・売上管理をひとつに統合。アイドル運営のアナログをゼロにする業界特化OSアプリ。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${outfit.variable} ${notoSansJP.variable} ${logoFont.variable}`}>
      <body style={{ fontFamily: "var(--font-body), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
