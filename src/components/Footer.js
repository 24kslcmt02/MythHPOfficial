"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer({ variant = "user", onViewModeChange }) {
  const isOperator = variant === "operator";
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <Image src="/images/Mythlogo.svg" alt="My-th" width={32} height={32} className={styles.logoImg} />
            <span className={styles.logoText}>My-th</span>
          </div>
          <p className={styles.tagline}>すべての体験をつなぐ アイドルOS</p>
        </div>
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>サービス</h4>
            <button
              onClick={() => {
                onViewModeChange("user");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}
            >ファンの方はこちら</button>
            <button
              onClick={() => {
                onViewModeChange("operator");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}
            >イベンター・運営の方はこちら</button>
          </div>
          <div className={styles.linkGroup}>
            <h4>サポート</h4>
            <button
              onClick={() => {
                if (!isOperator) {
                  onViewModeChange("operator");
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}
            >
              お問い合わせ
            </button>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; 2026 My-th. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
