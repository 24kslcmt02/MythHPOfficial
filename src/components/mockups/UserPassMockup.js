"use client";

import styles from "./UserPassMockup.module.css";
import { motion } from "framer-motion";

export default function UserPassMockup() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const checkVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className={styles.phone}>
      <div className={styles.notch} />
      <div className={styles.screen}>
        {/* App Header */}
        <div className={styles.appHeader}>
          <div className={styles.backBtn}>←</div>
          <div className={styles.headerTitle}>入場特典</div>
          <div />
        </div>

        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {/* Success Badge */}
          <motion.div className={styles.successArea} variants={itemVariants}>
            <motion.div className={styles.checkCircle} variants={checkVariants}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" fill="#16a34a"/>
                <path d="M6 10L9 13L14 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <div className={styles.successText}>特典を受け取りました！</div>
            <div className={styles.successSub}>夏の定期公演 Vol.12</div>
          </motion.div>

          {/* Received Pass Card */}
          <motion.div className={styles.passCard} variants={itemVariants}>
            <div className={styles.passGradient}>
              <div className={styles.passLabel}>限定特典</div>
              <div className={styles.passTitle}>ソロチェキ券</div>
              <div className={styles.passMember}>桜井 美月</div>
              <div className={styles.passExpiry}>有効期限: 2024.08.15</div>
            </div>
            <div className={styles.passQrArea}>
              <div className={styles.passQr}>
                <div className={styles.qrPattern} />
              </div>
              <div className={styles.passCode}>PASS-2408-0129</div>
            </div>
          </motion.div>

          {/* Flow Indicator */}
          <motion.div className={styles.flowIndicator} variants={itemVariants}>
            <div className={styles.flowStep}>
              <div className={`${styles.flowDot} ${styles.flowDone}`}>✓</div>
              <span>入場</span>
            </div>
            <div className={styles.flowLine} />
            <div className={styles.flowStep}>
              <div className={`${styles.flowDot} ${styles.flowDone}`}>✓</div>
              <span>QR認証</span>
            </div>
            <div className={styles.flowLine} />
            <div className={styles.flowStep}>
              <div className={`${styles.flowDot} ${styles.flowCurrent}`}>★</div>
              <span>特典受取</span>
            </div>
          </motion.div>

          {/* Hint */}
          <motion.div className={styles.hint} variants={itemVariants}>
            アルバムにも自動で保存されました
          </motion.div>
        </motion.div>

        {/* Bottom Navigation */}
        <div className={styles.bottomNav}>
          <div className={styles.navItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5.5L7 1.5L12 5.5V12H9V8.5H5V12H2V5.5Z" fill="#aaa" stroke="#aaa" strokeWidth="0.8"/></svg>
            <span>ホーム</span>
          </div>
          <div className={styles.navItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="8" rx="1.5" fill="none" stroke="#aaa" strokeWidth="0.8"/><path d="M2 6H12" stroke="#aaa" strokeWidth="0.8"/></svg>
            <span>チケット</span>
          </div>
          <div className={styles.navItem}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" fill="none" stroke="#aaa" strokeWidth="0.8"/><circle cx="7" cy="6" r="2" fill="#aaa" opacity="0.3"/></svg>
            <span>チェキ</span>
          </div>
          <div className={`${styles.navItem} ${styles.navActive}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="0.5" fill="#4AADE8" opacity="0.5"/><rect x="8" y="1" width="5" height="5" rx="0.5" fill="#4AADE8" opacity="0.5"/><rect x="1" y="8" width="5" height="5" rx="0.5" fill="#4AADE8" opacity="0.5"/><rect x="8" y="8" width="5" height="5" rx="0.5" fill="#4AADE8" opacity="0.5"/></svg>
            <span>アルバム</span>
          </div>
        </div>
      </div>
    </div>
  );
}
