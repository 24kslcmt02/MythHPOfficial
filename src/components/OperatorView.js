"use client";

import FeatureCard from "@/components/FeatureCard";
import StepFlow from "@/components/StepFlow";
import DashboardMockup from "@/components/DashboardMockup";
import ChekiMockup from "@/components/mockups/ChekiMockup";
import TicketMockup from "@/components/mockups/TicketMockup";
import DigitalPassMockup from "@/components/mockups/DigitalPassMockup";
import AnalyticsMockup from "@/components/mockups/AnalyticsMockup";
import styles from "../app/operator/page.module.css";
import { motion } from "framer-motion";
import FlowingBackground from "@/components/FlowingBackground";
import ContactForm from "@/components/ContactForm";

const problems = [
  {
    title: "紙の管理業務",
    description: "紙チェキ券・紙チケットの紛失リスク、偽造リスク、管理の煩雑さ",
  },
  {
    title: "印刷・郵送コスト",
    description: "イベントごとの準備コストと人的リソースの浪費",
  },
  {
    title: "属人化した売上管理",
    description: "Excel・手書きノートによる集計ミスと遅延",
  },
];

const solutions = [
  {
    title: "チェキ管理の完全自動化",
    description: "QRコードで偽造・紛失ゼロ。まとめ出し、有効期限設定、限定チェキ販売、抽選販売に対応。オフライン環境でも安定運用。",
    accent: "primary",
    mockup: "cheki",
  },
  {
    title: "チケット販売の統合",
    description: "Bot対策・マイナンバー認証で公平な販売。お目当て特典の自動配布、売上の自動集計・送金。最短1週間で入金。",
    accent: "secondary",
    mockup: "ticket",
  },
  {
    title: "入場特典のデジタル化",
    description: "デザイン・印刷・郵送・配布の全工程をオンラインへ。QR自動照合で即時付与。印刷代・郵送費・配布ミスをゼロに。",
    accent: "pink",
    mockup: "pass",
  },
  {
    title: "バックオフィスの自動化",
    description: "イベント別・メンバー別の売上を自動集計。リアルタイムダッシュボードで日次/月次推移を即座に把握。",
    accent: "cyan",
    mockup: "analytics",
  },
];

const implementSteps = [
  { title: "お問い合わせ", description: "フォームまたはお電話でご連絡" },
  { title: "ヒアリング", description: "運営スタイルに合わせたご提案" },
  { title: "導入設定", description: "アカウント作成と初期設定" },
  { title: "運用開始", description: "イベントですぐに使えます" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 0.4 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

function MockupComponent({ type }) {
  switch (type) {
    case "cheki": return <ChekiMockup />;
    case "ticket": return <TicketMockup />;
    case "pass": return <DigitalPassMockup />;
    case "analytics": return <AnalyticsMockup />;
    default: return null;
  }
}

/* SVG Problem Icons — replaces emoji */
function ProblemIcon({ type }) {
  const icons = {
    paper: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="3" width="20" height="26" rx="3" fill="#E3F2FD" stroke="#4AADE8" strokeWidth="1.5"/>
        <line x1="10" y1="10" x2="22" y2="10" stroke="#4AADE8" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="10" y1="14" x2="22" y2="14" stroke="#4AADE8" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
        <line x1="10" y1="18" x2="18" y2="18" stroke="#4AADE8" strokeWidth="1.2" strokeLinecap="round" opacity="0.4"/>
        <path d="M20 22L22 24L26 18" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    cost: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" fill="#FFF9DB" stroke="#F5D623" strokeWidth="1.5"/>
        <path d="M16 8V24M12 12C12 10.3 13.8 9 16 9C18.2 9 20 10.3 20 12C20 14 16 14 16 16M16 20V20.5" stroke="#D4B800" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    analytics: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="14" width="6" height="14" rx="1.5" fill="#FCE4EC" stroke="#F472B6" strokeWidth="1"/>
        <rect x="13" y="8" width="6" height="20" rx="1.5" fill="#E3F2FD" stroke="#4AADE8" strokeWidth="1"/>
        <rect x="23" y="4" width="6" height="24" rx="1.5" fill="#F0FDF4" stroke="#22c55e" strokeWidth="1"/>
        <line x1="1" y1="28" x2="31" y2="28" stroke="#CBD5E1" strokeWidth="1"/>
      </svg>
    ),
  };
  return icons[type] || null;
}

export default function OperatorView({ onViewModeChange }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero */}
      <section className={`${styles.hero} gradient-mesh`}>
        <FlowingBackground variant="btob" />
        <div className={`container ${styles.heroInner}`}>
          <motion.div className={styles.heroContent} variants={containerVariants}>
            <motion.p layoutId="hero-label" variants={itemVariants} className={styles.heroLabel}>FOR OPERATORS</motion.p>
            <motion.h1 layoutId="hero-title" variants={itemVariants} className={styles.heroTitle}>
              現場の
              <span className={styles.heroAccent}>&quot;アナログ&quot;</span>
              を
              <br />
              ゼロへ
            </motion.h1>
            <motion.p layoutId="hero-desc" variants={itemVariants} className={styles.heroDesc}>
              チェキ券・チケット・入場特典・売上管理を完全自動化。
              <br />
              アイドル運営に特化したOSアプリで、クリエイティブな業務に集中できます。
            </motion.p>
            <motion.div variants={itemVariants} className={styles.heroBtns}>
              <a href="#contact" className="btn btn-secondary">
                導入のご相談 →
              </a>
            </motion.div>
            {/* Smooth transition button */}
            <motion.button
              variants={itemVariants}
              onClick={() => {
                onViewModeChange('user');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={styles.heroSwitch}
              style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left', marginTop: '1.5rem', color: 'var(--color-primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', transition: 'transform 0.2s', alignSelf: 'flex-start' }}
            >
              ファンの方はこちら →
            </motion.button>
          </motion.div>
          <motion.div className={styles.heroVisual} variants={itemVariants}>
            <DashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* Problems */}
      <section className={`section ${styles.problems}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Current Situation</span>
            <h2>業界課題</h2>
            <p>「現場のアナログ」が体験価値向上のボトルネックになっている</p>
          </div>
          <div className={styles.problemGrid}>
            {problems.map((p, i) => (
              <div key={i} className={styles.problemCard}>
                <div className={styles.problemIconWrap}>
                  <ProblemIcon type={["paper", "cost", "analytics"][i]} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
          <div className={styles.problemResult}>
            <p>→ 本来の業務を圧迫し、ファン体験の向上に集中できない</p>
          </div>
        </div>
      </section>

      {/* Solutions — with Rich UI Mockups */}
      <section className={`section ${styles.solutions}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Solutions</span>
            <h2>My-thが解決します</h2>
            <p>4つのソリューションで現場を変革</p>
          </div>
          <div className={styles.solutionGrid}>
            {solutions.map((s, i) => (
              <FeatureCard
                key={i}
                title={s.title}
                description={s.description}
                accent={s.accent}
              >
                <MockupComponent type={s.mockup} />
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`section ${styles.pricing}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Pricing</span>
            <h2>料金体系</h2>
            <p>初期費用・月額費用ゼロ。売上に応じたシンプルな手数料のみ</p>
          </div>
          <div className={styles.pricingGrid}>
            {/* Ticket Sales */}
            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <div className={styles.priceIconWrap}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="3" fill="#E3F2FD" stroke="#4AADE8" strokeWidth="1.2"/>
                    <path d="M2 10H22" stroke="#4AADE8" strokeWidth="1.2"/>
                    <circle cx="7" cy="15" r="1.5" fill="#4AADE8"/>
                  </svg>
                </div>
                <h3>チケット販売</h3>
              </div>
              <div className={styles.priceRate}>
                <span className={styles.priceNumber}>5</span>
                <span className={styles.priceUnit}>%</span>
              </div>
              <p className={styles.priceNote}>販売手数料のみ</p>
              <ul className={styles.priceFeatures}>
                <li>初期費用 無料</li>
                <li>月額費用 無料</li>
                <li>即座に利用開始可能</li>
                <li>ファン向けBot対策標準装備</li>
              </ul>
            </div>
            {/* Cheki Sales */}
            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <div className={styles.priceIconWrap}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="2" width="18" height="20" rx="3" fill="#FCE4EC" stroke="#F472B6" strokeWidth="1.2"/>
                    <circle cx="12" cy="10" r="4" fill="#F472B6" opacity="0.3"/>
                    <rect x="7" y="16" width="10" height="2" rx="1" fill="#F472B6" opacity="0.4"/>
                  </svg>
                </div>
                <h3>チェキ販売</h3>
              </div>
              <div className={styles.priceRate}>
                <span className={styles.priceNumber}>5</span>
                <span className={styles.priceUnit}>%</span>
              </div>
              <p className={styles.priceNote}>販売手数料のみ</p>
              <div className={styles.simulation}>
                <h4>収益シミュレーション</h4>
                <div className={styles.simRow}>
                  <span>100枚 × ¥2,000</span>
                  <span>¥200,000</span>
                </div>
                <div className={styles.simRow}>
                  <span>手数料(5%)</span>
                  <span>-¥10,000</span>
                </div>
                <div className={`${styles.simRow} ${styles.simTotal}`}>
                  <span>お受取額</span>
                  <span>¥190,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Steps */}
      <section className={`section ${styles.implementation}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Implementation</span>
            <h2>導入までの流れ</h2>
            <p>最短1週間で運用開始可能。専門スタッフがサポートします</p>
          </div>
          <StepFlow steps={implementSteps} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`section ${styles.contact}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Contact</span>
            <h2>導入をご検討の運営者様へ</h2>
            <p>まずはお気軽にご相談ください。担当者が2営業日以内にご連絡いたします。</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </motion.div>
  );
}
