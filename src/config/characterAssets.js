/**
 * キャラクター・イラスト素材の単一ソース。
 *
 * 現行画像はAI生成のプレースホルダで、後日高品質版へ差し替え予定。
 * 差し替え時は public/images/ に新ファイルを置き、このファイルの
 * src / width / height だけを更新すれば全ページに反映される
 * （利用側は必ず CharacterImage コンポーネント経由で参照する）。
 */
export const characterAssets = {
  /** マイちゃん立ち絵（全身・透過PNG） */
  standing: {
    src: "/images/character.png",
    width: 1952,
    height: 2170,
    alt: "My-th 公式キャラクター マイちゃん",
  },
  /** マイちゃんミニ（ワンポイント用） */
  mini: {
    src: "/images/character_mini.png",
    width: 1952,
    height: 2170,
    alt: "",
  },
  /** チャットアバター用（顔まわりをcoverトリミングして使う） */
  avatar: {
    src: "/images/character.png",
    width: 1952,
    height: 2170,
    alt: "My-th AIガイド",
  },
  /** ステージ背景イラスト */
  stage: {
    src: "/images/stage-bg.jpg",
    width: 2730,
    height: 1536,
    alt: "",
  },
  /** コレクション（サブスク）キービジュアル */
  subscriptionKv: {
    src: "/images/kv-subscription-final-v3.png",
    width: 1024,
    height: 1024,
    alt: "コレクション機能",
  },
};
