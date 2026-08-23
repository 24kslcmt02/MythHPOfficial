import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-schema.mjs";
import { createRateLimiter } from "@/lib/rate-limit.mjs";
import { sendContactEmails } from "@/lib/mailer.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 同一IPから10分間に5件まで（NFR-06）
// 注意: プロセス内メモリのためインスタンスをまたぐ制限はできない（ベストエフォート）
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

/** リクエスト元IPを推定する */
function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** API共通のレスポンス形式（patterns.md） */
function json(payload, status) {
  return NextResponse.json(payload, { status });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json(
      { success: false, data: null, error: "送信内容を読み取れませんでした。もう一度お試しください。" },
      400
    );
  }

  const { allowed, retryAfterSec } = limiter.check(clientIp(request));
  if (!allowed) {
    return json(
      {
        success: false,
        data: null,
        error: `送信が集中しています。${Math.ceil(retryAfterSec / 60)}分ほど時間をおいて再度お試しください。`,
      },
      429
    );
  }

  const { ok, data, errors, botDetected } = validateContact(body);

  // ボットには成功を返して挙動を推測されないようにする（メールは送らない）
  if (botDetected) {
    return json({ success: true, data: { accepted: true }, error: null }, 200);
  }

  if (!ok) {
    return json(
      { success: false, data: null, error: "入力内容をご確認ください。", fieldErrors: errors },
      422
    );
  }

  const result = await sendContactEmails(data, process.env);

  if (!result.ok) {
    if (result.error === "MAILER_NOT_CONFIGURED") {
      // 設定漏れは運用側の問題。利用者には代替の連絡手段を案内する。
      console.error("[contact] メール送信の環境変数が未設定です（RESEND_API_KEY / CONTACT_TO_EMAIL）");
      return json(
        {
          success: false,
          data: null,
          error:
            "現在フォームからの送信を受け付けられません。お手数ですが info@my-th.jp までメールでご連絡ください。",
        },
        503
      );
    }

    console.error("[contact] メール送信に失敗しました:", result.error);
    return json(
      {
        success: false,
        data: null,
        error:
          "送信に失敗しました。時間をおいて再度お試しいただくか、info@my-th.jp までメールでご連絡ください。",
      },
      502
    );
  }

  if (result.warning) {
    console.warn("[contact] 自動返信の送信に失敗しました:", result.warning);
  }

  return json({ success: true, data: { accepted: true }, error: null }, 200);
}

export async function GET() {
  return json({ success: false, data: null, error: "許可されていないメソッドです。" }, 405);
}
