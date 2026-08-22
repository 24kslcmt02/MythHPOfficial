import Link from "next/link";
import PageShell from "@/components/common/PageShell";
import Notice from "@/components/common/Notice";
import { organizerCommissionRate, pricing } from "@/config/site";
import { contactHref, feesHref } from "@/config/routes";
import { features } from "@/content/features";
import { publishedFeatures, isPublishedFeature, featureDescText, groupFeaturesByCategory } from "@/lib/features.mjs";
import EventCreateMockup from "@/components/mockups/EventCreateMockup";
import TicketMockup from "@/components/mockups/TicketMockup";
import ChekiMockup from "@/components/mockups/ChekiMockup";
import DigitalPassMockup from "@/components/mockups/DigitalPassMockup";
import AnalyticsMockup from "@/components/mockups/AnalyticsMockup";
import {
  CalendarPlus, Sparkles, Link2, Clock, Image as ImageIcon, Users, Copy,
  Ticket, Dices, ListOrdered, CalendarClock, SlidersHorizontal, Tag, Send, ShieldCheck,
  QrCode, Layers, Timer, Star, Gift, Smartphone, PenLine, Database,
  LayoutDashboard, Eye, BarChart3, Banknote, Check, ArrowRight,
} from "lucide-react";
import shared from "@/components/common/page.module.css";
import styles from "./features.module.css";

export const metadata = {
  title: "機能一覧（運営者向け）| My-th（マイス）",
  description:
    "My-thの運営者向け機能の一覧です。チェキ券管理、チケット販売、入場特典、当日の入場受付、売上管理の機能をまとめています。",
  alternates: { canonical: "/operator/features" },
};

/** content/features の icon キー → lucide コンポーネント */
const ICONS = {
  CalendarPlus, Sparkles, Link2, Clock, Image: ImageIcon, Users, Copy,
  Ticket, Dices, ListOrdered, CalendarClock, SlidersHorizontal, Tag, Send, ShieldCheck,
  QrCode, Layers, Timer, Star, Gift, Smartphone, PenLine, Database,
  LayoutDashboard, Eye, BarChart3, Banknote,
};

/** カテゴリごとの見せ方（リード文とCSSモックの割当）。データ本体は content/features */
const CATEGORY_META = {
  "イベントページの作成": {
    lead: "メモからのAI下書きとカスタムURLで、告知ページづくりを最短に。",
    Mockup: EventCreateMockup,
  },
  "チケット販売": {
    lead: "先着・抽選・整理番号・当日券まで、プレイガイドの基本をひと通り。",
    Mockup: TicketMockup,
  },
  "チェキ券の管理": {
    lead: "紙のチェキ券をQRコードに置き換えて、偽造・紛失をなくす。",
    Mockup: ChekiMockup,
  },
  "入場特典・当日の受付": {
    lead: "受付はスタッフのスマホだけ。特典券もその場で使用処理。",
    Mockup: DigitalPassMockup,
  },
  "売上・バックオフィス": {
    lead: "売れたその瞬間から、集計とお振込は自動で。",
    Mockup: AnalyticsMockup,
  },
};

export default function OperatorFeaturesPage() {
  // 開発時のみ確認待ち機能を「確認待ち」バッジ付きで表示する（FAQと同じ運用）
  const includeDrafts = process.env.NODE_ENV !== "production";
  const visibleFeatures = publishedFeatures(features, { includeDrafts });
  const groups = groupFeaturesByCategory(visibleFeatures);

  return (
    <PageShell
      variant="operator"
      eyebrow="Features"
      title="機能一覧"
      lead="My-thが提供する運営者向け機能の一覧です。チェキ券・チケット・入場特典・売上管理をひとつの管理画面で扱えます。"
      breadcrumbs={[
        { label: "イベンター・運営の方へ", href: "/operator" },
        { label: "機能一覧" },
      ]}
    >
      {/* 料金スタット帯 */}
      <section className={styles.pricingBand} aria-label="料金">
        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <span className={styles.pricingLabel}>初期費用</span>
            <span className={styles.pricingValue}>{pricing.initialFee}</span>
          </div>
          <div className={styles.pricingCard}>
            <span className={styles.pricingLabel}>月額費用</span>
            <span className={styles.pricingValue}>{pricing.monthlyFee}</span>
          </div>
          <div className={styles.pricingCard}>
            <span className={styles.pricingLabel}>販売手数料</span>
            <span className={styles.pricingValue}>
              {organizerCommissionRate}
              <small>のみ</small>
            </span>
          </div>
        </div>
        <p className={styles.pricingNote}>
          システム利用料や発券手数料のような別建ての費用はありません。販売手数料を主催者負担にするか
          購入者負担にするかは、イベントごとにお選びいただけます。詳しくは
          <Link href={feesHref("organizer")}>手数料について</Link>をご覧ください。
        </p>
      </section>

      {/* カテゴリブロック */}
      {groups.map(({ category, items }, index) => {
        const meta = CATEGORY_META[category] ?? {};
        const Mockup = meta.Mockup;
        return (
          <section
            key={category}
            className={`${styles.categoryBlock} ${index % 2 === 1 ? styles.categoryBlockReverse : ""}`}
          >
            <div className={styles.categoryIntro}>
              <div className={styles.categoryHead}>
                <span className={styles.categoryIndex}>Feature {String(index + 1).padStart(2, "0")}</span>
                <h2>{category}</h2>
                {meta.lead && <p className={styles.categoryLead}>{meta.lead}</p>}
              </div>
              {Mockup && (
                <div className={styles.categoryVisual}>
                  <Mockup />
                </div>
              )}
            </div>
            <ul className={styles.featureGrid}>
              {items.map((item) => {
                const Icon = ICONS[item.icon] ?? Check;
                const pendingItem = !isPublishedFeature(item);
                return (
                  <li key={item.id} id={`f-${item.id}`} className={styles.featureCard}>
                    <span className={styles.featureIcon}>
                      <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <div className={styles.featureBody}>
                      <h3>
                        {item.name}
                        {pendingItem && <span className={styles.pendingBadge}>確認待ち</span>}
                      </h3>
                      <p>{featureDescText(item)}</p>
                      {item.limit && <span className={styles.limitBadge}>{item.limit}</span>}
                      {pendingItem && item.note && (
                        <p className={styles.pendingNote}>【開発表示】{item.note}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {/* 注意事項・関連導線 */}
      <section className={styles.notes}>
        <Notice>
          <p>
            入場受付には通信環境が必要です。電波が届きにくい会場では、会場のWi-Fiや
            モバイルルーターのご用意をおすすめします。
          </p>
        </Notice>
        <Notice>
          <p>
            費用の詳細は<Link href={feesHref("organizer")}> 手数料について </Link>
            を、導入の流れやよくいただくご質問は
            <Link href="/faq/organizer"> 運営者向けのよくある質問 </Link>
            をご覧ください。
          </p>
        </Notice>
      </section>

      {/* CTA帯 */}
      <section className={styles.ctaBand}>
        <h2>まずはお気軽にご相談ください</h2>
        <p>運営スタイルに合わせた使い方をご提案します。</p>
        <div className={shared.ctaRow}>
          <Link href={contactHref("organizer")} className="btn btn-primary">
            導入について相談する
          </Link>
          <Link href="/operator" className={styles.ctaGhostBtn}>
            サービス紹介を見る
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
