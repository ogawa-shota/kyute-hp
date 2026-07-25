# KYUTE LP

採用成果は、「伝わる会社」から生まれる。 — KYUTE の採用広報ソリューションを紹介する1ページLP（Next.js App Router + TypeScript + Tailwind CSS）。

## 開発

```bash
cd /Users/shota/Projects/kyute-hp
npm install
npm run dev        # http://localhost:3000
```

## ビルド / 本番

```bash
npm run build
npm start
```

## 問い合わせフォーム

問い合わせ内容は、サーバー側のResend APIを経由して`contact@kyute.jp`へ送信します。
Resendで`kyute.jp`ドメインを認証し、`.env.example`を参考に以下の環境変数を設定してください。

- `RESEND_API_KEY`: ResendのAPIキー
- `CONTACT_FROM_EMAIL`: 認証済みドメインの送信元（例: `KYUTE Website <noreply@kyute.jp>`）

VercelではProject SettingsのEnvironment Variablesに同じ値を設定してください。

## ページ構成（4ページ）

`app/layout.tsx` に共通のヘッダー・フッター・モバイル追従CTAを配置し、各ルートが本文を差し込みます。

| ページ | ルート | ファイル | 構成 |
| --- | --- | --- | --- |
| **HOME** | `/` | `app/page.tsx` | HERO → サービス概要(S1) → 採用ファネル(S6) → クロージング |
| **SERVICE** | `/service` | `app/service/page.tsx` | S1→S9 のストーリー本体（サービス→課題→原因→転換→解決→証明→YouTube→事例→流れ）＋クロージング |
| **ABOUT US** | `/about` | `app/about/page.tsx` | 価値観(S4) → 自社動画メディア → 会社概要 → ブランドクロージング |
| **CONTACT** | `/contact` | `app/contact/page.tsx` | 問い合わせフォーム(4項目) → FAQ |

各ページは `export const metadata` で個別のtitle/descriptionを設定しています。

### セクションコンポーネント（`components/lp/`）

| ファイル | 役割 |
| --- | --- |
| `Hero.tsx` | HERO（成果の約束） |
| `Services.tsx` | S1 サービス一望（概要のみ） |
| `Challenges.tsx` | S2 課題の言語化 |
| `Cause.tsx` | S3 原因の特定 |
| `Shift.tsx` | S4 転換（価値観の提示） |
| `Solution.tsx` | S5 解決策（密着動画） |
| `Funnel.tsx` | S6 効果の証明（採用ファネル図） |
| `Youtube.tsx` | S7 なぜYouTubeなのか |
| `Flow.tsx` | S9 導入の流れ |
| `Closing.tsx` | S10 ブランドクロージング＋CTA |
| `OwnedMedia.tsx` | 自社動画メディア（ABOUT） |
| `CompanyInfo.tsx` | 会社概要（ABOUT） |
| `ContactForm.tsx` / `Faq.tsx` | 問い合わせフォーム / FAQ（CONTACT） |

> SERVICEページ内のセクションはストーリー設計上、この順番を変更しないでください。

共通: `Header.tsx`（追従ヘッダー・ルートナビ） / `SiteFooter.tsx`（全ページ共通フッター） / `MobileCtaBar.tsx`（モバイル下部追従CTA） / `PageHeader.tsx`（サブページ見出し） / `CtaButton.tsx` / `Reveal.tsx`（スクロールで静かにフェードイン） / `MediaPlaceholder.tsx`。

## 差し替え箇所（公開前チェック）

すべて `{/* 差し替え: ... */}` コメントを目印にしています。

- **HEROビジュアル** — `components/lp/Hero.tsx`：現状はコピー主役の1カラム構成。将来的にHERO動画を設置する場合はここに追加。
- **短尺クリップ** — `components/lp/Solution.tsx`：`MediaPlaceholder` を実際の密着クリップサムネに差し替え。
- **自社メディア埋め込み** — `components/lp/OwnedMedia.tsx`：自社メディア『運動部のしごと』のチャンネルカード（`@undo-job` へ誘導）。チャンネルに公開動画が揃ったら、カードを `<iframe src="https://www.youtube.com/embed/【動画ID】">` に差し替え可能。
- **FAQ回答** — `components/lp/Faq.tsx`：回答文を実内容に差し替え。
- **会社概要** — `components/lp/CompanyInfo.tsx`：所在地・連絡先を差し替え。
- **SNS / 自社メディアリンク** — `components/lp/SiteFooter.tsx`：各リンク（現状 `#`）を差し替え。
- **問い合わせ送信処理** — `app/api/contact/route.ts`：Resend経由で`contact@kyute.jp`へ送信。公開前に環境変数を設定。
- **OGP画像** — `app/layout.tsx`：`/og.jpg`（HEROコピー＋密着動画の1カット）を配置。

## 計測

各CTAには `data-cta="..."` 属性を付与しています（`hero-primary`, `after-s6`, `closing-primary`, `contact-submit` ほか）。計測タグは後付けで各イベントに紐付け可能です。
