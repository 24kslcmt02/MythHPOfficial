"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CollectionMockup from "@/components/mockups/CollectionMockup";
import styles from "../app/subscription/page.module.css";

const COLLECTION_URL = "https://user.my-th.jp/collection";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="1" y="1" width="11" height="11" rx="2" fill="var(--color-primary-subtle)" stroke="var(--color-primary)" strokeWidth="1.5"/>
        <rect x="16" y="1" width="11" height="11" rx="2" fill="var(--color-secondary-subtle)" stroke="var(--color-secondary)" strokeWidth="1.5"/>
        <rect x="1" y="16" width="11" height="11" rx="2" fill="var(--color-secondary-subtle)" stroke="var(--color-secondary)" strokeWidth="1.5"/>
        <rect x="16" y="16" width="11" height="11" rx="2" fill="var(--color-primary-subtle)" stroke="var(--color-primary)" strokeWidth="1.5"/>
        <path d="M14 5V23M5 14H23" stroke="var(--color-primary)" strokeWidth="1" opacity="0.3"/>
      </svg>
    ),
    title: "無制限に思い出を登録",
    description: "大切なチェキ券やピクチャーチケットを、デジタルでまとめて振り返ることができます。思い出を、より見やすく残せます。",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="18" rx="3" fill="var(--color-secondary-subtle)" stroke="var(--color-secondary)" strokeWidth="1.5"/>
        <circle cx="9" cy="12" r="2" fill="var(--color-secondary)" opacity="0.4"/>
        <rect x="14" y="10" width="8" height="1.5" rx="0.75" fill="var(--color-secondary)" opacity="0.3"/>
        <rect x="14" y="13" width="6" height="1.5" rx="0.75" fill="var(--color-secondary)" opacity="0.2"/>
        <rect x="6" y="17" width="16" height="1.5" rx="0.75" fill="var(--color-primary)" opacity="0.15"/>
        <rect x="6" y="20" width="10" height="1.5" rx="0.75" fill="var(--color-primary)" opacity="0.1"/>
      </svg>
    ),
    title: "詳細データで思い出を振り返り",
    description: "撮影日や使用したイベントなどの情報とあわせて、思い出を振り返ることができます。一枚一枚の記録を、より深く楽しめます。",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L17 11H24L18.5 15.5L20.5 23L14 18.5L7.5 23L9.5 15.5L4 11H11L14 4Z" stroke="var(--color-primary)" strokeWidth="1.5" fill="var(--color-primary-subtle)" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="3" fill="var(--color-primary)" opacity="0.3"/>
      </svg>
    ),
    title: "推しに会えるチャンスをもっと",
    description: "対象商品の抽選申込は、対象会員向けに提供されます。チェキ券やチケットの楽しみ方を、さらに広げることができます。",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function SubscriptionView() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image 
            src="/images/kv-subscription-final-v2.png" 
            alt="My-th Collection Key Visual" 
            legacyBehavior={false}
            fill 
            sizes="100vw"
            quality={90}
            priority
            className={styles.heroBgImage} 
          />
          <div className={styles.heroBgOverlay}></div>
        </div>
        
        <div className={`container ${styles.heroInner}`}>
          <motion.div className={styles.heroContent} variants={containerVariants}>
            <motion.p variants={itemVariants} className={styles.heroLabel}>COLLECTION</motion.p>
            <motion.h1 variants={itemVariants} className={styles.heroTitle}>
              チェキ券をもっと
              <br className="brSp" />
              <span className={styles.heroAccent}>特別なものに</span>
            </motion.h1>
            <motion.p variants={itemVariants} className={styles.heroDesc}>
              一枚一枚に込められた大切な思い出。
              <br />
              唯一無二のデジタルコレクションとして、
              <br className="brPc" />
              今までとは違う楽しみ方ができる
              <br className="brSp" />
              特別なコレクション機能をお届けします。
            </motion.p>
            <motion.div variants={itemVariants} className={styles.heroPriceTag}>
              <span className={styles.priceLabel}>月額</span>
              <span className={styles.priceAmount}>¥500</span>
              <span className={styles.priceTax}>（税込）</span>
            </motion.div>
            <motion.div variants={itemVariants} className={styles.heroBtns}>
              <a href={COLLECTION_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                コレクションを利用する
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <motion.section
        className={`section ${styles.features}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2>コレクション機能で広がる楽しみ</h2>
            <p>サブスクリプション会員だけが使える、3つの特典</p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.featureIconWrap}>
                  {f.icon}
                </div>
                <div className={styles.featureNumber}>
                  <span>0{i + 1}</span>
                </div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Visual Demo */}
      <motion.section
        className={`section ${styles.demo}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className={`container ${styles.demoInner}`}>
          <div className={styles.demoVisual}>
            <div className={styles.screenshotPhone}>
              <Image
                src="/images/screenshots/screenshot-collection.webp"
                alt="コレクション画面"
                width={280}
                height={607}
                unoptimized
                className={styles.screenshotImg}
              />
            </div>
          </div>
          <div className={styles.demoContent}>
            <span className="section-label">How it works</span>
            <h2>あなただけの
              <br className="brSp" />
              コレクション</h2>
            <div className={styles.demoSteps}>
              <div className={styles.demoStep}>
                <div className={styles.stepNumber}>1</div>
                <div>
                  <h4>チェキ券をスキャン</h4>
                  <p>撮影したチェキ券のQRコードをスキャンするだけで、デジタルコレクションに自動追加。</p>
                </div>
              </div>
              <div className={styles.demoStep}>
                <div className={styles.stepNumber}>2</div>
                <div>
                  <h4>イベント情報を自動記録</h4>
                  <p>撮影日・イベント名・メンバー名が自動で紐づき、思い出をしっかり記録。</p>
                </div>
              </div>
              <div className={styles.demoStep}>
                <div className={styles.stepNumber}>3</div>
                <div>
                  <h4>いつでも振り返り</h4>
                  <p>フィルターやお気に入り機能で、いつでもどこでも思い出を見返せます。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        className={`section ${styles.pricing}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-label">Pricing</span>
            <h2>シンプルな料金体系</h2>
            <p>月額ワンコインで、すべてのコレクション機能が使い放題</p>
          </div>
          <div className={styles.priceCardWrap}>
            <div className={styles.priceCard}>
              <div className={styles.priceCardHeader}>
                <div className={styles.planBadge}>コレクションプラン</div>
              </div>
              <div className={styles.priceDisplay}>
                <span className={styles.priceCurrency}>¥</span>
                <span className={styles.priceValue}>500</span>
                <span className={styles.priceInterval}>/月（税込）</span>
              </div>
              <ul className={styles.planFeatures}>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="var(--color-primary-subtle)" stroke="var(--color-primary)" strokeWidth="1"/><path d="M5 8L7 10L11 6" stroke="var(--color-primary-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  チェキ券・チケットの無制限コレクション
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="var(--color-primary-subtle)" stroke="var(--color-primary)" strokeWidth="1"/><path d="M5 8L7 10L11 6" stroke="var(--color-primary-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  イベント・メンバー別で思い出を振り返り
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="var(--color-primary-subtle)" stroke="var(--color-primary)" strokeWidth="1"/><path d="M5 8L7 10L11 6" stroke="var(--color-primary-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  対象商品の抽選申込への参加権
                </li>
              </ul>
              <div className={styles.priceCardCta}>
                <p className={styles.priceNote}>Webから簡単にサブスクリプション登録できます</p>
                <div className={styles.storeBadges}>
                  <a href={COLLECTION_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    コレクション登録はこちら
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <motion.div
            className={styles.miniCharCta}
            initial={{ opacity: 0, y: 20, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src="/images/character_mini.png" alt="" width={100} height={100} unoptimized className={styles.miniCharImg} />
          </motion.div>
          <h2>
            「好き」をもっと深く、
            <br className="brSp" />
            もっと楽しく。
          </h2>
          <p>あなただけの特別なコレクション体験を
            <br className="brSp" />
            お楽しみください</p>
          <div className={styles.ctaBtns}>
            <a href={COLLECTION_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              コレクションを利用する
            </a>
          </div>
          <Link href="/" className={styles.backLink}>
            ← トップページに戻る
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
