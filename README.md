# virtual-sova-lp

[AOI（総合型選抜専門塾）](https://aoaoi.jp/) のような構成を参考にした、**総合型選抜向け学習塾LPのデモ**（Next.js App Router）。

## 開発

```bash
cd /Users/shota/Projects/virtual-sova-lp
npm install
npm run dev
```

## 文言の編集

主に **`data/site-content.ts`** を編集します（ナビ、ヒーロー、悩み、実績、声、料金、相談フローなど）。

塾名・会社名・住所はデモ用です。**公開前に必ず差し替え**てください。

## ビルド

```bash
npm run build
npm start
```

## デプロイ

GitHub に push → Vercel で Import。独自ドメインは DNS を設定。

## 注意

- AOI のロゴ・文章・実績の転載は不可です。本デモは**構成の参考**にしたオリジナル文案です。
- 外部サービス（LINE 等）のリンクは `#` のままです。本番URLに差し替えてください。
