/**
 * 機能一覧データの整形（/operator/features）
 *
 * すべて純粋関数。引数の配列・オブジェクトは変更しない。
 *
 * ▼ 未確認の機能について（FAQと同じ規約）
 * 事実確認が済んでいない機能は `desc` を空にし、下書きを `draftDesc` に置く。
 * `desc` が空の機能は公開対象から自動的に外れるため、
 * 「確認していない機能がそのまま公開される」ことが構造的に起こらない。
 * 確定したら draftDesc を確認・修正して desc に移すだけで公開される。
 * （明示的に伏せたい場合は `draft: true` を付けても除外される）
 */

import { groupByCategory } from "./faq.mjs";

/** 機能の説明が確定しているか */
export function isPublishedFeature(item) {
  return item?.draft !== true && typeof item?.desc === "string" && item.desc.trim() !== "";
}

/** 公開対象の機能だけを取り出す */
export function publishedFeatures(items, { includeDrafts = false } = {}) {
  if (!Array.isArray(items)) return [];
  return includeDrafts ? [...items] : items.filter(isPublishedFeature);
}

/** 確認待ちの機能（開発時のレビュー用） */
export function pendingFeatures(items) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => !isPublishedFeature(item));
}

/** 表示用の説明テキスト（未確定なら下書きを返す） */
export function featureDescText(item) {
  return isPublishedFeature(item) ? item.desc : (item.draftDesc ?? "");
}

/** カテゴリ単位にまとめる（faq.mjs の groupByCategory を共用。元の出現順を保つ） */
export function groupFeaturesByCategory(items) {
  return groupByCategory(items);
}
