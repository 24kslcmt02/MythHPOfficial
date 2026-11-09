# My-th 公式ホームページ

チケット・チェキ券・入場特典プラットフォーム My-th（マイス）のプロダクトサイトです。

本番: https://www.my-th.jp/

## 起動

```bash
npm ci
npm run dev
```

http://localhost:3000 で開きます。お問い合わせフォームの送信を試す場合は、`.env.example` を参考に環境変数を設定してください。

## デプロイ

Vercel にデプロイしています。`main` に入った変更はそのまま本番に反映されるため、変更は PR 経由で行います。

開発時のルールと構成は [CLAUDE.md](./CLAUDE.md) を参照してください。
