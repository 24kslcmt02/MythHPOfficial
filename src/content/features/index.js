/**
 * 機能一覧（/operator/features）の単一ソース
 *
 * - 文言はすべて確定済みの業務事実（docs/v0.2_実装メモ.md §4 の 2026-08-19 反映分）。
 *   新しい機能を追加するときは、確認が済むまで `desc` を空にして `draftDesc` に下書きを置く
 *   （src/lib/features.mjs の isPublishedFeature が本番から自動的に外す）。
 * - `limit` は「My-th登録済みグループのみ」等の但し書き（バッジ表示用）。
 * - `icon` は表示側（page.js）の ICONS マップのキー。
 * - 整合性は src/content/features/features-content.test.mjs が守る。
 */

export const featureCategories = [
  "イベントページの作成",
  "チケット販売",
  "チェキ券の管理",
  "入場特典・当日の受付",
  "売上・バックオフィス",
];

export const features = [
  // === イベントページの作成 ===
  {
    id: "event-page",
    category: "イベントページの作成",
    icon: "CalendarPlus",
    name: "イベントページ作成・チケット販売",
    desc: "管理画面からイベント情報とチケットを登録して公開します。",
  },
  {
    id: "ai-input",
    category: "イベントページの作成",
    icon: "Sparkles",
    name: "AI入力",
    desc: "メモを貼り付けるだけでAIがイベント情報を下書きします。",
  },
  {
    id: "custom-url",
    category: "イベントページの作成",
    icon: "Link2",
    name: "カスタムURL",
    desc: "user.my-th.jp/tickets/event/ に続く部分を自由に設定し、届けやすいURLにできます。",
  },
  {
    id: "doors-time",
    category: "イベントページの作成",
    icon: "Clock",
    name: "開場・開演時間の設定",
    desc: "開催日に加えて、開場時間と開演時間を個別に設定できます。",
  },
  {
    id: "thumbnail",
    category: "イベントページの作成",
    icon: "Image",
    name: "サムネイルの自動調整",
    desc: "縦横どちらの画像でも自動で調整されます。",
  },
  {
    id: "performers",
    category: "イベントページの作成",
    icon: "Users",
    name: "出演者の登録",
    desc: "My-th登録済みのグループはもちろん、未登録のグループもフリー入力で追加できます。",
  },
  {
    id: "draft-schedule-copy",
    category: "イベントページの作成",
    icon: "Copy",
    name: "下書き・公開予約・複製",
    desc: "非公開のまま作成しておく、公開日時を予約する、過去イベントを複製する、に対応しています。",
  },

  // === チケット販売 ===
  {
    id: "e-ticket",
    category: "チケット販売",
    icon: "Ticket",
    name: "電子チケットの販売",
    desc: "アプリ内で完結する電子チケットを販売できます。購入自体はWebブラウザからも可能です。",
  },
  {
    id: "sales-methods",
    category: "チケット販売",
    icon: "Dices",
    name: "先着・抽選の販売方式",
    desc: "先着販売と抽選販売の両方に対応。抽選結果は設定日の正午12時に購入者へメールで通知されます。",
  },
  {
    id: "numbered-tickets",
    category: "チケット販売",
    icon: "ListOrdered",
    name: "整理番号付き販売",
    desc: "ご購入順に整理番号を付与して販売できます。",
  },
  {
    id: "sales-period",
    category: "チケット販売",
    icon: "CalendarClock",
    name: "チケットごとの販売期間",
    desc: "チケットごとに販売開始・終了日時を設定できます。当日券の販売にも対応。",
  },
  {
    id: "purchase-limit",
    category: "チケット販売",
    icon: "SlidersHorizontal",
    name: "購入枚数の上限設定",
    desc: "1人あたりの購入枚数・抽選申込口数の上限をチケットごとに設定できます。",
  },
  {
    id: "free-ticket",
    category: "チケット販売",
    icon: "Tag",
    name: "0円チケット",
    desc: "無料のチケットも発行できます。",
  },
  {
    id: "companion-share",
    category: "チケット販売",
    icon: "Send",
    name: "同行者への分配",
    desc: "購入者がアプリ内で同行者にチケットを送れます。",
  },
  {
    id: "bot-protection",
    category: "チケット販売",
    icon: "ShieldCheck",
    name: "Bot対策",
    desc: "自動プログラムによる大量購入を防ぎ、公平な販売機会を確保します。",
  },

  // === チェキ券の管理 ===
  {
    id: "cheki-issue",
    category: "チェキ券の管理",
    icon: "QrCode",
    name: "デジタルチェキ券の発行",
    desc: "紙のチェキ券をQRコードに置き換え、偽造・紛失のリスクをなくします。",
  },
  {
    id: "cheki-batch",
    category: "チェキ券の管理",
    icon: "Layers",
    name: "まとめ出し",
    desc: "複数枚のチェキ券をまとめて処理できます。",
  },
  {
    id: "cheki-expiry",
    category: "チェキ券の管理",
    icon: "Timer",
    name: "有効期限の設定",
    desc: "チェキ券ごとに有効期限を設定できます。",
  },
  {
    id: "cheki-limited",
    category: "チェキ券の管理",
    icon: "Star",
    name: "限定チェキの販売",
    desc: "数量を絞った限定チェキを販売できます。",
  },
  {
    id: "cheki-lottery",
    category: "チェキ券の管理",
    icon: "Dices",
    name: "抽選販売",
    desc: "受付期間を設けて抽選で販売できます。",
  },

  // === 入場特典・当日の受付 ===
  {
    id: "benefit-digital",
    category: "入場特典・当日の受付",
    icon: "Gift",
    name: "入場特典券のデジタル配布",
    desc: "入場特典を「入場特典券」として購入者のアプリに配布します。内容は自由で、印刷・郵送・手渡しは不要です。",
    limit: "My-th登録済みグループのみ",
  },
  {
    id: "staff-app",
    category: "入場特典・当日の受付",
    icon: "Smartphone",
    name: "スタッフアプリでの受付",
    desc: "スタッフのスマートフォン・タブレット（iOS / Android）で入場受付と特典券の使用処理を行えます。専用機材は不要です。",
  },
  {
    id: "manual-entry",
    category: "入場特典・当日の受付",
    icon: "PenLine",
    name: "手動での入場処理",
    desc: "QRコードのほか、整理番号などの情報から手動で入場処理を行えます。",
  },
  {
    id: "entry-log",
    category: "入場特典・当日の受付",
    icon: "Database",
    name: "入場記録のデータ化",
    desc: "誰がいつ入場したかを記録として残せます。",
  },

  // === 売上・バックオフィス ===
  {
    id: "dashboard",
    category: "売上・バックオフィス",
    icon: "LayoutDashboard",
    name: "リアルタイムダッシュボード",
    desc: "販売状況と売上をその場で確認できます。",
  },
  {
    id: "attendance-share",
    category: "売上・バックオフィス",
    icon: "Eye",
    name: "動員状況の共有",
    desc: "出演イベントの動員状況を、自グループ分に限って自身の管理画面でリアルタイムに確認できます。",
    limit: "My-th登録済みグループのみ",
  },
  {
    id: "aggregate",
    category: "売上・バックオフィス",
    icon: "BarChart3",
    name: "イベント別・メンバー別の集計",
    desc: "集計作業を自動化し、手作業による集計ミスと遅延をなくします。",
  },
  {
    id: "auto-payout",
    category: "売上・バックオフィス",
    icon: "Banknote",
    name: "売上の自動集計・送金",
    desc: "売上を自動で集計し、開催日ごとにお振込します。",
  },
];
