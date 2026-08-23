import { test } from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter } from "./rate-limit.mjs";

test("上限までは許可し、超えたら拒否する", () => {
  let now = 1000;
  const limiter = createRateLimiter({ limit: 3, windowMs: 60000, now: () => now });
  assert.equal(limiter.check("1.1.1.1").allowed, true);
  assert.equal(limiter.check("1.1.1.1").allowed, true);
  assert.equal(limiter.check("1.1.1.1").allowed, true);
  const denied = limiter.check("1.1.1.1");
  assert.equal(denied.allowed, false);
  assert.ok(denied.retryAfterSec > 0);
});

test("キーごとに独立してカウントする", () => {
  let now = 1000;
  const limiter = createRateLimiter({ limit: 1, windowMs: 60000, now: () => now });
  assert.equal(limiter.check("a").allowed, true);
  assert.equal(limiter.check("a").allowed, false);
  assert.equal(limiter.check("b").allowed, true);
});

test("ウィンドウを過ぎたら再び許可する", () => {
  let now = 1000;
  const limiter = createRateLimiter({ limit: 1, windowMs: 60000, now: () => now });
  assert.equal(limiter.check("a").allowed, true);
  assert.equal(limiter.check("a").allowed, false);
  now += 60001;
  assert.equal(limiter.check("a").allowed, true);
});

test("retryAfterSec はウィンドウ内の残り秒数を返す", () => {
  let now = 0;
  const limiter = createRateLimiter({ limit: 1, windowMs: 10000, now: () => now });
  limiter.check("a");
  now = 4000;
  assert.equal(limiter.check("a").retryAfterSec, 6);
});

test("期限切れのエントリは掃除される（メモリリーク防止）", () => {
  let now = 0;
  const limiter = createRateLimiter({ limit: 1, windowMs: 1000, now: () => now });
  for (let i = 0; i < 50; i += 1) {
    now += 2000;
    limiter.check(`key-${i}`);
  }
  assert.ok(limiter.size() < 50, `古いキーが残っている: ${limiter.size()}`);
});

test("キーが空でも動作する", () => {
  const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
  assert.equal(limiter.check("").allowed, true);
  assert.equal(limiter.check("").allowed, false);
});
