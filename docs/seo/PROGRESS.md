# 進捗・検証結果

2026-10-16 JST。調査・戦略・優先改善の実装と本番公開を完了。[PR #7](https://github.com/ogawa-shota/kyute-hp/pull/7)のmerge SHAは`38477b8897a4bbd29cda6ef54f61470baadeceeb`、本番deployment `7112403197`は2026-10-16 06:18:50 UTC（15:18:50 JST）に成功。GA4は未設定。GSCは読み取りを完了し、非公開領域に結果を保存した。確認済みの結果と残件を分ける。

## 完了した範囲

| 領域 | 結果 |
|---|---|
| 配信先照合 | GitHub `ogawa-shota/kyute-hp` の開始SHAとVercel本番deploymentの一致を確認 |
| 改善前の公開監査 | sitemap・内部リンク・実装ルートから23URLをGET、19直接HTML200、12index許可、7意図的noindex。当時の基準値として保存 |
| 外部評価 | Ahrefs公式画面でKYUTEと競合8社のDR/被リンク取得。KYUTEの無料表示20リンク元も保存 |
| 戦略 | A〜Dのキーワード、8社比較、6記事テーマ、サイト構造、内部リンク、10被リンク施策を文書化 |
| 技術実装 | wwwへのmetadata統一、sitemap/JST公開条件、schema/著者型、サービスH1、font preload改善 |
| コンテンツ/CRO | 既存記事に比較段階/CV仮説・料金CTA、出典・内容確認者表示。既存column skillへ制作ルールを統合 |
| 計測 | CTAと資料成功のイベント、成功時だけ送信、二重送信防止、任意GA4連携。ID未設定時は無効 |
| 監視 | GET限定クローラー、回帰fixture、PRのビルド後HTML検査、週次Actionsをdefault branchへ反映。初回手動実行は成功、初回の定期実行は未実施 |
| 独立レビュー | コード/戦略レビュー実施。監視の3つの検出漏れを修正し、reviewerの再現テストも合格 |
| 本番公開後の検査 | strict監査は24URL、直接HTML200は21、sitemap13、error0 / warning1 / unverified0、打切りなし。warningは既存方針によるPACEの内部入リンク未発見 |
| Search Console | ユーザーの明示承認後に読み取り完了。非公開の結果・exportは公開repoへ保存しない |

## 技術QA

| 検証 | 結果と限界 |
|---|---|
| `npm run lint` | 合格 |
| `npm test` | 合格。既存API29＋51ケース、column検証、crawler fixture、analytics11グループ、SEO回帰を含む。API通信はmock |
| `npm run build` | 合格、31ページ生成。sandbox内の初回buildはfont取得待ちで停止し、許可範囲の同じbuildで再実行して完了 |
| `npm run typecheck` | 合格 |
| `git diff --check` | 合格 |
| 初期ローカルstrictクロール | PACE統合前は23URL、sitemap12、error0 / warning0 / unverified0、打切りなし。改善前公開の自動errorは24（同一根因の重複を含む）。現在の公開後検査とは区別する |
| 公開後strictクロール | 24URL、直接HTML200は21、sitemap13、error0 / warning1 / unverified0、打切りなし。[JSON](evidence/production-after-20261016.json) / [CSV](evidence/production-after-20261016.csv) |
| 404 | 存在しない検証用URLのGETでHTTP404を確認 |
| 独立回帰テスト | LPのnoindex削除、主要ページnoindex＋空sitemap、Googlebot専用Disallowを検出。取得不能は未検証扱い |
| 実送信 | 未実施。メール/Slack/フォーム送信、GA4 DebugViewの実leadは承認・設定待ち |

非致命的警告：既存LINE Seed JPにNext.jsのfont fallback override値がない旨のbuild警告、公開記事が1本のため関連記事2本未満のcolumn警告1件。検証を通すための記事の捏造はしていない。

## ブラウザQA

実ブラウザでdesktop 1440×1000、tablet 1024×900、mobile 390×844を使用。対象は2サービス、記事、contact、共通navigation/skip linkと資料フォーム。

- 2サービスのH1と表示、desktop/mobileで横はみ出しがないことを確認。
- モバイルmenuの開閉、Escapeで閉じてbuttonにfocusが戻ることを確認。
- skip linkから`#main`への移動を確認。
- 料金CTAをクリックし、記事→`/service/recruit-video#price`へ遷移。資料CTA→`#download`、空欄送信時に必須項目のブラウザ検証が働くことを確認。実送信していない。
- 記事の内容確認者・出典を確認。出典の開閉と長いURLの折り返し、mobile CTA表示を確認。
- `/contact`のmetadataと外部フォームへのfallbackを確認。既存ブラウザのGoogleセッションでは再認証表示となり、画面上のフォーム完走は未実施。cookieなしGETでは公開フォーム本文200を確認したため、一般公開でログイン必須と断定しない。フォーム設定の所有者確認は残件。

スクリーンショット：[動画desktop](evidence/local-service-video-desktop.jpg)、[動画mobile](evidence/local-service-video-mobile.jpg)、[YouTube mobile](evidence/local-service-youtube-mobile.jpg)、[記事tablet](evidence/local-column-tablet.jpg)、[記事CTA mobile](evidence/local-column-cta-mobile.jpg)、[出典mobile](evidence/local-column-sources-mobile.jpg)。[contact表示](evidence/local-contact-desktop.jpg)は当該ブラウザセッションの再認証状態の証跡で、フォームの公開設定を証明しない。[匿名GETの記録](evidence/form-anonymous-20261016.json)。

## 性能QA

Lighthouse13.5.0、mobile/simulate、RTT150ms、throughput1638.4Kbps、CPU4倍。公開後も改善前と同じ公開ホストで3ページを測定した。各1回のLab測定であり、実ユーザーのField CWVや恒常的な改善を保証しない。ローカル値は配信条件が異なる過去の検証値として併記する。

| 対象 | 改善前公開 Performance / LCP | 公開前local Performance / LCP | 公開後 Performance / LCP |
|---|---|---|---|
| ホーム | 52 / 41.1秒 | 88 / 3.6秒 | 94 / 2.97秒 |
| 採用動画 | 71 / 40.0秒 | 83 / 4.2秒 | 86 / 3.69秒 |
| コラム | 68 / 40.9秒 | 55 / 18.8秒、再測定55 / 19.3秒 | 75 / 5.40秒 |

公開後ホームのfont通信は65件/1,134,748Bで、改善前公開505件/7.62MBから削減を確認した。採用動画は76件/1,292,577B、コラムは72件/1,238,226B。**コラムのローカルLCP 18.8〜19.3秒は公開後に再現しなかったが、公開後もLCP 5.40秒で改善余地が残る。** 公開後測定の警告はなし。[公開後サマリー](evidence/lighthouse-production-after-20261016/summary.json)。

過去のlocal測定ではVercel計測スクリプト404と、コラムのYouTube Cookie issueも記録した。当時のLighthouse Accessibility/SEOは3ページとも100だったが、全面的な合格保証ではない。PSI APIはquota429でFieldデータを取得できず、実ユーザーLCP/INP/CLSは未取得。[公開前の詳細・生データ](CRAWL_FINDINGS.md#ローカルlighthouseで残った性能課題)。

## 未完了と次の担当

| 項目 | 現状 / 次の行動 |
|---|---|
| GA4 | ID/管理画面設定と通知・同意運用の確認待ち。コードだけで計測開始としない |
| 実通知・フォーム完了 | テスト先と実送信の承認待ち。フォーム所有者/CRMの匿名集計が必要。clickやiframe表示を完了に代用しない |
| 表示速度の残件 | 公開後Lighthouseは測定済み。コラムのLCP 5.40秒を改善対象にし、レスポンシブ画像・YouTubeの読み込みを診断。Field28日は引き続き確認が必要 |
| 事例・新規記事 | 企画と制作基盤は完了。具体的な費用条件、期間付き成果、掲載許諾の確認後に原稿制作 |
| 関連媒体・顧客への連絡 | 候補と文面は準備済み、未送信。宛先と内容の承認後に実施 |

手順・時間・未完了時の影響は[USER_ACTIONS](USER_ACTIONS.md)、優先順位は[ロードマップ](IMPLEMENTATION_ROADMAP.md)。

## PACE統合の再検証

最新mainのPR #8/#9を保持して統合。`npm run check`（lint/tests/build/typecheck）合格。ローカルproduction buildのstrict監査は24URL、直接HTML200は21、sitemap13、error0 / warning1 / unverified0、打切りなし。[JSON](evidence/local-pace-integrated-20261016.json)。warningはPACEへの内部HTML入リンク未発見で、独立LPを通常ナビへ追加しない既存方針に従い、隠さず記録した。初期23URLの証跡は当時のものとして維持する。

この統合済み内容を本番へ公開し、公開後のstrict監査でも上記と同じ件数・判定を確認した。週次workflowはdefault branchで利用可能で、[初回手動実行（38860915315）](https://github.com/ogawa-shota/kyute-hp/actions/runs/38860915315)は成功。初回の定期実行はまだ行われていない。

誤作成した検証用Vercel projectは明示承認後に削除し、API/配信aliasの404を確認。復旧記録は非公開のローカル領域に保存。追加の保護preview計測は再試行していない。
