import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizePath, isRouteUnder, filterPublishedLinks } from "./route-visibility.mjs";

const UNPUBLISHED = ["/contact", "/news", "/guide"];

test("normalizePath: クエリ・ハッシュ・末尾スラッシュを取り除く", () => {
  assert.equal(normalizePath("/contact?type=organizer"), "/contact");
  assert.equal(normalizePath("/faq#q-withdraw"), "/faq");
  assert.equal(normalizePath("/news/"), "/news");
  assert.equal(normalizePath("/"), "/");
  assert.equal(normalizePath("/#contact"), "/");
});

test("normalizePath: 文字列以外・空文字は '/' として扱う", () => {
  assert.equal(normalizePath(""), "/");
  assert.equal(normalizePath(undefined), "/");
  assert.equal(normalizePath(null), "/");
});

test("isRouteUnder: 完全一致と配下パスを非公開と判定する", () => {
  assert.equal(isRouteUnder("/contact", UNPUBLISHED), true);
  assert.equal(isRouteUnder("/contact?type=organizer", UNPUBLISHED), true);
  assert.equal(isRouteUnder("/news/2026-08-launch", UNPUBLISHED), true);
  assert.equal(isRouteUnder("/guide/environment", UNPUBLISHED), true);
});

test("isRouteUnder: 前方一致だけでは非公開にしない（/newsletter は /news の配下ではない）", () => {
  assert.equal(isRouteUnder("/newsletter", UNPUBLISHED), false);
  assert.equal(isRouteUnder("/guidebook", UNPUBLISHED), false);
});

test("isRouteUnder: 公開ルートは影響を受けない", () => {
  assert.equal(isRouteUnder("/", UNPUBLISHED), false);
  assert.equal(isRouteUnder("/#contact", UNPUBLISHED), false);
  assert.equal(isRouteUnder("/operator#contact", UNPUBLISHED), false);
  assert.equal(isRouteUnder("/faq/organizer", UNPUBLISHED), false);
  assert.equal(isRouteUnder("/operator/features", UNPUBLISHED), false);
});

test("isRouteUnder: 非公開リストが空なら常に公開", () => {
  assert.equal(isRouteUnder("/contact", []), false);
});

test("filterPublishedLinks: 非公開ルートへのリンクだけを取り除き、元の配列は変更しない", () => {
  const links = Object.freeze([
    { href: "/faq", label: "FAQ" },
    { href: "/guide", label: "ガイド" },
    { href: "/contact?type=organizer", label: "お問い合わせ" },
    { href: "/operator#contact", label: "フォーム" },
  ]);
  const result = filterPublishedLinks(links, UNPUBLISHED);
  assert.deepEqual(
    result.map((link) => link.href),
    ["/faq", "/operator#contact"],
  );
  assert.equal(links.length, 4);
});
