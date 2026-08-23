"use client";

import { useEffect, useMemo, useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Info } from "lucide-react";
import {
  CONTACT_CATEGORIES,
  CONTACT_TYPES,
  CONTACT_TYPE_LABELS,
  SIGNUP_CATEGORY,
  SIGNUP_MESSAGE,
  isSignupRequest,
  validateContact,
} from "@/lib/contact-schema.mjs";
import { contact as contactConfig } from "@/config/site";
import SignupModeSwitch from "./SignupModeSwitch";
import styles from "./InquiryForm.module.css";

/** 会員登録タブへ直接飛ぶためのアンカー（/operator#signup） */
export const SIGNUP_ANCHOR = "signup";

const EMPTY_FORM = {
  type: "user",
  category: "",
  name: "",
  email: "",
  organization: "",
  phone: "",
  subjectRef: "",
  message: "",
  website: "", // honeypot（人には見えない項目）
};

/**
 * カテゴリ変更後のフォーム状態を返す（元のオブジェクトは変更しない）。
 * 会員登録に入るとき本文が空なら定型文を入れ、会員登録から出るとき定型文のままなら空に戻す。
 * 申込者が自分で書いた本文はどちらの方向でも消さない。
 */
function withCategory(prev, category) {
  const wasSignup = prev.category === SIGNUP_CATEGORY;
  const willBeSignup = category === SIGNUP_CATEGORY;
  const message = (() => {
    if (willBeSignup && !wasSignup && prev.message === "") return SIGNUP_MESSAGE;
    if (wasSignup && !willBeSignup && prev.message === SIGNUP_MESSAGE) return "";
    return prev.message;
  })();
  return { ...prev, category, message };
}

/**
 * お問い合わせフォーム（FR-04）
 *
 * 送信はサーバー（/api/contact）で処理する。メーラーの起動は行わない。
 * 検証ロジックはサーバーと同じ contact-schema を使う。
 *
 * 初期表示する種別は defaultType、初期選択するカテゴリは defaultCategory で受け取る。
 * /contact?type=organizer のようなURLの解釈はページ側（サーバー）で行う。
 *
 * 運営者の「無料で会員登録」カテゴリは本文を任意にし、名前とメールだけで送れるようにする
 * （ログインURLはHPに置かず、運営側がメールで手動返信する運用）。
 *
 * signupSwitch を有効にすると（運営者ページ）、フォーム上部に
 * 「導入のご相談・お問い合わせ／無料で会員登録」の2択タブが出る。会員登録タブでは
 * 氏名・企業名・メールだけを求め、本文には定型文があらかじめ入る。案内文や定型文は
 * 会員登録タブのときだけ表示され、通常の問い合わせには出ない。
 * URL のハッシュが #signup なら会員登録タブで開く（ファーストビューのCTA用）。
 */
export default function InquiryForm({
  defaultType = "user",
  defaultCategory = "",
  showTypeSwitch = true,
  signupSwitch = false,
}) {
  const initialForm = { ...EMPTY_FORM, type: defaultType, category: defaultCategory };
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errorMessage, setErrorMessage] = useState("");

  const isOrganizer = form.type === "organizer";
  const isSignup = isSignupRequest(form);
  // タブ切替があるときは、プルダウンに会員登録を重複して出さない
  const categories = useMemo(() => {
    const list = CONTACT_CATEGORIES[form.type] ?? [];
    return signupSwitch ? list.filter((category) => category !== SIGNUP_CATEGORY) : list;
  }, [form.type, signupSwitch]);
  const showSignupFields = signupSwitch && isSignup;

  const update = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleChange = (event) => update(event.target.name, event.target.value);

  const applyCategory = (category) => {
    setForm((prev) => withCategory(prev, category));
    setErrors({});
  };

  const switchType = (type) => {
    setForm((prev) => ({ ...prev, type, category: "" }));
    setErrors({});
  };

  const switchMode = (mode) => applyCategory(mode === "signup" ? SIGNUP_CATEGORY : "");

  // /operator#signup で開かれたとき・FVの「無料で会員登録」を押したときは会員登録タブにする
  useEffect(() => {
    if (!signupSwitch) return undefined;
    const syncFromHash = () => {
      if (window.location.hash !== `#${SIGNUP_ANCHOR}`) return;
      setForm((prev) => withCategory(prev, SIGNUP_CATEGORY));
      setErrors({});
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [signupSwitch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const result = validateContact(form);
    if (!result.ok) {
      setErrors(result.errors);
      const firstField = Object.keys(result.errors)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.success) {
        setErrors(payload.fieldErrors ?? {});
        setErrorMessage(
          payload.error ?? "送信に失敗しました。時間をおいて再度お試しください。"
        );
        setStatus("error");
        return;
      }

      setStatus("done");
    } catch {
      setErrorMessage(
        `通信エラーが発生しました。ネットワーク環境をご確認のうえ再度お試しいただくか、${contactConfig.email} までメールでご連絡ください。`
      );
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 size={40} className={styles.successIcon} aria-hidden="true" />
        <h3>{isSignup ? "会員登録のお申し込みを受け付けました" : "お問い合わせを受け付けました"}</h3>
        <p>
          ご登録のメールアドレス宛に受付確認のメールをお送りしました。
          <br />
          {isSignup
            ? `担当者より${contactConfig.replyTarget}に、管理画面のログインURLをメールでお送りします。`
            : `担当者より${contactConfig.replyTarget}にご返信いたします。`}
        </p>
        <p className={styles.successNote}>
          確認メールが届かない場合は、迷惑メールフォルダをご確認ください。
        </p>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => {
            setForm(initialForm);
            setStatus("idle");
          }}
        >
          続けて問い合わせる
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      id={signupSwitch ? SIGNUP_ANCHOR : undefined}
    >
      {signupSwitch && (
        <SignupModeSwitch mode={isSignup ? "signup" : "inquiry"} onChange={switchMode} />
      )}

      {showSignupFields && (
        <div className={styles.infoBox} role="note">
          <Info size={18} aria-hidden="true" />
          <p>
            <strong>お名前・企業名・メールアドレスを入力して、そのまま送信してください。</strong>
            <br />
            担当者より{contactConfig.replyTarget}に、管理画面のログインURLをメールでお送りします。
          </p>
        </div>
      )}

      {showTypeSwitch && (
        <div className={styles.typeSwitch} role="group" aria-label="お問い合わせ種別">
          {CONTACT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={`${styles.typeBtn} ${form.type === type ? styles.typeBtnActive : ""}`}
              onClick={() => switchType(type)}
              aria-pressed={form.type === type}
            >
              {CONTACT_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      )}

      {!showSignupFields && (
        <div className={styles.field}>
          <label htmlFor="contact-category" className={styles.label}>
            お問い合わせカテゴリ <span className={styles.required}>必須</span>
          </label>
          <select
            id="contact-category"
            name="category"
            value={form.category}
            onChange={(event) => applyCategory(event.target.value)}
            className={`${styles.select} ${errors.category ? styles.inputError : ""}`}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "err-category" : undefined}
          >
            <option value="">選択してください</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className={styles.error} id="err-category">
              {errors.category}
            </span>
          )}
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name" className={styles.label}>
            お名前 <span className={styles.required}>必須</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            placeholder="例：マイス マイ"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          {errors.name && (
            <span className={styles.error} id="err-name">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email" className={styles.label}>
            メールアドレス <span className={styles.required}>必須</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="example@example.com"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && (
            <span className={styles.error} id="err-email">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className={styles.row}>
        {isOrganizer && (
          <div className={styles.field}>
            <label htmlFor="contact-organization" className={styles.label}>
              {showSignupFields ? "企業名・団体名" : "団体名・事務所名"}
            </label>
            <input
              id="contact-organization"
              type="text"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              autoComplete="organization"
              placeholder="例：株式会社〇〇"
              className={styles.input}
            />
          </div>
        )}

        {!showSignupFields && (
          <div className={styles.field}>
            <label htmlFor="contact-phone" className={styles.label}>
              電話番号
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              placeholder="03-1234-5678"
              className={styles.input}
            />
          </div>
        )}
      </div>

      {!isSignup && (
        <div className={styles.field}>
          <label htmlFor="contact-subjectRef" className={styles.label}>
            {isOrganizer ? "イベント名（任意）" : "イベント名・注文番号（任意）"}
          </label>
          <input
            id="contact-subjectRef"
            type="text"
            name="subjectRef"
            value={form.subjectRef}
            onChange={handleChange}
            placeholder={isOrganizer ? "例：〇〇日の公演" : "お問い合わせ対象のイベント名など"}
            className={styles.input}
          />
          <span className={styles.hint}>
            {isOrganizer
              ? "ご相談中のイベントがあればご記入ください。"
              : "ご記入いただくとお調べがスムーズです。"}
          </span>
        </div>
      )}

      {isSignup && !showSignupFields && (
        <div className={styles.infoBox} role="note">
          <Info size={18} aria-hidden="true" />
          <p>
            <strong>入力はここまでで完了です。このまま送信してください。</strong>
            <br />
            担当者より{contactConfig.replyTarget}に、管理画面のログインURLをメールでお送りします。
          </p>
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>
          {isSignup ? (
            "本文（そのままで構いません）"
          ) : (
            <>
              お問い合わせ内容 <span className={styles.required}>必須</span>
            </>
          )}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={isSignup ? 2 : 6}
          placeholder={isSignup ? SIGNUP_MESSAGE : "お困りの内容やご質問をご記入ください。"}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {isSignup && (
          <span className={styles.hint}>ご要望があれば追記してください（任意）。</span>
        )}
        {errors.message && (
          <span className={styles.error} id="err-message">
            {errors.message}
          </span>
        )}
      </div>

      {/* honeypot: 人には見えない。入力があればボットとして扱う */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">ウェブサイト（入力しないでください）</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && errorMessage && (
        <div className={styles.formError} role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className={styles.submitWrap}>
        <button type="submit" className={styles.submitBtn} disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 size={16} className={styles.spinner} aria-hidden="true" />
              送信中…
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              {isSignup ? "このまま送信する" : "この内容で送信する"}
            </>
          )}
        </button>
        <p className={styles.note}>
          {isSignup
            ? `送信いただいた内容は、会員登録のご案内のみに利用します。担当者より${contactConfig.replyTarget}にログインURLをお送りします。`
            : `送信いただいた内容は、お問い合わせへの回答のみに利用します。担当者より${contactConfig.replyTarget}にご返信いたします。`}
        </p>
      </div>
    </form>
  );
}
