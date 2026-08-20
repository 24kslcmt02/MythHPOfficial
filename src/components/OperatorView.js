"use client";

import StepFlow from "@/components/StepFlow";
import { ArrowRight, Banknote, Check, ClipboardList, Files, Camera, Ticket } from "lucide-react";
import DashboardMockup from "@/components/DashboardMockup";
import ChekiMockup from "@/components/mockups/ChekiMockup";
import TicketMockup from "@/components/mockups/TicketMockup";
import DigitalPassMockup from "@/components/mockups/DigitalPassMockup";
import AnalyticsMockup from "@/components/mockups/AnalyticsMockup";
import styles from "../app/operator/page.module.css";
import { motion } from "framer-motion";
import FlowingBackground from "@/components/FlowingBackground";
import InquiryForm from "@/components/contact/InquiryForm";

const problems = [
  {
    title: "紙の管理業務",
    description: "紙チェキ券・紙チケットの紛失リスク、偽造リスク、管理の煩雑さ",
    Icon: Files,
  },
  {
    title: "印刷・郵送コスト",
    description: "イベントごとの準備コストと人的リソースの浪費",
    Icon: Banknote,
  },
  {
    title: "属人化した売上管理",
    description: "Excel・手書きノートによる集計ミスと遅延",
    Icon: ClipboardList,
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

export default function OperatorView({ onViewModeChange }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero */}
      <section className={styles.hero}>
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
              チェキ券・チケット・入場特典・売上管理を完全自動化。アイドル運営に特化したOSアプリで、クリエイティブな業務に集中できます。
            </motion.p>

            <motion.div variants={itemVariants} style={{ marginTop: '0.5rem' }}>
              <a href="#contact" className={styles.heroCtaLink}>
                導入のご相談はこちら
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
          <motion.div className={styles.heroVisual} variants={itemVariants}>
            <DashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* Problems */}
      <section className={`section ${styles.problems}`}>
        <div className="container">
          <div className={styles.problemLayout}>
            <div className="section-header section-header--left">
              <span className="section-label">Current Situation</span>
              <h2>業界課題</h2>
              <p>「現場のアナログ」が体験価値向上のボトルネックになっている</p>
            </div>
            <ul className={styles.problemList}>
              {problems.map(({ title, description, Icon }) => (
                <li key={title} className={styles.problemItem}>
                  <span className={styles.problemIcon}>
                    <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.problemResult}>
            <p>本来の業務を圧迫し、ファン体験の向上に集中できない</p>
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
          <div className={styles.solutionShowcase}>
            {solutions.map((sol, i) => (
              <motion.div
                key={sol.title}
                className={`${styles.solutionRow} ${i % 2 === 1 ? styles.solutionRowReverse : ""}`}
                initial={{ opacity: 0, x: i % 2 === 1 ? 48 : -48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.solutionVisual}>
                  <div className={styles.solutionMockInner}>
                    <MockupComponent type={sol.mockup} />
                  </div>
                </div>
                <div className={styles.solutionText}>
                  <h3>{sol.title}</h3>
                  <p>{sol.description}</p>
                </div>
              </motion.div>
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
                  <Ticket size={22} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3>チケット販売</h3>
              </div>
              <div className={styles.priceRate}>
                <span className={styles.priceNumber}>5</span>
                <span className={styles.priceUnit}>%</span>
              </div>
              <p className={styles.priceNote}>販売手数料のみ（負担者は主催者・購入者から選択可）</p>
              <ul className={styles.priceFeatures}>
                {["初期費用 無料", "月額費用 無料", "即座に利用開始可能", "ファン向けBot対策標準装備"].map((item) => (
                  <li key={item}>
                    <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Cheki Sales */}
            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <div className={styles.priceIconWrap}>
                  <Camera size={22} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3>チェキ販売</h3>
              </div>
              <div className={styles.priceRate}>
                <span className={styles.priceNumber}>5</span>
                <span className={styles.priceUnit}>%</span>
              </div>
              <p className={styles.priceNote}>販売手数料のみ（負担者は主催者・購入者から選択可）</p>
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
          <InquiryForm defaultType="organizer" showTypeSwitch={false} />
        </div>
      </section>
    </motion.div>
  );
}
