import { test } from "node:test";
import assert from "node:assert/strict";
import { buildEmails, isMailerConfigured } from "./mailer.mjs";

const data = {
  type: "organizer",
  category: "導入相談",
  name: "田中 太郎",
  email: "tanaka@example.com",
  organization: "株式会社スターライト",
  phone: "",
  subjectRef: "",
  message: "導入について相談したいです。",
};

const env = { from: "My-th <noreply@my-th.jp>", to: "info@my-th.jp" };

test("管理者宛と自動返信の2通を作る", () => {
  const [admin, reply] = buildEmails(data, env);
  assert.equal(admin.to, "info@my-th.jp");
  assert.equal(reply.to, "tanaka@example.com");
});

test("管理者宛は送信者に返信できるよう reply_to を設定する", () => {
  const [admin] = buildEmails(data, env);
  assert.equal(admin.reply_to, "tanaka@example.com");
  assert.match(admin.subject, /導入相談/);
  assert.match(admin.text, /株式会社スターライト/);
});

test("自動返信には問い合わせ内容の控えと返信目安が入る", () => {
  const [, reply] = buildEmails(data, env);
  assert.match(reply.subject, /お問い合わせ/);
  assert.match(reply.text, /田中 太郎/);
  assert.match(reply.text, /導入について相談したいです。/);
  assert.match(reply.text, /2営業日以内/);
});

test("自動返信はこのメールに返信しても届かない旨を明示しない（reply_to を窓口にする）", () => {
  const [, reply] = buildEmails(data, env);
  assert.equal(reply.reply_to, "info@my-th.jp");
});

test("差出人はすべて設定値を使う", () => {
  const emails = buildEmails(data, env);
  for (const mail of emails) assert.equal(mail.from, env.from);
});

test("設定が揃っているかを判定できる", () => {
  assert.equal(isMailerConfigured({ RESEND_API_KEY: "re_x", CONTACT_TO_EMAIL: "a@b.com" }), true);
  assert.equal(isMailerConfigured({ CONTACT_TO_EMAIL: "a@b.com" }), false);
  assert.equal(isMailerConfigured({ RESEND_API_KEY: "" }), false);
  assert.equal(isMailerConfigured({}), false);
  assert.equal(isMailerConfigured(undefined), false);
});

test("入力値を変更しない", () => {
  const snapshot = JSON.parse(JSON.stringify(data));
  buildEmails(data, env);
  assert.deepEqual(data, snapshot);
});
