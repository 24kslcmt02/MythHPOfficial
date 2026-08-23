import { test } from "node:test";
import assert from "node:assert/strict";
import { userFaq, userFaqCategories } from "./user.js";
import { organizerFaq, organizerFaqCategories } from "./organizer.js";
import { isPublished, publishedFaq } from "../../lib/faq.mjs";

const SETS = [
  { name: "購入者", items: userFaq, categories: userFaqCategories, minPublished: 26 },
  { name: "運営者", items: organizerFaq, categories: organizerFaqCategories, minPublished: 20 },
];

for (const { name, items, categories, minPublished } of SETS) {
  test(`${name}FAQ: id が一意`, () => {
    const ids = items.map((item) => item.id);
    assert.equal(new Set(ids).size, ids.length, `重複: ${ids.filter((id, i) => ids.indexOf(id) !== i)}`);
  });

  test(`${name}FAQ: id は半角英数とハイフンのみ（URLアンカーに使うため）`, () => {
    for (const item of items) assert.match(item.id, /^[a-z0-9-]+$/, item.id);
  });

  test(`${name}FAQ: カテゴリが定義済みリストに存在する`, () => {
    for (const item of items) {
      assert.ok(categories.includes(item.category), `${item.id}: 未定義カテゴリ "${item.category}"`);
    }
  });

  test(`${name}FAQ: 全設問に question がある`, () => {
    for (const item of items) assert.ok(item.question?.trim(), `${item.id}: question が空`);
  });

  test(`${name}FAQ: 公開設問は確認メモ（note）を持たない`, () => {
    for (const item of items.filter(isPublished)) {
      assert.equal(item.note, undefined, `${item.id}: 公開済みなのに note が残っている`);
      assert.equal(item.draftAnswer, undefined, `${item.id}: 公開済みなのに draftAnswer が残っている`);
    }
  });

  test(`${name}FAQ: 確認待ち設問は draftAnswer と note を持つ`, () => {
    for (const item of items.filter((i) => !isPublished(i))) {
      assert.ok(item.draftAnswer?.trim(), `${item.id}: draftAnswer がない`);
      assert.ok(item.note?.trim(), `${item.id}: note（確認事項）がない`);
    }
  });

  test(`${name}FAQ: 公開設問に「○○」などの穴埋め記号が残っていない`, () => {
    for (const item of items.filter(isPublished)) {
      assert.doesNotMatch(item.answer, /[○●◯]{2}|〇〇|XX|TODO/i, `${item.id}: 穴埋めが残っている`);
    }
  });

  test(`${name}FAQ: 公開数が ${minPublished} 以上`, () => {
    assert.ok(
      publishedFaq(items).length >= minPublished,
      `公開 ${publishedFaq(items).length} 件 < ${minPublished}`
    );
  });
}

test("購入者FAQ: SMS認証の設問は存在しない（メール認証のみのため）", () => {
  assert.ok(!userFaq.some((item) => item.id === "sms"));
});

test("運営者FAQ: オフライン受付を可能と案内していない", () => {
  const offline = organizerFaq.find((item) => item.id === "offline");
  assert.ok(offline, "offline 設問がない");
  assert.ok(isPublished(offline));
  assert.match(offline.answer, /通信/);
  assert.doesNotMatch(offline.answer, /オフライン(でも|環境でも)(受付|運用|安定)/);
});
