import { test } from "node:test";
import assert from "node:assert/strict";
import { CONTACT_CATEGORIES, validateContact, buildMailText } from "./contact-schema.mjs";

const valid = {
  type: "user",
  category: "購入・支払い",
  name: "山田 太郎",
  email: "taro@example.com",
  message: "チケットの購入について質問があります。",
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
