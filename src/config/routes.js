import { isRouteUnder } from "../lib/route-visibility.mjs";

/**
 * 公開保留ルート（編集が完了するまで本番に出さないページ）
 *
 * ここに載っているルートは、
 *   - ページ本体が 404 を返す（各 page.js が isRoutePublished で notFound() する）
 *   - sitemap.xml に載らない
 *   - Header / Footer / 各ページの導線から自動で外れる（contactHref / feesHref も参照）
 *
 * 配下のパスも含む（/news → /news/{slug}、/guide → /guide/environment）。
 * 編集が完了したページは、この配列から外すだけで公開される。ページ側の修正は不要。
 */
export const UNPUBLISHED_ROUTES = Object.freeze([
  "/company",
  "/contact",
  "/fees",
  "/guide",
  "/news",
  "/refund",
  "/security",
]);

/**
 * @param {string} pathname クエリ・ハッシュ付きでも可（例: "/contact?type=organizer"）
 * @returns {boolean}
 */
export function isRoutePublished(pathname) {
  return !isRouteUnder(pathname, UNPUBLISHED_ROUTES);
}

/**
 * お問い合わせ導線。/contact が非公開の間は、トップ（ファン向け）／運営者ページに
 * 埋め込まれている問い合わせフォーム（id="contact"）へ誘導する。
 * @param {"user" | "organizer"} [audience]
 * @returns {string}
 */
export function contactHref(audience = "user") {
  const isOrganizer = audience === "organizer";
  if (isRoutePublished("/contact")) {
    return isOrganizer ? "/contact?type=organizer" : "/contact";
  }
  return isOrganizer ? "/operator#contact" : "/#contact";
}

/**
 * 手数料の詳細導線。/fees が非公開の間は FAQ の該当設問へ誘導する。
 * @param {"user" | "organizer"} [audience]
 * @returns {string}
 */
export function feesHref(audience = "user") {
  const isOrganizer = audience === "organizer";
  if (isRoutePublished("/fees")) {
    return isOrganizer ? "/fees#organizer" : "/fees";
  }
  return isOrganizer ? "/faq/organizer#q-cost" : "/faq#q-buyer-fees";
}
