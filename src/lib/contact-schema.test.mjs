import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CONTACT_CATEGORIES,
  SIGNUP_CATEGORY,
  SIGNUP_MESSAGE,
  isSignupRequest,
  validateContact,
  buildMailText,
  buildMailSubject,
} from "./contact-schema.mjs";

const valid = {
  type: "user",
  category: "購入・支払い",
  name: "山田 太郎",
  email: "taro@example.com",
  message: "チケットの購入について質問があります。",
};

const signupInput = {
  type: "organizer",
  category: "無料で会員登録",
  name: "田中 花子",
  email: "hanako@example.com",
  organization: "株式会社スターライト",
  message: "",
};

test("カテゴリは購入者・運営者それぞれに定義されている", () => {
  assert.ok(CONTACT_CATEGORIES.user.length >= 5);
  assert.ok(CONTACT_CATEGORIES.organizer.length >= 4);
  assert.ok(CONTACT_CATEGORIES.user.some((c) => c.includes("払い戻し")));
  assert.ok(CONTACT_CATEGORIES.organizer.includes("導入相談"));
});

test("正しい入力は通る", () => {
  const r = validateContact(valid);
  assert.equal(r.ok, true);
  assert.equal(r.data.name, "山田 太郎");
  assert.deepEqual(r.errors, {});
});

test("必須項目が空ならエラー（日本語メッセージ）", () => {
  const r = validateContact({ ...valid, name: "  ", message: "" });
  assert.equal(r.ok, false);
  assert.match(r.errors.name, /入力してください/);
  assert.match(r.errors.message, /入力してください/);
});

test("メールアドレスの形式を検証する", () => {
  for (const bad of ["taro", "taro@", "@example.com", "taro example@x.com", "a@b"]) {
    const r = validateContact({ ...valid, email: bad });
    assert.equal(r.ok, false, `${bad} は不正なはず`);
    assert.ok(r.errors.email);
  }
  assert.equal(validateContact({ ...valid, email: "a.b+c@sub.example.co.jp" }).ok, true);
});

test("type が不正なら弾く", () => {
  const r = validateContact({ ...valid, type: "admin" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.type);
});

test("カテゴリは type に対応するものだけ許可する", () => {
  const r = validateContact({ ...valid, type: "user", category: "導入相談" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.category);
});

test("honeypot に値が入っていたら弾く（ボット判定）", () => {
  const r = validateContact({ ...valid, website: "http://spam.example" });
  assert.equal(r.ok, false);
  assert.equal(r.botDetected, true);
});

test("文字数上限を超えたら弾く", () => {
  assert.equal(validateContact({ ...valid, name: "あ".repeat(101) }).ok, false);
  assert.equal(validateContact({ ...valid, message: "あ".repeat(5001) }).ok, false);
  assert.equal(validateContact({ ...valid, email: "a".repeat(250) + "@x.com" }).ok, false);
});

test("前後の空白は除去される", () => {
  const r = validateContact({ ...valid, name: "  山田  ", email: " taro@example.com " });
  assert.equal(r.data.name, "山田");
  assert.equal(r.data.email, "taro@example.com");
});

test("任意項目は未入力でも通り、入力されれば保持される", () => {
  assert.equal(validateContact(valid).data.phone, "");
  const r = validateContact({ ...valid, phone: "03-1234-5678", organization: "株式会社A" });
  assert.equal(r.data.phone, "03-1234-5678");
  assert.equal(r.data.organization, "株式会社A");
});

test("オブジェクト以外を渡しても落ちない", () => {
  for (const bad of [null, undefined, "text", 42, []]) {
    const r = validateContact(bad);
    assert.equal(r.ok, false);
  }
});

test("buildMailText は入力値をすべて含む本文を作る", () => {
  const { data } = validateContact({ ...valid, phone: "03-1234-5678" });
  const text = buildMailText(data);
  assert.match(text, /購入・支払い/);
  assert.match(text, /山田 太郎/);
  assert.match(text, /taro@example\.com/);
  assert.match(text, /03-1234-5678/);
  assert.match(text, /チケットの購入について/);
});

test("buildMailText は未入力の任意項目を出力しない", () => {
  const { data } = validateContact(valid);
  assert.doesNotMatch(buildMailText(data), /電話番号/);
});

// ───────────────────────── 無料会員登録（ログインURL送付希望）
test("運営者カテゴリに「無料で会員登録」がある（先頭＝主要CTA）", () => {
  assert.equal(CONTACT_CATEGORIES.organizer[0], SIGNUP_CATEGORY);
  assert.equal(SIGNUP_CATEGORY, "無料で会員登録");
});

test("会員登録カテゴリは本文が空でも送信できる", () => {
  const r = validateContact({ ...signupInput, message: "" });
  assert.equal(r.ok, true, JSON.stringify(r.errors));
  assert.equal(r.data.message, "");
});

test("会員登録カテゴリでも名前・メールは必須のまま", () => {
  const r = validateContact({ ...signupInput, name: "", email: "" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.name);
  assert.ok(r.errors.email);
});

test("会員登録カテゴリ以外は本文必須のまま", () => {
  const r = validateContact({ ...signupInput, category: "導入相談", message: "" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.message);
});

test("会員登録カテゴリは運営者種別でのみ選べる", () => {
  const r = validateContact({ ...signupInput, type: "user" });
  assert.equal(r.ok, false);
  assert.ok(r.errors.category);
});

test("isSignupRequest は運営者×会員登録カテゴリのときだけ true", () => {
  assert.equal(isSignupRequest({ type: "organizer", category: SIGNUP_CATEGORY }), true);
  assert.equal(isSignupRequest({ type: "organizer", category: "導入相談" }), false);
  assert.equal(isSignupRequest({ type: "user", category: SIGNUP_CATEGORY }), false);
  assert.equal(isSignupRequest(null), false);
});

test("会員登録の管理者宛メールは件名・本文でログインURL送付が必要と分かる", () => {
  const { data } = validateContact({ ...signupInput, message: "" });
  assert.match(buildMailSubject(data), /会員登録/);
  const text = buildMailText(data);
  assert.match(text, /ログインURL/);
  assert.match(text, /株式会社スターライト/);
  assert.doesNotMatch(text, /【お問い合わせ内容】\s*$/, "本文が空のとき見出しだけで終わらない");
});

test("会員登録で補足が入力されていれば本文に含める", () => {
  const { data } = validateContact({ ...signupInput, message: "来月の公演から使いたいです。" });
  assert.match(buildMailText(data), /来月の公演から使いたいです。/);
});

// ───────────────────────── 会員登録申請の件名・定型本文（2026-08-23 EJフィードバック）
test("SIGNUP_MESSAGE は「このまま送信」を促す定型文で、会員登録の本文として検証を通る", () => {
  assert.match(SIGNUP_MESSAGE, /会員登録/);
  assert.match(SIGNUP_MESSAGE, /このまま送信/);
  const r = validateContact({ ...signupInput, message: SIGNUP_MESSAGE });
  assert.equal(r.ok, true, JSON.stringify(r.errors));
  assert.equal(r.data.message, SIGNUP_MESSAGE);
});

test("会員登録申請の件名は「会員登録申請」＋企業名＋氏名で、運営側が一目で判別できる", () => {
  const { data } = validateContact({ ...signupInput, message: SIGNUP_MESSAGE });
  const subject = buildMailSubject(data);
  assert.match(subject, /^\[My-th 会員登録申請\]/);
  assert.match(subject, /株式会社スターライト/);
  assert.match(subject, /田中 花子/);
  assert.equal(subject.indexOf("株式会社スターライト") < subject.indexOf("田中 花子"), true, "企業名 → 氏名の順");
});

test("会員登録申請で企業名が未記入なら件名は氏名のみ（区切り記号が残らない）", () => {
  const { data } = validateContact({ ...signupInput, organization: "", message: SIGNUP_MESSAGE });
  const subject = buildMailSubject(data);
  assert.match(subject, /^\[My-th 会員登録申請\] 田中 花子 様$/);
});

test("会員登録申請の本文には定型文がそのまま残る（運営側が受信メールで判別できる）", () => {
  const { data } = validateContact({ ...signupInput, message: SIGNUP_MESSAGE });
  assert.match(buildMailText(data), new RegExp(SIGNUP_MESSAGE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("通常の問い合わせの件名には選択したカテゴリと氏名が入る", () => {
  const { data } = validateContact({ ...signupInput, category: "導入相談", message: "相談です" });
  const subject = buildMailSubject(data);
  assert.match(subject, /導入相談/);
  assert.match(subject, /田中 花子/);
  assert.doesNotMatch(subject, /会員登録申請/);
});
