"use client";
import { useState } from "react";
import styles from "./FAQ.module.css";

export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={styles.faq}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`${styles.item} ${openIndex === i ? styles.open : ""}`}
        >
          <button
            className={styles.question}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            <svg
              className={styles.chevron}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
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
          <div className={styles.answer}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
