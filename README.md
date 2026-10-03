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
| `npm test` | Resend・Slackをmockした資料請求/APIテストを実行 |
| `npm run build` | production buildを生成 |
| `npm run check` | lint、test、buildを順に実行 |
| `npm start` | production serverを起動 |

テストは外部通信をmockし、実際のメールやSlackメッセージを送信しません。

## Application structure

```text
app/
  api/                  Resend・Slack・承認フローのRoute Handlers
  lp/                   独立型LPとroute-scoped CSS/runtime
  service/              サービスページ
  layout.tsx            font、metadata、Analytics、SiteChrome
components/
  SiteChrome.tsx        通常ページとLPのshell切り替え
  lp/                   コーポレート/サービス共通コンポーネント
docs/
  SITE.md               current route and surface truth
  DESIGN.md             observed visual implementation contract
  archive/              historical documents; not current specifications
public/                 画像、PDF、OGP、sitemap、静的LP
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

## Deployment notes

- `https://kyute.jp` / `https://www.kyute.jp` をproduction originとして扱います。
- Preview環境ではroot metadataが検索indexを無効にします。
- Vercel側にも必要な環境変数を設定します。
- 公開前に `public/robots.txt`、`public/sitemap.xml`、各route metadata、資料PDF URLを現行ルートと照合してください。
