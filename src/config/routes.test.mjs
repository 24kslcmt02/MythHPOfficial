import { test } from "node:test";
import assert from "node:assert/strict";
import { UNPUBLISHED_ROUTES, isRoutePublished, contactHref, feesHref } from "./routes.js";
import { userFaq } from "../content/faq/user.js";
import { organizerFaq } from "../content/faq/organizer.js";
import { isPublished } from "../lib/faq.mjs";
import { normalizePath } from "../lib/route-visibility.mjs";

/** 本番で必ず到達できるべきルート（ここが崩れたら導線設計を見直す） */
const MUST_BE_PUBLISHED = ["/", "/operator", "/operator/features", "/faq", "/faq/organizer", "/subscription"];

test("UNPUBLISHED_ROUTES: 先頭スラッシュ付き・末尾スラッシュなし・クエリなしのパスのみ", () => {
  for (const route of UNPUBLISHED_ROUTES) {
    assert.match(route, /^\/[a-z0-9-]+(\/[a-z0-9-]+)*$/, `不正な書式: ${route}`);
  }
});

test("UNPUBLISHED_ROUTES: 重複がない", () => {
  assert.equal(new Set(UNPUBLISHED_ROUTES).size, UNPUBLISHED_ROUTES.length);
});

test("公開必須ルートは公開保留に含まれていない", () => {
  for (const route of MUST_BE_PUBLISHED) {
    assert.equal(isRoutePublished(route), true, `${route} が非公開になっている`);
  }
});

test("contactHref / feesHref は常に公開中のルートを返す", () => {
  for (const audience of ["user", "organizer"]) {
    assert.equal(isRoutePublished(contactHref(audience)), true, `contactHref(${audience})`);
    assert.equal(isRoutePublished(feesHref(audience)), true, `feesHref(${audience})`);
  }
});

test("/contact 非公開時の問い合わせ導線は、フォームが埋め込まれたページのアンカーを指す", () => {
  if (isRoutePublished("/contact")) return;
  assert.equal(contactHref("user"), "/#contact");
  assert.equal(contactHref("organizer"), "/operator#contact");
});

test("/fees 非公開時の手数料導線は、公開中のFAQ設問を指す", () => {
  if (isRoutePublished("/fees")) return;

  const anchorOf = (href) => href.split("#")[1];
  const publishedIds = (items) => new Set(items.filter(isPublished).map((item) => `q-${item.id}`));

  assert.equal(normalizePath(feesHref("user")), "/faq");
  assert.ok(publishedIds(userFaq).has(anchorOf(feesHref("user"))), "購入者FAQに該当設問がない");

  assert.equal(normalizePath(feesHref("organizer")), "/faq/organizer");
  assert.ok(publishedIds(organizerFaq).has(anchorOf(feesHref("organizer"))), "運営者FAQに該当設問がない");
});
