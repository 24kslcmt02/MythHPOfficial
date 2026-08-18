import { Outfit, Noto_Sans_JP, Jost } from "next/font/google";
import "./globals.css";
import { site, company, contact, stores } from "@/config/site";

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

const TITLE = "My-th（マイス）| すべての体験をつなぐ アイドルOS";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: "%s",
  },
  description: site.description,
  keywords: ["My-th", "マイス", "アイドル", "チェキ", "チケット", "イベント管理", "デジタル券"],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: site.description,
    type: "website",
    locale: "ja_JP",
    siteName: "My-th",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: site.description,
  },
};

/** サイト全体で共通の Organization 構造化データ（NFR-03） */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: company.nameEn,
  url: site.url,
  email: contact.email,
  ...(contact.tel ? { telephone: contact.tel } : {}),
  sameAs: [stores.appStore, stores.googlePlay],
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "My-th",
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "iOS, Android",
  description: site.description,
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={`${outfit.variable} ${notoSansJP.variable} ${logoFont.variable}`}>
      <body style={{ fontFamily: "var(--font-body), sans-serif" }}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
        />
      </body>
    </html>
  );
}
