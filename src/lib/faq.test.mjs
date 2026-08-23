import { test } from "node:test";
import assert from "node:assert/strict";
import {
  publishedFaq,
  pendingFaq,
  isPublished,
  answerText,
  groupByCategory,
  searchFaq,
  faqToJsonLd,
} from "./faq.mjs";

const items = [
  { id: "a1", category: "アカウント", question: "会員登録の方法は？", answer: "アプリから登録できます。" },
  { id: "a2", category: "アカウント", question: "退会したい", answer: "設定から退会できます。", draft: true },
  { id: "p1", category: "支払い", question: "手数料はいくら？", answer: "購入時に表示されます。" },
];

test("answer が空の項目は公開対象から除外される", () => {
  const withPending = [
    ...items,
    { id: "x1", category: "その他", question: "未確定の質問", answer: "", draftAnswer: "下書きです。" },
    { id: "x2", category: "その他", question: "回答なし", draftAnswer: "下書きです。" },
    { id: "x3", category: "その他", question: "空白のみ", answer: "   " },
  ];
  const published = publishedFaq(withPending);
  assert.ok(!published.some((i) => ["x1", "x2", "x3"].includes(i.id)));
  assert.equal(pendingFaq(withPending).length, 4); // a2(draft) + x1 + x2 + x3
});

test("isPublished / answerText の判定", () => {
  assert.equal(isPublished(items[0]), true);
  assert.equal(isPublished({ question: "q", answer: "" }), false);
  assert.equal(isPublished(undefined), false);
  assert.equal(answerText(items[0]), "アプリから登録できます。");
  assert.equal(answerText({ answer: "", draftAnswer: "下書き" }), "下書き");
  assert.equal(answerText({ question: "q" }), "");
});

test("draft の項目は公開対象から除外される", () => {
  const published = publishedFaq(items);
  assert.equal(published.length, 2);
  assert.ok(!published.some((i) => i.id === "a2"));
});

test("includeDrafts を指定すると draft も含む", () => {
  assert.equal(publishedFaq(items, { includeDrafts: true }).length, 3);
});

test("元の配列を変更しない（イミュータブル）", () => {
  const snapshot = JSON.parse(JSON.stringify(items));
  publishedFaq(items);
  groupByCategory(items);
  searchFaq(items, "登録");
  assert.deepEqual(items, snapshot);
});

test("カテゴリ順を保ったままグループ化する", () => {
  const groups = groupByCategory(items);
  assert.deepEqual(groups.map((g) => g.category), ["アカウント", "支払い"]);
  assert.equal(groups[0].items.length, 2);
});

test("空配列でも落ちない", () => {
  assert.deepEqual(groupByCategory([]), []);
  assert.deepEqual(searchFaq([], "x"), []);
  assert.deepEqual(publishedFaq([]), []);
});

test("質問文・回答文・カテゴリを横断して検索する", () => {
  assert.equal(searchFaq(items, "登録")[0].id, "a1");
  assert.equal(searchFaq(items, "設定から")[0].id, "a2");
  assert.equal(searchFaq([{ id: "d", question: "q", draftAnswer: "下書き本文" }], "下書き").length, 1);
  assert.equal(searchFaq(items, "支払い")[0].id, "p1");
});

test("検索語が空なら全件を返す", () => {
  assert.equal(searchFaq(items, "").length, items.length);
  assert.equal(searchFaq(items, "   ").length, items.length);
});

test("大文字小文字を区別しない", () => {
  const withEn = [{ id: "e1", category: "その他", question: "QRコードとは？", answer: "二次元コードです。" }];
  assert.equal(searchFaq(withEn, "qr").length, 1);
});

test("該当なしなら空配列", () => {
  assert.deepEqual(searchFaq(items, "存在しない語"), []);
});

test("faqToJsonLd は FAQPage 構造化データを返す", () => {
  const ld = faqToJsonLd(publishedFaq(items));
  assert.equal(ld["@type"], "FAQPage");
  assert.equal(ld.mainEntity.length, 2);
  assert.equal(ld.mainEntity[0]["@type"], "Question");
  assert.equal(ld.mainEntity[0].name, "会員登録の方法は？");
  assert.equal(ld.mainEntity[0].acceptedAnswer.text, "アプリから登録できます。");
});
