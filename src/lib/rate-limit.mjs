/**
 * 単純なスライディングウィンドウ方式のレート制限（NFR-06）
 *
 * 注意: プロセス内メモリで管理するため、Vercel のようなサーバーレス環境では
 * インスタンスをまたいだ制限はできない（ベストエフォート）。
 * 厳密な制限が必要になった場合は Upstash Redis 等の外部ストアに差し替える。
 */

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 10 * 60 * 1000; // 10分
const MAX_ENTRIES = 10000; // 異常時の上限（メモリ保護）

export function createRateLimiter({
  limit = DEFAULT_LIMIT,
  windowMs = DEFAULT_WINDOW_MS,
  now = () => Date.now(),
} = {}) {
  /** @type {Map<string, number[]>} key -> リクエスト時刻の配列 */
  const hits = new Map();

  const sweep = (currentTime) => {
    for (const [key, times] of hits) {
      const alive = times.filter((t) => currentTime - t < windowMs);
      if (alive.length === 0) {
        hits.delete(key);
      } else if (alive.length !== times.length) {
        hits.set(key, alive);
      }
    }
  };

  return {
    /**
     * @returns {{ allowed: boolean, remaining: number, retryAfterSec: number }}
     */
    check(key) {
      const currentTime = now();
      sweep(currentTime);

      if (hits.size >= MAX_ENTRIES) hits.clear();

      const previous = hits.get(key) ?? [];
      const withinWindow = previous.filter((t) => currentTime - t < windowMs);

      if (withinWindow.length >= limit) {
        const oldest = Math.min(...withinWindow);
        const retryAfterMs = windowMs - (currentTime - oldest);
        return {
          allowed: false,
          remaining: 0,
          retryAfterSec: Math.max(1, Math.ceil(retryAfterMs / 1000)),
        };
      }

      hits.set(key, [...withinWindow, currentTime]);
      return {
        allowed: true,
        remaining: limit - withinWindow.length - 1,
        retryAfterSec: 0,
      };
    },
    size() {
      return hits.size;
    },
  };
}
