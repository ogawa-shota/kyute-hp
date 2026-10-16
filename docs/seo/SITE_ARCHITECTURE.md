# KYUTE SEOサイト構造

更新日：2026-10-16。現行ルートの正本は `docs/SITE.md`。ここでは検索上の役割と、追加する場合の判断を定義する。実装済みと将来案を区別する。

## 正規URLと公開範囲

正規originは `https://www.kyute.jp`。2026-10-16の公開サイト確認で、`https://kyute.jp/` は www へ307、www は200を返した。canonical・sitemap・robotsのSitemap指定・構造化データはこの到達先に統一した。パスの変更・削除・新しいredirectは行っていない。307から永続redirectへの変更はホスティング設定の確認と本番変更承認の後に判断する。

| 現行URL | 検索と事業上の役割 | 主な次の行動 | index方針 |
|---|---|---|---|
| `/` | KYUTEの指名検索、2サービスへの入口 | サービス選択・資料請求・相談 | index |
| `/service` | サービスの違いを選ぶ | 2サービス詳細 | index |
| `/service/recruit-video` | 採用動画制作の商用ピラー。支援内容・形式・料金・事例・FAQ | `#price` → `#download` / 相談 | index |
| `/service/recruit-youtube` | 採用YouTube運用代行の商用ピラー。支援範囲・プラン・進め方 | `#price` → `#download` / 相談 | index |
| `/works` | 動画品質と制作の考え方を確かめる | 自社メディア・採用動画サービス | index |
| `/media` | 自社メディア「運動部のシゴト。」の説明 | 動画確認・資料請求・相談 | index |
| `/about` | 法人・事業内容の確認 | サイト共通CTA | index |
| `/contact` | 無料相談 | 埋込Google Forms | index、queryはcanonicalに含めない |
| `/download` | サービス別資料請求 | 各フォーム | index |
| `/column` | 採用広報コラムの入口 | カテゴリ・記事 | index |
| `/column/category/recruit-video` | 採用動画の情報整理 | 該当記事 | 公開記事があればindex |
| `/column/category/recruit-youtube` | 採用YouTubeの情報整理 | 該当記事 | 空の間はnoindex |
| `/column/category/general` | 採用広報全般の情報整理 | 該当記事 | 空の間はnoindex |
| `/column/recruit-video-production-company` | 制作会社の比較検討 | 料金確認・資料請求・相談 | 公開記事、index |
| `/lp` と `/lp/**`（PACE除く） | 広告・営業・既存リンクからの流入 | 各LP固有の資料請求 | noindex、sitemap対象外 |
| 存在しない記事・非公開カテゴリ | 公開対象外 | 404 | index対象外 |

アプリのpreview metadataはnoindex。静的PACEの公開条件は別仕様として維持する。非公開サービス（AIカジュアル面談・体験型会社説明会）のカテゴリ・記事・CTAを本番に露出させない。既存LPはそのまま維持する。2026-10-16のmain更新でPACEは検索対象になったため、`/lp/pace`をindexableかつsitemap収録、`/pace/index.html`は同URLへのcanonical別名、`/pace`は恒久redirectとして扱う。

## 情報構造と検索意図

商用ピラーは2本に集約する。コラムは検索意図が具体的な判断材料を提供し、条件の確認を商用ピラーに渡す。料金やFAQを独立ページへ機械的に分割しない。

```text
トップ
├─ サービス
│  ├─ 採用動画制作 ← コラム：会社比較／費用条件／形式／発注・活用
│  └─ 採用YouTube運用代行 ← コラム：内製・外注／運用設計／改善・計測
├─ 制作事例 → 自社メディア「運動部のシゴト。」
├─ コラム → カテゴリ → 記事
├─ 会社紹介
├─ 資料請求
└─ 無料相談
```

現在の「制作会社」コラムは、複数社を比較する情報ページとして維持する。採用動画サービスページはKYUTEへの発注検討を扱う。同じ検索語が登場するだけでカニバリゼーションと断定しない。Search Consoleで同じqueryにどのURLが出ているか、意図と成果を確認する。統合・削除・redirectはこの確認後、個別承認で進める。

## 将来ページの追加条件（未実装）

1. SERPと商談で、既存ページでは十分に答えられない意図を確認できる。
2. 公開可能なKYUTEの一次情報がある。顧客名・効果数値・映像は掲載許可も確認する。
3. 既存記事との違い、主な読者、判断後の行動を1行ずつ説明できる。
4. 本文からつながる既存の料金・事例・資料・相談先を決められる。
5. 公開後の評価指標と、更新責任者を持てる。

費用・活用・運用改善のテーマは候補であり、新規URLや記事本数の確定計画ではない。著者専用ページ、個別顧客事例ページ、動画視聴専用ページも、独自情報・掲載許可・需要がそろってから作る。

## 生成・更新契約

Next.js App Router。コラムはMarkdownをサーバーでHTMLに変換し、公開ページをビルド時に生成する。`dynamicParams = false` のため、未来の `publishedAt` が到来しても新URLが自動生成されるわけではない。日付はAsia/Tokyoで判定し、公開日以降の再ビルド・承認済み本番デプロイが必要。cronやISRによる自動公開は導入していない。

sitemapは公開日を迎えた公開記事と空でない公開カテゴリだけを含める。記事の `updatedAt` は実質的な内容更新があった場合だけ設定する。一覧・カテゴリのlastmodは該当記事群の最大更新日を使う。固定ページのlastmodは現行更新履歴を手で保守し、ビルド日時では置き換えない。Googleはpriority/changefreqを順位づけの指示として使用しない。

根拠：[canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)、[sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)、[noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)。
