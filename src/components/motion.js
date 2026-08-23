/**
 * サイト共通のframer-motion variantsプリセット。
 * イージングは2種に固定（出: EASE_OUT / 退: EASE_EXIT相当のdefault）。
 * fade-in-up一辺倒を避けるため、用途別のプリセットから選んで使う。
 * 値は「控えめ・短距離・気持ち速く」を基準にする。
 */
export const EASE_OUT = [0.22, 1, 0.36, 1];

/** ビュー切替（AnimatePresence直下）のコンテナ。staggerを画面ごとに調整できる */
export function makeViewContainer({ stagger = 0.1, delay = 0.1 } = {}) {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 0.4 },
    },
  };
}

/** ヒーロー内要素などの基本フェードアップ */
export const itemFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: EASE_OUT } },
};

/** セクション単位のフェードアップ（whileInView用） */
export const sectionFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** 左右からのスライドイン。zigzagショーケースの交互演出用 */
export function slideIn(fromX) {
  return {
    hidden: { opacity: 0, x: fromX },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  };
}

/** ぼかしを晴らしながら現れる。主役ビジュアル用（多用しない） */
export const blurIn = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};
