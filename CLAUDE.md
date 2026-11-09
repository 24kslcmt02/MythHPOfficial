# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

My-th（マイス）公式ホームページ。本番は https://www.my-th.jp/ 。Next.js 16 App Router / React 19 / JavaScript / CSS Modules / framer-motion。ユーザーが使うアプリ本体（user.my-th.jp）は別リポジトリ。

## コマンド

```bash
npm run dev            # 開発サーバー（確認待ちFAQが「確認待ち」バッジ付きで表示される）
npm run build
npm test               # node --test。単一ファイル: node --test src/lib/faq.test.mjs
npm run lint           # 警告もエラー扱いにする場合: npx eslint src --max-warnings=0
```

`npm test` の対象は package.json のグロブ（`src/lib/`・`src/config/` 直下と `src/content/<サブディレクトリ>/` の `*.test.mjs`）。それ以外の場所のテストは実行されない。

お問い合わせフォームの送信には `.env.example` の環境変数が必要。未設定時は `/api/contact` が意図的に503を返す。

## デプロイ

- デプロイ先は Vercel（EJ 名義、チーム ThirdParty's projects）。`www.my-th.jp` を配信しているのはプロジェクト `myth-hp-official-nzbg`
- `main` への merge はそのまま本番公開になる。main への直接 push は禁止し、PR 経由で変更する

## 設計ルール

- 設定の単一ソースは `src/config/site.js`。`null` は未確定を表し、ページ側で自動的に非表示または「準備中」になる。値の確定はこのファイルだけを変更する。業務事実を他の場所にハードコードしない
- 公開/非公開ページは `src/config/routes.js` の `UNPUBLISHED_ROUTES` で切り替える。載っている間はページ本体が404になり、sitemap と導線からも外れる。隠すページを増やすときは page.js 冒頭で `isRoutePublished()` → `notFound()` を呼ぶ。問い合わせ導線は `contactHref()`、手数料導線は `feesHref()` を使う
- 規約・プライバシーポリシー・特商法の本文は持たない。アプリ側（別リポジトリ msc-my-th/MSCAPTITAL_CHECKI_My-th_Web の Guest/）へ外部リンクする設計で、URL は `Guest/src/main.js` のルート定義を正とする。ドメインは app.my-th.jp を使う。SPA なので未定義パスにも200が返る。curl では正否を判定できないため、ブラウザで本文表示を確認する
- 会社情報（住所・代表者・連絡先）は特商法ページの表記と一致させる。設立・資本金・事業内容は未確定なので推測で埋めない
- FAQ（`src/content/faq/`）は `answer` が空なら本番非公開、機能一覧（`src/content/features/index.js`）は `desc` が空なら本番非公開。下書きは `draftAnswer` / `draftDesc`、確認事項は `note` に置く
- 公開判断にあたる変更（`UNPUBLISHED_ROUTES` から外す、`draftAnswer` を `answer` に移す、`draftDesc` を `desc` に移す）は指示なしに行わない
- 入場受付はオフライン不可、本人確認はメール認証のみ、手数料5%の負担者は主催者が選択。コンテンツのテストが「オフライン受付可」の案内を禁止している
- JavaScript のまま書く（TypeScript を導入しない）。スタイルは CSS Modules（CSS フレームワークを入れない）。テストは `node --test` のみ
- README.md は人間向けの概要のみ。`docs/v0.2_実装メモ.md` はこのリポジトリに存在しないため参照先にしない（`src/content/features/index.js` のコメントに古い参照が残っている）

## アーキテクチャ

- `/`（`src/app/page.js`）は `viewMode` state で `UserView`（ファン向け）と `OperatorView`（運営向け）を切り替える SPA。`/operator` は OperatorView の薄いラッパー
- Header / Footer は `onViewModeChange` prop の有無で挙動が変わる。トップではビュー切替、サブページでは `/` または `/operator` へ遷移する
- サブページは `src/components/common/PageShell.js` で統一する（例外は独自LPの `/subscription`）。共通スタイルは `src/components/common/page.module.css`
- コンテンツの単一ソースは `src/content/faq/*.js`、`src/content/features/index.js`、`src/content/news/index.js`。キャラ画像は `src/config/characterAssets.js` に集約し、`CharacterImage` 経由で参照する
- `src/lib/*.mjs` はテスト付きの純粋関数層（FAQ/機能の公開判定、ルート判定、フォーム検証、レート制限、Resend 送信）
- デザイントークンは `src/app/globals.css`。`--color-primary` / `--color-secondary` はロゴ実色と同期し、変更時は `--color-*-rgb` も合わせる。アコーディオンは `grid-template-rows: 0fr/1fr` 方式

## SEO

`src/app/robots.js` / `sitemap.js` / `opengraph-image.js` が自動生成する。新規ルートは `sitemap.js` の ROUTES に必ず追加し、公開保留中なら `UNPUBLISHED_ROUTES` にも載せる。各ページは `metadata`（title/description/`alternates.canonical`）を個別に持つ。
