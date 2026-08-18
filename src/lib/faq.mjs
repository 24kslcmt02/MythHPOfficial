/**
 * FAQ データの整形・検索（FR-06）
 *
 * すべて純粋関数。引数の配列・オブジェクトは変更しない。
 *
 * ▼ 未確定の設問について
 * 事実確認が済んでいない設問は `answer` を空にし、下書きを `draftAnswer` に置く。
 * `answer` が空の設問は公開対象から自動的に外れるため、
 * 「確認していない情報がそのまま公開される」ことが構造的に起こらない。
 * 事実が確定したら draftAnswer の内容を確認・修正して answer に移すだけで公開される。
 * （明示的に伏せたい場合は `draft: true` を付けても除外される）
 */

/** 回答が確定しているか */
export function isPublished(item) {
  return item?.draft !== true && typeof item?.answer === "string" && item.answer.trim() !== "";
}

/** 公開対象の設問だけを取り出す */
export function publishedFaq(items, { includeDrafts = false } = {}) {
  if (!Array.isArray(items)) return [];
  return includeDrafts ? [...items] : items.filter(isPublished);
}

/** 確認待ちの設問（開発時のレビュー用） */
export function pendingFaq(items) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => !isPublished(item));
}

/** 表示用の回答テキスト（未確定なら下書きを返す） */
export function answerText(item) {
  return isPublished(item) ? item.answer : (item.draftAnswer ?? "");
}

/** カテゴリ単位にまとめる（元の出現順を保つ） */
export function groupByCategory(items) {
  if (!Array.isArray(items)) return [];
  const order = [];
  const buckets = new Map();

  for (const item of items) {
    const key = item.category ?? "その他";
    if (!buckets.has(key)) {
      buckets.set(key, []);
      order.push(key);
    }
    buckets.set(key, [...buckets.get(key), item]);
  }

  return order.map((category) => ({ category, items: buckets.get(category) }));
}

/** 質問文・回答文・カテゴリを横断して検索する */
export function searchFaq(items, query) {
  if (!Array.isArray(items)) return [];
  const keyword = typeof query === "string" ? query.trim().toLowerCase() : "";
  if (keyword === "") return [...items];

  return items.filter((item) =>
    [item.question, item.answer, item.draftAnswer, item.category, ...(item.keywords ?? [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(keyword)
  );
}

/** schema.org FAQPage の構造化データを組み立てる（NFR-03） */
export function faqToJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: publishedFaq(items).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** 設問へのアンカーID（URL から直接開くため） */
export function faqAnchorId(item) {
  return `q-${item.id}`;
}
