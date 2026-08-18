/**
 * お問い合わせフォームの入力検証（FR-04 / NFR-06）
 *
 * サーバー・クライアント双方から同じ関数を使うため、副作用のない純粋関数として実装する。
 * 入力値は変更せず、常に新しいオブジェクトを返す。
 */

/** 問い合わせ種別ごとのカテゴリ */
export const CONTACT_CATEGORIES = Object.freeze({
  user: Object.freeze([
    "アカウント・ログイン",
    "購入・支払い",
    "チケット・チェキ券の表示／入場",
    "払い戻し・キャンセル",
    "不具合の報告",
    "その他",
  ]),
  organizer: Object.freeze([
    "導入相談",
    "料金・手数料",
    "売上・入金",
    "イベント当日の運用",
    "その他",
  ]),
});

export const CONTACT_TYPES = Object.freeze(Object.keys(CONTACT_CATEGORIES));

/** 種別ごとの表示名 */
export const CONTACT_TYPE_LABELS = Object.freeze({
  user: "ファン・購入者の方",
  organizer: "イベンター・運営の方",
});

const LIMITS = Object.freeze({
  name: 100,
  email: 254,
  phone: 30,
  organization: 200,
  subjectRef: 100,
  message: 5000,
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OPTIONAL_FIELDS = Object.freeze(["phone", "organization", "subjectRef"]);

const asText = (value) => (typeof value === "string" ? value.trim() : "");

/**
 * 入力値を検証して正規化する。
 * @returns {{ ok: boolean, data: object, errors: Record<string,string>, botDetected: boolean }}
 */
export function validateContact(input) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return {
      ok: false,
      data: {},
      errors: { form: "入力内容を読み取れませんでした。もう一度お試しください。" },
      botDetected: false,
    };
  }

  // honeypot: 人間には見えない項目。値が入っていればボットとみなす。
  if (asText(input.website) !== "") {
    return { ok: false, data: {}, errors: {}, botDetected: true };
  }

  const type = asText(input.type);
  const category = asText(input.category);
  const data = {
    type,
    category,
    name: asText(input.name),
    email: asText(input.email),
    message: asText(input.message),
    ...Object.fromEntries(OPTIONAL_FIELDS.map((key) => [key, asText(input[key])])),
  };

  const errors = {};

  if (!CONTACT_TYPES.includes(type)) {
    errors.type = "お問い合わせ種別を選択してください";
  }

  const allowedCategories = CONTACT_CATEGORIES[type] ?? [];
  if (!category) {
    errors.category = "お問い合わせカテゴリを選択してください";
  } else if (!allowedCategories.includes(category)) {
    errors.category = "お問い合わせカテゴリを選択してください";
  }

  if (!data.name) {
    errors.name = "お名前を入力してください";
  } else if (data.name.length > LIMITS.name) {
    errors.name = `お名前は${LIMITS.name}文字以内で入力してください`;
  }

  if (!data.email) {
    errors.email = "メールアドレスを入力してください";
  } else if (data.email.length > LIMITS.email) {
    errors.email = `メールアドレスは${LIMITS.email}文字以内で入力してください`;
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "正しいメールアドレスを入力してください";
  }

  if (!data.message) {
    errors.message = "お問い合わせ内容を入力してください";
  } else if (data.message.length > LIMITS.message) {
    errors.message = `お問い合わせ内容は${LIMITS.message}文字以内で入力してください`;
  }

  for (const key of OPTIONAL_FIELDS) {
    if (data[key].length > LIMITS[key]) {
      errors[key] = `${LIMITS[key]}文字以内で入力してください`;
    }
  }

  return { ok: Object.keys(errors).length === 0, data, errors, botDetected: false };
}

/** 管理者宛メールの本文を組み立てる */
export function buildMailText(data) {
  const lines = [
    `【お問い合わせ種別】${CONTACT_TYPE_LABELS[data.type] ?? data.type}`,
    `【カテゴリ】${data.category}`,
    `【お名前】${data.name}`,
    `【メールアドレス】${data.email}`,
    data.organization ? `【団体名・事務所名】${data.organization}` : "",
    data.phone ? `【電話番号】${data.phone}` : "",
    data.subjectRef ? `【イベント名・注文番号】${data.subjectRef}` : "",
    "",
    "【お問い合わせ内容】",
    data.message,
  ];
  return lines.filter((line) => line !== "").join("\n");
}

/** 管理者宛メールの件名 */
export function buildMailSubject(data) {
  const who = CONTACT_TYPE_LABELS[data.type] ?? data.type;
  return `[My-th お問い合わせ/${who}] ${data.category} — ${data.name} 様`;
}

export { LIMITS as CONTACT_LIMITS };
