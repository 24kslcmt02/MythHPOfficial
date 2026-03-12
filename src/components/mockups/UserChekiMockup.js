"use client";

import styles from "./UserChekiMockup.module.css";
import { motion } from "framer-motion";

export default function UserChekiMockup() {
  const chekis = [
    { member: "桜井 美月", type: "ソロチェキ", event: "夏の定期公演", code: "CHK-0842", status: "有効" },
    { member: "藤田 はるか", type: "2ショット", event: "夏の定期公演", code: "CHK-0843", status: "有効" },
    { member: "鈴木 りん", type: "ソロチェキ", event: "個別握手会", code: "CHK-0844", status: "使用済" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className={styles.phone}>
      <div className={styles.notch} />
      <div className={styles.screen}>
        {/* App Header */}
        <div className={styles.appHeader}>
          <div className={styles.appLogo}>My-th</div>
          <div className={styles.headerTitle}>マイチェキ</div>
          <div className={styles.headerCount}>3枚</div>
        </div>

        {/* Filter Tabs */}
        <div className={styles.tabs}>
          <div className={`${styles.tab} ${styles.tabActive}`}>すべて</div>
          <div className={styles.tab}>有効</div>
          <div className={styles.tab}>使用済</div>
        </div>

        {/* Cheki List */}
        <motion.div
          className={styles.chekiList}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {chekis.map((c, i) => (
            <motion.div key={i} className={styles.chekiCard} variants={itemVariants}>
              <div className={styles.chekiPhoto}>
                <div className={styles.photoPlaceholder} />
              </div>
              <div className={styles.chekiInfo}>
                <div className={styles.chekiMember}>{c.member}</div>
                <div className={styles.chekiType}>{c.type} · {c.event}</div>
                <div className={styles.chekiCode}>{c.code}</div>
              </div>
              <div className={styles.chekiRight}>
                <div className={`${styles.chekiStatus} ${c.status === "有効" ? styles.active : styles.used}`}>
                  {c.status}
                </div>
                <div className={styles.qrMini}>
                  <div className={styles.qrPattern} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Navigation */}
        <div className={styles.bottomNav}>
          <div className={styles.navItem}>
            <div className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5.5L7 1.5L12 5.5V12H9V8.5H5V12H2V5.5Z" fill="#aaa" stroke="#aaa" strokeWidth="0.8"/></svg>
            </div>
            <span>ホーム</span>
          </div>
          <div className={styles.navItem}>
            <div className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="8" rx="1.5" fill="none" stroke="#aaa" strokeWidth="0.8"/><path d="M2 6H12" stroke="#aaa" strokeWidth="0.8"/></svg>
            </div>
            <span>チケット</span>
          </div>
          <div className={`${styles.navItem} ${styles.navActive}`}>
            <div className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1" width="10" height="12" rx="1.5" fill="none" stroke="#4AADE8" strokeWidth="0.8"/><circle cx="7" cy="6" r="2" fill="#4AADE8" opacity="0.3"/><rect x="4" y="10" width="6" height="1" rx="0.5" fill="#4AADE8" opacity="0.4"/></svg>
            </div>
            <span>チェキ</span>
          </div>
          <div className={styles.navItem}>
            <div className={styles.navIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="0.5" fill="#aaa" opacity="0.5"/><rect x="8" y="1" width="5" height="5" rx="0.5" fill="#aaa" opacity="0.5"/><rect x="1" y="8" width="5" height="5" rx="0.5" fill="#aaa" opacity="0.5"/><rect x="8" y="8" width="5" height="5" rx="0.5" fill="#aaa" opacity="0.5"/></svg>
            </div>
            <span>アルバム</span>
          </div>
        </div>
      </div>
    </div>
  );
}
