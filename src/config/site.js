/**
 * サイト全体の単一ソース（NFR-07）
 *
 * ▼ 運用ルール
 * - 未確定の情報は `null` にする。null の項目は各ページで自動的に非表示（または「準備中」）になり、
 *   事実でない情報が公開されることはない。
 * - 値を確定したらこのファイルだけを書き換える。ページ側の修正は不要。
 * - `verified: false` のURLは「推測パス」。アプリ側で実際に開けることを確認してから true にする。
 *
 * ▼ 確定が必要な項目の一覧は docs/v0.2_実装メモ.md を参照
 */

export const site = {
  name: "My-th",
  nameJa: "マイス",
  tagline: "すべての体験をつなぐ アイドルOS",
  description:
    "チェキ券・チケット・入場特典・売上管理をひとつに統合。アイドル運営のアナログをゼロにする業界特化OSアプリ。",
  url: "https://www.my-th.jp",
  /** ユーザーが利用するアプリ側サイト（法務文書の正本はこちら） */
  appUrl: "https://user.my-th.jp",
};

/** アプリストア */
export const stores = {
  appStore: "https://apps.apple.com/jp/app/my-th/id6759365931",
  googlePlay: "https://play.google.com/store/apps/details?id=jp.ms_capital.my_th",
};

/** コレクション機能（サブスク）の申込先 */
export const collectionUrl = "https://user.my-th.jp/collection";

/**
 * 運営会社
 * 特商法表記（アプリ側の正本）と表記を一致させること。
 */
export const company = {
  name: "株式会社M's Capital Holdings",
  nameEn: "M's Capital Holdings, Inc.",
  /** @todo 確定必要 */
  postalCode: null,
  /** @todo 確定必要 */
  address: null,
  /** @todo 確定必要 */
  representative: null,
  /** @todo 確定必要 例: "2020年4月" */
  founded: null,
  /** @todo 確定必要 例: "1,000万円" */
  capital: null,
  /** @todo 確定必要 事業内容の配列 */
  business: null,
  /** @todo 任意 沿革 [{ date, text }] */
  history: null,
};

/** お問い合わせ窓口 */
export const contact = {
  email: "info@my-th.jp",
  /** @todo 確定必要 例: "03-0000-0000" */
  tel: null,
  /** @todo 確定必要 例: "平日 11:00〜18:00（土日祝を除く）" */
  telHours: null,
  /** 返信目安（既存フォームの記載を踏襲） */
  replyTarget: "2営業日以内",
  /** @todo 確定必要 イベント当日の緊急窓口があれば */
  emergency: null,
};

/**
 * 法務文書（正本はアプリ側 user.my-th.jp）
 *
 * ▼ 設計原則（v0.2 要件定義）
 * HP に本文は置かない。二重管理による不整合を避けるため、正本はアプリ側に一本化する。
 * ここに定義するのは「正本への遷移先」のみ。
 *
 * @todo verified: false のURLはアプリ側で実際に該当ページが開くことを確認する（SPAのため推測不可）
 */
export const legalLinks = [
  {
    key: "terms",
    label: "利用規約",
    description: "My-thアプリおよび本サービスのご利用条件",
    url: `${site.appUrl}/terms`,
    verified: false,
  },
  {
    key: "privacy",
    label: "プライバシーポリシー",
    description: "個人情報の取扱いと安全管理措置について",
    url: `${site.appUrl}/privacy`,
    verified: false,
  },
  {
    key: "tokushoho",
    label: "特定商取引法に基づく表記",
    description: "販売事業者・支払方法・引渡時期・返品に関する表記",
    url: `${site.appUrl}/tokushoho`,
    verified: false,
  },
];

/**
 * 運営者（イベンター・事務所）向け規約。
 * 購入者規約と分冊されている場合のみ設定する。未分冊なら null のまま。
 * @todo 確定必要
 */
export const organizerTermsUrl = null;

/**
 * Cookie・外部送信ポリシー（電気通信事業法の外部送信規律）
 * アプリ側に独立ページがあれば設定する。
 * @todo 確定必要
 */
export const cookiePolicyUrl = null;

/**
 * 公式SNS
 * @todo 確定必要。存在するアカウントのURLのみ設定する（null の項目は非表示）
 */
export const social = {
  x: null,
  instagram: null,
  youtube: null,
  tiktok: null,
};

/**
 * 対応決済手段
 * @todo 確定必要。ブランドロゴの使用可否は各ブランドのガイドラインを確認すること
 * 例: { cards: ["Visa", "Mastercard", "JCB"], convenience: [...], others: [...] }
 */
export const payments = null;

/**
 * 手数料（FR-08）
 * @todo 確定必要。null の間は /fees が「準備中」表示になる
 * 例: {
 *   buyer: [{ target: "チケット", rate: "5%", perTicket: "165円/枚", payment: "決済手数料 別途" }],
 *   organizer: [...],
 *   notes: [...]
 * }
 */
export const fees = null;

/** コレクション機能の料金（確定済み） */
export const subscriptionPrice = { amount: 500, tax: "税込", interval: "月" };

/** 運営者向け販売手数料（LPに掲載済みの確定値） */
export const organizerCommissionRate = "5%";

/**
 * 入金サイクル（FR-13）
 * @todo 確定必要
 * 例: { cutoffs: ["毎月15日締め → 当月末振込"], transferFee: "○円/回", earlyTransfer: false }
 */
export const payout = null;

/**
 * 動作環境（FR-05）
 * @todo 確定必要
 * 例: { ios: "iOS 16.0 以降", android: "Android 10.0 以降" }
 */
export const requirements = {
  ios: null,
  android: null,
  /** 確定済み: フィーチャーフォンは非対応（既存FAQの記載） */
  notSupported: ["フィーチャーフォン（ガラケー）"],
};

/**
 * 公式ドメイン・公式アプリ（FR-10 フィッシング対策）
 * ここに列挙したもの以外は My-th の公式ではない、と案内するための一覧。
 */
export const officialChannels = {
  domains: ["my-th.jp", "www.my-th.jp", "user.my-th.jp"],
  apps: [
    { store: "App Store", name: "My-th", url: stores.appStore },
    { store: "Google Play", name: "My-th", url: stores.googlePlay },
  ],
  emailDomains: ["my-th.jp"],
};

/**
 * 実績数値（FR-13 / Lv3）
 * @todo 確定必要。null の間は /operator/cases を公開しない
 */
export const stats = null;

/** 設定値が未確定かどうか */
export function isPending(value) {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every(isPending);
  return false;
}
