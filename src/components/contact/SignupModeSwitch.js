"use client";

import styles from "./InquiryForm.module.css";

/** 運営者ページの問い合わせフォーム上部に置く2択タブ */
export const FORM_MODES = Object.freeze([
  { key: "inquiry", label: "導入のご相談・お問い合わせ" },
  { key: "signup", label: "無料で会員登録" },
]);

/**
 * 「お問い合わせ」と「会員登録申請」を同じフォーム内で切り替えるタブ。
 * 会員登録の案内や定型本文は signup モードのときだけ表示され、通常の問い合わせには出ない。
 *
 * @param {object} props
 * @param {"inquiry" | "signup"} props.mode 現在のモード
 * @param {(mode: "inquiry" | "signup") => void} props.onChange
 */
export default function SignupModeSwitch({ mode, onChange }) {
  return (
    <div className={styles.typeSwitch} role="group" aria-label="お問い合わせの種類">
      {FORM_MODES.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`${styles.typeBtn} ${mode === item.key ? styles.typeBtnActive : ""}`}
          onClick={() => onChange(item.key)}
          aria-pressed={mode === item.key}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
