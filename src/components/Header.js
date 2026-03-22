"use client";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header({ variant = "user", onViewModeChange }) {
  const isUser = variant === "user";
  const isOperator = variant === "operator";

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button 
          onClick={() => {
            onViewModeChange(isOperator ? "user" : "operator");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          className={styles.logo}
        >
          <Image src="/images/logo.jpg" alt="My-th" width={32} height={32} className={styles.logoImg} />
          <span className={styles.logoText}>My-th</span>
        </button>
        <nav className={styles.nav}>
          <button
            onClick={() => {
              if (!isUser) {
                onViewModeChange("user");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={`${styles.navBtn} ${isUser ? styles.active : ""}`}
            aria-current={isUser ? "page" : undefined}
          >
            ファンの方はこちら
          </button>
          <button
            onClick={() => {
              if (!isOperator) {
                onViewModeChange("operator");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={`${styles.navBtn} ${isOperator ? styles.active : ""}`}
            aria-current={isOperator ? "page" : undefined}
          >
            イベンター・運営の方はこちら
          </button>
        </nav>
      </div>
    </header>
  );
}
