# KYUTE SEO・問い合わせ改善の運用入口

最終更新：2026-10-16 JST。目的は**自然検索からの適合問い合わせ・商談・受注を増やすこと**。監査、戦略、優先修正、ローカル検証を実施した。本番公開、アカウント設定、顧客への連絡は未実施。

## 最初に読む

1. [SEO_AUDIT.md](SEO_AUDIT.md)：現状、重要課題、根拠、対応状況。
2. [PROGRESS.md](PROGRESS.md)：実装・検証の確定結果と残件。
3. [USER_ACTIONS.md](USER_ACTIONS.md)：公開承認、権限、一次情報など人間が必要な作業。
4. [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md)：1週間・1か月・3か月の順序。

## 判断の要点

- 公開本体は`https://www.kyute.jp`。改善前はcanonical11件とsitemap12件が転送元apexを指定し、contactのcanonical1件が未設定だった。修正後ローカルは23URLのstrict監査でerror/warning/unverifiedすべて0。本番反映は承認済み。最新mainのPACE変更を統合して再検証中。
- Ahrefs公式無料画面でDR **0**、被リンク **717**、Linking websites **378**を取得した。競合8社のDRは2.6〜46。独自指標であり、Googleの評価や問い合わせ数を表さない。
- 不要な日本語フォント先読みを外した。ホームのfont preloadは483から1へ減った。ローカルで通信削減を確認したが、コラムのモバイルLab性能は残件。Field CWVは未取得。
- 外注先・費用を比較するB層と、依頼先を探すA層を優先。2サービスLP、既存比較記事、費用・導入判断記事を役割分担する。記事数やDRだけを成果にしない。
- 資料請求の成功イベントと任意GA4連携を実装した。GA4 IDは未設定。Vercel Hobbyではカスタムイベントを集計できないため、コードの追加を計測開始と呼ばない。

## ドキュメント一覧

| 文書 | 使う場面 |
|---|---|
| [SEO_AUDIT](SEO_AUDIT.md) | 課題の根拠・優先度・修正方法を確認 |
| [BASELINE_METRICS](BASELINE_METRICS.md) | 公開前のクロール、DR、性能、未取得値を確認 |
| [COMPETITOR_ANALYSIS](COMPETITOR_ANALYSIS.md) | 検索競合8社のLP・記事・CTA・外部評価を比較 |
| [KEYWORD_STRATEGY](KEYWORD_STRATEGY.md) | A〜Dの検討段階ごとに対象語・読者・CVを選ぶ |
| [SITE_ARCHITECTURE](SITE_ARCHITECTURE.md) | 既存URL、サービスと記事の役割、拡張条件を確認 |
| [CONTENT_STRATEGY](CONTENT_STRATEGY.md) | 優先6テーマ・記事企画・必要な一次情報を確認 |
| [CONTENT_GUIDELINES](CONTENT_GUIDELINES.md) | 既存column skillと統一した制作・検証フローへ進む |
| [INTERNAL_LINKING](INTERNAL_LINKING.md) | 記事・サービス・事例のリンク意図を確認 |
| [AUTHORITY_AND_BACKLINK_STRATEGY](AUTHORITY_AND_BACKLINK_STRATEGY.md) | 10施策、候補、調査企画、未送信の連絡文を使う |
| [CRO_STRATEGY](CRO_STRATEGY.md) | 検討段階に応じたCTAと検証仮説を選ぶ |
| [MEASUREMENT_PLAN](MEASUREMENT_PLAN.md) | イベント定義、GA4設定、二重計測防止、集計を確認 |
| [IMPLEMENTATION_ROADMAP](IMPLEMENTATION_ROADMAP.md) | 工数・リスク・効果発現・依存関係から順序を決める |
| [USER_ACTIONS](USER_ACTIONS.md) | 承認・権限・掲載許諾の作業を実施 |
| [PROGRESS](PROGRESS.md) | 完了範囲と公開前後の残件を確認 |
| [CHANGELOG](CHANGELOG.md) | 何を、なぜ変えたかを追う |
| [TECHNICAL_FINDINGS](TECHNICAL_FINDINGS.md) | 実装詳細とGoogle公式方針を確認 |
| [CRAWL_FINDINGS](CRAWL_FINDINGS.md) | URL別・性能の検証とクローラーの限界を確認 |

サイトのルート・見た目の正本は[docs/SITE.md](../SITE.md)、[docs/DESIGN.md](../DESIGN.md)。記事制作の正本は[docs/COLUMN.md](../COLUMN.md)と[column skill](../../.claude/skills/column/SKILL.md)。本ディレクトリに手順を重複実装しない。

## 再検証と週次・月次運用

```bash
npm run check
# ビルドしたアプリを別ターミナルで起動する
npm start
# ローカル配信HTMLを、本番の正規URL規則で検査する
SEO_BASE_URL=http://localhost:3000 SEO_EXPECTED_ORIGIN=https://www.kyute.jp \
  npm run seo:audit -- --strict --output /tmp/kyute-seo-local
# 公開サイトはGETのみで検査する
npm run seo:audit -- --strict --output /tmp/kyute-seo-production
```

PRのCIでlint/test/build/typecheckとビルド後クロールを行う。週次Actionsは月曜09:00 JST予定（GitHubの遅延あり）で、default branchに反映後に稼働する。検出失敗はGitHub Actionsの失敗通知設定で受け取る。専用の外部メッセージ通知は追加していない。

月次はGSCのページ/クエリ別流入、GA4のLP遷移/資料成功、匿名化した適合問い合わせ/商談/受注を照合する。DR・関連媒体の引用・紹介流入を補助指標として更新。権限のないデータを推定せず、取得日と範囲を固定する。

## 証跡と情報管理

[evidence/](evidence/)には公開ページ、公式無料ツール、ローカル検証の証跡、および配信照合用に最小化した認証済みCLIのmetadataを置く。Lighthouseは完全なJSONをgzip、閲覧用HTMLは生成時の行末空白のみ整形して保存している。公開前とローカルをファイル名で区別し、初期値を上書きしない。

GSC/GA4の非公開export、顧客情報、見積原本、認証情報はこのpublicリポジトリへ保存しない。改善効果は仮説であり、Lab値・DR・アクセス数から受注増や順位改善を保証しない。
