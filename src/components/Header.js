"use client";
import Image from "next/image";
import styles from "./Header.module.css";

import { useRouter } from "next/navigation";

export default function Header({ variant = "user", onViewModeChange }) {
  const isUser = variant === "user";
  const isOperator = variant === "operator";
  const router = useRouter();

  const handleViewChange = (mode) => {
    if (onViewModeChange) {
      if (variant !== mode) {
        onViewModeChange(mode);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.push("/");
    }
  };

  const handleLogoClick = () => {
    if (onViewModeChange) {
      onViewModeChange(isOperator ? "user" : "operator");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button 
          onClick={handleLogoClick} 
          className={styles.logo}
        >
          <Image src="/images/Mythlogo.svg" alt="My-th" width={150} height={150} quality={100} className={styles.logoImg} />
          <span className={styles.logoText}>My-th</span>
        </button>
        <nav className={styles.nav}>
          <button
            onClick={() => handleViewChange("user")}
            className={`${styles.navBtn} ${isUser ? styles.active : ""}`}
            aria-current={isUser ? "page" : undefined}
          >
            ファンの方はこちら
          </button>
          <button
            onClick={() => handleViewChange("operator")}
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
