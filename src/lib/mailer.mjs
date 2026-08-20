/**
 * お問い合わせメールの送信（FR-04）
 *
 * メール配信は Resend の REST API を fetch で呼び出す（追加パッケージ不要）。
 * 環境変数が未設定の場合は送信せずエラーを返し、画面側で連絡先メールアドレスを案内する。
 *
 * 必要な環境変数:
 *   RESEND_API_KEY    Resend のAPIキー
 *   CONTACT_TO_EMAIL  管理者宛の受信アドレス（例: info@my-th.jp）
 *   CONTACT_FROM_EMAIL 差出人（例: "My-th <noreply@my-th.jp>"）※ドメイン認証済みであること
 */

import {
  buildMailSubject,
  buildMailText,
  CONTACT_TYPE_LABELS,
  isSignupRequest,
} from "./contact-schema.mjs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** 必要な環境変数が揃っているか */
export function isMailerConfigured(env) {
  return Boolean(env?.RESEND_API_KEY && env?.CONTACT_TO_EMAIL);
}

const MAIL_FOOTER = [
  "",
  "※ このメールは送信専用ではありません。追加のご連絡はそのままご返信ください。",
  "",
  "My-th（マイス）",
  "https://www.my-th.jp/",
];

/** 通常のお問い合わせに対する自動返信（件名・本文） */
function buildInquiryReply(data) {
  return {
    subject: "【My-th】お問い合わせを受け付けました",
    text: [
      `${data.name} 様`,
      "",
      "My-thへお問い合わせいただきありがとうございます。",
      "以下の内容で承りました。担当者より2営業日以内にご返信いたします。",
      "",
      "──────────────────",
      `お問い合わせ種別: ${CONTACT_TYPE_LABELS[data.type] ?? data.type}`,
      `カテゴリ: ${data.category}`,
      "",
      data.message,
      "──────────────────",
      ...MAIL_FOOTER,
    ].join("\n"),
  };
}

/**
 * 会員登録（ログインURL送付希望）に対する自動返信（件名・本文）
 * ログインURLは自動送信せず、担当者が手動で返信する運用のため、その旨を案内する。
 */
function buildSignupReply(data) {
  return {
    subject: "【My-th】会員登録のお申し込みを受け付けました",
    text: [
      `${data.name} 様`,
      "",
      "My-thに会員登録をお申し込みいただきありがとうございます。",
      "担当者より2営業日以内に、管理画面のログインURLと初回ログインのご案内をこのメールアドレス宛にお送りします。",
      "",
      "──────────────────",
      `お申し込み種別: ${CONTACT_TYPE_LABELS[data.type] ?? data.type}`,
      data.organization ? `団体名・事務所名: ${data.organization}` : null,
      data.message ? `補足・ご要望: ${data.message}` : null,
      "──────────────────",
      ...MAIL_FOOTER,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  };
}

/**
 * 送信する2通（管理者宛・自動返信）のペイロードを組み立てる純粋関数。
 * @returns {Array<{from: string, to: string, subject: string, text: string, reply_to: string}>}
 */
export function buildEmails(data, { from, to }) {
  const adminMail = {
    from,
    to,
    reply_to: data.email,
    subject: buildMailSubject(data),
    text: buildMailText(data),
  };

  const replyMail = {
    from,
    to: data.email,
    reply_to: to,
    ...(isSignupRequest(data) ? buildSignupReply(data) : buildInquiryReply(data)),
  };

  return [adminMail, replyMail];
}

/**
 * メールを送信する。
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function sendContactEmails(data, env) {
  if (!isMailerConfigured(env)) {
    return { ok: false, error: "MAILER_NOT_CONFIGURED" };
  }

  const emails = buildEmails(data, {
    from: env.CONTACT_FROM_EMAIL || `My-th <noreply@my-th.jp>`,
    to: env.CONTACT_TO_EMAIL,
  });

  const results = await Promise.allSettled(
    emails.map((email) =>
      fetch(RESEND_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      }).then(async (response) => {
        if (!response.ok) {
          const detail = await response.text().catch(() => "");
          throw new Error(`Resend ${response.status}: ${detail.slice(0, 200)}`);
        }
        return response.json().catch(() => ({}));
      })
    )
  );

  // 管理者宛（1通目）が失敗した場合のみ送信失敗として扱う。
  // 自動返信の失敗はお客様の受信環境に起因することがあり、問い合わせ自体は成立しているため。
  const [adminResult, replyResult] = results;
  if (adminResult.status === "rejected") {
    return { ok: false, error: adminResult.reason?.message ?? "SEND_FAILED" };
  }

  return {
    ok: true,
    ...(replyResult.status === "rejected"
      ? { warning: replyResult.reason?.message ?? "AUTO_REPLY_FAILED" }
      : {}),
  };
}
