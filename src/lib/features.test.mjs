import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isPublishedFeature,
  publishedFeatures,
  pendingFeatures,
  featureDescText,
  groupFeaturesByCategory,
} from "./features.mjs";

const confirmed = { id: "a", category: "販売", name: "A", desc: "確定した説明" };
const draft = { id: "b", category: "販売", name: "B", desc: "", draftDesc: "下書き", note: "要確認" };
const hidden = { id: "c", category: "管理", name: "C", desc: "確定済みだが伏せる", draft: true };

test("isPublishedFeature: desc が空・draft:true は非公開", () => {
  assert.equal(isPublishedFeature(confirmed), true);
  assert.equal(isPublishedFeature(draft), false);
  assert.equal(isPublishedFeature(hidden), false);
  assert.equal(isPublishedFeature({ desc: "   " }), false);
  assert.equal(isPublishedFeature(undefined), false);
});

test("publishedFeatures: 公開対象のみ返し、元配列を変更しない", () => {
  const items = [confirmed, draft, hidden];
  const result = publishedFeatures(items);
  assert.deepEqual(result.map((i) => i.id), ["a"]);
  assert.equal(items.length, 3);
  assert.equal(publishedFeatures("not-array").length, 0);
});

test("publishedFeatures: includeDrafts で全件返す（開発表示用）", () => {
  assert.equal(publishedFeatures([confirmed, draft], { includeDrafts: true }).length, 2);
});

test("pendingFeatures: 確認待ちのみ返す", () => {
  assert.deepEqual(pendingFeatures([confirmed, draft, hidden]).map((i) => i.id), ["b", "c"]);
});

test("featureDescText: 未確定なら下書きを返す", () => {
  assert.equal(featureDescText(confirmed), "確定した説明");
  assert.equal(featureDescText(draft), "下書き");
  assert.equal(featureDescText({ id: "d", desc: "" }), "");
});

test("groupFeaturesByCategory: 出現順を保ってカテゴリごとにまとめる", () => {
  const grouped = groupFeaturesByCategory([confirmed, hidden, draft]);
  assert.deepEqual(grouped.map((g) => g.category), ["販売", "管理"]);
  assert.deepEqual(grouped[0].items.map((i) => i.id), ["a", "b"]);
});
