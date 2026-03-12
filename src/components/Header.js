"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header({ variant = "user", onViewModeChange }) {
  const isOperator = variant === "operator";

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <button 
          onClick={() => {
            onViewModeChange(isOperator ? "user" : "operator");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }} 
          className={styles.logo}
          style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left' }}
        >
          <Image src="/images/logo.jpg" alt="My-th" width={32} height={32} className={styles.logoImg} />
          <span className={styles.logoText}>My-th</span>
        </button>
        <nav className={styles.nav}>
          <button
            onClick={() => {
              onViewModeChange(isOperator ? "user" : "operator");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`btn btn-outline ${styles.switchBtn}`}
            style={{ cursor: 'pointer' }}
          >
            {isOperator ? "ファンの方はこちら" : "イベンター・運営の方はこちら"}
          </button>
        </nav>
      </div>
    </header>
  );
}
