"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, CircleHelp } from "lucide-react";
import styles from "./Header.module.css";

const HELP_LINKS = [
  { href: "/faq", label: "よくある質問（購入者）" },
  { href: "/faq/organizer", label: "よくある質問（運営者）" },
  { href: "/guide", label: "使い方ガイド" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header({ variant = "user", onViewModeChange }) {
  const isUser = variant === "user";
  const isOperator = variant === "operator";
  const router = useRouter();

  const [helpOpen, setHelpOpen] = useState(false);
  const helpRef = useRef(null);

  // メニュー外クリック・Escape で閉じる（NFR-04）
  useEffect(() => {
    if (!helpOpen) return undefined;

    const handlePointerDown = (event) => {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setHelpOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setHelpOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [helpOpen]);

  // トップページ（SPA）ではビュー切替、それ以外のページではルート遷移
  const goToView = (mode) => {
    if (onViewModeChange) {
      if (variant !== mode) {
        onViewModeChange(mode);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    router.push(mode === "operator" ? "/operator" : "/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="My-th ホーム">
          <Image
            src="/images/Mythlogo.svg"
            alt=""
            width={150}
            height={150}
            quality={100}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>My-th</span>
        </Link>

        <nav className={styles.nav} aria-label="メインナビゲーション">
          <button
            type="button"
            onClick={() => goToView("user")}
            className={`${styles.navBtn} ${isUser ? styles.active : ""}`}
            aria-current={isUser ? "page" : undefined}
          >
            ファンの方はこちら
          </button>
          <button
            type="button"
            onClick={() => goToView("operator")}
            className={`${styles.navBtn} ${isOperator ? styles.active : ""}`}
            aria-current={isOperator ? "page" : undefined}
          >
            イベンター・運営の方はこちら
          </button>

          <div className={styles.help} ref={helpRef}>
            <button
              type="button"
              className={`${styles.helpBtn} ${helpOpen ? styles.helpBtnOpen : ""}`}
              onClick={() => setHelpOpen((open) => !open)}
              aria-expanded={helpOpen}
              aria-haspopup="true"
              aria-controls="header-help-menu"
            >
              <CircleHelp size={15} aria-hidden="true" />
              <span className={styles.helpLabel}>ヘルプ</span>
              <ChevronDown
                size={13}
                aria-hidden="true"
                className={`${styles.helpChevron} ${helpOpen ? styles.helpChevronOpen : ""}`}
              />
            </button>
            {helpOpen && (
              <ul className={styles.helpMenu} id="header-help-menu">
                {HELP_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={() => setHelpOpen(false)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
