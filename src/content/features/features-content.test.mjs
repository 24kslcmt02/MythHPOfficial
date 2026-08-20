import { test } from "node:test";
import assert from "node:assert/strict";
import { features, featureCategories } from "./index.js";
import { isPublishedFeature, publishedFeatures } from "../../lib/features.mjs";

const MIN_PUBLISHED = 28;

test("機能一覧: id が一意", () => {
  const ids = features.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length, `重複: ${ids.filter((id, i) => ids.indexOf(id) !== i)}`);
});

test("機能一覧: id は半角英数とハイフンのみ（URLアンカーに使うため）", () => {
  for (const item of features) assert.match(item.id, /^[a-z0-9-]+$/, item.id);
});

test("機能一覧: カテゴリが定義済みリストに存在する", () => {
  for (const item of features) {
    assert.ok(featureCategories.includes(item.category), `${item.id}: 未定義カテゴリ "${item.category}"`);
  }
});

test("機能一覧: 全機能に name と icon がある", () => {
  for (const item of features) {
    assert.ok(item.name?.trim(), `${item.id}: name が空`);
    assert.ok(item.icon?.trim(), `${item.id}: icon が空`);
  }
});

test("機能一覧: 公開機能は確認メモ（note）を持たない", () => {
  for (const item of features.filter(isPublishedFeature)) {
    assert.equal(item.note, undefined, `${item.id}: 公開済みなのに note が残っている`);
    assert.equal(item.draftDesc, undefined, `${item.id}: 公開済みなのに draftDesc が残っている`);
  }
});

test("機能一覧: 確認待ち機能は draftDesc と note を持つ", () => {
  for (const item of features.filter((i) => !isPublishedFeature(i))) {
    assert.ok(item.draftDesc?.trim(), `${item.id}: draftDesc がない`);
    assert.ok(item.note?.trim(), `${item.id}: note（確認事項）がない`);
  }
});

test("機能一覧: 公開機能に「○○」などの穴埋め記号が残っていない", () => {
  for (const item of features.filter(isPublishedFeature)) {
    assert.doesNotMatch(item.desc, /[○●◯]{2}|〇〇|XX|TODO/i, `${item.id}: 穴埋めが残っている`);
  }
});

test("機能一覧: オフライン受付・運用を可能と案内していない", () => {
  for (const item of features.filter(isPublishedFeature)) {
    assert.doesNotMatch(
      `${item.name} ${item.desc}`,
      /オフライン(でも|環境でも)?(受付|運用|安定)/,
      `${item.id}: オフライン運用を示唆する表現`
    );
  }
});

test("機能一覧: 入場特典券の配布に「登録済みグループのみ」の但し書きがある", () => {
  const benefit = features.find((item) => item.id === "benefit-digital");
  assert.ok(benefit, "benefit-digital がない");
  assert.match(benefit.limit ?? "", /登録済みグループのみ/);
});

test("機能一覧: 動員状況の共有に「登録済みグループのみ」の但し書きがある", () => {
  const share = features.find((item) => item.id === "attendance-share");
  assert.ok(share, "attendance-share がない");
  assert.match(share.limit ?? "", /登録済みグループのみ/);
});

test(`機能一覧: 公開数が ${MIN_PUBLISHED} 以上`, () => {
  assert.ok(
    publishedFeatures(features).length >= MIN_PUBLISHED,
    `公開 ${publishedFeatures(features).length} 件 < ${MIN_PUBLISHED}`
  );
});
