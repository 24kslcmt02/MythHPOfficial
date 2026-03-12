"use client";

import styles from "./ChekiMockup.module.css";
import { motion } from "framer-motion";

export default function ChekiMockup() {
  const chekiCards = [
    { member: "桜井 美月", type: "ソロチェキ", status: "有効", price: "¥2,000", code: "CHK-0842" },
    { member: "藤田 はるか", type: "2ショット", status: "有効", price: "¥3,000", code: "CHK-0843" },
    { member: "鈴木 りん", type: "ソロチェキ", status: "使用済", price: "¥2,000", code: "CHK-0844" },
    { member: "佐藤 あいり", type: "ソロチェキ", status: "有効", price: "¥2,000", code: "CHK-0845" },
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
    <div className={styles.container}>
      {/* Mini Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon} />
          <div className={styles.logoText} />
        </div>
        <nav className={styles.sidebarNav}>
          <div className={styles.navItem} />
          <div className={`${styles.navItem} ${styles.navActive}`}>
            <div className={styles.navDot} />
            <div className={styles.navLabel}>チェキ管理</div>
          </div>
          <div className={styles.navItem} />
          <div className={styles.navItem} />
          <div className={styles.navItem} />
        </nav>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>チェキ券管理</div>
          <div className={styles.headerActions}>
            <div className={styles.btnOutline}>+ 新規発行</div>
          </div>
        </div>

        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {/* Stats Row */}
          <div className={styles.statsRow}>
            <div className={styles.miniStat}>
              <span className={styles.miniStatLabel}>発行済み</span>
              <span className={styles.miniStatValue}>248枚</span>
            </div>
            <div className={styles.miniStat}>
              <span className={styles.miniStatLabel}>使用済み</span>
              <span className={styles.miniStatValue}>186枚</span>
            </div>
            <div className={styles.miniStat}>
              <span className={styles.miniStatLabel}>有効</span>
              <span className={`${styles.miniStatValue} ${styles.activeValue}`}>62枚</span>
            </div>
          </div>

          {/* Cheki Cards Grid */}
          <div className={styles.chekiGrid}>
            {chekiCards.map((card, i) => (
              <motion.div key={i} className={styles.chekiCard} variants={itemVariants}>
                <div className={styles.qrArea}>
                  {/* CSS QR Code Pattern */}
                  <div className={styles.qrCode}>
                    <div className={styles.qrPattern} />
                  </div>
                  {i === 0 && <div className={styles.scanLine} />}
                </div>
                <div className={styles.chekiInfo}>
                  <div className={styles.chekiMember}>{card.member}</div>
                  <div className={styles.chekiMeta}>
                    <span>{card.type}</span>
                    <span className={styles.chekiCode}>{card.code}</span>
                  </div>
                  <div className={styles.chekiBottom}>
                    <span className={styles.chekiPrice}>{card.price}</span>
                    <span className={`${styles.chekiStatus} ${card.status === "使用済" ? styles.used : styles.valid}`}>
                      {card.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
