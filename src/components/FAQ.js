"use client";
import { useState } from "react";
import styles from "./FAQ.module.css";

/**
 * シンプルなアコーディオン。LP内の抜粋表示に使う。
 * カテゴリ・検索付きの一覧は FaqBrowser を使う。
 */
export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={styles.faq}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        return (
          <div key={item.id ?? i} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
            <button
              type="button"
              className={styles.question}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span>{item.question}</span>
              <svg
                className={styles.chevron}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={styles.answer} id={panelId} role="region" hidden={!isOpen}>
              <div className={styles.answerInner}>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
