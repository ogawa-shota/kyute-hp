# KYUTE Website

KYUTEのコーポレートサイト、採用動画・採用YouTubeサービスページ、独立型ランディングページを管理するNext.jsアプリケーションです。

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

## Routes

### Corporate and service pages

| Route | Purpose |
| --- | --- |
| `/` | KYUTEトップ。採用YouTubeの価値、サービス、自社メディアへの導線 |
| `/service` | 2つのサービスの一覧 |
| `/service/youtube` | 採用YouTube運営代行 |
| `/service/media` | 自社動画メディア「運動部のシゴト。」 |
| `/about` | KYUTEの考え方と会社情報 |
| `/contact` | Google Formsを埋め込んだ問い合わせページとFAQ |

### Standalone landing pages

`components/SiteChrome.tsx` は `/lp` 配下で共通ヘッダー・フッターを表示しません。それぞれが独立したデザイン、ナビゲーション、レスポンシブ実装を持ちます。

| Route | Purpose |
| --- | --- |
| `/lp` | 採用動画制作・採用YouTube運用LP |
| `/lp/day-in-the-life` | 採用向け密着動画制作サービスLP |
| `/lp/undo-job` | 「運動部のシゴト。」企業向けLP |
| `/lp/pace` | `public/pace/index.html` へrewriteする静的LP |

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
public/                 画像、PDF、OGP、sitemap、静的LP
scripts/                外部通信をmockしたAPIテスト
```

現行デザインのsource of truthは `app/`、`components/`、`app/globals.css`、各LPのroute-scoped CSSです。`docs/site-structure-kyute.md` はAOナビ時代の履歴資料であり、現在のサイト仕様ではありません。`docs/site-structure-aonavi.md` を含む既存資料・アセットは履歴保持のため残しています。

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

通常の変更では以下を実行します。

```bash
npm run lint
npm test
npm run build
```

UI変更時は、影響する全ルートをDesktop / Tablet / Mobileで実ブラウザ確認してください。特に以下を確認します。

- ナビゲーション、CTA、フォーム、動画dialog、外部リンク
- キーボード操作、focus表示、見出し構造、reduced motion
- overflow、文字サイズ、余白、画像cropping、sticky UI
- console error、失敗したnetwork request、metadata、OGP、sitemap
- LCPと大容量画像/PDFが与える影響

本番デプロイ、実メール送信、実Slack投稿は検証に含めません。

## Deployment notes

- `https://kyute.jp` / `https://www.kyute.jp` をproduction originとして扱います。
- Preview環境ではroot metadataが検索indexを無効にします。
- Vercel側にも必要な環境変数を設定します。
- 公開前に `public/robots.txt`、`public/sitemap.xml`、各route metadata、資料PDF URLを現行ルートと照合してください。
