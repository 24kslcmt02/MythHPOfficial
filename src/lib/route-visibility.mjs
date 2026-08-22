/**
 * ルート公開判定（純粋関数）。
 *
 * 「編集が終わるまで本番に出さないページ」を src/config/routes.js の
 * UNPUBLISHED_ROUTES で宣言し、ページ本体（notFound）・sitemap・Header/Footer の
 * 導線がすべてこのモジュールの判定に従う。判定ロジックはここだけに置く。
 */

/**
 * href からクエリ・ハッシュ・末尾スラッシュを取り除き、比較用のパスに正規化する。
 * @param {string | null | undefined} href
 * @returns {string}
 */
export function normalizePath(href) {
  if (typeof href !== "string" || href === "") return "/";
  const withoutQuery = href.split(/[?#]/, 1)[0];
  const trimmed = withoutQuery.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/**
 * pathname が roots のいずれかと一致、またはその配下（"/" 区切り）にあるか。
 * 単純な前方一致ではなく区切りを見るので、/news は /newsletter を巻き込まない。
 * @param {string} pathname
 * @param {readonly string[]} roots
 * @returns {boolean}
 */
export function isRouteUnder(pathname, roots) {
  const path = normalizePath(pathname);
  return roots.some((root) => {
    const base = normalizePath(root);
    return path === base || path.startsWith(`${base}/`);
  });
}

/**
 * href を持つリンク一覧から、非公開ルートへのリンクを取り除いた新しい配列を返す。
 * @template {{ href: string }} T
 * @param {readonly T[]} links
 * @param {readonly string[]} unpublishedRoots
 * @returns {T[]}
 */
export function filterPublishedLinks(links, unpublishedRoots) {
  return links.filter((link) => !isRouteUnder(link.href, unpublishedRoots));
}
