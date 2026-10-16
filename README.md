# KYUTE Website

KYUTEのコーポレートサイト、採用動画・採用YouTubeサービスページ、独立型ランディングページを管理するNext.jsアプリケーションです。

現在のルートと役割は [`docs/SITE.md`](docs/SITE.md)、現在実装されているvisual systemは [`docs/DESIGN.md`](docs/DESIGN.md) を参照してください。DESIGN.mdは観測記録であり、user-approved Goldではありません。

## Requirements

- Node.js 24 recommended (`.nvmrc`)
- npm
- External delivery integrationsを使う場合のみ、`.env.example`に記載した環境変数

```bash
nvm use
npm ci
npm run dev
```

開発サーバーは通常 `http://localhost:3000` で起動します。

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Turbopackで開発サーバーを起動 |
| `npm run lint` | `app/` と `components/` をESLintで検査 |
| `npm test` | Resend・Slackをmockした資料請求/APIテストと、コラムのチェックを実行 |
| `npm run column:check` | コラム記事の必須項目・一次情報・検索ワード重複・CV戦略・アイキャッチ・CTA・画像などを検査 |
| `npm run column:keywords` | コラムが狙う検索ワードの一覧を表示 |
| `npm run column:eyecatch -- <slug> <元画像>` | コラムのアイキャッチを 1600×900 のJPGにして `public/column/<slug>/` に置く |
| `npm run build` | production buildを生成 |
| `npm run typecheck` | TypeScriptの型チェック |
| `npm run seo:audit` | 公開サイトのHTML、sitemap、canonical、内部リンクをGETだけで検査 |
| `npm run check` | lint、test、buildを順に実行 |
| `npm start` | production serverを起動 |

テストは外部通信をmockし、実際のメールやSlackメッセージを送信しません。

## Application structure

```text
app/
  api/                  Resend・Slack・承認フローのRoute Handlers
  lp/                   独立型LPとroute-scoped CSS/runtime
  service/              サービスページ
  column/               お役立ちコラム（一覧・カテゴリ・記事）
  sitemap.ts            sitemap.xml（固定ページ＋公開済みコラム）
  layout.tsx            font、metadata、Analytics、SiteChrome
content/
  column/               コラム記事（Markdown）。書き方は docs/COLUMN.md
  authors/              コラムの著者プロフィール
lib/column/             コラムの読み込み・検証・Markdown変換
components/
  SiteChrome.tsx        通常ページとLPのshell切り替え
  lp/                   コーポレート/サービス共通コンポーネント
  column/               コラム用コンポーネント
docs/
  SITE.md               current route and surface truth
  DESIGN.md             observed visual implementation contract
  archive/              historical documents; not current specifications
public/                 画像、PDF、OGP、静的LP
scripts/                外部通信をmockしたAPIテスト
```

2026-05-06のAOナビ企業サイト構成書は [`docs/archive/2026-05-06_ao-navi-corporate-site.md`](docs/archive/2026-05-06_ao-navi-corporate-site.md) に履歴として保存しています。現行仕様として使用しないでください。

## Forms and integrations

- `/contact` は `components/lp/ContactForm.tsx` でGoogle Formsを埋め込みます。
- `/api/contact` はResend問い合わせRoute Handlerとして残っていますが、現在のContactページからは呼ばれていません。
- `/api/material-request`、`/api/culture-material`、`/api/undo-job-material` は、資料PDF送信、社内通知、Slack承認を扱います。
- `/api/material-request/approve` と `/api/slack/material-request` は、日程調整メールの承認フローを扱います。
- YouTube埋め込み、Vercel Analytics、Resend、Slack、日程調整URLは外部サービスです。

`.env.example` をコピーしてローカル環境を設定してください。秘密情報をcommitしないでください。

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API認証 |
| `CONTACT_FROM_EMAIL` | 認証済みドメインの送信元 |
| `MATERIAL_APPROVAL_SECRET` | 資料請求承認トークンの暗号鍵（32文字以上） |
| `MATERIAL_SCHEDULING_URL` | 承認後に案内する日程調整URL |
| `MATERIAL_SLACK_BOT_TOKEN` | Slack通知・reaction用Bot token |
| `MATERIAL_SLACK_CHANNEL_ID` | 通知先Slack channel |
| `MATERIAL_SLACK_SIGNING_SECRET` | Slack request署名検証 |

## QA

```bash
npm run lint
npm test
npm run build
```

UI変更時のscope判断、Preservation Mode、before/after比較はShota AI OSの `web-product` skillに従います。project-specificなpreserve対象は `docs/DESIGN.md` を使用してください。本番デプロイ、実メール送信、実Slack投稿は検証に含めません。

## SEO運用

監査・戦略・実装履歴・人間の設定作業は [`docs/seo/README.md`](docs/seo/README.md) を参照してください。記事制作の正本は引き続き [`docs/COLUMN.md`](docs/COLUMN.md) と column skill です。

`NEXT_PUBLIC_GA_MEASUREMENT_ID` は任意です。未設定ならGoogleタグは読み込まれません。本番ドメインでのみ有効になります。GA4の管理画面設定、拡張計測の無効化、イベント定義は [`MEASUREMENT_PLAN.md`](docs/seo/MEASUREMENT_PLAN.md) に従ってください。Vercel Hobbyではカスタムイベントを集計できないため、コード実装と計測稼働を区別します。

PRではビルドしたローカルサイトをクロールします。週次の公開監視は `.github/workflows/seo-monitor.yml` で月曜09:00 JST予定です。default branchへの反映後に有効になります。検索順位やDRはこのHTTP検査では取得しません。失敗通知はGitHubのActions通知設定に依存します。

## Deployment notes

- 正規originは `https://www.kyute.jp`。2026-10-16の公開観測で `https://kyute.jp` はwwwへ307転送されます。
- Preview環境ではroot metadataが検索indexを無効にします。
- Vercel側にも必要な環境変数を設定します。
- 公開前に `public/robots.txt`、`app/sitemap.ts` が生成するsitemap、各route metadata、資料PDF URLを現行ルートと照合してください。本番デプロイには明示承認が必要です。
